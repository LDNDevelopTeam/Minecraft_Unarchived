uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;

varying vec2 v_texCoord;

void main()
{
    float offset = 1.5 / u_width;

    float r = texture2D(u_texture, v_texCoord + vec2(offset, 0.0)).r;
    float g = texture2D(u_texture, v_texCoord).g;
    float b = texture2D(u_texture, v_texCoord - vec2(offset, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
}