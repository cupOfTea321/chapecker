import SoundMap from '../Engine/SoundMap'
import SpriteMap from '../Engine/SpriteMap'

export const enum SpriteType {
  player = 'player',
  playerExplosion = 'playerExplosion',
  enemy = 'enemy',
  enemyDamage = 'enemyDamage',
  enemyExplosion = 'enemyExplosion',
  playerProjectile = 'playerProjectile',
  enemyProjectile = 'enemyProjectile',
}

export const enum SoundType {
  fire = 'fire',
  kill = 'fill',
}

const spritesUrl = null

export const spriteMap = new SpriteMap({
  url: spritesUrl,
  spriteSize: '16',
  rows: 7,
  cols: 12,
  sprites: [
    {
      name: SpriteType.player,
      row: 0,
      col: 0,
      scale: 3,
    },
    {
      name: SpriteType.playerExplosion,
      row: [0, 1],
      col: [1, 2],
      scale: 3,
      animation: { frames: 4, duration: 2000 },
    },
    {
      name: `${SpriteType.enemy}_1`,
      row: 5,
      col: 0,
      scale: 3,
      animation: { frames: 2, duration: 700 },
    },
    {
      name: `${SpriteType.enemy}_2`,
      row: 4,
      col: 0,
      scale: 3,
      animation: { frames: 2, duration: 1000 },
    },
    {
      name: `${SpriteType.enemy}_3`,
      row: 2,
      col: 0,
      scale: 3,
      animation: { frames: 2, duration: 1500 },
    },
    {
      name: `${SpriteType.enemyDamage}_3`,
      row: 3,
      col: 0,
      scale: 3,
      animation: { frames: 2, duration: 500 },
    },
    {
      name: `${SpriteType.enemyProjectile}`,
      row: 6,
      col: 0,
      scale: 3,
    },
    {
      name: `${SpriteType.playerProjectile}`,
      row: 6,
      col: 1,
      scale: 3,
    },
    {
      name: `${SpriteType.enemyExplosion}`,
      row: [2, 3],
      col: [2, 3],
      scale: 3,
      animation: { frames: 5, duration: 1000 },
    },
  ],
})

export const soundMap = new SoundMap({
  sounds: [
    {
      name: SoundType.fire,
      url: fireSoundUrl,
    },
    {
      name: SoundType.kill,
      url: killSoundUrl,
    },
  ],
})
