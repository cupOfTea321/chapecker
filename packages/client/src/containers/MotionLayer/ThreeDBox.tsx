import React, { useEffect } from 'react'
import MotionLayer from './motionLayer'
import bem from 'bem-ts'
import layer_1 from '../../assets/layer-1.webp'
import layer_2 from '../../assets/layer-2.webp'
import layer_4 from '../../assets/layer-4.webp'
import layer_5 from '../../assets/layer-5.webp'
import { Box } from '@mui/material'
import './styles.scss'

const cn = bem('layer')

const ThreeDBox = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const zoomListenerFunc = (e: MouseEvent) => {
      Object.assign(document.documentElement, {
        style: `
                    --move-x: ${
                      (e.clientX - window.innerWidth / 2) * -0.001
                    }deg;
                    --move-y: ${(e.clientY - window.innerHeight / 2) * 0.01}deg;
                    `,
      })
    }

    document.addEventListener('mousemove', zoomListenerFunc)
    return () => document.removeEventListener('mousemove', zoomListenerFunc)
  }, [])

  return (
    <Box className={cn('container')}>
      <MotionLayer
        layerURL={layer_1}
        className={cn('item ') + cn('1')}></MotionLayer>
      <MotionLayer
        layerURL={layer_2}
        className={cn('item ') + cn('2')}></MotionLayer>
      <div className={cn('3')}>{children}</div>
      <MotionLayer
        layerURL={layer_4}
        className={cn('item ') + cn('4')}></MotionLayer>
      <MotionLayer
        layerURL={layer_5}
        className={cn('item ') + cn('5')}></MotionLayer>
    </Box>
  )
}

export default ThreeDBox
