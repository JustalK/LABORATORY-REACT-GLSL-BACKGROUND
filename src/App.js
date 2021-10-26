import React, { Suspense } from 'react'
import Canvas from '@components/Canvas'
import { Route } from 'wouter'
import Experiences from '@pages/Experiences'
import Tutorials from '@pages/Tutorials'
import Arts from '@pages/Arts'

export default function App() {
  return (
    <>
      <div className="navigation">
        <div className="title">Experiences</div>
        <nav>
          <ul>
            {Object.keys(Experiences).map((e, index) => (
              <li key={index}>
                <a href={`/e${index + 1}`}>{e}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="title">Tutorials</div>
        <nav>
          <ul>
            {Object.keys(Tutorials).map((e, index) => (
              <li key={index}>
                <a href={`/t${index + 1}`}>{e}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="title">Arts</div>
        <nav>
          <ul>
            {Object.keys(Arts).map((e, index) => (
              <li key={index}>
                <a href={`/t${index + 1}`}>{e}</a>
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
              <Route key={index} path={`/e${index + 1}`}>
                <Suspense fallback={null}>
                  <Type />
                </Suspense>
              </Route>
            )
          })}
          {Object.keys(Tutorials).map((e, index) => {
            const Type = Tutorials[e]
            return (
              <Route key={index} path={`/t${index + 1}`}>
                <Suspense fallback={null}>
                  <Type />
                </Suspense>
              </Route>
            )
          })}
          {Object.keys(Arts).map((e, index) => {
            const Type = Arts[e]
            return (
              <Route key={index} path={`/t${index + 1}`}>
                <Suspense fallback={null}>
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
