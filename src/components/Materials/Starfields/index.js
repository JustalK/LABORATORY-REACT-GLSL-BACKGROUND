import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const StarfieldsMaterial = shaderMaterial(
  {
    iTime: 0.0,
    iResolution: new THREE.Vector3()
  },
  `
    varying vec2 vUv;

    void main()	{
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
  `
    uniform vec3 iResolution;
    uniform float iTime;

    mat2 Rot(float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return mat2(c, -s, s, c);
    }

    float Hash21(vec2 p) {
      p = fract(p*vec2(123.65, 894.45));
      p += dot(p, p + 45.648456);
      return fract(p.x * p.y);
    }

    float Star(vec2 uv, float flare) {
      float d = length(uv);
      float m = 0.05/d;

      float rays = max(0.0, (1.0 - abs(uv.x * uv.y * 1000.0)));
      m += rays*flare;
      uv *= Rot(3.1415/4.0);
      rays = max(0.0, (1.0 - abs(uv.x * uv.y * 1000.0)));
      m += rays*0.3*flare;

      return m;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;
      uv *= 3.0;

      vec3 col = vec3(0);

      vec2 gv = fract(uv) - 0.5;
      vec2 id = floor(uv);

      float n = Hash21(id);
      col += Star(gv - vec2(n, fract(n * 34.0)) + 0.5, 1.0);

      if(gv.x > 0.48 || gv.y < -0.48) col.r = 1.0;

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ StarfieldsMaterial })
