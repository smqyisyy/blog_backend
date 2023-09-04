const mysql = require("mysql2/promise")
// 读取数据库连接的配置文件
const mysqlConfig = require("../config.json")
// 单例模式
let connection = null
async function getMysql() {
    if (connection) {
        return connection
    }
    connection = await mysql.createConnection({
        ...mysqlConfig
    })
    return connection
}

/**
 * 分页查询博客信息
 * @param {*} pageNum 页码
 * @param {*} pageSize 一页的大小
 * @returns 
 */
async function getBlogInfo(pageNum, pageSize) {
    const conn = await getMysql()
    const [rows, fields] = await conn.execute('select * from `blog_info` limit ?,?', [(pageNum - 1) * pageSize, pageSize]);
    // console.log(rows);
    return rows
}
/**
 * 获取博客数量
 * @returns 
 */
async function getBlogNum() {
    const conn = await getMysql()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_info`');
    return rows[0]
}
async function addBlog({ blogTitle, imgUrl, releaseDate, tag, blogAuthor, blogContent }) {
    const conn = await getMysql()
    try {
        await conn.execute('insert into `blog_info` (`blogTitle`,`imgUrl`,`releaseDate`,`tag`,`blogAuthor`,`blogContent`) values(?,?,?,?,?,?)', [blogTitle, imgUrl, releaseDate, tag, blogAuthor, blogContent]);
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