/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { privateRoutes, publilRoutes } from './src/router/router'

declare const self: ServiceWorkerGlobalScope & typeof globalThis
const protectedRoutes = Object.values(privateRoutes).map(el => el.path)
const publicRoutes = Object.values(publilRoutes).map(el => el.path)
const URLS = protectedRoutes.concat(publicRoutes).filter(el => el === '*')
const CACHE_NAME = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}sw.js`
  : 'sw.js'

self.addEventListener('install', async ({ waitUntil }) => {
  try {
    const cache = await waitUntil(caches.open(CACHE_NAME))
    console.log('Opened cache')
    return (cache as unknown as Cache).addAll(URLS)
  } catch (err) {
    console.log(err)
    throw err
  }
})

self.addEventListener('fetch', async ({ respondWith, request }) =>
  respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = request.clone()

      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches
          .open(CACHE_NAME)
          .then(cache => cache.put(request, responseToCache))

        return response
      })
    })
  )
)

self.addEventListener('activate', async ({ waitUntil }) => {
  const cacheNames = await waitUntil(caches.keys())
  return Promise.all(
    (cacheNames as unknown as string[])
      .filter(_name => {
        /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
      })
      .map(name => caches.delete(name))
  )
})
