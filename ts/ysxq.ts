
import { Handle, Iconfig, IHomeContentItem, IHomeData, IMovie, env, kitty, req } from "types";

export default class Ysxq implements Handle {
  getConfig() {
    return <Iconfig>{
      id: "ysxq",
      name: "影视星球",
      type: 1,
      api: "https://gist.githubusercontent.com/teng662858/ysxq/raw/ysxq.json",
    }
  }

  async getCategory() {
    return [
      { text: "首页", id: "/" },
      { text: "电影", id: "1" },
      { text: "电视剧", id: "2" },
      { text: "综艺", id: "3" },
      { text: "动漫", id: "4" }
    ]
  }

  async getHome() {
    const cate = env.get<string>('category')
    const page = env.get<number>('page') ?? 1

    if (cate == "/") {
      const $ = kitty.load(await req(`${env.baseUrl}`))
      const cards = $(".module").toArray().map<IHomeContentItem | null>(item => {
        const title = $(item).find(".module-title span").text().trim()
        const list = $(item).find(".module-item").toArray()
        const videos = list.map(sub => {
          const a = $(sub).find("a")
          return <IMovie>{
            id: a.attr("href") ?? "",
            cover: $(sub).find("img").attr("data-original") ?? "",
            title: $(sub).find(".module-item-title").text().trim(),
            remark: $(sub).find(".module-item-note").text().trim()
          }
        })
        return { type: "card", title, videos }
      }).filter(i => !!i)

      return <IHomeData>{
        type: "complex",
        data: [
          { type: "markdown", extra: { markdown: "## 🎬 欢迎使用影视星球\n\n影视源来自 ysxq.cc" } },
          ...cards
        ]
      }
    }

    const url = `${env.baseUrl}/vodshow/${cate}--------${page}---.html`
    const html = await req(url)
    const $ = kitty.load(html)
    return $(".module-item").toArray().map<IMovie>(item => {
      const a = $(item).find("a")
      return <IMovie>{
        id: a.attr("href") ?? "",
        cover: $(item).find("img").attr("data-original") ?? "",
        title: $(item).find(".module-item-title").text().trim(),
        remark: $(item).find(".module-item-note").text().trim()
      }
    })
  }

  async getDetail() {
    const id = env.get<string>('movieId')
    const html = await req(`${env.baseUrl}${id}`)
    const $ = kitty.load(html)

    const playlist = $(".module-play-list").toArray().map(item => {
      const title = $(item).find(".module-tab-item").text().trim() || "播放线路"
      const videos = $(item).find("a").toArray().map(a => ({
        text: $(a).text().trim(),
        id: $(a).attr("href") ?? ""
      }))
      return { title, videos }
    })

    return <IMovie>{ playlist }
  }

  async getSearch() {
    const wd = env.get<string>('keyword')
    const page = env.get<number>('page') ?? 1
    const url = `${env.baseUrl}/vodsearch/${encodeURIComponent(wd)}----------${page}---.html`
    const html = await req(url)
    const $ = kitty.load(html)

    return $(".module-item").toArray().map<IMovie>(item => {
      const a = $(item).find("a")
      return <IMovie>{
        id: a.attr("href") ?? "",
        cover: $(item).find("img").attr("data-original") ?? "",
        title: $(item).find(".module-item-title").text().trim(),
        remark: $(item).find(".module-item-note").text().trim()
      }
    })
  }

  async parseIframe() {
    return kitty.utils.getM3u8WithIframe(env)
  }
}
