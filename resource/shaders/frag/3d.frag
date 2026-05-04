uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
varying vec2 v_texCoord;

void main()
{
    vec2 texel = vec2(1.0/u_width, 1.0/u_height);
    
    // SPLIT RGB CHANNELS
    float strength = 0.015;  // Pixel displacement
    
    vec2 redOffset   = vec2(-strength,  0.0);
    vec2 greenOffset = vec2( 0.0,       0.0);
    vec2 blueOffset  = vec2( strength,  0.0);
    
    float r = texture2D(u_texture, v_texCoord + redOffset).r;
    float g = texture2D(u_texture, v_texCoord + greenOffset).g;
    float b = texture2D(u_texture, v_texCoord + blueOffset).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
}
