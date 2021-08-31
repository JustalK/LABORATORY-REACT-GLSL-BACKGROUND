/**
 * The default Experience
 * @module Experiences/Experience0
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import backgroundFogMaterial from '@components/Materials/BackgroundFog'

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
      <mesh
        onPointerMove={(e) => {
          ref.current.uMouse = e.intersections[0].uv
        }}
      >
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <backgroundFogMaterial
          color="red"
          ref={ref}
          uResolution={[viewport.width, viewport.height]}
        />
      </mesh>
    </>
  )
}

export default Experience
