import { spawn } from 'node:child_process'
import { once } from 'node:events'

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const url = 'http://127.0.0.1:4173/'
const widths = [1440, 1024, 768, 430, 390]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForPreview() {
  for (let i = 0; i < 30; i += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      await wait(500)
    }
  }
  throw new Error('Preview server did not become ready')
}

async function getDebuggerUrl(port) {
  for (let i = 0; i < 30; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json`)
      const data = await response.json()
      const page = data.find((entry) => entry.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      await wait(250)
    }
  }
  throw new Error(`Chrome debugger port ${port} did not become ready`)
}

async function checkWidth(width, index) {
  const port = 9300 + index
  const chromeProcess = spawn(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--window-size=${width},1200`,
    'about:blank',
  ])

  try {
    const wsUrl = await getDebuggerUrl(port)
    const ws = new WebSocket(wsUrl)
    await once(ws, 'open')
    let id = 0
    const pending = new Map()
    ws.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data)
      if (payload.id && pending.has(payload.id)) {
        pending.get(payload.id)(payload)
        pending.delete(payload.id)
      }
    })
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        id += 1
        pending.set(id, resolve)
        ws.send(JSON.stringify({ id, method, params }))
      })

    await send('Page.enable')
    await send('Runtime.enable')
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1200,
      deviceScaleFactor: 1,
      mobile: width < 640,
    })
    await send('Page.navigate', { url })
    await wait(3200)
    const result = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const root = document.documentElement;
        const menu = document.querySelector('.menu-button');
        const grid = document.querySelector('.masonry-grid');
        const productGrid = document.querySelector('.product-grid');
        const catalogGrid = document.querySelector('.catalog-grid');
        const socialGrid = document.querySelector('.social-grid');
        const firstDecorGrid = document.querySelector('.decor-section .decor-grid');
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        const firstCard = document.querySelector('.masonry-grid .media-card');
        const heroTitle = document.querySelector('.hero h1');
        const hero = document.querySelector('.hero');
        const langButtons = document.querySelectorAll('.language-switcher button');
        langButtons[3]?.click();
        return new Promise((resolve) => setTimeout(() => {
          resolve({
            requestedWidth: ${width},
            innerWidth,
            clientWidth: root.clientWidth,
            scrollWidth: root.scrollWidth,
            hasOverflow: root.scrollWidth > root.clientWidth + 1,
            menuDisplay: menu ? getComputedStyle(menu).display : 'missing',
            projectColumns: grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0,
            productColumns: productGrid ? getComputedStyle(productGrid).gridTemplateColumns.split(' ').length : 0,
            catalogColumns: catalogGrid ? getComputedStyle(catalogGrid).gridTemplateColumns.split(' ').length : 0,
            socialColumns: socialGrid ? getComputedStyle(socialGrid).gridTemplateColumns.split(' ').length : 0,
            decorColumns: firstDecorGrid ? getComputedStyle(firstDecorGrid).gridTemplateColumns.split(' ').length : 0,
            testimonialColumns: testimonialsGrid ? getComputedStyle(testimonialsGrid).gridTemplateColumns.split(' ').length : 0,
            decorCount: document.querySelectorAll('.decor-section .media-card').length,
            firstCardColumnEnd: firstCard ? getComputedStyle(firstCard).gridColumnEnd : 'missing',
            heroTitleSize: heroTitle ? getComputedStyle(heroTitle).fontSize : 'missing',
            heroMinHeight: hero ? getComputedStyle(hero).minHeight : 'missing',
            videoSources: [...document.querySelectorAll('.video-card video')].map((video) => video.currentSrc),
            whatsappHref: document.querySelector('.support-button--whatsapp')?.href,
            instagramHref: [...document.querySelectorAll('.social-link')].find((item) => item.textContent.includes('Instagram'))?.href || '',
            facebookHref: [...document.querySelectorAll('.social-link')].find((item) => item.textContent.includes('Facebook'))?.href || '',
            lang: root.lang,
            dir: root.dir,
            sampleNav: [...document.querySelectorAll('.nav-links button')].slice(0, 3).map((button) => button.textContent.trim()),
          });
        }, 150));
      })()`,
      awaitPromise: true,
    })
    ws.close()
    const value = result.result?.result?.value
    if (!value) {
      throw new Error(JSON.stringify(result, null, 2))
    }
    return value
  } finally {
    chromeProcess.kill()
  }
}

const preview = spawn('cmd.exe', ['/c', 'npm.cmd', 'run', 'preview', '--', '--port', '4173'], {
  cwd: process.cwd(),
  stdio: 'ignore',
})

try {
  await waitForPreview()
  const results = []
  for (let i = 0; i < widths.length; i += 1) {
    results.push(await checkWidth(widths[i], i))
  }
  console.log(JSON.stringify(results, null, 2))
} finally {
  preview.kill()
}
