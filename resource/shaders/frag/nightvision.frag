uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_nightBoost;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 night = vec3(0.1, 1.0, 0.1) * lum * u_nightBoost;
    
    gl_FragColor = vec4(night, color.a);
}
