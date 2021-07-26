import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class NoiseMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0.0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main()  {
          vec2 newUV = vUv;
          vec4 c = vec4(0.25, 0.25, 0.25, 1.0);

          float noiseAmount = 0.2;
          float n = fract(sin(dot(vUv, vec2(uTime+12.9898, 78.233))) * 43758.5453);
          c *= (1.0 - noiseAmount + n * noiseAmount);
          gl_FragColor = c;
      }`
    })
  }

  get uTime() {
    return this.uniforms.uTime.value
  }

  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }
}

extend({ NoiseMaterial })
