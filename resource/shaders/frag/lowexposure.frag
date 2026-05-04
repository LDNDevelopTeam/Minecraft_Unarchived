uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;
// NO u_saturation

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // PURE DARKENING (no desat)
    color.r = color.r * color.r * 1.1;
    color.g = color.g * color.g * 1.12;
    color.b = color.b * color.b * 1.08;
    
    color.rgb *= 0.75;
    color.rgb = (color.rgb - 0.05) * 1.4;
    
    // VIGNETTE (luma-based)
    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 - length(center) * 0.3;
    color.rgb *= vignette;
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    gl_FragColor = color;
}
