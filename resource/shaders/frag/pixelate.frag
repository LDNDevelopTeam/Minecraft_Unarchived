uniform sampler2D u_texture;
uniform float u_pixelSize;  // Higher = bigger pixels
varying vec2 v_texCoord;

void main()
{
    vec2 pixelatedUV = floor(v_texCoord * u_pixelSize) / u_pixelSize;
    vec4 color = texture2D(u_texture, pixelatedUV);
    gl_FragColor = vec4(color.rgb, color.a);
}
