const mysql = require("mysql2/promise")
// 读取数据库连接的配置文件
const mysqlConfig = require("../config.json")
// 单例模式
// let connection = null
const pool=mysql.createPool(mysqlConfig)
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
            console.error('Error closing database connection: ', endErr);
            return;
        }
        console.log('Database connection closed');
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
    const [rows, fields] = await conn.execute('select * from `blog_info` limit ?,?', [(pageNum - 1) * pageSize, pageSize]);
    rows.forEach(row => {
        row.releaseDate = row.releaseDate.toLocaleDateString();
    });
    closeConnection(conn)
    return rows
}
/**
 * 获取博客数量
 * @returns 
 */
async function getBlogNum() {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_info`');
    closeConnection(conn)
    return rows[0]
}
async function addBlog({ blogTitle, imgUrl, releaseDate, tag, blogAuthor, blogContent }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('insert into `blog_info` (`blogTitle`,`imgUrl`,`releaseDate`,`tag`,`blogAuthor`,`blogContent`) values(?,?,?,?,?,?)', [blogTitle, imgUrl, releaseDate, tag, blogAuthor, blogContent]);
        closeConnection(conn)
    }
    catch {
        throw new Error("插入数据失败")
    }
}
module.exports = {
    getBlogInfo,
    getBlogNum,
    addBlog
}