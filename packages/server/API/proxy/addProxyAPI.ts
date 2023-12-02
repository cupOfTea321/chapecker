import { proxyURL } from '../url'
import type { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default function addProxyAPI(app: Express) {
  app.use(
    proxyURL,
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech/',
    })
  )
}
