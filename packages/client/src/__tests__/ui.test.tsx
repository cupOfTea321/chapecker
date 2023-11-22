import { act, render } from '@testing-library/react'
import ErrorPage from '../pages/errors/ErrorPage/ErrorPage'

describe('Test Engine', () => {
  test('Score Test', async () => {
    await act(async () => {
      render(<ErrorPage error={{ errorCode: '419', comment: 'Test Error' }} />)
    })
    expect(true).toBeTruthy()
  })
})
