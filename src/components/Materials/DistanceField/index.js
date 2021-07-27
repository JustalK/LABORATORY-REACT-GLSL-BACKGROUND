import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class DistanceFieldMaterial extends THREE.ShaderMaterial {
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
          vec2 st = vUv * uResolution;
          vec2 pos = 0.5 * uResolution;
          float d = length( abs(st)-pos );
          gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
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

extend({ DistanceFieldMaterial })
