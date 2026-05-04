uniform sampler2D u_texture;
uniform float u_width;
uniform float u_height;

varying vec2 v_texCoord;

void main()
{
    float dx = 1.0 / u_width;
    float dy = 1.0 / u_height;

    vec3 tl = texture2D(u_texture, v_texCoord + vec2(-dx, -dy)).rgb;
    vec3 l  = texture2D(u_texture, v_texCoord + vec2(-dx,  0.0)).rgb;
    vec3 bl = texture2D(u_texture, v_texCoord + vec2(-dx,  dy)).rgb;
    vec3 t  = texture2D(u_texture, v_texCoord + vec2( 0.0, -dy)).rgb;
    vec3 b  = texture2D(u_texture, v_texCoord + vec2( 0.0,  dy)).rgb;
    vec3 tr = texture2D(u_texture, v_texCoord + vec2( dx, -dy)).rgb;
    vec3 r  = texture2D(u_texture, v_texCoord + vec2( dx,  0.0)).rgb;
    vec3 br = texture2D(u_texture, v_texCoord + vec2( dx,  dy)).rgb;

    vec3 gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    vec3 gy = -tl - 2.0*t - tr + bl + 2.0*b + br;

    float edge = length(gx + gy);

    gl_FragColor = vec4(vec3(edge), 1.0);
}