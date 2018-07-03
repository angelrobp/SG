class Muro extends THREE.Object3D{
  constructor(unAncho, unLargo, unColor){
    super();
    this.height = unLargo;
    this.width = unAncho;
    this.material = unColor;
    this.golpeado = false;

    this.ladrilloGolpeado = [false, false, false, false, false, false, false, false, false, false, false];
    this.muro = this.createMuro();
    this.add(this.muro);
  }

  createMuro(){
    var i, j;
    var pared = new THREE.Object3D();
    for(i = 0; i < 14; i++){
      if(i != 10 && i != 11 && i != 12){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);
        if(i == 0){//fila 1
          pared.add(ladrillo);
        }
        else if (i == 1 || i == 2 || i == 3) {//fila 2
          j = i - 1;
          //ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, this.height));
          //ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, this.height));
          ladrillo.position.set(-this.width + (j * this.width), 0, this.height);
          pared.add(ladrillo);
        }
        else if (i == 4 || i == 5 || i == 6 || i == 7 || i == 8) { //fila 3
          j = i - 4;
          //ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2 * this.width + (j * this.width), 0, 2 *  this.height));
          ladrillo.position.set(-2 * this.width + (j * this.width), 0, 2 *  this.height);
          pared.add(ladrillo);
        }
        else if (i >= 9) { //fila 4
          j = i - 9;
          //ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2 * this.width + (j * this.width), 0, 3 *  this.height));
          ladrillo.position.set(-2 * this.width + (j * this.width), 0, 3 *  this.height);
          pared.add(ladrillo);
        }
      }
    }
    return pared;
  }

  cambiaEstado(ladrillo){
    this.ladrilloGolpeado[ladrillo] = true;
    this.muro.children[ladrillo].material = new THREE.MeshPhongMaterial ({color: 0xFF0000});
  }

  calcularPosicionGlobalHijo(i) {
    var vector = new THREE.Vector3(this.position.x + this.muro.children[i].position.x, 0, this.position.z + this.muro.children[i].position.z);
    return vector;
  }
}
