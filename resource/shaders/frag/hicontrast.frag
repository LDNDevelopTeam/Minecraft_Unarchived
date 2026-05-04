uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;
// REMOVED u_saturation completely

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // PURE SIGMOID CONTRAST (no desat)
    color.rgb = 1.0 / (1.0 + exp(-8.0 * (color.rgb - 0.5)));
    color.rgb = pow(color.rgb, vec3(0.85));
    
    // SHARPEN (luma-only to avoid hue shift)
    vec2 texel = vec2(1.0/u_width, 1.0/u_height);
    float centerLuma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float neighborLuma = dot(texture2D(u_texture, v_texCoord + texel).rgb +
                            texture2D(u_texture, v_texCoord - texel).rgb, 
                            vec3(0.299, 0.587, 0.114)) * 0.5;
    float sharpen = (neighborLuma - centerLuma) * 0.3;
    color.rgb += sharpen;  // Add to RGB equally (no hue shift)
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    gl_FragColor = color;
}
