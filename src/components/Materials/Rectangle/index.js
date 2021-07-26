import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class RectangleMaterial extends THREE.ShaderMaterial {
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
      float rectangle(vec2 uv, vec2 center, float radius) {
        uv -= center;
        uv *= uResolution;
        float dist = max(abs(uv.x), 2.0 * abs(uv.y));
        return smoothstep(radius, radius, dist);
      }
      void main()  {
          vec2 newUV = vUv;
          vec2 center = vec2(0.5, 0.5);
          float c = rectangle(vUv, center, 0.5);
          vec4 color = vec4(255.0, 0.0, 0.0, 1.0);
          vec4 color2 = vec4(0.0, 0.0, 255.0, 1.0);

        	vec4 finalImage = mix(color, color2, c);

          gl_FragColor = finalImage;
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

extend({ RectangleMaterial })
