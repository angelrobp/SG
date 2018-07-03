scene = null;
GUIcontrols = null;
stats = null;

function renderViewport(escena, camara, left, top, width, height){
  var l = left * window.innerWidth;
  var t = top * window.innerHeight;
  var w = width * window.innerWidth;
  var h = height * window.innerHeight;
  renderer.setViewport(l, t, w, h); renderer.setScissor(l, t, w, h);
  renderer.setScissorTest(true);
  camara.aspect = w/h;
  renderer.render(escena, camara) ;
}

function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

function createRenderer(){
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

function render(){
  requestAnimationFrame(render);

  stats.update();
  scene.getCamaraControl().update();
  scene.animate(GUIcontrols);

  renderViewport (scene, scene.getCamara(), 0, 0, 1, 1) ;
}

function createGUI(withStats){
  GUIcontrols = new function(){
    this.axis = true;
  }

  var gui = new dat.GUI();
  var axisLights = gui.addFolder('Axis');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off:');

  if(withStats)
    stats = initStats();
}

function initStats(){
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  $("#Stats-output").append( stats.domElement );

  return stats;
}

function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

function handleKeyDown(event) {
    var keyCode = event.which;
    scene.controlNave(keyCode);
}

function onMouseWheel(event){
  if(event.ctrlKey){
    scene.getCamaraControl().enabled = true;
  } else{
    scene.getCamaraControl().enabled = false;
  }

}

function onMouseDown(event){
  if(event.ctrlKey){
    scene.getCamaraControl().enabled = true;
  } else{
    scene.getCamaraControl().enabled = false;
  }
}

$(function(){
  renderer = createRenderer();
  $("#WebGL-output").append(renderer.domElement);
  //listeners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); //For firefox

  scene = new TheScene(renderer.domElement);
  $('#saveNombre').submit(function(e) {
    e.preventDefault();
    document.getElementById("nombreUsuario").innerHTML= $('.input-name').val();
    document.getElementById("insertarNombre").style.display = 'none';
    scene.iniciarJuego();
  });
  createGUI(true)

  render();
});
