/**
 * Creating a noise materials
 * @module Experiences/Experience1
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import noiseMaterial from '@components/Materials/Noise'
/**
 * @function Experience
 * Creating a noise materials
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
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <noiseMaterial ref={ref} />
      </mesh>
    </>
  )
}

export default Experience
