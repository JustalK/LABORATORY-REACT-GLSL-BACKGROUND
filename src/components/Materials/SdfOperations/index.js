import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const SdfOperationsMaterial = shaderMaterial(
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
    vec3 getBackgroundColor(vec2 uv) {
      uv = uv * 0.5 + 0.5;
      vec3 gradientStartColor = vec3(1., 0., 1.);
      vec3 gradientEndColor = vec3(0., 1., 1.);
      return mix(gradientStartColor, gradientEndColor, uv.y);
    }
    float sdHeart(vec2 uv, float size, vec2 offset) {
      float x = uv.x - offset.x;
      float y = uv.y - offset.y;
      float xx = x * x;
      float yy = y * y;
      float yyy = yy * y;
      float group = xx + yy - size;
      float d = group * group * group - xx * yyy;

      return d;
    }
    float sdStar5(in vec2 p, in float r, in float rf, vec2 offset) {
      p -= offset;
      const vec2 k1 = vec2(0.809016994375, -0.587785252292);
      const vec2 k2 = vec2(-k1.x,k1.y);
      p.x = abs(p.x);
      p -= 2.0*max(dot(k1,p),0.0)*k1;
      p -= 2.0*max(dot(k2,p),0.0)*k2;
      p.x = abs(p.x);
      p.y -= r;
      vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
      float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
      return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);
    }
    float sdCircle(vec2 uv, float r, vec2 offset) {
      float x = uv.x - offset.x;
      float y = uv.y - offset.y;

      return length(vec2(x, y)) - r;
    }
    float opSymX(vec2 p, float r) {
      p.x = abs(p.x);
      return sdCircle(p, r, vec2(0.2, 0));
    }
    float opRep(vec2 p, float r, vec2 c) {
      vec2 q = mod(p+0.5*c,c)-0.5*c;
      return sdCircle(q, r, vec2(0));
    }
    float opDisplace(vec2 p, float r) {
      float d1 = sdCircle(p, r, vec2(0));
      float s = 0.5; // scaling factor

      float d2 = sin(s * p.x * 1.8); // Some arbitrary values I played around with

      return d1 + d2;
    }

    float sdSquare(vec2 uv, float size, vec2 offset) {
      float x = uv.x - offset.x;
      float y = uv.y - offset.y;

      return max(abs(x), abs(y)) - size;
    }

    vec3 drawScene(vec2 uv) {
      vec3 col = getBackgroundColor(uv);
      float d1 = sdCircle(uv, 0.1, vec2(0., 0.));
      float d2 = sdSquare(uv, 0.1, vec2(0.1, 0));
      float heart = sdHeart(uv, 0.04, vec2(0));
      float star = sdStar5(uv, 0.12, 0.45, vec2(0.2, 0));

      float res;
      res = star;

      res = step(0., res);

      col = mix(vec3(1,0,0), col, res);
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

extend({ SdfOperationsMaterial })
