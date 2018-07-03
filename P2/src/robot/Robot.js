
/// The Crane class
/**
 * @author Angel Robledillo
 * 
 * @param parameters = {
 *      robotHeight: <float>,
 *      robotWidth : <float>,
 *      materialHead: <Material>
 *      materialBody: <Material>
 * }
 */



class Robot extends THREE.Object3D {
  
  constructor (parameters) {
    super();
    /*
    // If there are no parameters, the default values are used
    
    this.craneHeight = (parameters.craneHeight === undefined ? 30 : parameters.craneHeight);
    this.craneWidth  = (parameters.craneWidth === undefined ? 45 : parameters.craneWidth);
    this.materialBody    = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0x00ffff, specular: 0xfbf804, shininess: 70}) : parameters.material);
      */    

    // If there are no parameters, the default values are used
    
    this.robotHeight = (parameters.robotHeight === undefined ? 40 : parameters.robotHeight);
    this.robotWidth  = (parameters.robotWidth === undefined ? 25 : parameters.robotWidth);
    this.materialHead    = (parameters.materialHead === undefined ? new THREE.MeshPhongMaterial ({color: 0x00ffff, specular: 0xfbf804, shininess: 70}) : parameters.materialHead);
    this.materialBody    = (parameters.materialBody === undefined ? new THREE.MeshPhongMaterial ({color: 0x00ffff, specular: 0xfbf804, shininess: 70}) : parameters.materialBody);
    this.bodyHeight = this.robotHeight * 0.665;
    this.bodyRadius = (this.robotWidth * 0.9)/2;
    

    this.eyeRadius = this.robotHeight*0.05;

    // Height of different parts
    this.baseHeight = this.robotHeight*0.11; //11%
    this.baseBottomRadius = this.robotWidth*0.282; //28.5%
    this.baseTopRadius = this.robotWidth*0.142; //14.2%

    this.armWidth = ((Math.pow((2*this.baseTopRadius), 2))/2);
    this.armWidth = Math.sqrt(this.armWidth);

    this.shoulderHeight = this.armWidth*2;
    this.shoulderRadius = this.baseTopRadius; //1

    this.trolleyHeight  = this.craneHeight/20;
    
    // Limits
    this.distanceMin  = this.craneWidth/7;
    this.distanceMax  = 0.75*this.craneWidth;

    this.armHeightMin = (this.robotHeight*0.445) + this.shoulderRadius; //44.5%
    this.armHeightMax    = (this.armHeightMin*0.2) + this.armHeightMin;

    // With these variables, the posititon of the hook is set
    this.angle           = 0;
    this.distance        = this.craneWidth / 2;
    this.actuallyArmHeight          = this.armHeightMin;

    this.bodyAltitude = (this.robotHeight*0.22)+(this.actuallyArmHeight-this.armHeightMin);
    this.actuallyBodyRotation = 0;
    this.bodyRotationMin = -45;
    this.bodyRotationMax = 30;

    this.actuallyHeadRotation = 0;
    this.headRotationMin = -80;
    this.headRotationMax = 80;

    this.leftArm = null;

    this.armRight = null;
    this.armLeft = null;
    this.robot = this.createRobot();

    this.camaraSubjetiva = null;

    //Posiciones
    this.giro = 0;
    // A way of feedback, a red jail will be visible around the crane when a box is taken by it
    //this.feedBack = new THREE.BoxHelper (this.base, 0xFF0000);
    //this.feedBack.visible = false;
    this.add (this.robot);

    this.vida = 100;
    document.getElementById("goodLife").style.backgroundColor = "#00ff00";
    document.getElementById("goodLife").style.width = "100%";
    document.getElementById("goodLife").style.float = "left";
    document.getElementById("badLife").style.backgroundColor = "#ff0000";
    document.getElementById("badLife").style.width = "0%";
    document.getElementById("badLife").style.float = "left";
  }
  
  // Private methods
  
  /// It computes the length of the string
  computeBodyAltitude () {
    return (this.bodyHeight + this.bodyRadius - (this.robotHeight-this.armHeightMin)) + (this.robotHeight*0.22)+(this.actuallyArmHeight-this.armHeightMin);
  }
  
  /*
  /// It creates the base and adds the mast to the base
  createBase () {
    var base = new THREE.Mesh (
     // new THREE.CylinderGeometry (this.craneWidth/10, this.craneWidth/10, this.baseHookHeight, 16, 1), 
     new THREE.BoxGeometry (this.craneWidth*2/10, this.baseHookHeight, this.craneWidth*2/10), 
                               this.materialBody);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.baseHookHeight/2, 0));
    base.castShadow = true;
    base.autoUpdateMatrix = false;
    base.add(this.createMast());
    return base;
  }
  */

/*
  createBase () {

    var base = new THREE.Mesh (
     new THREE.CylinderGeometry( this.baseTopRadius, this.baseBottomRadius, this.baseHeight, 4 ), 
                               this.materialBody);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -((this.baseHeight/2)+this.armHeightMin), 0));
    base.castShadow = true;
    base.autoUpdateMatrix = false;
    base.updateMatrix();
    base.add(this.createArm());
    return base;
  }*/

