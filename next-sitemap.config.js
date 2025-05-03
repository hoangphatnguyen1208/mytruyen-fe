module.exports = {
    siteUrl: process.env.SITE_URL || "https://mytruyen.vercel.app",
    generateRobotsTxt: true,
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/admin/*"],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: "daily",
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }
    },
}
