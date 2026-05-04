uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_vignetteStrength;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(v_texCoord, center);
    float vignette = 1.0 - dist * u_vignetteStrength;
    vignette = clamp(vignette, 0.4, 1.0);
    
    gl_FragColor = color * vignette;
}
