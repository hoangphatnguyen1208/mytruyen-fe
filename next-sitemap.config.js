module.exports = {
    siteUrl: process.env.SITE_URL || "https://mytruyen.vercel.app",
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ["/admin/*"],
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: "daily",
            priority: 0.7,
            lastmod: new Date().toISOString()
        }
    },
    additionalPaths: async (config) => {
        let page = 1
        const paths = []
        while (true) {
            console.log("Fetching page", page)
            const res = await fetch(
                `https://backend.metruyencv.com/api/books?page=${page}&limit=200`
            )
            if (!res.ok) {
                console.error("Failed to fetch data", res.statusText)
                break
            }
            const data = await res.json()
            if (data.pagination.next === null) {
                break
            }
            paths.push(
                ...data.data.map((item) => {
                    return {
                        loc: `/truyen/${item.slug}`,
                        changefreq: "daily",
                        priority: 0.7,
                        lastmod: new Date().toISOString()
                    }
                })
            )
            page++
        }
        return paths
    }
}
