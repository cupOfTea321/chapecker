import GamePage from '../GamePage'
import { GameEngine } from './GameEngine'
import { act, render } from '@testing-library/react'
// import Lives from './Lives'
// import Score from './Score'

// jest.mock('./Canvas')

describe('Test Engine', () => {
  let ge: GameEngine

  let _score: number

  //   beforeEach(async () => {
  //     await act(async () => {
  //       render(<GamePage />)
  //     })
  //   })

  // beforeEach(() => {
  //     const canvas = document.createElement('canvas');
  //     console.log(canvas);
  //     const ctx = canvas.getContext("2d");

  //     // console.log("ctx", ctx);

  //     _score = 0;

  //     if (ctx) {
  //         ge = new GameEngine(
  //             {
  //                 ctx: ctx,
  //                 ref: canvas,
  //                 debug: false,
  //                 onScoreUpdate: (score) => {
  //                     _score = score;
  //                 },
  //                 onGameOver: (arg) => {
  //                     console.log(arg)
  //                 }
  //             }
  //         )
  //     }

  //     console.log("console.log before each test");
  // })

  //   beforeAll(() => {
  //     jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 42)
  //   })

  test('Score Test', async () => {
    // console.log(ge);
    if (ge) {
      expect(_score).toBe(0)
      ge.addScore(0)
      expect(_score).toBe(0)
    } else {
      expect(false).toBeTruthy()
    }

    // const scoreGetter = () => Reflect.get(ge, 'score') as Score
    // const livesGetter = () => Reflect.get(ge, 'lives') as Lives

    // expect(scoreGetter().getScore()).toBe(0)
    // expect(livesGetter().isAlive()).toBeTruthy()
    expect(true).toBeTruthy()
  })

  //   test('Retry Test', async () => {
  //     const scoreGetter = () => Reflect.get(ge, 'score') as Score
  //     const livesGetter = () => Reflect.get(ge, 'lives') as Lives

  //     expect(scoreGetter().getScore()).toBe(0)
  //     expect(livesGetter().isAlive()).toBeTruthy()
  //   })
})
