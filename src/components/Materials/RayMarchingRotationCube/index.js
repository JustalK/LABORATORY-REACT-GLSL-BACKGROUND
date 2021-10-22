import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const RayMarchingRotationCubeMaterial = shaderMaterial(
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

    struct Surface {
      float sd; // signed distance value
      vec3 col; // color
    };

    Surface minWithColor(Surface obj1, Surface obj2) {
      if (obj2.sd < obj1.sd) return obj2;
      return obj1;
    }

    // Rotation matrix around the X axis.
    mat3 rotateX(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat3(
            vec3(1, 0, 0),
            vec3(0, c, -s),
            vec3(0, s, c)
        );
    }

    // Rotation matrix around the Y axis.
    mat3 rotateY(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat3(
            vec3(c, 0, s),
            vec3(0, 1, 0),
            vec3(-s, 0, c)
        );
    }

    // Rotation matrix around the Z axis.
    mat3 rotateZ(float theta) {
        float c = cos(theta);
        float s = sin(theta);
        return mat3(
            vec3(c, -s, 0),
            vec3(s, c, 0),
            vec3(0, 0, 1)
        );
    }

    // Identity matrix.
    mat3 identity() {
        return mat3(
            vec3(1, 0, 0),
            vec3(0, 1, 0),
            vec3(0, 0, 1)
        );
    }

    Surface sdBox( vec3 p, vec3 b, vec3 offset, vec3 col, mat3 transform)
    {
      p = (p - offset) * transform;
      vec3 q = abs(p) - b;
      float d = length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
      return Surface(d, col);
    }

    Surface sdFloor(vec3 p, vec3 col) {
      float d = p.y + 1.;
      return Surface(d, col);
    }

    Surface sdScene(vec3 p) {
      vec3 floorColor = vec3(1. + 0.7*mod(floor(p.x) + floor(p.z), 2.0));
      Surface co = sdFloor(p, floorColor);
      co = minWithColor(co, sdBox(p, vec3(1), vec3(0, 0.5, -4), vec3(1, 0, 0), rotateX(iTime)));
      return co;
    }

    Surface rayMarch(vec3 ro, vec3 rd, float start, float end) {
      float depth = start;
      Surface co; // closest object

      for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        vec3 p = ro + depth * rd;
        co = sdScene(p);
        depth += co.sd;
        if (co.sd < PRECISION || depth > end) break;
      }

      co.sd = depth;

      return co;
    }

    vec3 calcNormal(vec3 p) {
      float e = 0.0005;
      return normalize(vec3(
        sdScene(vec3(p.x + e, p.y, p.z)).sd - sdScene(vec3(p.x - e, p.y, p.z)).sd,
        sdScene(vec3(p.x, p.y + e, p.z)).sd - sdScene(vec3(p.x, p.y - e, p.z)).sd,
        sdScene(vec3(p.x, p.y, p.z  + e)).sd - sdScene(vec3(p.x, p.y, p.z - e)).sd
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

      Surface co = rayMarch(ro, rd, MIN_DIST, MAX_DIST);

      if (co.sd > MAX_DIST) {
        col = backgroundColor;
      } else {
        vec3 p = ro + rd * co.sd;
        vec3 normal = calcNormal(p);
        vec3 lightPosition = vec3(2, 2, 4);
        vec3 lightDirection = normalize(lightPosition - p);

        float dif = clamp(dot(normal, lightDirection), 0.2, 1.);

        col = vec3(dif) * co.col + backgroundColor * .1;
      }

      fragColor = vec4(col,1.0); // Output to screen
    }
    void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }
    `
)

extend({ RayMarchingRotationCubeMaterial })
