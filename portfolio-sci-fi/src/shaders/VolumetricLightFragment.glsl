niform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;
uniform vec3 cameraPosition;
uniform float cameraFar;

uniform sampler2D tDepth; // <--- ZMIANA: Standardowa nazwa dla tekstury głębi
uniform sampler2D blueNoiseTexture;
uniform bool enableBlueNoise;
uniform int frame;

// Parametry światła
uniform vec3 lightPosition;
uniform vec3 lightDirection;
uniform float coneAngle;
uniform mat4 lightViewMatrix;
uniform mat4 lightProjectionMatrix;
uniform sampler2D shadowMap;
uniform float shadowBias;

// ------ FUNKCJE POMOCNICZE (bez zmian) ------
float readDepth(sampler2D depthSampler, vec2 coord) {
  // W WebGL2/Three.js tekstura głębi jest odczytywana inaczej niż surowa wartość
return texture(depthSampler, coord).r;
}

vec3 getWorldPosition(vec2 uv, float depth) {
float clipZ = depth * 2.0 - 1.0;
vec2 ndc = uv * 2.0 - 1.0;
vec4 clip = vec4(ndc, clipZ, 1.0);
vec4 view = projectionMatrixInverse * clip;
view /= view.w; // <- Ważna perspektywiczna korekta
vec4 world = viewMatrixInverse * view;
return world.xyz;
}

float calculateShadow(vec3 worldPosition) {
vec4 lightClipPos = lightProjectionMatrix * lightViewMatrix * vec4(worldPosition, 1.0);
vec3 lightNDC = lightClipPos.xyz / lightClipPos.w;
vec2 shadowCoord = lightNDC.xy * 0.5 + 0.5;
float lightDepth = lightNDC.z * 0.5 + 0.5;

if(shadowCoord.x < 0.0 || shadowCoord.x > 1.0 || shadowCoord.y < 0.0 || shadowCoord.y > 1.0 || lightDepth > 1.0) {
return 1.0;
}

  // W Three.js, shadow map może wymagać PCF lub innych technik
  // Dla prostoty, używamy prostego porównania
float shadowMapDepth = texture(shadowMap, shadowCoord).r;
if(lightDepth > shadowMapDepth + shadowBias) {
return 0.0;
}
return 1.0;
}

float sdCone(vec3 p, vec3 axisOrigin, vec3 axisDir, float angleRad) {
    // ... bez zmian
vec3 p_to_origin = p - axisOrigin;
float h = dot(p_to_origin, axisDir);
float r = length(p_to_origin - axisDir * h);
float c = cos(angleRad);
float s = sin(angleRad);
vec2 q = vec2(r, h);
float distToSurfaceLine = r * c - h * s;
float distToApexPlane = - h;
if(h < 0.0 && distToSurfaceLine > 0.0) {
return length(p_to_origin);
}
vec2 boundaryDists = vec2(distToSurfaceLine, distToApexPlane);
return length(max(boundaryDists, 0.0)) + min(max(boundaryDists.x, boundaryDists.y), 0.0);
}

const float SCATTERING_ANISO = 0.5;
float HGPhase(float mu) {
    // ... bez zmian
float g = SCATTERING_ANISO;
float gg = g * g;
float denom = 1.0 + gg - 2.0 * g * mu;
denom = max(denom, 0.0001);
float scatter = (1.0 - gg) / pow(denom, 1.5);
return scatter;
}

float BeersLaw(float dist, float absorption) {
return exp(- dist * absorption);
}

// ------ STAŁE SHADERA (bez zmian) ------
const float STEP_SIZE = 0.4;
const int NUM_STEPS = 50;
const vec3 lightColor = vec3(0.4);
const float LIGHT_INTENSITY = 3.5;
const float FOG_INTENSITY = 0.02;

// ------ GŁÓWNA FUNKCJA SHADERA ------
// vUv jest przekazywane automatycznie przez framework post-processingu
varying vec2 vUv;

void main() {
  // Pobierz oryginalny kolor sceny
vec4 inputColor = texture(inputBuffer, vUv);

  // Twoja logika
float depth = readDepth(tDepth, vUv);
vec3 worldPosition = getWorldPosition(vUv, depth);

vec3 rayOrigin = cameraPosition;
vec3 rayDir = normalize(worldPosition - rayOrigin);

float sceneDepth = length(worldPosition - cameraPosition);

vec3 lightPos = lightPosition;
vec3 lightDir = normalize(lightDirection);

float coneAngleRad = radians(coneAngle);
float halfConeAngleRad = coneAngleRad * 0.5;

  // Blue noise do ditherowania
float blueNoise = texture(blueNoiseTexture, gl_FragCoord.xy / 1024.0).r;
float offset = fract(blueNoise + float(frame % 32) / sqrt(0.5));
float t = STEP_SIZE;
if(enableBlueNoise) {
t *= offset;
}

float transmittance = 1.0;
vec3 accumulatedLight = vec3(0.0);

for(int i = 0;
i < NUM_STEPS;
i ++) {
vec3 samplePos = rayOrigin + rayDir * t;

if(t > sceneDepth || t > cameraFar) {
break;
}

float shadowFactor = calculateShadow(samplePos);
if(shadowFactor == 0.0) {
t += STEP_SIZE;
continue;
}

float sdfVal = sdCone(samplePos, lightPos, lightDir, halfConeAngleRad);
float density = - sdfVal;

if(density < 0.5) {
t += STEP_SIZE;
continue;
}

float distanceToLight = length(samplePos - lightPos);
vec3 sampleLightDir = normalize(samplePos - lightPos);
float attenuation = exp(- 0.35 * distanceToLight);
float scatterPhase = HGPhase(dot(rayDir, - sampleLightDir));
vec3 luminance = lightColor * LIGHT_INTENSITY * attenuation * scatterPhase;
float stepDensity = FOG_INTENSITY * density;
stepDensity = max(stepDensity, 0.0);
float stepTransmittance = BeersLaw(stepDensity * STEP_SIZE, 1.0);
transmittance *= stepTransmittance;
accumulatedLight += luminance * transmittance * stepDensity * STEP_SIZE;

t += STEP_SIZE;
}

vec3 volumetricLight = accumulatedLight;
vec3 finalColor = inputColor.rgb + volumetricLight;

gl_FragColor = vec4(finalColor, 1.0);
}