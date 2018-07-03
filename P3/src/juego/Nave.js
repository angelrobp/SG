class Nave extends THREE.Object3D{
  constructor(unAncho, unLargo, unColor){
    super();
    this.height = unLargo;
    this.width = unAncho;
    this.material = unColor;
    this.alturaTotal = 0;
    this.movimientoIzq = 0;
    this.movimientoDer = 0;

    this.nave = this.createNave();
    this.add(this.nave);

    this.vida = 1;
  }

    createNave(){
      var i, j;
      var nave = new THREE.Object3D();

      for(i = 0; i < 49; i++){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);

        if(i == 0){ //fila 1
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -this.height * 4));
          nave.add(ladrillo);
        } else if(i >= 1 && i <= 3){ //fila 2
          j = i - 1;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, -this.height * 3));
          nave.add(ladrillo);
        } else if(i >= 4 && i <= 6){ //fila 3
          j = i - 4;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, -this.height * 2));
          nave.add(ladrillo);
        }else if(i >= 7 && i <= 15){ //fila 4
          j = i - 7;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-4 * this.width + (j * this.width), 0, -this.height));
          nave.add(ladrillo);
        } else if(i >= 16 && i <= 26){ //fila 5
          j = i - 16;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j * this.width), 0, 0));
          nave.add(ladrillo);
        } else if(i >= 27 && i <= 37){ //fila 6
          j = i - 27;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j * this.width), 0, this.height));
          nave.add(ladrillo);
        } else if(i >= 38 && i <= 48){ //fila 7
          j = i - 38;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j*this.width), 0, this.height * 2));
          nave.add(ladrillo);
        }
      }
      return nave;
    }


  mover(keyCode){
    if(keyCode == 37){ //izquierda
      if(this.movimientoIzq < 13){
        this.position.x = this.position.x - 3;
        this.movimientoIzq++;
        this.movimientoDer--;
      }
    } else if(keyCode == 39){ //derecha
        if(this.movimientoDer < 13){
          this.position.x = this.position.x + 3;
          this.movimientoIzq--;
          this.movimientoDer++;
        }
    }
  }
}
