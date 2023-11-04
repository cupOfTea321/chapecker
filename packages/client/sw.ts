/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { routes } from './src/router/router'

declare const self: ServiceWorkerGlobalScope & typeof globalThis
const URLS = routes.map(el => el.path).filter(el => el === '*')
const CACHE_NAME = import.meta.env.PROD
  ? `${import.meta.env.BASE_URL}sw.js`
  : 'sw.js'

self.addEventListener('load', () => {
  navigator.serviceWorker
    .register('sw.js', { scope: '/' })
    .then(registration => {
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      )
    })
    .catch(error => {
      console.log('ServiceWorker registration failed: ', error)
    })
})

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()

      return fetch(fetchRequest).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches
          .open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseToCache))

        return response
      })
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(_name => {
            /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
          })
          .map(name => caches.delete(name))
      )
    })
  )
})
