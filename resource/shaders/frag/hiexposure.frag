uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;
// NO u_saturation

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // PURE BRIGHTENING
    color.r = color.r * color.r * 1.4;
    color.g = color.g * color.g * 1.45;
    color.b = color.b * color.b * 1.35;
    
    color.rgb *= 1.8;
    
    // SUBTLE BLOOM (pure white mix)
    float bright = max(max(color.r, color.g), color.b);
    color.rgb = mix(color.rgb, vec3(1.0), smoothstep(0.85, 1.0, bright) * 0.4);
    
    // VIGNETTE
    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 + length(center) * 0.15;
    color.rgb *= vignette;
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    gl_FragColor = color;
}
