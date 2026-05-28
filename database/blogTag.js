// 此文件主要用于操作文件标签表
const mysql = require("mysql2/promise")
const logger = require("../utils/logger")
// 读取数据库连接的配置文件
const mysqlConfig = require("../config.json")
const { getBlogInfoByTitle } = require('./index.js');
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
 * 获取某标签博客数量
 * @returns 
 */
async function getBlogNumByTag(tag) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select count(*) as totalBlog from `blog_tag` where `tag`=? ', [tag]);
    closeConnection(conn)
    return rows[0]
}

/**
 * 获取某标签下博客对应信息
 * @returns 
 */
async function getBlogByTag(tag, pageNum, pageSize) {
    const conn = await getMysqlConnection()
    const [rows, fields] = await conn.execute('select * from `blog_tag` where `tag`=? limit ?,?', [tag, (pageNum - 1) * pageSize, pageSize]);
    const updatedRows = await Promise.all(rows.map(async (row) =>
        await getBlogInfoByTitle(row.blogTitle)
    ));
    closeConnection(conn)
    return updatedRows
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
 * 插入标签
 */
async function addBlogTag({ blogTitle, tags }) {
    const conn = await getMysqlConnection()
    try {
        for (const tag of tags) {
            await conn.execute('insert into `blog_tag` (`blogTitle`,`tag`) values(?,?)', [blogTitle, tag]);
        }
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'addBlogTag failed');
    }
}
/**
 *
 * @param {*} param
 * 更新标签相关的博客
 */
async function updateBlogTag({ blogTitle, tags }) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_tag` where `blogTitle`=?', [blogTitle]);
        for (const tag of tags) {
            await conn.execute('insert into `blog_tag` (`blogTitle`,`tag`) values(?,?)', [blogTitle, tag]);
        }
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'updateBlogTag failed');
    }
}
/**
 *
 * @param {*} blogTitle
 * 从标签表删除博客
 */
async function deleteBlogTag(blogTitle) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('delete from `blog_tag` where `blogTitle`=?', [blogTitle]);
        closeConnection(conn)
    }
    catch (e) {
        logger.error({ err: e }, 'deleteBlogTag failed');
        // throw new Error("删除数据失败")
    }

}
async function renameTag(oldTag, newTag) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('UPDATE `blog_tag` SET `tag`=? WHERE `tag`=?', [newTag, oldTag]);
        closeConnection(conn)
    } catch (e) {
        logger.error({ err: e }, 'renameTag failed');
        closeConnection(conn)
    }
}

async function deleteTag(tag) {
    const conn = await getMysqlConnection()
    try {
        await conn.execute('DELETE FROM `blog_tag` WHERE `tag`=?', [tag]);
        closeConnection(conn)
    } catch (e) {
        logger.error({ err: e }, 'deleteTag failed');
        closeConnection(conn)
    }
}

module.exports = {
    getBlogByTag,
    getBlogNumByTag,
    getTags,
    addBlogTag,
    updateBlogTag,
    deleteBlogTag,
    renameTag,
    deleteTag
}