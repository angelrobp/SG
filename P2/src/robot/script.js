
/// Several functions, including the main

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.activarCamaraSubjetiva = false;
    this.axis = true;
    this.activeRedLight = true;
    this.lightIntensity = 0.5;

    this.activeLight = true;

    this.rotationHead = scene.getRobot().actuallyHeadRotation;
    this.rotationBody = scene.getRobot().actuallyBodyRotation;
    this.height   = scene.getRobot().armHeightMin;
    this.addBox   = function () {
      setMessage ("Añadir cajas clicando en el suelo");
      applicationMode = TheScene.ADDING_BOXES;
    };
    this.moveBox  = function () {
      setMessage ("Mover y rotar cajas clicando en ellas");
      applicationMode = TheScene.MOVING_BOXES;
    };
    this.deleteBox  = function () {
      setMessage ("Eliminar cajas clicando en ellas");
      applicationMode = TheScene.DELETE_BOXES;
    };
    this.takeBox  = false;

    this.defaultPosition  = function () {
      setMessage ("Posición por defecto");
      this.rotationHead = 0;
      this.rotationBody = 0;
      this.height   = scene.getRobot().armHeightMin;
    };
  }
  
  var gui = new dat.GUI();
  var axisLights = gui.addFolder ('Axis and Lights');
    axisLights.add(GUIcontrols, 'axis').name('Axis on/off :');
    axisLights.add(GUIcontrols, 'activeRedLight').name('Red Light on/off :');
    
    axisLights.add(GUIcontrols, 'lightIntensity', 0, 1.0).name('Light intensity :').listen();
    
    axisLights.add(GUIcontrols, 'activeLight').name('Light on/off :');
  /*
  var actions = gui.addFolder ('Actions');
    var addingBoxes = actions.add(GUIcontrols, 'addBox').name (': Adding boxes :');
    var movingBoxes = actions.add (GUIcontrols, 'moveBox').name (': Move and rotate boxes :');
    var deleteBoxes = actions.add (GUIcontrols, 'deleteBox').name (': Delete boxes :');
    var takingBoxes = actions.add (GUIcontrols, 'takeBox').name ('Take the box below').listen();
    takingBoxes.onChange (function (value) {
        if (value) {
          newHeight = scene.takeBox();
          if (newHeight > 0) {
              GUIcontrols.height = newHeight;
              GUIcontrols.takeBox = true; 
          } else {
              GUIcontrols.takeBox = false;  
          }
        } else {
          scene.dropBox ();
        }
    });
  */
  var robotControls = gui.addFolder ('Robot Controls');
    robotControls.add (GUIcontrols, 'rotationHead', scene.getRobot().headRotationMin, scene.getRobot().headRotationMax, 0.1).name('Rotation Head :').listen();
    robotControls.add (GUIcontrols, 'rotationBody', scene.getRobot().bodyRotationMin, scene.getRobot().bodyRotationMax, 0.1).name('Rotation Body :').listen();
    robotControls.add (GUIcontrols, 'height', scene.getRobot().armHeightMin, scene.getRobot().armHeightMax, 0.1).name('Height :').listen();
    // The method  listen()  allows the height attribute to be written, not only read
  
  var actions = gui.addFolder ('Default');
  var addingBoxes = actions.add(GUIcontrols, 'defaultPosition');
  

  if (withStats)
    stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {
  
  var stats = new Stats();
  
  stats.setMode(0); // 0: fps, 1: ms
  
  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  
  $("#Stats-output").append( stats.domElement );
  
  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

function handleKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 86) { //tecla V
      GUIcontrols.activarCamaraSubjetiva = !GUIcontrols.activarCamaraSubjetiva;
    } else {
      scene.moverRobot(keyCode);
    }
}

/// It processes the clic-down of the mouse
/**
 * @param event - Mouse information
 */