  getCamaraSubjetiva() {
    return this.camaraSubjetiva;
  }

  createRobot() {
    var robot = new THREE.Object3D();

    this.armRight = this.createBase();
    this.armRight.position.x = -(this.armWidth/2) - (this.shoulderHeight/2);
    this.armRight.position.x = this.armRight.position.x - this.bodyRadius+2;

    this.armLeft = this.createBase();
    this.armLeft.rotation.y = Math.PI;

    this.armLeft.position.x = (this.armWidth/2) + (this.shoulderHeight/2);
    this.armLeft.position.x = this.armLeft.position.x + this.bodyRadius - 2;

    robot.add(this.armRight);
    robot.add(this.armLeft);
    robot.add(this.createBody());

    return robot;
  }

  createBody() {
    var body = new THREE.Mesh (
     new THREE.CylinderGeometry( this.bodyRadius+0.1, this.bodyRadius+0.1, this.bodyHeight, 32), 
                               this.materialBody);
    body.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -(this.bodyHeight/2) - this.bodyRadius + (this.robotHeight-this.armHeightMin), 0));
//    body.position.y = this.bodyAltitude+this.bodyHeight; //- (this.robotHeight-this.armHeightMin);
    body.position.y = this.bodyHeight + this.bodyRadius - (this.robotHeight-this.armHeightMin)+ (this.robotHeight*0.22); //- (this.robotHeight-this.armHeightMin);
    body.castShadow = true;
    body.name = "body";

    body.add(this.createHead());
    return body;
  }

  createHead() {
    var head = new THREE.Mesh (
     new THREE.SphereGeometry( this.bodyRadius, 32, 32), 
                               this.materialHead);
    head.position.y = -this.bodyRadius + (this.robotHeight-this.armHeightMin);
    head.castShadow = true;

    var eye = new THREE.Mesh (
     new THREE.CylinderGeometry( this.eyeRadius, this.eyeRadius, 3, 32), 
                               new THREE.MeshPhongMaterial ({color: 0x000000, specular: 0xfbf804, shininess: 70}));
    eye.geometry.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI / 2));
    eye.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, (this.bodyRadius/2), this.bodyRadius-1.5));

    var luz = new THREE.SpotLight( 0xffffff );
    luz.position.set(0, (this.bodyRadius/2+1), this.bodyRadius-1.5);
    luz.castShadow = true;
    // the shadow resolution
    luz.shadow.mapSize.width=2048
    luz.shadow.mapSize.height=2048;
    luz.angle = 30*Math.PI/180;
    var punto = new THREE.Object3D();
    punto.position.set(0, (this.bodyRadius/2-4), this.bodyRadius-2);
    luz.target = punto;
   
    luz.add(punto);

    this.camaraSubjetiva = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camaraSubjetiva.position.set (0, (this.bodyRadius/2), this.bodyRadius-1.5);
    var look = new THREE.Vector3 (0,(this.bodyRadius/2),0);
    this.camaraSubjetiva.lookAt(look);

    head.add(this.camaraSubjetiva);
    head.add(luz);
    head.add(eye);
    head.castShadow = true;
    head.name = "head";

    return head;
  }

  
  
  /*
  /// It creates the mast and adds the jib to the mast
  createMast () {
    var mast = new THREE.Mesh (
      new THREE.CylinderGeometry (this.craneWidth/20, this.craneWidth/20, this.craneHeight, 16, 8), this.materialBody);
    mast.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.craneHeight/2, 0));
    mast.castShadow = true;
    mast.position.y = this.baseHookHeight;
    mast.autoUpdateMatrix = false;
    mast.updateMatrix();
    mast.add(this.createJib());
    return mast;
  }
  */

  createBase() {
    var base = new THREE.Mesh (
     new THREE.CylinderGeometry( this.baseTopRadius, this.baseBottomRadius, this.baseHeight, 4 ), 
                               this.materialBody);
    base.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -this.baseHeight/2, 0));
    base.geometry.applyMatrix (new THREE.Matrix4().makeRotationY (Math.PI / 4));
    base.position.y = this.baseHeight;
    base.castShadow = true;
    //base.autoUpdateMatrix = false;
    //base.updateMatrix();
    base.add(this.createArm());
    base.add(this.createShoulder());    
    return base;
  }

  /// It creates the mast and adds the jib to the mast
  createArm () {
    var arm = new THREE.Mesh( new THREE.CylinderGeometry(this.baseTopRadius, this.baseTopRadius, 1, 4), this.materialBody );
    //arm.geometry.applyMatrix (new THREE.Matrix4().makeScale (1, this.armHeightMin, 1));
    //arm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, (this.armHeightMin/2)+this.baseHeight, 0));
    arm.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0.5, 0));
    arm.geometry.applyMatrix (new THREE.Matrix4().makeRotationY (Math.PI / 4));
    arm.scale.y = this.actuallyArmHeight;
    arm.name = "arm";
    return arm;
  }
  
  /// It creates the jib, and adds the trolley-string-hook group to the jib
  createShoulder () {
    var shoulder = new THREE.Mesh( new THREE.CylinderGeometry(this.shoulderRadius, this.shoulderRadius, this.shoulderHeight), this.materialBody );
    shoulder.geometry.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI / 2));
    shoulder.geometry.applyMatrix (new THREE.Matrix4().makeTranslation ((this.shoulderHeight/2)-(this.armWidth/2)-0.5, 0, 0));
    shoulder.position.y = this.actuallyArmHeight;
    shoulder.name = "shoulder";
    return shoulder;
  }

  /// It creates the jib, and adds the trolley-string-hook group to the jib
  createJib () {
    this.jib = new THREE.Mesh (
      new THREE.BoxGeometry (this.craneWidth, this.craneWidth/10, this.craneWidth/10),
                          this.materialBody);
    this.jib.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0.3*this.craneWidth, this.craneWidth/20, 0));
    this.jib.castShadow = true;
    this.jib.position.y = this.craneHeight;
    this.jib.rotation.y = this.angle ;
    this.jib.add (this.createTrolleyStringHook());
    return this.jib;
  }
  
