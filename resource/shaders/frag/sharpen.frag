uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;

void main()
{
    vec2 texel = vec2(1.0/u_width, 1.0/u_height);
    vec3 color = texture2D(u_texture, v_texCoord).rgb;
    
    // 3x3 SHARPEN KERNEL (NO DIM)
    float sharpenAmount = 5.0;
    
    // Simple edge detection + boost
    vec3 left   = texture2D(u_texture, v_texCoord + vec2(-texel.x, 0.0)).rgb;
    vec3 right  = texture2D(u_texture, v_texCoord + vec2( texel.x, 0.0)).rgb;
    vec3 top    = texture2D(u_texture, v_texCoord + vec2(0.0, texel.y)).rgb;
    vec3 bottom = texture2D(u_texture, v_texCoord + vec2(0.0,-texel.y)).rgb;
    
    // Edge sharpen (no multiply darkening)
    vec3 edges = abs(color - left) + abs(color - right) + abs(color - top) + abs(color - bottom);
    color += edges * sharpenAmount * 0.1;
    
    color = clamp(color, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
}
