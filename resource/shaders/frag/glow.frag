uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_glowStrength;

void main()
{
    vec2 texel = vec2(1.0/640.0, 1.0/480.0);
    vec4 center = texture2D(u_texture, v_texCoord);
    
    // Sample surrounding pixels for edge detection
    vec4 tl = texture2D(u_texture, v_texCoord + vec2(-texel.x, -texel.y));
    vec4 tc = texture2D(u_texture, v_texCoord + vec2( 0.0, -texel.y));
    vec4 tr = texture2D(u_texture, v_texCoord + vec2( texel.x, -texel.y));
    vec4 ml = texture2D(u_texture, v_texCoord + vec2(-texel.x,  0.0));
    vec4 mr = texture2D(u_texture, v_texCoord + vec2( texel.x,  0.0));
    vec4 bl = texture2D(u_texture, v_texCoord + vec2(-texel.x,  texel.y));
    vec4 bc = texture2D(u_texture, v_texCoord + vec2( 0.0,  texel.y));
    vec4 br = texture2D(u_texture, v_texCoord + vec2( texel.x,  texel.y));
    
    // Sobel edge detection (preserves color)
    vec3 gx = (-tl.rgb - 2.0*ml.rgb - bl.rgb) + (tr.rgb + 2.0*mr.rgb + br.rgb);
    vec3 gy = (-tl.rgb - 2.0*tc.rgb - tr.rgb) + (bl.rgb + 2.0*bc.rgb + br.rgb);
    
    vec3 edge = sqrt(gx*gx + gy*gy);
    edge = clamp(edge, 0.0, 1.0);
    
    // Glow bloom effect
    vec3 glowColor = center.rgb * edge * u_glowStrength;
    
    // Mix outline + original (stronger on edges)
    vec3 finalColor = mix(center.rgb, glowColor, edge.r * 0.8);
    
    gl_FragColor = vec4(finalColor, center.a);
}
