-- 访问记录表
CREATE TABLE IF NOT EXISTS `blog_visit` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `blogId` INT DEFAULT NULL,
    `ip` VARCHAR(50) NOT NULL,
    `path` VARCHAR(255) DEFAULT '/',
    `province` VARCHAR(50) DEFAULT '',
    `city` VARCHAR(50) DEFAULT '',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_blogId` (`blogId`),
    INDEX `idx_createdAt` (`createdAt`),
    INDEX `idx_ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 给 blog_info 表添加阅读量字段
ALTER TABLE `blog_info` ADD COLUMN `views` INT DEFAULT 0;

-- 如果表已存在但没有省份城市字段，执行下面的语句
ALTER TABLE `blog_visit` ADD COLUMN `province` VARCHAR(50) DEFAULT '';
ALTER TABLE `blog_visit` ADD COLUMN `city` VARCHAR(50) DEFAULT '';
