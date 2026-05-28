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
        }
    });
}

async function getLikeInfo(blogId, ip) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute('SELECT likes FROM blog_info WHERE id=?', [blogId]);
        const likes = rows.length > 0 ? rows[0].likes : 0;
        const [likeRows] = await conn.execute('SELECT id FROM blog_like WHERE blogId=? AND ip=?', [blogId, ip]);
        closeConnection(conn)
        return { likes, liked: likeRows.length > 0 }
    } catch (e) {
        logger.error({ err: e }, 'getLikeInfo failed');
        closeConnection(conn)
        return { likes: 0, liked: false }
    }
}

async function toggleLike(blogId, ip) {
    const conn = await getMysqlConnection()
    try {
        const [existing] = await conn.execute('SELECT id FROM blog_like WHERE blogId=? AND ip=?', [blogId, ip]);
        if (existing.length > 0) {
            await conn.execute('DELETE FROM blog_like WHERE blogId=? AND ip=?', [blogId, ip]);
            await conn.execute('UPDATE blog_info SET likes = GREATEST(likes - 1, 0) WHERE id=?', [blogId]);
            closeConnection(conn)
            return { liked: false }
        } else {
            await conn.execute('INSERT INTO blog_like (blogId, ip) VALUES (?, ?)', [blogId, ip]);
            await conn.execute('UPDATE blog_info SET likes = likes + 1 WHERE id=?', [blogId]);
            closeConnection(conn)
            return { liked: true }
        }
    } catch (e) {
        logger.error({ err: e }, 'toggleLike failed');
        closeConnection(conn)
        return null
    }
}

module.exports = { getLikeInfo, toggleLike }
