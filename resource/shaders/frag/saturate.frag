uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_saturation;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    float grey = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 saturated = mix(vec3(grey), color.rgb, u_saturation);
    gl_FragColor = vec4(saturated, color.a);  // Preserve alpha
}
