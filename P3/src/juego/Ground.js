
class Ground extends THREE.Object3D {

  constructor (aWidth, unaProfundidad, aDeep, aMaterial, esMenu) {
    super();

    this.width = aWidth;
    this.deep = aDeep;
    this.material = aMaterial;
    this.ground = null;
    this.profundidad = unaProfundidad;
    this.hayMenu = esMenu;
    this.imagen = null;
    this.menu = new THREE.Object3D();

    if(this.hayMenu == false){
      this.ground = new THREE.Mesh (
        new THREE.BoxGeometry (this.width, this.profundidad, this.deep, 1, 1, 1),
        this.material);
      this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
      this.add (this.ground);
    } else {
      this.ground = new THREE.Mesh (
        new THREE.BoxGeometry (this.width, this.profundidad, this.deep, 1, 1, 1),
        new THREE.MeshPhongMaterial ({color: 0x000000}));
      this.ground.applyMatrix (new THREE.Matrix4().makeTranslation (0,-0.1,0));
      this.menu.add (this.ground);

      this.imagen = new THREE.Mesh (
        new THREE.BoxGeometry (this.width/2, this.profundidad, this.deep/4, 1, 1, 1),
        this.material);
      this.imagen.applyMatrix (new THREE.Matrix4().makeTranslation (0, 1, -20));
      this.menu.add (this.imagen);

      this.add(this.menu);
    }


  }
}
