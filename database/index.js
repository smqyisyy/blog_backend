// 此文件主要用于操作blog_info表
const mysql = require("mysql2/promise")
const logger = require("../utils/logger")
// 读取数据库连接的配置文件
const mysqlConfig = require("../config.json")
// 单例模式
// let connection = null
const pool = mysql.createPool(mysqlConfig)
async function getMysqlConnection() {
    // if (connection) {
    //     return connection
    // }
    connection = await pool.getConnection({
        ...mysqlConfig
    })
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
/**
 * 分页查询博客信息
 * @param {*} pageNum 页码
 * @param {*} pageSize 一页的大小
 * @returns 
 */
async function getBlogInfo(pageNum, pageSize) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select * from `blog_info` order by `releaseDate` desc limit ?,?', [(pageNum - 1) * pageSize, pageSize]);
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows
}
/**
 * 通过博客id获取对应内容
 * @param {*} blogId 博客id
 * @returns 
 */
async function getBlogInfoById(blogId = null) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select * from `blog_info` where `id`=?', [blogId]);
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows[0]
}
/**
 * 获取全部博客数量
 * @returns 
 */
async function getBlogNum() {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_info`');
    closeConnection(conn)
    return rows[0]
}
/**
 * 
 * @param {*} param
 * 插入一篇博客
 */
async function addBlog({ blogTitle, imgUrl, releaseDate, category, blogAuthor, description, blogContent }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('insert into `blog_info` (`blogTitle`,`imgUrl`,`releaseDate`,`category`,`blogAuthor`,`description`,`blogContent`) values(?,?,?,?,?,?,?)', [blogTitle, imgUrl, releaseDate, category, blogAuthor, description || '', blogContent]);
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'addBlog failed');
    }
}
/**
 *
 * @param {*} param
 * 更新博客
 */
async function updateBlog({ blogTitle, imgUrl, releaseDate, category, blogAuthor, description, blogContent }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('update `blog_info` set `imgUrl`=?,`releaseDate`=?,`category`=?,`blogAuthor`=?,`description`=?,`blogContent`=? where `blogTitle`=?', [imgUrl, releaseDate, category, blogAuthor, description || '', blogContent, blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'updateBlog failed');
    }
}
/**
 *
 * @param {*} blogTitle
 * 删除博客
 */
async function deleteBlog(blogTitle) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_info` where `blogTitle`=?', [blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'deleteBlog failed');
    }

}
/**
 * 
 * @param {*} category blog目录
 * @returns 对应分类的博客信息
 * 分页查询分类获取博客
 */
async function getBlogByCategory(category, pageNum, pageSize) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select * from `blog_info` where `category`=? limit ?,?', [category, (pageNum - 1) * pageSize, pageSize]);
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows
}
/**
 * 获取某分类博客数量
 * @returns 
 */
async function getBlogNumByCategory(category) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_info` where `category`=? ', [category]);
    closeConnection(conn)
    return rows[0]
}
/**
 * 获取每个分类的博客数量
 * @returns 分类与分类下博客的数量
 */
async function getCategories() {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select `category`,count(*) as count from `blog_info` group by `category`');
    closeConnection(conn)
    return rows
}
async function getBlogInfoByTitle(title = null) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select * from `blog_info` where `blogTitle`=?', [title]);
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows[0]
}
async function getAllBlogsSimple() {
    const conn = await getMysqlConnection()
    const [rows] = await conn.execute('select `id`,`blogTitle`,`category`,`releaseDate`,`imgUrl`,`description` from `blog_info` order by `releaseDate` desc');
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows
}
module.exports = {
    getBlogInfo,
    getBlogNum,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogInfoById,
    getBlogByCategory,
    getCategories,
    getBlogNumByCategory,
    getBlogInfoByTitle,
    getAllBlogsSimple,
    getMysqlConnection,
    closeConnection
}
