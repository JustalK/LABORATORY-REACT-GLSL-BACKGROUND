import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const MovingSquareMaterial = shaderMaterial(
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
    vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }
    vec3 sdfCircle(vec2 uv, float size, vec2 offset) {
        float x = uv.x - offset.x;
        float y = uv.y - offset.y;
        vec2 rotated = rotate(vec2(x,y), iTime);
        float d = max(abs(rotated.x), abs(rotated.y)) - size;

        return d > 0. ? vec3(1.) : 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec2 offset = vec2(0.0, 0.0);

      vec3 col = sdfCircle(uv, .2, offset);

      fragColor = vec4(col,1.0);
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ MovingSquareMaterial })
