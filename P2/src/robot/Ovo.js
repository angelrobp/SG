
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



class Ovo extends THREE.Object3D {
  
  constructor (parameters) {
    super();   

    // If there are no parameters, the default values are used
    this.posicionZ = (parameters.posicionZ === undefined ? 150 : parameters.posicionZ);
    this.ovoRadius = (parameters.ovoRadius === undefined ? 5 : parameters.ovoRadius);
    this.ovoTipo = (parameters.ovoTipo === undefined ? Ovo.MA : parameters.ovoTipo);
    this.material   = (parameters.material === undefined ? new THREE.MeshPhongMaterial ({color: 0x00ffff, specular: 0xfbf804, shininess: 70}) : parameters.material);

    this.tipo = null;
    this.ovo = this.createOvo();

    // A way of feedback, a red jail will be visible around the crane when a box is taken by it
    //this.feedBack = new THREE.BoxHelper (this.base, 0xFF0000);
    //this.feedBack.visible = false;
    this.add (this.ovo);
  }

  createOvo() {
    var ovo = new THREE.Mesh (
     new THREE.SphereGeometry( this.ovoRadius, 32, 32), 
                               this.material);
    ovo.geometry.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 0));
    ovo.castShadow = true;

    return ovo;
  }

  setTipoOvo (tipo) {
    this.ovoTipo = tipo;
  }

  setPosition (aRotationHead, aRotationBody, aHeight) {
    if (this.headRotationMin <= aRotationHead && aRotationHead <= this.headRotationMax) {
      this.actuallyHeadRotation = (aRotationHead* 2*Math.PI) /360;
      this.robot.getObjectByName ("body").getObjectByName ("head").rotation.y =  this.actuallyHeadRotation;
    } 
  }
  
}

// class variables
Ovo.WORLD = 0;
Ovo.LOCAL = 1;

Ovo.MA = 0;
Ovo.BU = 1;