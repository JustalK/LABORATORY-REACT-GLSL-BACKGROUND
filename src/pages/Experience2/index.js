/**
 * The module managing the home page
 * @module Home
 */
import React from 'react'

/**
 * @function Home
 * Create the home page with all the slide and elements of this component inside
 * @param {function} loadedPage The function to call once the page is loaded
 * @return {Object} Return the dom of the Home
 */
export default function Home() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="blue" position={[0, 0, 5]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshPhongMaterial />
      </mesh>
    </>
  )
}
