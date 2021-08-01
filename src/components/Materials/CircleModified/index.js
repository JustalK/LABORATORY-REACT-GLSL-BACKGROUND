import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class CircleModifiedMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(1.0, 1.0)
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
          vec2 newvUv = vUv * uResolution;
          vec3 color = vec3(0.0);
          vec2 pos = vec2(0.5) * uResolution -newvUv;

          float r = length(pos)*2.0;
          float a = atan(pos.y,pos.x);

          float f = cos(a*2.0);
          //float f = abs(cos(a*2.0));
          // float f = abs(cos(a*2.5))*.5+.3;
          // float f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
          // float f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

          color = vec3( smoothstep(f,f,r) );

          gl_FragColor = vec4(color, 1.0);
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

extend({ CircleModifiedMaterial })
