/**
 * The default Experience
 * @module Experiences/Experience0
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

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
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <meshBasicMaterial color="red" ref={ref} />
      </mesh>
    </>
  )
}

export default Experience
