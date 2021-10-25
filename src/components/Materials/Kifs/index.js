import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const KifsMaterial = shaderMaterial(
  {
    iTime: 0.0,
    iResolution: new THREE.Vector3(),
    iTexture: { value: undefined }
  },
  `
    varying vec2 vUv;

    void main()	{
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
  `
    uniform sampler2D iTexture;
    uniform vec3 iResolution;
    uniform float iTime;

    vec2 N(float angle) {
      return vec2(sin(angle), cos(angle));
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;
      uv *= 1.25;

      uv.x = abs(uv.x);
      uv.y += tan((5.0/6.0)*3.1415)*0.5;
      vec2 n = N((5.0/6.0)*3.1415);
      float d = dot(uv-vec2(0.5, 0.0), n);
      uv -= n*max(0.0, d)*2.0;

      n = N((2.0/3.0)*3.1415);
      float scale = 1.0;
      uv.x += 0.5;
      for(int i=0; i<5; i++) {
        uv *= 3.0;
        scale *= 3.0;
        uv.x -= 1.5;

        uv.x = abs(uv.x);
        uv.x -= 0.5;
        uv -= n*min(0.0, dot(uv, n))*2.0;
      }

      vec3 col = vec3(0.0);

      d = length(uv - vec2(clamp(uv.x, -1.0, 1.0), 0));
      col += smoothstep(0.01/iResolution.y, .0, d/scale);
      uv /= scale;
      col += texture(iTexture, uv * 2.0 - iTime*0.5).rgb;

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ KifsMaterial })
