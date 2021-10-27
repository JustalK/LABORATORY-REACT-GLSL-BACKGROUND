import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const ColorMaterial = shaderMaterial(
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
    vec3 palette[7];

    vec3 getcolor(float c)
    {
    	c=mod(c,7.);
    	int p=0;
    	vec3 color=vec3(0.);
    	for(int i=0;i<7;i++) {
    		if (float(i)-c<=.0) {
    			color=palette[i];
    		}
    	}
    	return color;
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec3 col = vec3(0);

      palette[6]=vec3(255,000,000)/255.;
    	palette[5]=vec3(255,127,000)/255.;
    	palette[4]=vec3(255,255,000)/255.;
    	palette[3]=vec3(150,050,050)/255.;
    	palette[2]=vec3(000,050,50)/255.;
    	palette[1]=vec3(075,000,130)/255.;
    	palette[0]=vec3(143,000,255)/255.;

    	col=getcolor(uv.y*7.-iTime*.5);

      fragColor = vec4(col,1.0);
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ ColorMaterial })
