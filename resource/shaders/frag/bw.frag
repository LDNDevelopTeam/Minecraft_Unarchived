uniform sampler2D u_texture;
varying vec2 v_texCoord;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // Calculate brightness (luma)
    float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Pure threshold - above 0.5 = WHITE, below = BLACK
    vec3 bwColor = brightness > 0.5 ? vec3(1.0) : vec3(0.0);
    
    gl_FragColor = vec4(bwColor, color.a);
}
