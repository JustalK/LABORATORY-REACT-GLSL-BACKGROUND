import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const MovingCircleMaterial = shaderMaterial(
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
    vec3 sdfCircle(vec2 uv, float r, vec2 offset) {
        float x = uv.x - offset.x;
        float y = uv.y - offset.y;

        float d = length(vec2(x, y)) - r;

        return d > 0. ? vec3(1.) : 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec2 offset = vec2(sin(iTime*2.)*0.2, cos(iTime*2.)*0.2);

      vec3 col = sdfCircle(uv, .2, offset);

      fragColor = vec4(col,1.0);
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ MovingCircleMaterial })
