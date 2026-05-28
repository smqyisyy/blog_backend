const mysql = require("mysql2/promise")
const logger = require("../utils/logger")
const mysqlConfig = require("../config.json")
const pool = mysql.createPool(mysqlConfig)
async function getMysqlConnection() {
    const connection = await pool.getConnection({ ...mysqlConfig })
    return connection
}
function closeConnection(connection) {
    connection.release((endErr) => {
        if (endErr) {
            logger.error({ err: endErr }, 'Error closing database connection');
            return;
        }
        logger.info('Database connection closed');
    });
}

async function getCommentsByBlogId(blogId) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'select * from `blog_comment` where `blogId`=? order by `createdAt` desc',
            [blogId]
        );
        rows.forEach(row => {
            row.createdAt = row.createdAt.toLocaleString();
        });
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e, blogId }, 'getCommentsByBlogId failed');
        closeConnection(conn)
        return []
    }
}

async function addComment({ blogId, nickname, email, content }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute(
            'insert into `blog_comment` (`blogId`,`nickname`,`email`,`content`) values(?,?,?,?)',
            [blogId, nickname, email || null, content]
        );
        closeConnection(conn)
    } catch (e) {
        logger.error({ err: e }, 'addComment failed');
        closeConnection(conn)
    }
}

async function deleteComment(id) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_comment` where `id`=?', [id]);
        closeConnection(conn)
    } catch (e) {
        logger.error({ err: e }, 'deleteComment failed');
        closeConnection(conn)
    }
}

async function getAllComments() {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'SELECT c.*, b.blogTitle FROM `blog_comment` c LEFT JOIN `blog_info` b ON c.blogId = b.id ORDER BY c.createdAt DESC'
        );
        rows.forEach(row => {
            row.createdAt = row.createdAt.toLocaleString();
        });
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e }, 'getAllComments failed');
        closeConnection(conn)
        return []
    }
}

module.exports = { getCommentsByBlogId, addComment, deleteComment, getAllComments }