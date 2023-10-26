const mysql = require("mysql2/promise")
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
 * 获取博客数量
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
async function addBlog({ blogTitle, imgUrl, releaseDate, categorie, blogAuthor, blogContent }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('insert into `blog_info` (`blogTitle`,`imgUrl`,`releaseDate`,`categorie`,`blogAuthor`,`blogContent`) values(?,?,?,?,?,?)', [blogTitle, imgUrl, releaseDate, categorie, blogAuthor, blogContent]);
        closeConnection(conn)
    }
    catch (e) {
        console.log(e);
        throw new Error("插入数据失败")
    }
}
async function updateBlog({ blogTitle, imgUrl, releaseDate, categorie, blogAuthor, blogContent, }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('update `blog_info` set `imgUrl`=?,`releaseDate`=?,`categorie`=?,`blogAuthor`=?,`blogContent`=? where `blogTitle`=?', [imgUrl, releaseDate, categorie, blogAuthor, blogContent, blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        console.log(e);
        throw new Error("更新数据失败")
    }
}
async function deleteBlog(blogTitle) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_info` where `blogTitle`=?', [blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        console.log(e);
        throw new Error("删除数据失败")
    }

}
module.exports = {
    getBlogInfo,
    getBlogNum,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogInfoById
}