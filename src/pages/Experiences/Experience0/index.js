/**
 * The default Experience
 * @module Experiences/Experience0
 */
import React, { useRef } from 'react'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import defaultMaterial from '@components/Materials/Default'

/**
 * @function Experience
 * The default Experience
 * @return {Object} Return the dom
 */
const Experience = () => {
  const { viewport } = useThree()
  const ref = useRef()
  const [iTexture] = useLoader(THREE.TextureLoader, ['./bg.jpeg'])
  if (iTexture) {
    iTexture.wrapS = THREE.RepeatWrapping
    iTexture.wrapT = THREE.RepeatWrapping
  }
  const { size } = useThree()

  useFrame((state, delta) => {
    ref.current.iTime += delta
  })

  return (
    <>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <voronoiMaterial
          iResolution={[size.width, size.height, 1]}
          ref={ref}
          iTexture={iTexture}
        />
      </mesh>
    </>
  )
}

export default Experience
