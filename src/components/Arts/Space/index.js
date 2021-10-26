import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const ArtSpaceMaterial = shaderMaterial(
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

    float Xor(float a, float b) {
      return a*(1.0-b) + b*(1.0-a);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec3 col = vec3(0);

      float a = 3.1415/16.0;
      float s = sin(a);
      float c = cos(a);
      uv *= mat2(c, -s, s, c);

      uv *= 15.0;

      vec2 gv = fract(uv) - 0.5;
      vec2 id = floor(uv);

      float m = 0.0;

      for(float y=-1.0; y <= 1.0 ;y++) {
        for(float x=-1.0; x <= 1.0 ;x++) {
          vec2 offs = vec2(x, y);

          float d = length(gv);
          float dist = length(id+offs)*0.1;

          float r = mix(0.3, 1.5, sin(dist-iTime)*0.5 + 0.5);
          m = Xor(m, smoothstep(r*0.9, r*0.9, d + 0.5));
        }
      }

      col += m;

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ ArtSpaceMaterial })
