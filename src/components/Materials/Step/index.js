import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class StepMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uResolution: {
          value: new THREE.Vector2()
        }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vec3 pos = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
      }`,
      fragmentShader: `
      uniform vec2 uResolution;
      varying vec2 vUv;
      void main()  {
          vec2 newUV = vUv;

          vec2 borders = step(vec2(0.1), vUv);
          vec2 tborders = step(vec2(0.1), 1.0 - vUv);

          gl_FragColor = vec4(vec3(borders.x * borders.y * tborders.x * tborders.y), 1.0);
      }
      `
    })
  }

  get uResolution() {
    return this.uniforms.uResolution.value
  }

  set uResolution(v) {
    return (this.uniforms.uResolution.value = v)
  }
}

extend({ StepMaterial })
