import * as THREE from 'three'
import { extend } from '@react-three/fiber'

export default class BackgroundFogMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: {
          value: new THREE.Vector2(1.0, 1.0)
        }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
        }`,
      fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      float random(in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i + vec2(0.0, 0.0));
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float fbm(in vec2 st) {
      	float v = 0.0;
        float a = 0.5;
        int octave = 5;
        for (int i = 0; i < 5; i++) {
        	v += a * noise(st);
          st = st * 2.0;
          a *= 0.6;
        }
        return v;
      }
      float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
        uv -= disc_center;
        uv*=uResolution;
        float dist = sqrt(dot(uv, uv));
        return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
      }
      void main() {
        vec3 color = vec3(0.035, 0.078, 0.356);
        vec3 colorHover = vec3(0.978, 0.035, 0.356);
        float circleMouse = circle(vUv, uMouse, 0.0005, 0.5);
        float cornerLeftBottom = circle(vUv, vec2(0, 0), 0.0005, 20.0);
        float cornerRightTop = circle(vUv, vec2(1, 1), 0.0005, 20.0);
        float maskLeftBottom = smoothstep(0.4, 0.5, cornerLeftBottom);
        float maskRightTop = smoothstep(0.4, 0.5, cornerRightTop);
        vec2 st = gl_FragCoord.xy * 0.001 / uResolution.xy;

        vec2 q = vec2(0.0);
        q.x = fbm(st + vec2(0.0));
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(st + (1.0 * q) + vec2(0.0, 9.2) + (0.1 * uTime));
        //r.y = fbm(st + (1.0 * q) + vec2(0.0, 2.8) + (0.05 * uTime));
        float f = fbm(st + r);

        float coef = (f * f * f + (0.6 * f * f) + (0.5 * f));
        vec4 mixed1 = mix(vec4(coef * color, 1.0), vec4(coef * colorHover, 1.0), circleMouse);
        vec4 mixed2 = mix(mixed1, vec4(0.0, 0.0, 0.0, 1.0), maskLeftBottom);
        vec4 mixed3 = mix(mixed2, vec4(0.0, 0.0, 0.0, 1.0), maskRightTop);
        gl_FragColor = mixed3;
      }`
    })
  }

  get uResolution() {
    return this.uniforms.uResolution.value
  }

  set uResolution(v) {
    return (this.uniforms.uResolution.value = v)
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

extend({ BackgroundFogMaterial })
