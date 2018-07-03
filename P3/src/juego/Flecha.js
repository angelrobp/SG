class Flecha extends THREE.Object3D{
  constructor(unAncho, unaProfundidad, unLargo, unColor){
    super();
    this.height = unLargo;
    this.width = unAncho;
    this.material = unColor;
    this.profundidad = unaProfundidad;

    this.flecha = this.createFlecha();
    this.add(this.flecha);
  }

  createFlecha(){
    var i, j;
    var unaFlecha = new THREE.Object3D();

    for(i = 0; i < 10; i++){
      var ladrillo = new THREE.Mesh(
        new THREE.BoxGeometry (this.width, this.profundidad, this.height),
                              this.material);

      if(i == 0 || i == 1){ //fila 1
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(i * this.width, 0, 0));
        unaFlecha.add(ladrillo);
      } else if(i == 2 || i == 3){ //fila 2
        j = i - 2
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.width + (j * this.width), 0, this.height));
        unaFlecha.add(ladrillo);
      } else if (i == 4 || i == 5) { //fila 3
        j = i - 4
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.width * 2 + (j * this.width), 0, this.height * 2));
        unaFlecha.add(ladrillo);
      } else if(i == 6 || i == 7){ //fila 4
        j = i - 6
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(this.width + (j * this.width), 0, this.height * 3));
        unaFlecha.add(ladrillo);
      } else if(i == 8 || i == 9){ //fila 5
        j = i - 8;
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(j * this.width, 0, this.height * 4));
        unaFlecha.add(ladrillo);
      }
    }

    return unaFlecha;
  }

}
