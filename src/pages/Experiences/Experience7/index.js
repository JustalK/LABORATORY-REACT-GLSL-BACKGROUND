/**
 * Draw a rectangle
 * @module Experiences/Experience3
 */
import React, { useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import kifsMaterial from '@components/Materials/Kifs'

/**
 * @function Experience
 * Draw a rectangle
 * @return {Object} Return the dom
 */
const Experience = () => {
  const { viewport } = useThree()
  const ref = useRef()
  const [iTexture] = useLoader(THREE.TextureLoader, ['./me.jpeg'])
  const { size } = useThree()

  useFrame((state, delta) => {
    ref.current.iTime += delta
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <kifsMaterial
          iResolution={[size.width, size.height, 1]}
          ref={ref}
          iTexture={iTexture}
        />
      </mesh>
    </>
  )
}

export default Experience