/*
  /// It creates the trolley, string and hook
  createTrolleyStringHook () {
    this.trolley = new THREE.Mesh (
      new THREE.BoxGeometry (this.craneWidth/10, this.trolleyHeight, this.craneWidth/10),
                              this.materialBody);
    this.trolley.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, this.trolleyHeight/2, 0));
    this.trolley.castShadow = true;
    this.trolley.position.y = -this.trolleyHeight;
    this.trolley.position.x = this.distanceMin;
    
    this.string = new THREE.Mesh (
      new THREE.CylinderGeometry (this.craneWidth/100, this.craneWidth/100, 1), this.materialBody);
    this.string.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -0.5, 0));
    this.string.castShadow = true;
    this.stringLength = this.computeStringLength();
    this.string.scale.y = this.stringLength;
    this.string.scale.x = 0.5;
    this.string.scale.z = 0.5;
    this.trolley.add (this.string);
    
    this.hook = new THREE.Mesh (
      new THREE.CylinderGeometry (this.craneWidth/40, this.craneWidth/40, this.baseHookHeight, 16, 1),
                           this.materialBody);
    this.hook.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, -this.baseHookHeight/2, 0));
    this.hook.castShadow = true;
    this.hook.position.y = -this.stringLength;
    this.trolley.add (this.hook);
    
    return this.trolley;
  }
*/

  /// It sets the angle of the jib
  /**
   * @param anAngle - The angle of the jib
   
  setJib (anAngle) {
    this.angle  = anAngle;
    this.jib.rotation.y = this.angle ;
    if (this.feedBack.visible) {
      this.feedBack.update();
    }
  }*/
  
  /// It sets the distance of the trolley from the mast
  /**
   * @param aDistance - The distance of the trolley from the mast
   */
  setTrolley (aDistance) {
    if (this.distanceMin <= aDistance && aDistance <= this.distanceMax) {
      this.distance = aDistance;
      this.trolley.position.x = this.distance;
    }
  }
  
  /// It sets the distance of the hook from the bottom of the base
  /**
   * @param aHeight - The distance of the hook from the bottom of the base
   */
  setArm (aHeight) {
    if (this.armHeightMin <= aHeight && aHeight <= this.armHeightMax) {
      this.actuallyArmHeight = aHeight;
      this.armLeft.getObjectByName ("arm").scale.y=  this.actuallyArmHeight;
      this.armLeft.getObjectByName ("shoulder").position.y=  this.actuallyArmHeight;
      this.armRight.getObjectByName ("arm").scale.y=  this.actuallyArmHeight;
      this.armRight.getObjectByName ("shoulder").position.y=  this.actuallyArmHeight;

      this.bodyAltitude = this.computeBodyAltitude();
      this.robot.getObjectByName ("body").position.y= this.bodyAltitude;
    }
  }

  setBody (aRotationBody) {
    if (this.bodyRotationMin <= aRotationBody && aRotationBody <= this.bodyRotationMax) {
      this.actuallyBodyRotation = (aRotationBody* 2*Math.PI) /360;
      this.robot.getObjectByName ("body").rotation.x =  this.actuallyBodyRotation;
    } 
     
  }

  setHead (aRotationHead) {
    if (this.headRotationMin <= aRotationHead && aRotationHead <= this.headRotationMax) {
      this.actuallyHeadRotation = (aRotationHead* 2*Math.PI) /360;
      this.robot.getObjectByName ("body").getObjectByName ("head").rotation.y =  this.actuallyHeadRotation;
    } 
     
  }


  
  /// It sets the hook according to
  /**
   * @param anAngle - The angle of the jib
   * @param aDistance - The distance of the trolley from the mast
   * @param aHeight - The distance of the hook from the bottom of the base
   */
   /*
  setHookPosition (anAngle, aDistance, aHeight) {
    this.setJib (anAngle);
    this.setTrolley (aDistance);
    this.setHook (aHeight);
  }
  */

  /// It sets the robot according to
  /**
   * @param anAngle - The angle of the jib
   * @param aDistance - The distance of the trolley from the mast
   * @param aHeight - The distance of the hook from the bottom of the base
   */
  setPosition (aRotationHead, aRotationBody, aHeight) {
    this.setHead (aRotationHead);
    this.setBody (aRotationBody);
    this.setArm (aHeight);
  }

  mover(keyCode) {
    if (keyCode == 37) { //Izquierda
      
      this.giro += 45;
      if (this.giro == 360) {
        this.giro = 0;
      }
      this.rotation.y = this.giro*Math.PI/180;
    } else if (keyCode == 39) { //Derecha
      if (this.giro == 0) {
        this.giro = 360;
      }
      this.giro -= 45;
      this.rotation.y = this.giro*Math.PI/180;
    } else if (keyCode == 38) { //Arriba
      
      if (this.giro > 0 && this.giro < 90) {
        this.position.x = this.position.x+1.4;
        this.position.z = this.position.z+1.4;
      } else if (this.giro > 90 && this.giro < 180) {
        this.position.x = this.position.x+1.4;
        this.position.z = this.position.z-1.4;
      } else if (this.giro > 180 && this.giro < 270) {
        this.position.x = this.position.x-1.4;
        this.position.z = this.position.z-1.4;
      } else if (this.giro > 270 && this.giro < 360) {
        this.position.x = this.position.x-1.4;
        this.position.z = this.position.z+1.4;
      } else if (this.giro == 0 || this.giro == 360) {
        this.position.z = this.position.z+2;
      } else if (this.giro == 90) {
        this.position.x = this.position.x+2;
      } else if (this.giro == 180) {
        this.position.z = this.position.z-2;
      } else if (this.giro == 270) {
        this.position.x = this.position.x-2;
      }
    } else if (keyCode == 40) { //Abajo
      if (this.giro > 0 && this.giro < 90) {
        this.position.x = this.position.x-1.4;
        this.position.z = this.position.z-1.4;
      } else if (this.giro > 90 && this.giro < 180) {
        this.position.x = this.position.x-1.4;
        this.position.z = this.position.z+1.4;
      } else if (this.giro > 180 && this.giro < 270) {
        this.position.x = this.position.x+1.4;
        this.position.z = this.position.z+1.4;
      } else if (this.giro > 270 && this.giro < 360) {
        this.position.x = this.position.x+1.4;
        this.position.z = this.position.z-1.4;
      } else if (this.giro == 0 || this.giro == 360) {
        this.position.z = this.position.z-2;
      } else if (this.giro == 90) {
        this.position.x = this.position.x-2;
      } else if (this.giro == 180) {
        this.position.z = this.position.z+2;
      } else if (this.giro == 270) {
        this.position.x = this.position.x+2;
      }
    } 
  }
    

  /// It returns the position of the hook
  /**
   * @param world - Whether the returned position is referenced to the World Coordinates System (Crane.WORLD) or is referenced to the crane position (Crane.LOCAL)
   * @return A Vector3 with the asked position
   */
  getHookPosition (world) {
    if (world === undefined)
      world = Crane.WORLD;
    var hookPosition = new THREE.Vector3();
    hookPosition.setFromMatrixPosition (this.hook.matrixWorld);
    hookPosition.y -= this.baseHookHeight;
    if (world === Crane.LOCAL) {
      var cranePosition = new THREE.Vector3();
      cranePosition.setFromMatrixPosition (this.matrixWorld);
      hookPosition.sub (cranePosition);
    }
    return hookPosition;
  }
  
}

// class variables
Robot.WORLD = 0;
Robot.LOCAL = 1;
