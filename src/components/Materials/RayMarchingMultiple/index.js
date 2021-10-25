import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const RayMarchingMultipleMaterial = shaderMaterial(
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

    vec4 minWithColor(vec4 obj1, vec4 obj2) {
      if (obj2.x < obj1.x) return obj2; // The x component of the object holds the "signed distance" value
      return obj1;
    }

    vec4 sdSphere(vec3 p, float r, vec3 offset, vec3 col)
    {
      float d = length(p - offset) - r;
      return vec4(d, col);
    }

    vec4 sdFloor(vec3 p, vec3 col) {
      float d = p.y + 1.;
      return vec4(d, col);
    }

    vec4 sdScene(vec3 p) {
      vec4 sphereLeft = sdSphere(p, 1., vec3(-2.5, 0, -2), vec3(0, .8, .8));
      vec4 sphereRight = sdSphere(p, 1., vec3(2.5, 0, -2), vec3(1, 0.58, 0.29));
      vec4 co = minWithColor(sphereLeft, sphereRight); // co = closest object containing "signed distance" and color
      co = minWithColor(co, sdFloor(p, vec3(0, 1, 0)));
      return co;
    }

    vec4 rayMarch(vec3 ro, vec3 rd, float start, float end) {
      float depth = start;
      vec4 co; // closest object

      for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        vec3 p = ro + depth * rd;
        co = sdScene(p);
        depth += co.x;
        if (co.x < PRECISION || depth > end) break;
      }

      vec3 col = vec3(co.yzw);

      return vec4(depth, col);
    }

    vec3 calcNormal(vec3 p) {
      float e = 0.0005;
      return normalize(vec3(
        sdScene(vec3(p.x + e, p.y, p.z)).x - sdScene(vec3(p.x - e, p.y, p.z)).x,
        sdScene(vec3(p.x, p.y + e, p.z)).x - sdScene(vec3(p.x, p.y - e, p.z)).x,
        sdScene(vec3(p.x, p.y, p.z  + e)).x - sdScene(vec3(p.x, p.y, p.z - e)).x
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

      vec4 co = rayMarch(ro, rd, MIN_DIST, MAX_DIST);

      if (co.x > MAX_DIST) {
        col = backgroundColor;
      } else {
        vec3 p = ro + rd * co.x;
        vec3 normal = calcNormal(p);
        vec3 lightPosition = vec3(2, 2, 4);
        vec3 lightDirection = normalize(lightPosition - p);

        float dif = clamp(dot(normal, lightDirection), 0.2, 1.);

        col = vec3(dif) * co.yzw + backgroundColor * .1;
      }

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ RayMarchingMultipleMaterial })
