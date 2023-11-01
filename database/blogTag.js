// 此文件主要用于操作文件标签表
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
 * 获取某标签下博客数量
 * @returns 
 */
async function getBlogNumByTag(tag) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_tag` where `tag`=?', [tag]);
    closeConnection(conn)
    return rows[0]
}
/**
 * 获取每个标签的博客数量
 * @returns 标签与标签下博客的数量
 */
async function getTags() {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select `tag`,count(*) as count from `blog_tag` group by `tag`');
    closeConnection(conn)
    return rows
}
/**
 * 
 * @param {*} param
 * 插入分类
 */
async function addBlogTag({ blogTitle, tags }) {
    const conn = await getMysqlConnection()
    try {
        tags.forEach(async (tag) => {
            await conn.execute('insert into `blog_tag` (`blogTitle`,`tag`) values(?,?)', [blogTitle, tag]);

        });
        closeConnection(conn)
    }
    catch (e) {
        console.log(e);
        // throw new Error("插入数据失败")
    }
}
/**
 * 
 * @param {*} param
 * 更新分类相关的博客
 */
async function updateBlogTag({ blogTitle, tags }) {
    const conn = await getMysqlConnection()
    try {
        tags.forEach(async (tag) => {
            await conn.execute('update `blog_tag` set `tag`=? where `blogTitle`=?', [tag, blogTitle]);
            closeConnection(conn)
        });
    }
    catch (e) {
        console.log(e);
        // throw new Error("更新数据失败")
    }
}
/**
 * 
 * @param {*} blogTitle 
 * 删除博客
 */
async function deleteBlogTag(blogTitle) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_tag` where `blogTitle`=?', [blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        console.log(e);
        // throw new Error("删除数据失败")
    }

}
module.exports = {
    getBlogNumByTag,
    getTags,
    addBlogTag,
    updateBlogTag,
    deleteBlogTag
}