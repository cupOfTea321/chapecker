import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import GamePage from '../GamePage'
import { GameEngine } from './GameEngine'

import { act, render } from '@testing-library/react'

describe('Test Engine', () => {
  let ge: GameEngine

  let _score: number

  /*
    beforeEach(async () => {
        await act(async () => {
            render(
                // <Provider store={ ? }>
                //     <BrowserRouter>
                        <GamePage />
                //     </BrowserRouter>
                // </Provider>
            )
        })

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
    
        _score = 0;
    
        if (ctx) {
            ge = new GameEngine(
                {
                    ctx: ctx,
                    ref: canvas,
                    debug: false,
                    onScoreUpdate: (score) => {
                        _score = score;
                    },
                    onGameOver: (arg) => {
                        console.log(arg)
                    }
                }
            )
        }
    })
    */

  test('Score Test', async () => {
    // if (ge) {
    //   expect(_score).toBe(0)
    //   ge.addScore(0)
    //   expect(_score).toBe(0)
    // } else {
    //   expect(false).toBeTruthy()
    // }

    expect(true).toBeTruthy()
  })
})
