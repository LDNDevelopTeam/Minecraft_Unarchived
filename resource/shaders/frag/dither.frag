uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;

varying vec2 v_texCoord;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);

    float x = mod(gl_FragCoord.x, 4.0);
    float y = mod(gl_FragCoord.y, 4.0);

    float threshold = (x + y * 4.0) / 16.0;

    float grey = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    float d = grey > threshold ? 1.0 : 0.0;

    gl_FragColor = vec4(vec3(d), 1.0);
}