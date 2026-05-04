uniform sampler2D u_texture;
varying vec2 v_texCoord;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);

    float levels = 6.0;

    color.rgb = floor(color.rgb * levels) / levels;

    gl_FragColor = color;
}