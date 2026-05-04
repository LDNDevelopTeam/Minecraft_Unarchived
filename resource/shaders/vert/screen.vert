#version 110
varying vec2 v_texCoord;  // CHANGED: v_texCoord to match fragment
uniform float time;
void main()
{
    gl_Position = ftransform();
    v_texCoord = gl_MultiTexCoord0.xy;
}
