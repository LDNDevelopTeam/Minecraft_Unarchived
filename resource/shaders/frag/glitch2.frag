uniform sampler2D texture;
uniform float time;
uniform float strength;

varying vec2 vertTexCoord;

float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = vertTexCoord;

    float glitchLine = floor(uv.y * (10.0 + rand(vec2(time)) * 20.0));

    float lineNoise = rand(vec2(time, glitchLine));

    vec2 offset = vec2(0.0);

    if (lineNoise < strength) {
        offset.x = (rand(vec2(time, lineNoise)) - 0.5) * strength;
    }

    float r = texture2D(texture, uv + offset).r;
    float g = texture2D(texture, uv + offset * 1.2).g;
    float b = texture2D(texture, uv + offset * 1.5).b;

    gl_FragColor = vec4(r, g, b, 1.0);
}