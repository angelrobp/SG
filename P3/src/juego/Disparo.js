class Disparo extends THREE.Object3D{
  constructor(unAncho, unLargo, unColor, tipoDisparo){
    super();
    this.height = unLargo;
    this.width = unAncho;
    this.material = unColor;
    this.tipo = tipoDisparo;

    if(this.tipo == 1){
      this.disparo = this.createDisparo1();
      this.add(this.disparo);
    } else if(this.tipo == 2){
      this.disparo = this.createDisparo2();
      this.add(this.disparo);
    }

    this.golpe = false;
  }

  createDisparo1(){
    var i, j;
    var disparo = new THREE.Object3D();

    for(i = 0; i < 6; i++){
      var ladrillo = new THREE.Mesh(
      new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);

      ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -this.height * (4 - i)));
      disparo.add(ladrillo);
    }
    return disparo;
  }

  createDisparo2(){
    var i, j;
    var disparo = new THREE.Object3D();

    for(i = 0; i < 6; i++){
      var ladrillo = new THREE.Mesh(
      new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);

      if(i == 0 || i == 2 || i == 4){
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -this.height * (4 - i)));
      } else if (i == 1 || i == 3 || i == 5) {
        ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width/2, 0, -this.height * (4 - i)));
      }

      disparo.add(ladrillo);
    }
    return disparo;
  }
}
