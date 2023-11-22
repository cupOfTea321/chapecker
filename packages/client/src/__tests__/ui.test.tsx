import { act, fireEvent, render, screen } from '@testing-library/react'
import ErrorPage from '../pages/errors/ErrorPage/ErrorPage'

describe('Test Engine', () => {
  test('Score Test', async () => {
    await act(async () => {
      render(<ErrorPage error={{ errorCode: '419', comment: 'Test Error' }} />)
    })

    const button = screen.getByText('На глвную')
    fireEvent.click(button)

    console.log(location.pathname)

    expect(false).toBeTruthy()
  })
})
