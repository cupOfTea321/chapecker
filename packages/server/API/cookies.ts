import { Request } from 'express'
import { proxyURL } from './url'
import { responseInterceptor } from 'http-proxy-middleware'

export async function getUser(cookie: string | undefined) {
  const res = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
    headers: {
      accept: 'application/json, text/plain, */*',
      cookie: `${cookie}`,
    },
    body: null,
    method: 'GET',
  })
  return await res.json()
}

export const setUserIDCookieOnGetUser = responseInterceptor(
  async (responseBuffer, _, req, res) => {
    const url = req.url
    const response = responseBuffer.toString('utf8')

    if (url !== proxyURL + '/auth/user') return response

    try {
      const x = await getUser(req.headers.cookie)
      const { id } = x
      res.setHeader('Set-Cookie', `userid=${id || ''}; HttpOnly; Path=/`)
    } catch (e) {
      res.setHeader('Set-Cookie', `userid=`)
      console.log(e)
    }

    return response
  }
)

export async function getUserId(req: Request): Promise<number> {
  const x = await getUser(req.headers.cookie)
  return x.id
}
