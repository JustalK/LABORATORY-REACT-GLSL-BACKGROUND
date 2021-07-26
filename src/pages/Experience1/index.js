/**
 * The module managing the home page
 * @module Home
 */
import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

/**
 * @function Home
 * Create the home page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Home
 */
export default function Home() {
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
