/**
 * Draw a rectangle
 * @module Experiences/Experience3
 */
import React, { useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import rayMarchingMultipleMaterial from '@components/Materials/RayMarchingMultiple'

/**
 * @function Experience
 * Draw a rectangle
 * @return {Object} Return the dom
 */
const Experience = () => {
  const { viewport } = useThree()
  const ref = useRef()
  const [uTexture] = useLoader(THREE.TextureLoader, ['./3.png'])
  const { size } = useThree()

  useFrame((state, delta) => {
    ref.current.iTime += delta
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <rayMarchingMultipleMaterial
          iResolution={[size.width, size.height, 1]}
          ref={ref}
          uTexture={uTexture}
        />
      </mesh>
    </>
  )
}

export default Experience
