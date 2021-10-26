import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const VoronoiMaterial = shaderMaterial(
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

    vec2 N22(vec2 p) {
      vec3 a = fract(p.xyx*vec3(123.34, 234.34, 345.65));
      a += dot(a, a + 34.45);
      return fract(vec2(a.x * a.y, a.y * a.z));
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      float m = N22(uv).x;
      float minDist = 100.0;

      vec3 col = vec3(0);

      uv *= 10.0;
      vec2 gv = fract(uv)-0.5;
      vec2 id = floor(uv);

      for(float y=-1.0; y <= 1.0 ;y++) {
        for(float x=-1.0; x <= 1.0 ;x++) {
          vec2 offs = vec2(x, y);

          vec2 n = N22(id + offs);
          vec2 p = offs + sin(n*iTime)*0.5;
          float d = length(gv - p);

          if (d<minDist) {
            minDist=d;
          }
        }
      }

      col = vec3(minDist);

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ VoronoiMaterial })
