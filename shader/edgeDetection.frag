// precision highp float;

// uniform sampler2D tex0;
// varying vec2 vTexCoord;

// const float threshold = 0.1; // soglia per il rilevamento dei bordi

// void main() {
//   // Lettura dei pixel circostanti
//   vec4 top = texture2D(tex0, vTexCoord + vec2(0.0, -1.0)/512.0);
//   vec4 bottom = texture2D(tex0, vTexCoord + vec2(0.0, 1.0)/512.0);
//   vec4 left = texture2D(tex0, vTexCoord + vec2(-1.0, 0.0)/512.0);
//   vec4 right = texture2D(tex0, vTexCoord + vec2(1.0, 0.0)/512.0);
//   vec4 center = texture2D(tex0, vTexCoord);

//   // Calcolo del gradiente
//   float edge = length((top.rgba - bottom.rgba + left.rgba - right.rgba) / 2.0);

//   // Applicazione della soglia
//   if (edge > threshold) {
//     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//   } else {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   }
// }

// precision highp float;

// uniform sampler2D tex0;
// uniform vec2 u_resolution;
// varying vec2 vTexCoord;

// const float threshold = 0.1; // soglia per il rilevamento dei bordi

// void main() {
//   // Calcola le coordinate di texture relative alla canvas
//   vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
//   st.y = 1.0 - st.y; // inverti la coordinata y per adattarla a WebGL, comando che mette la canva senza ribaltarla

//   // Lettura dei pixel circostanti
//   vec4 top = texture2D(tex0, st + vec2(0.0, -1.0)/3072.0); //prima era tutto /512. ho messo 1000 perché l'effetto è più bello
//   vec4 bottom = texture2D(tex0, st + vec2(0.0, 1.0)/3072.0);
//   vec4 left = texture2D(tex0, st + vec2(-1.0, 0.0)/3072.0);
//   vec4 right = texture2D(tex0, st + vec2(1.0, 0.0)/3072.0);
//   vec4 center = texture2D(tex0, st);

//   // Calcolo del gradiente
//   float edge = length((top.rgba - bottom.rgba + left.rgba - right.rgba) / 2.0);

//   // Applicazione della soglia
//   if (edge > threshold) {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   } else {
//     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//   }
// }

// //CODICE CHE VA
// precision highp float;

// uniform sampler2D tex0;
// uniform vec2 u_resolution;
// varying vec2 vTexCoord;

// const int samples = 4;

// void main() {
//   // Calcola le coordinate di texture relative alla canvas
//   vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
//   st.y = 1.0 - st.y; // inverti la coordinata y per adattarla a WebGL, comando che mette la canva senza ribaltarla

//   // Lettura dei pixel circostanti
//   vec4 top = texture2D(tex0, st + vec2(0.0, -1.0)/1024.0);
//   vec4 bottom = texture2D(tex0, st + vec2(0.0, 1.0)/1024.0);
//   vec4 left = texture2D(tex0, st + vec2(-1.0, 0.0)/1024.0);
//   vec4 right = texture2D(tex0, st + vec2(1.0, 0.0)/1024.0);

//   // Calcolo del gradiente con il filtro di Sobel
//   float gx = -left.r + right.r - top.r * 2.0 + bottom.r * 2.0;
//   float gy = -top.r + bottom.r - left.r * 2.0 + right.r * 2.0;
//   float edge = length(vec2(gx, gy));

//   // Applicazione della soglia
//   const float threshold = 0.4;
// //   if (edge > threshold) {
// //     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
// //   } else {
// //     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
// //   }
// // }

//   // Applicazione della soglia
//   if (edge > threshold) {
//     // Supersampling per l'antialiasing
//     vec4 color = vec4(0.0);
//     for (int i = 0; i < samples; i++) {
//       for (int j = 0; j < samples; j++) {
//         vec2 offset = vec2(float(i), float(j)) / float(samples) - 0.5;
//         color += texture2D(tex0, st + offset / u_resolution.xy);
//       }
//     }
//     color /= float(samples * samples);
//     gl_FragColor = color;
//   } else {
//     gl_FragColor = vec4(1.0);
//   }
// }

// precision highp float;

// uniform sampler2D tex0;
// uniform vec2 u_resolution;
// varying vec2 vTexCoord;

// const float threshold = 0.001; // soglia per il rilevamento dei bordi
// const float smoothing = 7.4; // fattore di sfumatura dei bordi

// void main() {
//   // Calcola le coordinate di texture relative alla canvas
//   vec2 st = gl_FragCoord.xy / u_resolution.xy;

//   st.y = 1.0 - st.y; // inverti la coordinata y per adattarla a WebGL, comando che mette la canva senza ribaltarla

//   // Lettura dei pixel circostanti
//   vec4 top = texture2D(tex0, st + vec2(0.0, -1.0)/512.0);
//   vec4 bottom = texture2D(tex0, st + vec2(0.0, 1.0)/512.0);
//   vec4 left = texture2D(tex0, st + vec2(-1.0, 0.0)/512.0);
//   vec4 right = texture2D(tex0, st + vec2(1.0, 0.0)/512.0);

//   // Calcolo del gradiente
  
