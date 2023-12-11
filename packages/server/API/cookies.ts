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
  return res.json()
}

export const setUserIDCookieOnGetUser = responseInterceptor(
  async (responseBuffer, _, req, res) => {
    const url = req.url
    const response = responseBuffer.toString('utf8')

    if (url !== proxyURL + '/auth/user') return response

    try {
      const { id } = await getUser(req.headers.cookie)
      res.setHeader('Set-Cookie', `userid=${id || ''}; HttpOnly; Path=/`)
    } catch (e) {
      res.setHeader('Set-Cookie', `userid=`)
      console.log(e)
    }

    return response
  }
)

export async function getUserIdWithPracticumCookie(
  req: Request
): Promise<number> {
  const x = await getUser(req.headers.cookie)
  return x.id
}

export async function getUserId(req: Request): Promise<number> {
  const { cookie } = req.headers
  const res = cookie?.match(/userid=.*/)
  if (res) return Number(res[0].split(';')[0].split('=')[1])
  return getUserIdWithPracticumCookie(req)
}
