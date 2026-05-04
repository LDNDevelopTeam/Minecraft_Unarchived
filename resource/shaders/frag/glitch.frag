uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_glitchAmount;

void main()
{
    vec2 uv = v_texCoord;
    
    vec2 ruv = uv + vec2(sin(uv.y * 10.0) * u_glitchAmount * 0.01, 0.0);
    vec2 guv = uv;
    vec2 buv = uv + vec2(cos(uv.y * 10.0) * u_glitchAmount * 0.01, 0.0);
    
    float r = texture2D(u_texture, ruv).r;
    float g = texture2D(u_texture, guv).g;
    float b = texture2D(u_texture, buv).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
}
