import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

/**
 * Function of the mandelbrot : f(c) = z² + c
 * it works with complexe number, the z² take care of the rotation and the c take care of the translation just behind.
 * The black part is the part that goes out of the mandelbrot and the white is the part that keep until the end of the steps
 * */
const MandelbrotMaterial = shaderMaterial(
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

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      float zoom = pow(10.0, -iTime*0.2);
      vec2 c = uv*zoom*3.0;
      c += vec2(-.69955, .37999);

      vec2 z = vec2(0.0);
      float iter = 0.0;
      const float max_iter = 100.0;

      for(float i=0.0; i<max_iter; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;

        if( length(z) > 2.0) break;

        iter++;
      }

      float f = iter/max_iter;
      vec3 col = vec3(f);

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ MandelbrotMaterial })
