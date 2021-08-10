import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class FireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        resolution: {
          value: new THREE.Vector2(
            window.innerHeight / window.innerWidth,
            window.innerHeight / window.innerWidth
          )
        },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uVelo: { value: 0.0 },
        uTime: { value: 0.0 }
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uVelo;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
      uniform vec2 resolution;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uVelo;
      float wnoise (float ix, float iy) {
        ix = mod(ix, 10.);
        iy = mod(iy, 5.);
        return mod((600.+ix*iy*12453.+136.*pow(ix+15., mod(iy, 16.) )+
                sin(iy*1600.)*1376.+ix*656.+iy*75.), 1000.)/1000.;
        }
        float gnoise (float px, float py) {
          float mx = fract(px);
          float my = fract(py);
          px = floor(px);
          py = floor(py);
          return mix(
            mix(wnoise(px, py), wnoise(px+1., py), mx),
            mix(wnoise(px, py+1.), wnoise(px+1., py+1.), mx),
            my
          );
        }
        float fnoise (float px, float py) {
          float s = 0.;
          float a = .5;
          float f = 1.;
          for (int i=0; i<4; ++i) {
            s += a*gnoise(px*f, py*f);
            a *= .5;
            f *= 2.;
          }
          return s;
        }
        void main()  {
            vec2 newUV = vUv;
            float arg = mod(float(10.0 * uTime), 50.)/50.;
            float px, py, fi=0., r=0., g=0., b=0.;
            px = (newUV.x-.5)*resolution.x/resolution.y+.5;
            py = 1.0 - newUV.y;
            fi = .1/((fnoise(px*9., py*9.+arg*5.)*(
                .03+0.*length(vec2(px-.5, py/2.-.5))*.15+
                0.1/(pow(py, 1.1)+0.1)
            )))-0.5;
            // fi = fnoise(px*7, py*7);
            if (fi <= 0.0) {
                r = 0.0;
                g = 0.0;
                b = 0.0;
            }
            else if (0. < fi && fi < .5) {
                r = 0.0;
                b = 0.0;
                g = 0.0;
            }
            else if (true) {
                r = 1.;
                g = 1.;
                b = 1.;
            }
            gl_FragColor = vec4(r, g, b, 1.);
        }
      `
    })
  }

  get uVelo() {
    return this.uniforms.uVelo.value
  }

  set uVelo(v) {
    return (this.uniforms.uVelo.value = v)
  }

  get uTime() {
    return this.uniforms.uTime.value
  }

  set uTime(v) {
    return (this.uniforms.uTime.value = v)
  }

  get uMouse() {
    return this.uniforms.uMouse.value
  }

  set uMouse(v) {
    return (this.uniforms.uMouse.value = v)
  }
}

extend({ FireMaterial })
