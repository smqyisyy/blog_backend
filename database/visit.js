const mysql = require("mysql2/promise")
const logger = require("../utils/logger")
const mysqlConfig = require("../config.json")
const { queryIpLocation } = require("../utils/ipLocation")
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
    });
}

// 记录一次访问
async function logVisit({ blogId, ip, path }) {
    const conn = await getMysqlConnection()
    try {
        // 异步查询IP地理位置
        const location = await queryIpLocation(ip)
        await conn.execute(
            'INSERT INTO `blog_visit` (`blogId`, `ip`, `path`, `province`, `city`) VALUES (?, ?, ?, ?, ?)',
            [blogId || null, ip, path, location.province, location.city]
        );
        // 如果是文章访问，增加文章阅读量
        if (blogId) {
            await conn.execute(
                'UPDATE `blog_info` SET `views` = `views` + 1 WHERE `id` = ?',
                [blogId]
            );
        }
        closeConnection(conn)
    } catch (e) {
        logger.error({ err: e }, 'logVisit failed');
        closeConnection(conn)
    }
}

// 获取总访问量
async function getTotalVisits() {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute('SELECT COUNT(*) as count FROM blog_visit');
        closeConnection(conn)
        return rows[0].count
    } catch (e) {
        logger.error({ err: e }, 'getTotalVisits failed');
        closeConnection(conn)
        return 0
    }
}

// 获取独立访客数（不同IP）
async function getUniqueVisitors() {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute('SELECT COUNT(DISTINCT ip) as count FROM blog_visit');
        closeConnection(conn)
        return rows[0].count
    } catch (e) {
        logger.error({ err: e }, 'getUniqueVisitors failed');
        closeConnection(conn)
        return 0
    }
}

// 获取今日访问量
async function getTodayVisits() {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'SELECT COUNT(*) as count FROM blog_visit WHERE DATE(createdAt) = CURDATE()'
        );
        closeConnection(conn)
        return rows[0].count
    } catch (e) {
        logger.error({ err: e }, 'getTodayVisits failed');
        closeConnection(conn)
        return 0
    }
}

// 获取每日访问趋势（最近N天）
async function getDailyVisits(days = 7) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            `SELECT DATE(createdAt) as date, COUNT(*) as count
             FROM blog_visit
             WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
             GROUP BY DATE(createdAt)
             ORDER BY date ASC`,
            [days]
        );
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e }, 'getDailyVisits failed');
        closeConnection(conn)
        return []
    }
}

// 获取热门文章（阅读量最高的）
async function getTopArticles(limit = 10) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'SELECT id, blogTitle, views FROM blog_info ORDER BY views DESC LIMIT ?',
            [limit]
        );
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e }, 'getTopArticles failed');
        closeConnection(conn)
        return []
    }
}

// 获取每篇文章的阅读量
async function getArticleViews(blogId) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            'SELECT views FROM blog_info WHERE id = ?',
            [blogId]
        );
        closeConnection(conn)
        return rows.length > 0 ? rows[0].views : 0
    } catch (e) {
        logger.error({ err: e }, 'getArticleViews failed');
        closeConnection(conn)
        return 0
    }
}

// 获取地区分布（按省份统计）
async function getRegionDistribution(limit = 15) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            `SELECT province, COUNT(*) as count
             FROM blog_visit
             WHERE province IS NOT NULL AND province != ''
             GROUP BY province
             ORDER BY count DESC
             LIMIT ?`,
            [limit]
        );
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e }, 'getRegionDistribution failed');
        closeConnection(conn)
        return []
    }
}

// 获取城市分布（按城市统计）
async function getCityDistribution(limit = 15) {
    const conn = await getMysqlConnection()
    try {
        const [rows] = await conn.execute(
            `SELECT city, province, COUNT(*) as count
             FROM blog_visit
             WHERE city IS NOT NULL AND city != ''
             GROUP BY city, province
             ORDER BY count DESC
             LIMIT ?`,
            [limit]
        );
        closeConnection(conn)
        return rows
    } catch (e) {
        logger.error({ err: e }, 'getCityDistribution failed');
        closeConnection(conn)
        return []
    }
}

module.exports = {
    logVisit,
    getTotalVisits,
    getUniqueVisitors,
    getTodayVisits,
    getDailyVisits,
    getTopArticles,
    getArticleViews,
    getRegionDistribution,
    getCityDistribution
}
