uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_blurSize;  // Higher = more blur

void main()
{
    vec4 color = vec4(0.0);
    vec2 texel = vec2(1.0 / 640.0, 1.0 / 480.0) * u_blurSize;  // Adjust for resolution
    
    // 9-tap Gaussian kernel (3x3 weighted)
    float kernel[9] = float[](0.0625, 0.125, 0.0625, 
                             0.125, 0.25, 0.125, 
                             0.0625, 0.125, 0.0625);
    
    vec2 offsets[9] = vec2[](
        vec2(-texel.x, -texel.y), vec2(0.0, -texel.y), vec2(texel.x, -texel.y),
        vec2(-texel.x, 0.0),      vec2(0.0, 0.0),      vec2(texel.x, 0.0),
        vec2(-texel.x, texel.y),  vec2(0.0, texel.y),  vec2(texel.x, texel.y)
    );
    
    for(int i = 0; i < 9; i++) {
        color += texture2D(u_texture, v_texCoord + offsets[i]) * kernel[i];
    }
    
    gl_FragColor = color;
}
