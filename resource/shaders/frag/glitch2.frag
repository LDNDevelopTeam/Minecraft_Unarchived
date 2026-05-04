#version 120

varying vec2 v_uv;

uniform sampler2D u_texture;
uniform float u_time;
uniform float u_intensity;
uniform float u_scanline;
uniform float u_rgb;
uniform float u_block;

float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}
float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash2(i);
    float b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0));
    float d = hash2(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    // --- ブロックグリッチ ---
    float bx = floor(v_uv.x * 20.0) / 20.0;
    float by = floor(v_uv.y * 10.0) / 10.0;
    float blockSeed = hash2(vec2(bx, by) + floor(u_time * 8.0));
    float glitchBlock = step(1.0 - u_block * 0.4, blockSeed);
    float offsetX = (hash(blockSeed + 1.0) - 0.5) * 0.12 * u_intensity * glitchBlock;
    float offsetY = (hash(blockSeed + 2.0) - 0.5) * 0.04 * u_intensity * glitchBlock;

    // --- スキャンラインずれ ---
    float scanSeed = hash(floor(v_uv.y * 100.0) + floor(u_time * 15.0) * 0.01);
    float scanGlitch = step(1.0 - u_intensity * 0.25, scanSeed);
    float scanShift = (hash(scanSeed + 3.0) - 0.5) * 0.15 * u_intensity * scanGlitch;

    // --- RGBクロマティックアベレーション ---
    vec2 uvR = vec2(v_uv.x + u_rgb + offsetX + scanShift, v_uv.y + offsetY);
    vec2 uvG = vec2(v_uv.x           + offsetX + scanShift, v_uv.y + offsetY);
    vec2 uvB = vec2(v_uv.x - u_rgb + offsetX + scanShift, v_uv.y + offsetY);

    float r = texture2D(u_texture, clamp(uvR, 0.0, 1.0)).r;
    float g = texture2D(u_texture, clamp(uvG, 0.0, 1.0)).g;
    float b = texture2D(u_texture, clamp(uvB, 0.0, 1.0)).b;

    vec3 col = vec3(r, g, b);

    // --- スキャンライン暗帯 ---
    float scanLine = sin(v_uv.y * u_scanline * 200.0) * 0.04;
    col -= scanLine * u_intensity;

    // --- ブロック単位カラースワップ ---
    float blockRow   = floor(v_uv.y * 60.0);
    float blockSeed3 = hash(blockRow + floor(u_time * 10.0) * 1.73);
    float colorSwap  = step(1.0 - u_block * 0.25, blockSeed3);
    col = mix(col, col.gbr, colorSwap * 0.7 * u_intensity);

    // --- バリューノイズ粒状感 ---
    col += noise(v_uv * 200.0 + u_time * 5.0) * 0.04 * u_intensity;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}