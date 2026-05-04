uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_biquadStrength;  // 0.0=normal, 1.0=sharp, -1.0=smooth

void main()
{
    vec2 texel = vec2(1.0/640.0, 1.0/480.0);
    vec4 center = texture2D(u_texture, v_texCoord);
    
    // 3x3 kernel sampling
    vec4 tl = texture2D(u_texture, v_texCoord + vec2(-texel.x, -texel.y));
    vec4 tc = texture2D(u_texture, v_texCoord + vec2( 0.0, -texel.y));
    vec4 tr = texture2D(u_texture, v_texCoord + vec2( texel.x, -texel.y));
    vec4 ml = texture2D(u_texture, v_texCoord + vec2(-texel.x,  0.0));
    vec4 mr = texture2D(u_texture, v_texCoord + vec2( texel.x,  0.0));
    vec4 bl = texture2D(u_texture, v_texCoord + vec2(-texel.x,  texel.y));
    vec4 bc = texture2D(u_texture, v_texCoord + vec2( 0.0,  texel.y));
    vec4 br = texture2D(u_texture, v_texCoord + vec2( texel.x,  texel.y));
    
    // Biquadratic weights (sharpens corners, smooths edges)
    vec4 biquad = (tl + tr + bl + br) * 0.1 +  // Corner sharpen
                  (tc + bc + ml + mr) * 0.2 +  // Edge smooth  
                  center * 0.4;                // Center weight
    
    // Mix with original based on strength
    vec4 finalColor = mix(center, biquad, u_biquadStrength);
    gl_FragColor = finalColor;
}