//   float gx = -left.r + right.r - top.r * 2.0 + bottom.r * 2.0;
// float gy = -top.r + bottom.r - left.r * 2.0 + right.r * 2.0;
// float edge = length(vec2(gx, gy));

//   // Sfumatura dei bordi
//   float smooth = smoothstep(threshold, threshold + smoothing, edge);

//   // Applicazione del colore
//   vec4 color = vec4(smooth);

//   // Colore del pixel
//   gl_FragColor = color;
// }

// precision highp float;

// uniform sampler2D tex0;
// uniform vec2 u_resolution;
// varying vec2 vTexCoord;

// const float threshold = 0.1;
// const float edgeStrength = 0.2;

// void main() {
//   vec2 st = gl_FragCoord.xy / u_resolution.xy;
//   st.y = 1.0 - st.y;
//   vec4 top = texture2D(tex0, st + vec2(0.0, -1.0)/u_resolution.y);
//   vec4 bottom = texture2D(tex0, st + vec2(0.0, 1.0)/u_resolution.y);
//   vec4 left = texture2D(tex0, st + vec2(-1.0, 0.0)/u_resolution.x);
//   vec4 right = texture2D(tex0, st + vec2(1.0, 0.0)/u_resolution.x);
//   vec4 center = texture2D(tex0, st);
//   float edge = length((top.rgb - bottom.rgb + left.rgb - right.rgb) / 2.0);
//   float edgeSmooth = smoothstep(threshold, threshold + 0.02, edge);
//   vec4 edgeColor = vec4(vec3(edgeSmooth * edgeStrength), 1.0);
//   vec4 bgColor = vec4(vec3(1.0 - edgeSmooth * edgeStrength), 1.0);
//   gl_FragColor = mix(bgColor, edgeColor, edgeSmooth);
// }

// precision highp float;

// uniform sampler2D tex0;
// uniform vec2 u_resolution;
// varying vec2 vTexCoord;

// const float threshold = 0.1; // soglia per il rilevamento dei bordi
// const float smoothing = 11.9; // fattore di sfumatura dei bordi

// void main() {
//   // Calcola le coordinate di texture relative alla canvas
//   vec2 st = gl_FragCoord.xy / u_resolution.xy;

//   st.y = 1.0 - st.y; // inverti la coordinata y per adattarla a WebGL, comando che mette la canva senza ribaltarla

//   // Lettura dei pixel circostanti
//   vec4 top = texture2D(tex0, st + vec2(0.0, -1.0)/512.0);
//   vec4 bottom = texture2D(tex0, st + vec2(0.0, 1.0)/512.0);
//   vec4 left = texture2D(tex0, st + vec2(-1.0, 0.0)/512.0);
//   vec4 right = texture2D(tex0, st + vec2(1.0, 0.0)/512.0);

//   // Calcolo del gradiente
//    float gx = -left.r + right.r - top.r * 10.0 + bottom.r * 10.0;
//   float gy = -top.r + bottom.r - left.r * 10.0 + right.r * 10.0;
//   float edge = length(vec2(gx, gy));
//   //float edge = length((top.rgba - bottom.rgba + left.rgba - right.rgba) / 2.0);

//   // Sfumatura dei bordi
//   float smooth = smoothstep(threshold, threshold + smoothing, edge);

//   // Applicazione del colore
//   vec4 color = vec4(smooth);

//   // Colore del pixel
//   gl_FragColor = color;
// }

precision highp float;

uniform sampler2D tex0;
uniform vec2 u_resolution;
varying vec2 vTexCoord;

const vec2 offset = vec2(1.0 / 1024.0, 1.0 / 1024.0); // offset per la lettura dei pixel circostanti
const float threshold = 0.9; // soglia per il rilevamento dei bordi

void main() {
  // Calcola le coordinate di texture relative alla canvas
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  st.y = 1.0 - st.y; // inverti la coordinata y per adattarla a WebGL, comando che mette la canva senza ribaltarla

  // Lettura dei pixel circostanti
  vec4 top_left = texture2D(tex0, st + vec2(-offset.x, -offset.y));
  vec4 top_center = texture2D(tex0, st + vec2(0.0, -offset.y));
  vec4 top_right = texture2D(tex0, st + vec2(offset.x, -offset.y));
  vec4 middle_left = texture2D(tex0, st + vec2(-offset.x, 0.0));
  vec4 middle_center = texture2D(tex0, st);
  vec4 middle_right = texture2D(tex0, st + vec2(offset.x, 0.0));
  vec4 bottom_left = texture2D(tex0, st + vec2(-offset.x, offset.y));
  vec4 bottom_center = texture2D(tex0, st + vec2(0.0, offset.y));
  vec4 bottom_right = texture2D(tex0, st + vec2(offset.x, offset.y));

  // Calcolo del gradiente
  float gx = -top_left.r + top_right.r - 2.0 * middle_left.r + 2.0 * middle_right.r - bottom_left.r + bottom_right.r;
  float gy = top_left.r + 2.0 * top_center.r + top_right.r - bottom_left.r - 2.0 * bottom_center.r - bottom_right.r;
  float edge = smoothstep(threshold - 0.05, threshold + 3.05, length(vec2(gx, gy)));

  // Applicazione del colore
  gl_FragColor = mix(vec4(1.0), vec4(0.0, 0.0, 0.0, 1.0), edge);
}

