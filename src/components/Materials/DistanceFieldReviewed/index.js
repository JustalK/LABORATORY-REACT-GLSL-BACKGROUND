import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const DistanceFieldReviewedMaterial = shaderMaterial(
  {
    time: 0.0,
    resolution: new THREE.Vector3()
  },
  `
    varying vec2 vUv;

    void main()	{
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
  `
    uniform vec3 resolution;
    float circle(in vec2 _st, in float _radius){
      vec2 dist = _st;
	     return 1.-smoothstep(_radius-(_radius*0.01), _radius+(_radius*0.01), dot(dist,dist)*4.0);
    }

    uniform float time;

    void mainImage( out vec4 fragColor, in vec2 fragCoord ){
      vec2 st = gl_FragCoord.xy / resolution.xy - vec2(0.5);
      st.y *= resolution.y / resolution.x;
    	vec3 color = vec3(circle(st,0.25));

    	fragColor = vec4( color, 1.0 );
    }

    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ DistanceFieldReviewedMaterial })
