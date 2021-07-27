/**
 * Draw a rectangle
 * @module Experiences/Experience3
 */
import React, { useRef, useEffect } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import centerMaterial from '@components/Materials/Center'

/**
 * @function Experience
 * Draw a rectangle
 * @return {Object} Return the dom
 */
const Experience = () => {
  const { viewport } = useThree()
  const ref = useRef()
  const [uTexture] = useLoader(THREE.TextureLoader, ['./3.png'])

  useEffect(() => {
    ref.current.uResolution = [viewport.width, viewport.height]
  })

  useFrame((state, delta) => {
    ref.current.uTime += delta
    ref.current.uResolution = [viewport.width, viewport.height]
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <centerMaterial ref={ref} uTexture={uTexture} />
      </mesh>
    </>
  )
}

export default Experience
