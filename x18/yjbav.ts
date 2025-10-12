// import { kitty, req, createTestEnv } from 'utils'

export default class Yjbav implements Handle {
  getConfig() {
    return <Iconfig>{
      id: "yjbav",
      name: "一级棒",
      type: 1,
      nsfw: true,
      api: "https://yjb.one"
    }
  }
  async getCategory() {
    const table = [
      {
        "id": "21",
        "text": "JUU1JTlCJUJEJUU0JUJBJUE3JUU4JTg3JUFBJUU2JThCJThE"
      },
      {
        "id": "22",
        "text": "JUU3JUJEJTkxJUU3JUJBJUEyJUU0JUI4JUJCJUU2JTkyJUFE"
      },
      {
        "id": "24",
        "text": "JUU4JTg3JUFBJUU2JThCJThEJUU3JUIyJUJFJUU5JTgwJTg5"
      },
      {
        "id": "25",
        "text": "JUU1JTlCJUJEJUU0JUJBJUE3JUU0JUJDJUEwJUU1JUFBJTky"
      },
      {
        "id": "26",
        "text": "JUU2JTk3JUE1JUU2JTlDJUFDJUU2JTk3JUEwJUU3JUEwJTgx"
      },
      {
        "id": "27",
        "text": "JUU2JTk3JUE1JUU2JTlDJUFDJUU2JTlDJTg5JUU3JUEwJTgx"
      },
      {
        "id": "28",
        "text": "JUU2JTlDJTg5JUU3JUEwJTgxJUU3JUIyJUJFJUU5JTgwJTg5"
      },
      {
        "id": "34",
        "text": "JUU0JUJBJTlBJUU2JUI0JUIyJUU3JUIyJUJFJUU5JTgwJTg5"
      },
      {
        "id": "29",
        "text": "JUU1JUIwJThGJUU0JUJDJTk3JUU1JThGJUEzJUU1JTkxJUIz"
      },
      {
        "id": "30",
        "text": "JUU2JUFDJUE3JUU3JUJFJThFJUU3JUIyJUJFJUU5JTgwJTg5"
      },
      {
        "id": "31",
        "text": "JUU2JTg4JTkwJUU0JUJBJUJBJUU1JThBJUE4JUU2JUJDJUFC"
      },
      {
        "id": "32",
        "text": "JUU3JUJCJThGJUU1JTg1JUI4JUU0JUI4JTg5JUU3JUJBJUE3"
      },
      {
        "id": "33",
        "text": "QWklRTYlOTglOEUlRTYlOTglOUY="
      }
    ]
   function btoa(str: string) {
      // Base64 编码表
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let result = '';
      let i = 0;

      // 处理输入字符串
      while (i < str.length) {
        // 取出三个字符的 ASCII 码
        const c1 = str.charCodeAt(i++) & 0xff;
        const c2 = i < str.length ? str.charCodeAt(i++) & 0xff : 0;
        const c3 = i < str.length ? str.charCodeAt(i++) & 0xff : 0;

        // 将三个8位字节转换为四个6位值
        const u1 = c1 >> 2;
        const u2 = ((c1 & 0x3) << 4) | (c2 >> 4);
        const u3 = ((c2 & 0xf) << 2) | (c3 >> 6);
        const u4 = c3 & 0x3f;

        // 根据实际字符数量决定填充字符
        const padding1 = i > str.length ? '=' : '';
        const padding2 = i > str.length + 1 ? '=' : '';

        // 拼接结果
        result += base64Chars.charAt(u1) +
          base64Chars.charAt(u2) +
          (padding1 || base64Chars.charAt(u3)) +
          (padding2 || base64Chars.charAt(u4));
      }

      return result;
    }

    // 实现 atob 功能：将 Base64 字符串解码
    function atob(base64Str: string) {
      // 检查输入合法性
      if (!/^[A-Za-z0-9+/]+[=]{0,2}$/.test(base64Str)) {
        throw new Error('Invalid Base64 string');
      }

      // Base64 解码映射表
      const charMap = new Array(128).fill(-1);
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (let i = 0; i < 64; i++) {
        charMap[base64Chars.charCodeAt(i)] = i;
      }

      let result = '';
      let i = 0;
      const len = base64Str.length;

      while (i < len) {
        // 跳过填充字符
        while (i < len && base64Str.charAt(i) === '=') i++;
        if (i >= len) break;

        // 取出四个6位值
        const u1 = charMap[base64Str.charCodeAt(i++)];
        const u2 = charMap[base64Str.charCodeAt(i++)] || 0;
        const u3 = i < len ? charMap[base64Str.charCodeAt(i++)] : 0;
        const u4 = i < len ? charMap[base64Str.charCodeAt(i++)] : 0;

        // 转换为三个8位字节
        const c1 = (u1 << 2) | (u2 >> 4);
        const c2 = ((u2 & 0x0f) << 4) | (u3 >> 2);
        const c3 = ((u3 & 0x03) << 6) | u4;

        // 拼接结果（处理填充情况）
        result += String.fromCharCode(c1);
        if (u3 !== -1 && base64Str.charAt(i - 2) !== '=') {
          result += String.fromCharCode(c2);
        }
        if (u4 !== -1 && base64Str.charAt(i - 1) !== '=') {
          result += String.fromCharCode(c3);
        }
      }

      return result;
    }
    function customDecodeURIComponent(encodedStr: string) {
      let result = '';
      let i = 0;
      const len = encodedStr.length;

      while (i < len) {
        // 遇到 % 时，解析编码部分
        if (encodedStr.charAt(i) === '%') {
          // 检查是否有足够的字符（至少 % 后面跟两位）
          if (i + 2 >= len) {
            throw new URIError("URI malformed");
          }
          // 提取十六进制部分（两位）
          const hex = encodedStr.substring(i + 1, i + 3);
          if (!/^[0-9A-Fa-f]{2}$/.test(hex)) {
            throw new URIError("URI malformed");
          }
          // 转换为字节值
          const byte = parseInt(hex, 16);
          i += 3; // 跳过当前 %XX

          // 处理单字节字符（0-127）
          if (byte >= 0 && byte <= 0x7F) {
            result += String.fromCharCode(byte);
            continue;
          }

          // 处理双字节字符（110xxxxx 开头）
          if (byte >= 0xC0 && byte <= 0xDF) {
            if (i + 2 > len) throw new URIError("URI malformed");
            const hex2 = encodedStr.substring(i + 1, i + 3);
            if (encodedStr.charAt(i) !== '%' || !/^[0-9A-Fa-f]{2}$/.test(hex2)) {
              throw new URIError("URI malformed");
            }
            const byte2 = parseInt(hex2, 16);
            if ((byte2 & 0xC0) !== 0x80) throw new URIError("URI malformed");
            const codePoint = ((byte & 0x1F) << 6) | (byte2 & 0x3F);
            result += String.fromCharCode(codePoint);
            i += 3;
            continue;
          }

          // 处理三字节字符（1110xxxx 开头，如中文）
          if (byte >= 0xE0 && byte <= 0xEF) {
            if (i + 4 > len) throw new URIError("URI malformed");
            // 检查后续两个 %XX
            if (encodedStr.charAt(i) !== '%' || encodedStr.charAt(i + 3) !== '%') {
              throw new URIError("URI malformed");
            }
            const hex2 = encodedStr.substring(i + 1, i + 3);
            const hex3 = encodedStr.substring(i + 4, i + 6);
            if (!/^[0-9A-Fa-f]{2}$/.test(hex2) || !/^[0-9A-Fa-f]{2}$/.test(hex3)) {
              throw new URIError("URI malformed");
            }
            const byte2 = parseInt(hex2, 16);
            const byte3 = parseInt(hex3, 16);
            if ((byte2 & 0xC0) !== 0x80 || (byte3 & 0xC0) !== 0x80) {
              throw new URIError("URI malformed");
            }
            const codePoint = ((byte & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F);
            result += String.fromCharCode(codePoint);
            i += 6; // 跳过两个 %XX（6个字符）
            continue;
          }

          // 处理四字节字符（11110xxx 开头，如emoji）
          if (byte >= 0xF0 && byte <= 0xF7) {
            if (i + 6 > len) throw new URIError("URI malformed");
            if (encodedStr.charAt(i) !== '%' || encodedStr.charAt(i + 3) !== '%' || encodedStr.charAt(i + 6) !== '%') {
              throw new URIError("URI malformed");
            }
            const hex2 = encodedStr.substring(i + 1, i + 3);
            const hex3 = encodedStr.substring(i + 4, i + 6);
            const hex4 = encodedStr.substring(i + 7, i + 9);
            if (!/^[0-9A-Fa-f]{2}$/.test(hex2) || !/^[0-9A-Fa-f]{2}$/.test(hex3) || !/^[0-9A-Fa-f]{2}$/.test(hex4)) {
              throw new URIError("URI malformed");
            }
            const byte2 = parseInt(hex2, 16);
            const byte3 = parseInt(hex3, 16);
            const byte4 = parseInt(hex4, 16);
            if ((byte2 & 0xC0) !== 0x80 || (byte3 & 0xC0) !== 0x80 || (byte4 & 0xC0) !== 0x80) {
              throw new URIError("URI malformed");
            }
            const codePoint = ((byte & 0x07) << 18) | ((byte2 & 0x3F) << 12) | ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
            // 转换为UTF-16代理对
            const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800;
            const low = ((codePoint - 0x10000) % 0x400) + 0xDC00;
            result += String.fromCharCode(high, low);
            i += 9; // 跳过三个 %XX（9个字符）
            continue;
          }

          // 无效字节
          throw new URIError("URI malformed");
        }

        // 非编码字符，直接添加到结果
        result += encodedStr.charAt(i);
        i++;
      }

      return result;
    }
    return table.map(item => {
      const { id, text } = item
      const a = atob(text)
      const b = customDecodeURIComponent(a)
      return { id, text: b }
    })
  }
  async getHome() {
    const cate = env.get("category")
    const page = env.get("page")
    const url = `${env.baseUrl}/vodtype/${cate}-${page}/`
    const $ = kitty.load(await req(url))
    return $(".post-list .col-md-3").toArray().map<IMovie>(item => {
      const a = $(item).find("a")
      const img = a.find("img")
      const id = a.attr("href") ?? ""
      let cover = img.attr("data-original") ?? ""
      cover = `${env.baseUrl}${cover}`
      const title = img.attr("alt") ?? ""
      return { id, cover, title }
    })
  }
  async getDetail() {
    const id = env.get<string>("movieId")
    const url = `${env.baseUrl}${id}`
    const html = await req(url)
    const $ = kitty.load(html)
    const m3u8 = kitty.utils.getM3u8WithStr(html)
    const title = $(".breadcrumb").text().trim()
    return <IMovie>{
      id,
      title,
      playlist: [
        {
          title: "默认", videos: [
            { text: "😍播放", url: m3u8 }
          ]
        }
      ]
    }
  }
}

// TEST
// const env = createTestEnv("https://yjb.one")
// const call = new Yjbav();
// (async ()=> {
//   const cates = await call.getCategory()
//   env.set("category", cates[0].id)
//   env.set("page", 1)
//   const home = await call.getHome()
//   env.set("movieId", home[0].id)
//   const detail = await call.getDetail()
//   debugger
// })()