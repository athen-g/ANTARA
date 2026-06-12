uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;
uniform float uRepelRadius;
uniform float uRepelStrength;

attribute float aSeed;
attribute float aSpeed;
attribute float aScale;

varying float vOpacity;
varying float vSeed;

void main() {
    vec3 pos = position;
    
    // Slow drift upward
    float drift = uTime * aSpeed * 0.1;
    pos.y += drift;
    
    // Wrap Y coordinate between -8.0 and 8.0
    pos.y = mod(pos.y + 8.0, 16.0) - 8.0;
    
    // Organic wave movement
    pos.x += sin(uTime * 0.2 + aSeed) * 0.8;
    pos.z += cos(uTime * 0.1 + aSeed) * 0.4;
    
    // Mouse repulsion in 2D projection
    vec2 mouse2D = uMouse;
    vec2 pos2D = pos.xy;
    float dist = distance(mouse2D, pos2D);
    
    if (dist < uRepelRadius) {
        float force = (1.0 - (dist / uRepelRadius));
        // Soft spring physics decay
        vec2 repelDir = normalize(pos2D - mouse2D + vec2(0.0001)); // Prevent division by zero
        pos.xy += repelDir * force * uRepelStrength;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation based on distance
    gl_PointSize = (aScale * 45.0 * uPixelRatio) / -mvPosition.z;
    
    // Fade out near the boundaries to create a seamless viewport entry/exit
    float fadeY = smoothstep(-8.0, -5.0, pos.y) * (1.0 - smoothstep(5.0, 8.0, pos.y));
    float fadeX = smoothstep(-10.0, -7.0, pos.x) * (1.0 - smoothstep(7.0, 10.0, pos.x));
    vOpacity = fadeY * fadeX * 0.7; // Cap base opacity
    
    vSeed = aSeed;
}
