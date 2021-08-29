/**
 * The default Experience
 * @module Experiences/Experience0
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

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
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.2, 1.0]}
          strength={[0.3, 1.0]}
          mode={GlitchMode.SPORADIC}
          active
          ratio={0.85}
        />
      </EffectComposer>
    </>
  )
}

export default Experience
