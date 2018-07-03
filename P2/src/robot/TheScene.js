
/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {
  
  constructor (renderer) {
    super();
    
    // Attributes
    this.ambientLight = null;
    this.spotLight = null;
    this.camera1 = null;
    this.camera2 = null;
    this.trackballControls1 = null;
    this.trackballControls2 = null;
    this.robot = null;
    this.ground = null;
  
    this.model = this.createModel ();
    this.add (this.model);
    this.createLights ();
    this.createCamera (renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);    
  }
  
  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    //(fov, aspect, near, far)
    this.camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    //this.camera1.position.set (60, 30, 60);
    this.camera1.position.set (0, this.robot.robotHeight*2, -this.ground.deep-1);
    var look1 = new THREE.Vector3 (0,20,0);
    this.camera1.lookAt(look1);

    this.trackballControls1 = new THREE.TrackballControls (this.camera1, renderer);
    this.trackballControls1.rotateSpeed = 5;
    this.trackballControls1.zoomSpeed = -2;
    this.trackballControls1.panSpeed = 0.5;
    this.trackballControls1.target = look1;

    this.add(this.camera1);

    var camera_pivot = new THREE.Object3D();
    this.camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera2.position.set (0, 300, 0);
    var look2 = new THREE.Vector3 (0,20,0);
    this.camera2.lookAt(look2);

    camera_pivot.add(this.camera2);
    camera_pivot.rotation.y = Math.PI/2;
    this.add(camera_pivot);
  }  
  
  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 60, 60, 40 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);

    // NEW LIGHT
    this.redLight = new THREE.SpotLight( 0xff0000 );
    this.redLight.position.set( 60, 60, -40 );
    this.redLight.castShadow = true;
    // the shadow resolution
    this.redLight.shadow.mapSize.width=2048
    this.redLight.shadow.mapSize.height=2048;
    this.add (this.redLight);
  }
  
  /// It creates the geometric model: robot and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D()
    var loaderHeadRobot = new THREE.TextureLoader();
    var texturaHeadRobot = loaderHeadRobot.load ("imgs/head.jpg");
    var loaderBodyRobot = new THREE.TextureLoader();
    var texturaBodyRobot = loaderBodyRobot.load ("imgs/body.jpg");
    this.robot = new Robot({materialHead:new THREE.MeshPhongMaterial ({map: texturaHeadRobot}), materialBody:new THREE.MeshPhongMaterial ({map: texturaBodyRobot})});
    this.robot.name = "robot";
    model.add (this.robot);
    var loader = new THREE.TextureLoader();
    var textura = loader.load ("imgs/ground.jpg");
    this.ground = new Ground (200, 400, new THREE.MeshPhongMaterial ({map: textura}), 4);
    model.add (this.ground);
    this.robot.getObjectByName ("robot").position.z = this.robot.bodyRadius+0.1-200;
    return model;
  }
  
  getRobot() {
    return this.robot;
  }
  // Public methods

  updateOvos () {
    var alturaMax = 0;
    var alturaMin = 0;

    for (var i = 0; i < this.ground.ovos.children.length; i++) {
      alturaMin = this.ground.ovos.children[i].position.y-this.ground.ovos.children[i].ovoRadius;
      if ( alturaMin >= this.robot.position.y && alturaMin <= this.robot.position.y+this.robot.robotHeight) {
        var vectorBetweenOvos = new THREE.Vector2();
        vectorBetweenOvos.subVectors (new THREE.Vector2 (this.ground.ovos.children[i].position.x, this.ground.ovos.children[i].position.z),
                                       new THREE.Vector2 (this.robot.position.x, this.robot.position.z));
        
        if (vectorBetweenOvos.length() <= (((this.ground.ovos.children[i].ovoRadius*2)+(this.robot.robotWidth))/2)) {
          console.log("Colisiona");
          this.ground.ovos.children[i].posicionZ = this.ground.deep/2;
          this.ground.ovos.children[i].position.z = this.ground.ovos.children[i].posicionZ;
        }
      }       
    }
    this.ground.updateOvos(this.robot.robotHeight);
  }

  moverRobot(keyCode) {
    this.robot.mover(keyCode);
  }

  /// It adds a new box, or finish the action
  /**
   * @param event - Mouse information
   * @param action - Which action is requested to be processed: start adding or finish.
   */
  addBox (event, action) {
    this.ground.addBox(event, action);
  }
  
  /// It moves or rotates a box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is requested to be processed: select a box, move it, rotate it or finish the action.
   */
  moveBox (event, action) {
    this.ground.moveBox (event, action);
  }
  
  /// The robot can take a box
  /**
   * @return The new height of the hook, on the top of the taken box. Zero if no box is taken
   */
  takeBox () { 
    var box = this.ground.takeBox (this.robot.getHookPosition());
    if (box === null)
      return 0; 
    else 
      return this.robot.takeBox (box); 
    // The retuned height set the new limit to down the hook
  }
  
  /// The robot drops its taken box
  dropBox () {
    var box = this.robot.dropBox ();
    if (box !== null) {
      box.position.copy (this.robot.getHookPosition());
      box.position.y = 0;
      this.ground.dropBox (box);
    }
  }

  /// It delete a box on the ground
  /**
   * @param event - Mouse information
   * @param action - Which action is requested to be processed: delete or finish the action.
   */
  deleteBox (event, action) {
    this.ground.deleteBox (event, action);
  }

  /// It sets the robot position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate (controls) {


    this.updateOvos();

    this.axis.visible = controls.axis;
    this.spotLight.intensity = controls.lightIntensity;

    if (!controls.activeRedLight) {
      this.redLight.intensity = 0;
    }
    else {
      this.redLight.intensity = 0.5;
    }
  
    if (!controls.activeLight ) {
      this.spotLight.intensity = 0;
      controls.lightIntensity = 0;
    }
    this.robot.setPosition (controls.rotationHead, controls.rotationBody, controls.height);
  }
  
  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera1 () {
    return this.camera1;
  }
  
  getCamera2 () {
    return this.camera2;
  }

  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls1 () {
    return this.trackballControls1;
  }
  
  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera1.aspect = anAspectRatio;
    this.camera1.updateProjectionMatrix();
    this.camera2.aspect = anAspectRatio;
    this.camera2.updateProjectionMatrix();
    /*
    this.robot.getCamaraSubjetiva().aspect = anAspectRatio;
    this.robot.getCamaraSubjetiva().updateProjectionMatrix();*/
  }
  
}

  // class variables
  
  // Application modes
  TheScene.NO_ACTION = 0;
  TheScene.ADDING_BOXES = 1;
  TheScene.MOVING_BOXES = 2;
  TheScene.DELETE_BOXES = 3;

  // Actions
  TheScene.NEW_BOX = 0;
  TheScene.MOVE_BOX = 1;
  TheScene.SELECT_BOX = 2;
  TheScene.ROTATE_BOX = 3;
  TheScene.DELETE_BOX = 4;
  TheScene.END_ACTION = 10;


