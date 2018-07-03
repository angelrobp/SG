class Alien extends THREE.Object3D{
  constructor(unAncho, unLargo, unColor, tipoAlien){
    super();
    this.height = unLargo;
    this.width = unAncho;
    this.material = unColor;
    this.tipo = tipoAlien;

    if(this.tipo == 1){
      this.alien = this.createAlien1();
      this.add(this.alien);
    } else if(this.tipo == 2){
      this.alien = this.createAlien2();
      this.add(this.alien);
    } else if(this.tipo == 3){
      this.alien = this.createAlien3();
      this.add(this.alien);
    } else if(this.tipo == 4){
      this.alien = this.createAlien4();
      this.add(this.alien);
    }

    this.golpe = false;
  }

  createAlien1(){
    var i, j;
    var alien = new THREE.Object3D();

    for(i = 0; i < 43; i++){
      if(i != 14 && i != 17 && i != 35 && i != 36 && i != 39 && i != 41){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);
        ladrillo.name = "" + i;

        if(i == 0 || i == 1){ //fila 1
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width/2 + (i*this.width), 0, -this.height*4));
          alien.add(ladrillo);
        } else if(i >= 2 && i <= 5){ //fila 2
          j = i - 2;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3*this.width/2 + (j*this.width), 0, -this.height*3));
          alien.add(ladrillo);
        } else if(i >= 6 && i <= 11){ //fila 3
          j = i - 6;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width/2 + (j * this.width), 0, -this.height*2));
          alien.add(ladrillo);
        }else if(i >= 12 && i <= 19){ //fila 4
          j = i - 12;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-7 * this.width/2 + (j * this.width), 0, -this.height));
          alien.add(ladrillo);
        } else if(i >= 20 && i <= 27){ //fila 5
          j = i - 20;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-7 * this.width/2 + (j * this.width), 0, 0));
          alien.add(ladrillo);
        } else if(i >= 28 && i <= 33){ //fila 6
          j = i - 28;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width/2 + (j * this.width), 0, this.height));
          alien.add(ladrillo);
        } else if(i >= 34 && i <= 37){ //fila 7
          j = i - 34;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3*this.width/2 + (j*this.width), 0, this.height*2));
          alien.add(ladrillo);
        } else if(i >= 38 && i <= 42){ //fila 8
          j = i - 38;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2*this.width + (j*this.width), 0, this.height*3));
          alien.add(ladrillo);
        }
      }
    }
    return alien;
  }

  createAlien2(){
    var i, j;
    var alien = new THREE.Object3D();

    for(i = 0; i < 66; i++){
      if(i != 1 && i != 2 && i != 3 && i != 4 && i != 5 && i != 8 && i != 9 && i != 10 && i != 21 && i != 25 && i != 40 &&
        i != 48 && i != 51 && i != 53 && i != 54 && i != 55 && i != 56 && i != 57 && i != 59 && i != 63){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);
        ladrillo.name = "" + i;

        if(i == 0 || i == 6){ //fila 1
          j = i;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3 * this.width + (j * this.width), 0, -this.height * 4));
          alien.add(ladrillo);
        } else if(i == 7 || i == 11){ //fila 2
          j = i - 7;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2 * this.width + (j * this.width), 0, -this.height * 3));
          alien.add(ladrillo);
        } else if(i >= 12 && i <= 18){ //fila 3
          j = i - 12;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3 * this.width + (j * this.width), 0, -this.height * 2));
          alien.add(ladrillo);
        }else if(i >= 19 && i <= 27){ //fila 4
          j = i - 19;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-4 * this.width + (j * this.width), 0, -this.height));
          alien.add(ladrillo);
        } else if(i >= 28 && i <= 38){ //fila 5
          j = i - 28;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j * this.width), 0, 0));
          alien.add(ladrillo);
        } else if(i >= 39 && i <= 49){ //fila 6
          j = i - 39;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j * this.width), 0, this.height));
          alien.add(ladrillo);
        } else if(i >= 50 && i <= 60){ //fila 7
          j = i - 50;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width + (j * this.width), 0, this.height * 2));
          alien.add(ladrillo);
        } else if(i >= 61 && i <= 65){ //fila 8
          j = i - 61;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2 * this.width + (j * this.width), 0, this.height * 3));
          alien.add(ladrillo);
        }
      }
    }
    return alien;
  }

  createAlien3(){
    var i, j;
    var alien = new THREE.Object3D();

    for(i = 0; i < 38; i++){
      if(i != 11 && i != 13 && i != 24 && i != 27 && i != 29 && i != 32 && i != 34 && i != 36){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);
        ladrillo.name = "" + i;

        if(i == 0){ //fila 1
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -this.height * 4));
          alien.add(ladrillo);
        } else if(i >= 1 && i <= 3){ //fila 2
          j = i - 1;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, -this.height * 3));
          alien.add(ladrillo);
        } else if(i >= 4 && i <= 8){ //fila 3
          j = i - 4;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2*this.width + (j * this.width), 0, -this.height * 2));
          alien.add(ladrillo);
        }else if(i >= 9 && i <= 15){ //fila 4
          j = i - 9;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3 * this.width + (j * this.width), 0, -this.height));
          alien.add(ladrillo);
        } else if(i >= 16 && i <= 22){ //fila 5
          j = i - 16;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3 * this.width + (j * this.width), 0, 0));
          alien.add(ladrillo);
        } else if(i >= 23 && i <= 25){ //fila 6
          j = i - 23;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-this.width + (j * this.width), 0, this.height));
          alien.add(ladrillo);
        } else if(i >= 26 && i <= 30){ //fila 7
          j = i - 26;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-2 * this.width + (j * this.width), 0, this.height * 2));
          alien.add(ladrillo);
        } else if(i >= 31 && i <= 37){ //fila 8
          j = i - 31;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-3 * this.width + (j * this.width), 0, this.height * 3));
          alien.add(ladrillo);
        }
      }
    }
    return alien;
  }

  createAlien4(){
    var i, j;
    var alien = new THREE.Object3D();

    for(i = 0; i < 72; i++){
      if(i != 30 && i != 33 && i != 36 && i != 39 && i != 61 && i != 62 && i != 65 && i != 66){
        var ladrillo = new THREE.Mesh(
          new THREE.BoxGeometry (this.width, 0.1, this.height),
                                this.material);
        ladrillo.name = "" + i;

        if(i >= 0 && i <= 5){ //fila 1
          j = i;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-5 * this.width/2 + (j * this.width), 0, -this.height * 4));
          alien.add(ladrillo);
        } else if(i >= 6 && i <= 15){ //fila 2
          j = i - 6;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-9 * this.width/2 + (j * this.width), 0, -this.height * 3));
          alien.add(ladrillo);
        } else if(i >= 16 && i <= 27){ //fila 3
          j = i - 16;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-11 * this.width/2 + (j * this.width), 0, -this.height * 2));
          alien.add(ladrillo);
        }else if(i >= 28 && i <= 41){ //fila 4
          j = i - 28;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-12 * this.width/2 + (j * this.width), 0, -this.height));
          alien.add(ladrillo);
        } else if(i >= 42 && i <= 57){ //fila 5
          j = i - 42;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-14 * this.width/2 + (j * this.width), 0, 0));
          alien.add(ladrillo);
        } else if(i >= 58 && i <= 69){ //fila 6
          j = i - 58;
          ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-11 * this.width/2 + (j * this.width), 0, this.height));
          alien.add(ladrillo);
        } else if(i == 70 || i == 71){ //fila 7
          if(i == 70){
            ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-9 * this.width/2, 0, this.height * 2));
            alien.add(ladrillo);
          } else{
            ladrillo.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(9 * this.width/2, 0, this.height * 2));
            alien.add(ladrillo);
          }
        }
      }
    }
    return alien;
  }
}
