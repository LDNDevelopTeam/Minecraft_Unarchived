uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;
// NO u_saturation

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // PURE FLAT CONTRAST (no desat)
    color.rgb = mix(vec3(0.5), color.rgb, 0.4);
    color.rgb = pow(color.rgb, vec3(1.6));
    
    // SOFT BLUR (pure color average)
    vec2 texel = vec2(1.0/u_width, 1.0/u_height);
    vec4 neighbors = (texture2D(u_texture, v_texCoord + texel * 0.5) +
                      texture2D(u_texture, v_texCoord - texel * 0.5) +
                      texture2D(u_texture, v_texCoord + vec2(texel.x * 0.5, -texel.y * 0.5)) +
                      texture2D(u_texture, v_texCoord + vec2(-texel.x * 0.5, texel.y * 0.5))) * 0.25;
    color.rgb = mix(color.rgb, neighbors.rgb, 0.3);
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    gl_FragColor = color;
}
