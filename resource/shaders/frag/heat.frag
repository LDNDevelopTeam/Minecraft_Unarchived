uniform sampler2D u_texture;
varying vec2 v_texCoord;
uniform float u_heatIntensity;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 heat = vec3(gray * u_heatIntensity, gray * 0.5, 1.0 - gray);
    
    gl_FragColor = vec4(heat, color.a);
}
