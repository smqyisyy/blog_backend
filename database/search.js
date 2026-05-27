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

async function searchBlog(keyword, pageNum, pageSize) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'select * from `blog_info` where MATCH(`blogTitle`,`description`,`blogContent`) AGAINST(? IN BOOLEAN MODE) order by `releaseDate` desc limit ?,?',
            [keyword, (pageNum - 1) * pageSize, pageSize]
        );
        rows.forEach(row => {
            row.releaseDate = row.releaseDate.toLocaleDateString();
        });
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e, keyword }, 'searchBlog failed');
        closeConnection(conn)
        return []
    }
}

async function searchBlogCount(keyword) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'select count(*) as totalBlog from `blog_info` where MATCH(`blogTitle`,`description`,`blogContent`) AGAINST(? IN BOOLEAN MODE)',
            [keyword]
        );
        closeConnection(conn)
        return rows[0]
    } catch (e) {
        logger.error({ err: e, keyword }, 'searchBlogCount failed');
        closeConnection(conn)
        return { totalBlog: 0 }
    }
}

module.exports = { searchBlog, searchBlogCount }