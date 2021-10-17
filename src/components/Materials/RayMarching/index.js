import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const RayMarchingMaterial = shaderMaterial(
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
    const int MAX_MARCHING_STEPS = 255;
    const float MIN_DIST = 0.0;
    const float MAX_DIST = 100.0;
    const float PRECISION = 0.001;

    float sdSphere(vec3 p, float r )
    {
      vec3 offset = vec3(0, 0, -2);
      return length(p - offset) - r;
    }

    float rayMarch(vec3 ro, vec3 rd, float start, float end) {
      float depth = start;

      for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        vec3 p = ro + depth * rd;
        float d = sdSphere(p, 1.);
        depth += d;
        if (d < PRECISION || depth > end) break;
      }

      return depth;
    }

    vec3 calcNormal(vec3 p) {
      float e = 0.0005;
      float r = 1.;
      return normalize(vec3(
        sdSphere(vec3(p.x + e, p.y, p.z), r) - sdSphere(vec3(p.x - e, p.y, p.z), r),
        sdSphere(vec3(p.x, p.y + e, p.z), r) - sdSphere(vec3(p.x, p.y - e, p.z), r),
        sdSphere(vec3(p.x, p.y, p.z  + e), r) - sdSphere(vec3(p.x, p.y, p.z - e), r)
      ));
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = fragCoord/iResolution.xy;
      uv -= 0.5;
      uv.x *= iResolution.x/iResolution.y;

      vec3 col = vec3(0);
      vec3 ro = vec3(0, 0, 5);
      vec3 rd = normalize(vec3(uv, -1));
      vec3 backgroundColor = vec3(0.835, 1, 1);

      float d = rayMarch(ro, rd, MIN_DIST, MAX_DIST);

      if (d > MAX_DIST) {
        col = backgroundColor;
      } else {
        vec3 p = ro + rd * d;
        vec3 normal = calcNormal(p);
        vec3 lightPosition = vec3(2, 2, 4);
        vec3 lightDirection = normalize(lightPosition - p);

        float dif = clamp(dot(normal, lightDirection), 0.2, 1.);

        col = vec3(dif) * vec3(1, 0.58, 0.29) + backgroundColor * .1;
      }

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ RayMarchingMaterial })
