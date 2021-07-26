import React, { Suspense } from 'react'
import Canvas from '@components/Canvas'
import { Route } from 'wouter'
import Experiences from '@pages'

export default function App() {
  return (
    <>
      <div className="navigation">
        <nav>
          <ul>
            {Object.keys(Experiences).map((e, index) => (
              <li key={index}>
                <a href={`/${index + 1}`}>{e}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Canvas>
        <Suspense fallback={null}>
          {Object.keys(Experiences).map((e, index) => {
            const Type = Experiences[e]
            return (
              <Route key={index} path={`/${index + 1}`}>
                <Suspense fallback={<p>Loading...</p>}>
                  <Type />
                </Suspense>
              </Route>
            )
          })}
        </Suspense>
      </Canvas>
    </>
  )
}
