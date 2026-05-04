uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;
uniform float u_saturation;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // MANUAL GAMMA CRUSH (no pow function)
    color.r = color.r * color.r * color.r * 0.8;
    color.g = color.g * color.g * color.g * 0.85; 
    color.b = color.b * color.b * color.b * 0.75;
    
    // BRIGHTNESS BOOST
    color.rgb *= 3.8;
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    
    // RGB MEME COLORS
    vec3 deepfryRGB = color.rgb * vec3(2.6, 1.8, 1.9);
    color.rgb = mix(color.rgb, deepfryRGB, u_saturation);
    
    // POSTERIZATION
    color.rgb = floor(color.rgb * 6.0) / 6.0;
    
    // VIGNETTE
    vec2 center = v_texCoord - 0.5;
    float vignette = 1.0 - length(center) * 0.35;
    color.rgb *= vignette;
    
    gl_FragColor = vec4(color.rgb, 1.0);
}
