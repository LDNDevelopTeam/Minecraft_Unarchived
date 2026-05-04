uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;
uniform float time;
varying vec2 v_texCoord;

void main()
{
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // VERY SLOW SMOOTH CYCLES (4s period)
    float slowPulse = sin(time * 0.5) * 0.5 + 0.5;  // 4s cycle
    
    // GENTLE HUE DRIFT (±5° max)
    float hueDrift = sin(time * 0.2) * 0.08;  // Very subtle
    float cosH = cos(hueDrift);
    float sinH = sin(hueDrift);
    mat3 hueMatrix = mat3(
        cosH, -sinH, 0.0,
        sinH,  cosH, 0.0,
        0.0,  0.0,  1.0
    );
    color.rgb = hueMatrix * color.rgb;
    
    // TINY SATURATION BREATHING (0.85-1.15 range)
    float satPulse = 0.85 + slowPulse * 0.3;
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayColor = vec3(gray);
    color.rgb = mix(grayColor, color.rgb, satPulse);
    
    // NO INVERT, NO FLASHING - just gentle brightness
    color.rgb *= 0.95 + sin(time * 0.3) * 0.05;  // ±5% brightness
    
    color.rgb = clamp(color.rgb, 0.0, 1.0);
    gl_FragColor = color;
}
