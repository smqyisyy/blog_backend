const logger = require('./logger')

// 使用 ip-api.com 查询 IP 地理位置（免费，支持中文）
async function queryIpLocation(ip) {
    // 本地IP和内网IP不查询
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
        return { province: '本地', city: '本地' }
    }
    try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,country,regionName,city`, {
            signal: controller.signal
        })
        clearTimeout(timeout)
        const data = await res.json()
        if (data.status === 'success') {
            return {
                province: data.regionName || data.country || '未知',
                city: data.city || '未知'
            }
        }
    } catch (e) {
        logger.warn({ err: e.message, ip }, 'IP地理位置查询失败')
    }
    return { province: '未知', city: '未知' }
}

module.exports = { queryIpLocation }