function onMouseDown (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls1().enabled = true;
  } else {  
    scene.getCameraControls1().enabled = false;
    if (event.button === 0) {   // Left button
      mouseDown = true;
      switch (applicationMode) {
        case TheScene.ADDING_BOXES :
          scene.addBox (event, TheScene.NEW_BOX);
          break;
        case TheScene.MOVING_BOXES :
          scene.moveBox (event, TheScene.SELECT_BOX);
          break;
        case TheScene.DELETE_BOXES :
          scene.deleteBox (event, TheScene.DELETE_BOX);
          break;
        case TheScene.DEFAULT_POSITION :
          scene.defaultPosition (event, TheScene.MOVE_TO_DEFAULT);
          break;
        default :
          applicationMode = TheScene.NO_ACTION;
          break;
      }
    } else {
      setMessage ("");
      applicationMode = TheScene.NO_ACTION;
    }
  }
}

/// It processes the drag of the mouse
/**
 * @param event - Mouse information
 */
function onMouseMove (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
      case TheScene.DELETE_BOXES :
      case TheScene.MOVING_BOXES :
        scene.moveBox (event, TheScene.MOVE_BOX);
        break;
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
  }
}

/// It processes the clic-up of the mouse
/**
 * @param event - Mouse information
 */
function onMouseUp (event) {
  if (mouseDown) {
    switch (applicationMode) {
      case TheScene.ADDING_BOXES :
        scene.addBox (event, TheScene.END_ACTION);
        break;
      case TheScene.MOVING_BOXES :
        scene.moveBox (event, TheScene.END_ACTION);
        break;
      case TheScene.DELETE_BOXES :
        scene.deleteBox (event, TheScene.END_ACTION);
        break;
      case TheScene.DEFAULT_POSITION :
          scene.defaultPosition (event, TheScene.END_ACTION);
          break;
      default :
        applicationMode = TheScene.NO_ACTION;
        break;
    }
    mouseDown = false;
  }
}

/// It processes the wheel rolling of the mouse
/**
 * @param event - Mouse information
 */
function onMouseWheel (event) {
  if (event.ctrlKey) {
    // The Trackballcontrol only works if Ctrl key is pressed
    scene.getCameraControls1().enabled = true;
  } else {  
    scene.getCameraControls1().enabled = false;
    if (mouseDown) {
      switch (applicationMode) {
        case TheScene.MOVING_BOXES :
          scene.moveBox (event, TheScene.ROTATE_BOX);
          break;
        case TheScene.ADDING_BOXES :
        scene.moveBox (event, TheScene.ROTATE_BOX);
        break;
      }
    }
  }
}

// Se d ef i n e una f u n c i ón para ag rupa r l a s i n s t r u c c i o n e s ne ce sa ria s
// Los pa rámetros l e f t , top , width , h e i g ht toman v a l o r e s e nt r e 0 y 1
function renderViewport (escena, camara, left, top, width, height) {
  var l = left*window.innerWidth; 
  var t = top * window.innerHeight;
  var w = width * window.innerWidth; 
  var h = height * window.innerHeight;
  renderer.setViewport(l, t, w, h); renderer.setScissor(l, t, w, h);
  renderer.setScissorTest(true);
  camara.aspect = w/h;
  renderer.render(escena, camara) ;
}

/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;  
}

/// It renders every frame
function render() {
  if (GUIcontrols.takeBox && GUIcontrols.height >= 20) {
    GUIcontrols.takeBox = false;
    scene.dropBox();
  }
  requestAnimationFrame(render);
  
  stats.update();
  scene.getCameraControls1().update ();
  scene.animate(GUIcontrols);

  // En l a f u n c i ón de v i s u a l i z a c i ón se llama a l a f u n c i ón a n t e r i o r
  // para todas l o s v i ew p o rt s que se deseen a c t u a l i z a r
  if (GUIcontrols.activarCamaraSubjetiva) {
    renderViewport (scene, scene.getRobot().getCamaraSubjetiva(), 0, 0, 1, 1) ;
  } else {
    renderViewport (scene, scene.getCamera1(), 0, 0, 1, 1) ;
  }  
  renderViewport (scene, scene.getCamera2(), 0.7, 0.7, 0.3, 0.3) ;
  //renderer.render(scene, scene.getCamera1());
}

/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();
  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener('keydown', handleKeyDown, true);
  window.addEventListener ("mouseup", onMouseUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox
  
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
 
  createGUI(true);

  render();
});
