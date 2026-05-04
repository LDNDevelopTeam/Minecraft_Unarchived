uniform sampler2D u_texture;
varying vec2 v_texCoord;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    gl_FragColor = vec4(1.0 - color.rgb, 1.0);
}