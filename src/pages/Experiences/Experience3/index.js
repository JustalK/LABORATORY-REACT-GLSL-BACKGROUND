/**
 * The default Experience
 * @module Experiences/Experience0
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette
} from '@react-three/postprocessing'

/**
 * @function Experience
 * The default Experience
 * @return {Object} Return the dom
 */
const Experience = () => {
  const { viewport } = useThree()
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.uTime += delta
  })

  return (
    <>
      <mesh>
        <planeGeometry
          args={[viewport.width / 2, viewport.height / 2, 32, 32]}
        />
        <meshBasicMaterial color="red" ref={ref} />
      </mesh>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}

export default Experience
