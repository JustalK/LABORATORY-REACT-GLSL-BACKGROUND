import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const LineMaterial = shaderMaterial(
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
    float sdSegment( in vec2 p, in vec2 a, in vec2 b )
    {
        vec2 pa = p-a, ba = b-a;
        float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
        return length( pa - ba*h );
    }

    vec3 drawScene(vec2 uv) {
      vec3 col = vec3(0);
      float line = sdSegment(uv, vec2(0, 0), vec2(0, .2));

      float res;
      res = line;

      col = mix(vec3(1, 1, 1), col, step(0., line - 0.02));
      return col;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec3 col = drawScene(uv);

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ LineMaterial })
