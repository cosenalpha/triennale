/**
 * dwgl.js - a very lightweight webgl wrapper.
 * 
 * Copyright 2018 by Thomas Diewald (https://www.thomasdiewald.com)
 *
 *           MIT License: https://opensource.org/licenses/MIT
 *            ource: https://github.com/diwi/p5.EasyCam (will be moved)
 *
 * versions: webgl1, webgl2
 *
 */
 
/**
 * Note:
 * This is just a draft and for experimental purposes only.
 * To work with it you need a browser that supports webgl2.
 * 
 * http://webglreport.com/?v=2
 * https://caniuse.com/#feat=webgl2
 * https://webglstats.com/
 *
 */
 
 
/**
 * This Reaction-Diffusion Demo is a port from the PixelFlow-Library.
 * https://github.com/diwi/PixelFlow/tree/master/examples/Miscellaneous/ReactionDiffusion
 */
 
 
 'use strict';

//prova
 // framebuffer
 var fbo;
 
 // tex-struct (ping-pong)
 var tex = 
 {
   src : null,
   dst : null,
   swap : function(){
     var tmp = this.src;
     this.src = this.dst;
     this.dst = tmp;
   }
 };
 
 // shader
 var shaderfiles = {};
 var shader_grayscott;
 var shader_display;

 var gl;
 var def;
 
 // offscreen resolution scale factor.
 var SCREEN_SCALE = 1.0 / devicePixelRatio;
 let feed2 = 0.04;
 // reaction diffusion settings and presets
 var rdDef = {
   name    : 'ReactionDiffusion',
   da      : 1.0,
   db      : 0.5,
   feed    : feed2,
   kill    : 0.06,
   dt      : 1.0,
   iter    : 10,
   reset   : initRD,
   preset0 : function() {  this.feed = 0.040; this.kill = 0.060; this.da = 1.00; this.db = 0.60; },
   preset1 : function() {  this.feed = 0.034; this.kill = 0.059; this.da = 1.00; this.db = 0.60; },
   preset2 : function() {  this.feed = 0.080; this.kill = 0.060; this.da = 1.00; this.db = 0.40; },
   preset3 : function() {  this.feed = 0.015; this.kill = 0.050; this.da = 1.00; this.db = 0.60; },
   preset4 : function() {  this.feed = 0.072; this.kill = 0.062; this.da = 0.50; this.db = 0.25; },
   preset5 : function() {  this.feed = 0.071; this.kill = 0.063; this.da = 0.40; this.db = 0.20; },
   preset6 : function() {  this.feed = 0.023; this.kill = 0.052; this.da = 0.50; this.db = 0.50; },
   preset7 : function() {  this.feed = 0.029; this.kill = 0.056; this.da = 0.60; this.db = 0.46; },
 };
 
 let canvas, title, texture, test;
 
 let shaderProgram;
 let texture2;
 
 function preload() {
   title = loadImage("assets/anthro.png");
   shaderProgram = loadShader("shader/edgeDetection.vert", "shader/edgeDetection.frag");
 }
 
 function setup() { 

  //pixelDensity(1)
  pixelDensity(1)
   
   // webgl canvas
   canvas = createCanvas(windowWidth * devicePixelRatio, windowHeight * devicePixelRatio, WEBGL).parent(document.getElementById("container"));
  //  document.querySelector("canvas").style.width = "50%";
  //  canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL).parent(document.getElementById("#container"));
   
   //document.getElementById("#container").appendChild(document.querySelector("canvas"));

   document.querySelector("canvas").style.width = window.innerWidth + "px";
   document.querySelector("canvas").style.height = window.innerHeight + "px";
   
   // webgl context
  gl = this._renderer.GL;
   
   // webgl version (1=webgl1, 2=webgl2)
   var VERSION = gl.getVersion();
   
   console.log("WebGL Version: "+VERSION);
   
   // beeing lazy ... load all available extensions.
   gl.newExt(gl.getSupportedExtensions(), true);
 
   
   // create FrameBuffer for offscreen rendering
   fbo = gl.newFramebuffer();
 
   // create Textures for multipass rendering
  def = {
      target   : gl.TEXTURE_2D
     ,iformat  : gl.RGBA32F
     ,format   : gl.RGBA
     ,type     : gl.FLOAT
     ,wrap     : gl.CLAMP_TO_EDGE
     ,filter   : [gl.NEAREST, gl.LINEAR]
   }
 
   
   var tex_w = ceil(width * SCREEN_SCALE);
   var tex_h = ceil(height * SCREEN_SCALE);
 
   tex.src = gl.newTexture(tex_w, tex_h, def);
   tex.dst = gl.newTexture(tex_w, tex_h, def);
 
  //  texture = gl.newTexture(title.width, title.height, title)
 
   
   // Shader source, depending on available webgl version
   var fs_grayscott = shaderfiles["webgl"+VERSION+".fs_grayscott"];
   var fs_display   = shaderfiles["webgl"+VERSION+".fs_display"];
   // crreate Shader
   shader_grayscott = new Shader(gl, {fs:fs_grayscott});
   shader_display   = new Shader(gl, {fs:fs_display});
  
   // place initial samples
   initRD();
 }
 
 
 
 function windowResized() {

  if (window.innerWidth > 450) { 
  remove();
  window.location.reload();
  }


  //  if(!fbo) return;
  //  var w = windowWidth;
  //  var h = windowHeight;
  //  pixelDensity(1)
  //  canvas = resizeCanvas(windowWidth * devicePixelRatio, windowHeight * devicePixelRatio);

  //  document.querySelector("canvas").style.width = window.innerWidth + "px";
  //  document.querySelector("canvas").style.height = window.innerHeight + "px";
   
  //  var tex_w = ceil(width * SCREEN_SCALE);
  //  var tex_h = ceil(height * SCREEN_SCALE);
   
  //  tex.src.resize(tex_w, tex_h);
  //  tex.dst.resize(tex_w, tex_h);
 
  //  initRD();
  
  // console.log("RESIZE")




  //  var w = windowWidth;
  //  var h = windowHeight;

  //  pixelDensity(1)
   
  //  canvas = resizeCanvas(windowWidth * devicePixelRatio, windowHeight * devicePixelRatio, WEBGL);

  //  document.querySelector("canvas").style.width = window.innerWidth + "px";
  //  document.querySelector("canvas").style.height = window.innerHeight + "px";
   
  //  var tex_w = ceil(width * SCREEN_SCALE);
  //  var tex_h = ceil(height * SCREEN_SCALE);
 
  //  tex.src = gl.newTexture(tex_w, tex_h, def);
  //  tex.dst = gl.newTexture(tex_w, tex_h, def);
   
  //  // Shader source, depending on available webgl version
  //  var fs_grayscott = shaderfiles["webgl"+VERSION+".fs_grayscott"];
  //  var fs_display   = shaderfiles["webgl"+VERSION+".fs_display"];
  //  // crreate Shader
  //  shader_grayscott = new Shader(gl, {fs:fs_grayscott});
  //  shader_display   = new Shader(gl, {fs:fs_display});
  
   // place initial samples
   initRD();
 }
   
 // *************************************** QUA SI CAMBIANO I COLORI ************************//
 
 // shading colors
 var pallette = [
   0.00, 0.00, 0.00,
   0.00, 0.00, 0.00,
   0.00, 0.00, 0.00,
   1.00, 1.00, 1.00,
   1.00, 1.00, 1.00,     
   1.00, 1.00, 1.00,
   1.00, 1.00, 1.00
 ];
 
 function draw(){
  //  pixelDensity(2);
 
   background(255, 255, 255);
 
   if(!fbo) return;
   // ortho(0, width, -height, 0, 0, 20000);
   push();
   ortho();
   translate(-width/2, -height/2, 0);
   updateRD();
   pop();
 
   var w = tex.dst.w / SCREEN_SCALE;
   var h = tex.dst.h / SCREEN_SCALE;
   
   // display result
   shader_display.viewport(0, 0, w, h);
   shader_display.begin();
   shader_display.uniformF('PALLETTE', pallette, 7); 
   shader_display.uniformT('tex', tex.src);
   shader_display.uniformT('title', texture);
   shader_display.uniformF('wh_rcp', [1.0/w, 1.0/h]);
   shader_display.quad();
   shader_display.end();
  
   let scale = 0.8;
 
   imageMode(CENTER);
  //  image(title, 0, 0, scale*w, scale*w/title.width * title.height);
    image(title, 0, 0, scale*width, scale * width * title.height/title.width);
    

 
   
    // Set the shader active
    shader(shaderProgram);

    
 
    // Pass the texture to the shader
    shaderProgram.setUniform('tex0', canvas);
    shaderProgram.setUniform('u_resolution', [width, height]);
  
    // Draw a rectangle to fill the whole screen
   noStroke();
   rect(0, 0, width, height);
   
 }
 
 
 function initRD(){
   ortho();
   // translate(-width/2, -height/2, 0);
     
   var gl = fbo.gl;
   
   // bind framebuffer and texture for offscreenrendering
   fbo.begin(tex.dst);
   
   var w = tex.dst.w;
   var h = tex.dst.h;
   
   gl.viewport(0, 0, w, h);
   gl.clearColor(1.0, 0.0, 0.0, 0.0);
   gl.clear(gl.COLOR_BUFFER_BIT);
   gl.disable(gl.BLEND);
   gl.disable(gl.DEPTH_TEST);
   
   // ***************************************QUA SI CAMBIANO LE COORDINATE E LE DIMENSIONI DEI PUNTI DI PARTENZA ************************//
 
   // < native p5 here
   noStroke();
   fill(0,255,0);
   ellipse(-100, 0, 5, 5);
   ellipse(+100, 0, 5, 5);
   ellipse(0, -100, 5, 5);
   ellipse(0, +100, 5, 5);
 
   // >
   tex.swap();
   fbo.end();
 
 }
 
 
 function updateRD(){
 
   var gl = fbo.gl;
 
   // multipass rendering (ping-pong)
   for(var i = 0; i < rdDef.iter; i++){
     
     // set texture as rendertarget
     fbo.begin(tex.dst);
     
     var w = tex.dst.w;
     var h = tex.dst.h;
  
     // clear texture
     gl.viewport(0, 0, w, h);
     gl.clearColor(1.0, 0.0, 0.0, 0.0);
     gl.clear(gl.COLOR_BUFFER_BIT);
     gl.disable(gl.BLEND);
     gl.disable(gl.DEPTH_TEST);
     
     // apply shader
     shader_grayscott.begin();
     shader_grayscott.uniformF("dA"    , [rdDef.da]);
     shader_grayscott.uniformF("dB"    , [rdDef.db]);
     shader_grayscott.uniformF("feed"  , [rdDef.feed]);
     shader_grayscott.uniformF("kill"  , [rdDef.kill]);
     shader_grayscott.uniformF("dt"    , [rdDef.dt]);
     shader_grayscott.uniformF("wh_rcp", [1.0/w, 1.0/h]);
     shader_grayscott.uniformT("tex"   , tex.src);
     shader_grayscott.quad();
     shader_grayscott.end();
     // < native p5 here
     if(mouseIsPressed){
       resetShader();
       noStroke();
       fill(0,255,0);
       ellipse(mouseX, mouseY, 25, 25);
       shader(shaderProgram);
     }
     // >
     
     // ping-pong
     tex.swap();
   }
   
   // end fbo, so p5 can take over again.
   fbo.end(); 
 }
 
 
 (function () {
  
   var loadJS = function(filename){
     var script = document.createElement("script");
     script.setAttribute("type","text/javascript");
     script.setAttribute("src", filename);
     document.getElementsByTagName("head")[0].appendChild(script);
   }
 
   loadJS("https://rawgit.com/diwi/p5.EasyCam/master/dwgl.js");
   loadJS("https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.5/dat.gui.min.js");
   
   document.oncontextmenu = function() { return false; }
   document.onmousedown   = function() { return false; }
  
 })();