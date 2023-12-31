import express from 'express'
import dotenv from 'dotenv'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import cookieParser from 'cookie-parser'

dotenv.config()

import * as fs from 'fs'
import * as path from 'path'
import addAPI from './API'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use('/api/forum/*', express.json())
  app.use(cookieParser())
  app.use('*', (_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
  })
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: {
        middlewareMode: true,
        cors: false,
      },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  addAPI(app)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let rende

      if (!isDev()) {
        rende = await import(ssrClientPath)
      } else {
        rende = await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
      }

      const { renderHTML, state } = rende

      const page = template
        .replace('<!--app-state-->', state)
        .replace(`<!--app-html-->`, await renderHTML(url))

      res.status(200).end(page)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
