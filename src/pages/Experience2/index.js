/**
 * Draw a circle
 * @module Experiences/Experience2
 */
import React, { useRef, useEffect } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import circleMaterial from '@components/Materials/Circle'

/**
 * @function Experience
 * Draw a circle
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
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <circleMaterial ref={ref} uTexture={uTexture} />
      </mesh>
    </>
  )
}

export default Experience
