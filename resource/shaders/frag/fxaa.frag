uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;

vec3 FxaaTexOff(vec2 pos, vec2 off, vec2 texel) {
    pos += off * texel;
    return texture2D(u_texture, pos).rgb;
}

void main()
{
    vec2 texel = vec2(1.0/u_width, 1.0/u_height);
    vec3 rgbNW = texture2D(u_texture, v_texCoord + vec2(-texel.x, texel.y)).rgb;
    vec3 rgbNE = texture2D(u_texture, v_texCoord + vec2( texel.x, texel.y)).rgb;
    vec3 rgbSW = texture2D(u_texture, v_texCoord + vec2(-texel.x,-texel.y)).rgb;
    vec3 rgbSE = texture2D(u_texture, v_texCoord + vec2( texel.x,-texel.y)).rgb;
    vec3 rgbM  = texture2D(u_texture, v_texCoord               ).rgb;
    
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));
    
    if (lumaMax - lumaMin <= 0.1) {
        gl_FragColor = vec4(rgbM, 1.0);
        return;
    }
    
    float gradientN = lumaNW - lumaNE;
    float gradientS = lumaSW - lumaSE;
    float gradientW = lumaNW - lumaSW;
    float gradientE = lumaNE - lumaSE;
    
    vec2 normal = vec2(abs(gradientN) - abs(gradientS), abs(gradientW) - abs(gradientE)) * 2.0 + 1.0;
    float lengthN = dot(normal.xy, normal.xy);
    float FxaaNLength = sqrt(lengthN);
    
    vec2 dir = vec2(-gradientN / FxaaNLength, -gradientS / FxaaNLength);
    dir = clamp(dir, -0.15, 0.15);
    
    // FIXED: Only 3 parameters (pos, off, texel)
    vec3 rgbF = FxaaTexOff(v_texCoord, dir, texel);
    vec3 rgbA1 = FxaaTexOff(v_texCoord, dir * (1.0/3.0), texel);
    vec3 rgbA2 = FxaaTexOff(v_texCoord, dir * (2.0/3.0), texel);
    vec3 rgbA = 0.5 * rgbA1 + 0.25 * rgbA2;
    
    gl_FragColor = vec4(mix(rgbA, rgbF, 0.25), 1.0);
}
