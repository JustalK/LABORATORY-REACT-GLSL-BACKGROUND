/**
 * Creating a noise materials
 * @module Experiences/Experience2
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import fireMaterial from '@components/Materials/Fire'
/**
 * @function Experience
 * Creating a fire materials
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
        <fireMaterial ref={ref} />
      </mesh>
    </>
  )
}

export default Experience
