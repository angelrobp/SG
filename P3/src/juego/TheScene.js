class TheScene extends THREE.Scene {
  constructor(renderer) {
    super();

    //$("#actualizarPuntuacion").click();
    //$("#mostrarPuntuacion").click();

    this.ground = null;

    this.menu = null;
    this.hayMenu = true;

    this.tabla = null;
    this.hayTabla = false;

    this.gameOver = false;
    this.gameWin = false;
    this.gamePause = false;
/*  this.gameReturn = false;
    this.segundosUltimaPausa = 0;
    this.minutosUlimaPausa = 0;
*/
    this.chocaNave = false;
    this.segundosUltimoChoque = 0;
    this.minutosUltimoChoque = 0;

    this.nivelActual = 0;

    this.profundidadMenu = 0.5;
    this.flecha = null;

    this.limite = 40;
    this.velocidadMovimiento = 0.1 + 0.05 * this.nivelActual;
    this.limiteVelocidad = 0.3 + 0.05 * this.nivelActual;
    this.limiteAltura = 25;


    this.camara = null;
    this.ambientLight = null;

    this.nave = null;

    this.bala = null;
    this.disparos = new THREE.Object3D();
    this.balaAlien = null;
    this.disparosAlien = new THREE.Object3D();
    this.hayDisparosAlien = false;

    this.vida = null;
    this.contadorVidas = new THREE.Object3D();

    this.alien = null;
    this.alienTipo1 = null;
    this.alienTipo2 = null;
    this.alienTipo3 = null;
    this.alienTipo4 = null;

    this.muro1 = null;
    this.muro2 = null;
    this.muro3 = null;

    this.trackballControls = null;

    this.hayAliensTipo1 = false;
    this.hayAliensTipo2 = false;
    this.hayAliensTipo3 = false;
    this.hayAliensTipo4 = false;

    this.hayMuro1 = true;
    this.hayMuro2 = true;
    this.hayMuro3 = true;
    this.hayMuro4 = true;

    this.hayDisparos = false;
    this.movIzq = 0;
    this.movDer = 0;
    this.haciaDer = true;

    this.posicionFlecha = 0;

    this.marcador = 0;
    this.milisegundosUltimoDisparo = 0;
    this.segundosUltimoDisparo = 0;
    this.minutosUltimoDisparo = 0;

    var d = new Date();
    var n = d.getMilliseconds();
    var s = d.getSeconds();
    var m = d.getMinutes();
    this.milisegundosUltimoDisparoAlien = n;
    this.segundosUltimoDisparoAlien = s;
    this.minutosUltimoDisparoAlien = m;

    this.segundosUltimoAlien4 = s;
    this.minutosUltimoAlien4 = m;

    this.objetoMenu = new THREE.Object3D();

    this.inicio = false;
/*
    this.model = this.createModel();
    this.add(this.model);
    */
    this.model = this.createInsertText();
    this.add(this.model);

    this.createLights ();
    this.creaCamara(renderer);
    this.axis = new THREE.AxisHelper (25);
    this.add (this.axis);

    this.textoMarcador = document.getElementById("info");
    this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);
    this.textoMarcador.style = "display: none";

  }

  iniciarJuego() {
    this.inicio = true;
    this.remove(this.model);
    this.model = this.createModel();
    this.add(this.model);
  }

  createInsertText() {
    var model = new THREE.Object3D();
    var loaderTextura;
    var texturaImagen;

    loaderTextura = new THREE.TextureLoader();
    texturaImagen = loaderTextura.load("../img/spaceinvader.png");

    this.menu = new Ground(88, this.profundidadMenu, 100, new THREE.MeshPhongMaterial ({map: texturaImagen}), true);
    model.add(this.menu);

    this.ground = new Ground(88, 0.2, 100, new THREE.MeshPhongMaterial ({color: 0x000000}), false);
    model.add(this.ground);

    return model;
  }

  creaCamara(renderer){
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camara.rotation.set = (1, Math.PI, 1);
    this.camara.position.set (0, 100, 0);
    var objetivo = new THREE.Vector3(0, 0, 0);
    this.camara.lookAt(objetivo);

    this.trackballControls = new THREE.TrackballControls(this.camara, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = objetivo;

    this.add(this.camara);
  }

  createLights () {
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    this.add (this.ambientLight);
  }

  createModel(){
    var model = new THREE.Object3D();
    var objetoMenu = new THREE.Object3D();

    if(!this.hayMenu){
      this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);
      this.nave = new Nave(0.5, 0.5, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
      this.nave.position.z = 35;
      model.add(this.nave);

      this.alienTipo1 = new THREE.Object3D();
      var i, j;
      for(j = 0; j <= 1; j++){
        for (i = 0; i < 11; i++){
          this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 1);
          this.alien.position.x = -40 + i * 5.5;
          this.alien.position.z -= 5 * j;
          this.alienTipo1.add(this.alien);
        }
      }
      model.add(this.alienTipo1);

      this.alienTipo2 = new THREE.Object3D();
      for(j = 0; j <= 1; j++){
        for (i = 0; i < 11; i++){
          this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 2);
          this.alien.position.x = -40 + i * 5.5;
          this.alien.position.z = -10;
          this.alien.position.z -= 5 * j;
          this.alienTipo2.add(this.alien);
        }
      }
      model.add(this.alienTipo2);

      this.alienTipo3 = new THREE.Object3D();
      for(j = 0; j <= 1; j++){
        for (i = 0; i < 11; i++){
          this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 3);
          this.alien.position.x = -40 + i * 5.5;
          this.alien.position.z = -20;
          this.alien.position.z -= 5 * j;
          this.alienTipo3.add(this.alien);
        }
      }
      model.add(this.alienTipo3);

      this.hayAliensTipo1 = true;
      this.hayAliensTipo2 = true;
      this.hayAliensTipo3 = true;

      this.muro1 = new Muro(1.5, 1.5, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
      this.muro1.position.x -= 25;
      this.muro1.position.z += 25;
      model.add(this.muro1);
      this.muro1.children[0].updateMatrixWorld();

      this.muro2 = new Muro(1.5, 1.5, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
      this.muro2.position.x -= 8;
      this.muro2.position.z += 25;
      model.add(this.muro2);

      this.muro3 = new Muro(1.5, 1.5, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
      this.muro3.position.x += 8;
      this.muro3.position.z += 25;
      model.add(this.muro3);

      this.muro4 = new Muro(1.5, 1.5, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
      this.muro4.position.x += 25;
      this.muro4.position.z += 25;
      model.add(this.muro4);

      for(j = 0; j < 3; j++){
          this.vida = new Nave(0.2, 0.2, new THREE.MeshPhongMaterial ({color: 0x00FF00}));
          this.vida.position.x = 30 + j * 2.5;
          this.vida.position.z = -35;
          this.contadorVidas.add(this.vida);
      }
      model.add(this.contadorVidas);



    } else {

      var loader = new THREE.FontLoader();
      loader.load( '../font/PixelFont.json', function (font) {
          var textGeometry = new THREE.TextGeometry( "Nueva Partida", {
              font: font,
              size: 3,
              height: 1,
              curveSegments: 20,
              bevelEnabled: false
          });

          var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff});

          var mesh = new THREE.Mesh(textGeometry, textMaterial);
          mesh.rotation.x = -Math.PI/2;
          objetoMenu.add(mesh);
      });


      var loader = new THREE.FontLoader();
      loader.load( '../font/PixelFont.json', function (font) {
          var textGeometry = new THREE.TextGeometry( "Reto", {
              font: font,
              size: 3,
              height: 1,
              curveSegments: 20,
              bevelEnabled: false
          });

          var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff});

          var mesh = new THREE.Mesh(textGeometry, textMaterial);
          mesh.rotation.x = -Math.PI/2;
          mesh.position.z += 5;
          objetoMenu.add(mesh);
      });


      var loader = new THREE.FontLoader();
      loader.load( '../font/PixelFont.json', function (font) {
          var textGeometry = new THREE.TextGeometry( "Mejores Resultados", {
              font: font,
              size: 3,
              height: 1,
              curveSegments: 20,
              bevelEnabled: false
          });

          var textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff});

          var mesh = new THREE.Mesh(textGeometry, textMaterial);
          mesh.rotation.x = -Math.PI/2;
          mesh.position.z += 10;
          objetoMenu.add(mesh);
      });


      this.objetoMenu = objetoMenu;
      this.objetoMenu.position.x -= 10;
      model.add(this.objetoMenu);


      var loaderTextura;
      var texturaImagen;

      if(!this.gameWin && !this.gameOver){
        loaderTextura = new THREE.TextureLoader();
        texturaImagen = loaderTextura.load("../img/spaceinvader.png");
      } else if (this.gameWin){
        loaderTextura = new THREE.TextureLoader();
        texturaImagen = loaderTextura.load("../img/youwin.png");
        this.gameWin = false;
      } else{
        loaderTextura = new THREE.TextureLoader();
        texturaImagen = loaderTextura.load("../img/gameover.png");
        this.gameOver = false;
      }

      this.menu = new Ground(88, this.profundidadMenu, 100, new THREE.MeshPhongMaterial ({map: texturaImagen}), true);
      model.add(this.menu);

      this.flecha = new Flecha(1, this.profundidadMenu + 0.1, 1, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}));
      this.flecha.position.x -= 15;
      this.flecha.position.z -= 3.5;
      model.add(this.flecha);

    }

    this.ground = new Ground(88, 0.2, 100, new THREE.MeshPhongMaterial ({color: 0x000000}), false);
    model.add(this.ground);

    return model;
  }

  getNave(){
    return this.nave;
  }

  getCamara(){
    return this.camara;
  }

  getCamaraControl(){
    return this.trackballControls;
  }

  setCameraAspect(anAspectRatio){
    this.camara.aspect = anAspectRatio;
    this.camara.updateProjectionMatrix();
  }

  animate(control){
    this.updateMatrixWorld();
    this.axis.visible = control.axis;
    if(!this.hayMenu){
      if(!this.gamePause){
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var t = 60 * m + s;

        if(!this.hayAliensTipo4 && (t - (this.segundosUltimoAlien4 + this.minutosUltimoAlien4 * 60) >= 25)){
          this.alienTipo4 = new THREE.Object3D();
          this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFF0000}), 4);
          this.alien.position.x = 40;
          this.alien.position.z = -30;
          this.alienTipo4.add(this.alien);
          this.model.add(this.alienTipo4);
          this.hayAliensTipo4 = true;
          this.segundosUltimoAlien4 = s;
          this.minutosUltimoAlien4 = m;
        }

        if(this.hayAliensTipo1){
          if(this.alienTipo1.children[0].position.z > this.limiteAltura){
            //this.gameOver = true;
            this.finJuego();
          }
        } else if(this.hayAliensTipo2){
          if(this.alienTipo2.children[0].position.z > this.limiteAltura){
            //this.gameOver = true;
            this.finJuego();
          }
        } else if(this.hayAliensTipo3){
          if(this.alienTipo3.children[0].position.z > this.limiteAltura){
            //this.gameOver = true;
            this.finJuego();
          }
        } else {
          //this.gameWin = true;
          //this.victoria();
          this.nextLevel();
        }

        if(!this.gameOver && !this.gameWin){
          if(!this.chocaNave){
            if(this.hayDisparos)
              this.updateDisparos();

            if(this.hayDisparosAlien)
              this.updateDisparosAliens();

            this.updateAliens();

            var d = new Date();
            var n = d.getMilliseconds();
            var s = d.getSeconds();
            var m = d.getMinutes();

            var t = m * 60000 + s * 1000 + n;

            t = t - (this.minutosUltimoDisparoAlien * 60000 + this.segundosUltimoDisparoAlien * 1000 + this.milisegundosUltimoDisparoAlien);
/*
            if(this.gameReturn){
              this.gameReturn = false;
              console.log(this.segundosUltimaPausa - this.segundosUltimoDisparoAlien);
              this.segundosUltimoDisparoAlien += this.segundosUltimaPausa - this.segundosUltimoDisparoAlien;
              this.minutosUltimoDisparoAlien += this.minutosUlimaPausa - this.minutosUltimoDisparoAlien;

              this.segundosUltimoDisparo += this.segundosUltimaPausa - this.segundosUltimoDisparo;
              this.minutosUltimoDisparo += this.minutosUlimaPausa - this.minutosUltimoDisparo;
            }
*/


            if(t >= 3000 - 200 * this.nivelActual){
              this.createDisparoAlien();
              this.milisegundosUltimoDisparoAlien = n;
              this.segundosUltimoDisparoAlien = s;
              this.minutosUltimoDisparoAlien = m;
            }
          } else {

            var d = new Date();
            var s = d.getSeconds();
            var m = d.getMinutes();
            var t = 60 * m + s;

            if(t - (this.segundosUltimoChoque + this.minutosUltimoChoque * 60) >= 1){
              this.chocaNave = false;
              this.nave.position.x = 0;
              this.movIzq = 0;
              this.movDer = 0;

              while(this.hayDisparosAlien){
                if(this.disparosAlien.children.length == 0)
                  this.hayDisparosAlien = false;
                else
                  this.disparosAlien.remove(this.disparosAlien.children[0]);
              }

              while(this.hayDisparos){
                if(this.disparos.children.length == 0)
                  this.hayDisparos = false;
                else
                  this.disparos.remove(this.disparos.children[0]);
              }
            }
          }
        }
      }/* else if(this.gameOver){
        this.finJuego();
      } else if(this.gameWin) {
        this.victoria();
        console.log(1);
      }*/
    }
  }

  nextLevel(){
    var i, j;
    for(j = 0; j <= 1; j++){
      for (i = 0; i < 11; i++){
        this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 1);
        this.alien.position.x = -40 + i * 5.5;
        this.alien.position.z -= 5 * j;
        this.alienTipo1.add(this.alien);
      }
    }
    this.model.add(this.alienTipo1);

    this.alienTipo2 = new THREE.Object3D();
    for(j = 0; j <= 1; j++){
      for (i = 0; i < 11; i++){
        this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 2);
        this.alien.position.x = -40 + i * 5.5;
        this.alien.position.z = -10;
        this.alien.position.z -= 5 * j;
        this.alienTipo2.add(this.alien);
      }
    }
    this.model.add(this.alienTipo2);

    this.alienTipo3 = new THREE.Object3D();
    for(j = 0; j <= 1; j++){
      for (i = 0; i < 11; i++){
        this.alien = new Alien(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0xFFFFFF}), 3);
        this.alien.position.x = -40 + i * 5.5;
        this.alien.position.z = -20;
        this.alien.position.z -= 5 * j;
        this.alienTipo3.add(this.alien);
      }
    }
    this.model.add(this.alienTipo3);

    this.hayAliensTipo1 = true;
    this.hayAliensTipo2 = true;
    this.hayAliensTipo3 = true;

    this.nivelActual++;

    this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);
  }

  victoria(){
    this.gameOver = false;
    this.remove(this.model);
    this.model = null;
    this.hayMenu = true;
    this.marcador = 0;
    this.velocidadMovimiento = 0.1;
    this.model = this.createModel();
    this.add(this.model);
    console.log(2);
  }

  finJuego(){
    document.getElementById('actualizarPuntuacion').value = this.marcador;
    $("#actualizarPuntuacion").click();
    this.gameWin = false;
    this.gameOver = true;
    this.remove(this.model);
    this.model = null;
    this.hayMenu = true;
    this.marcador = 0;
    this.nivelActual = 0;
    this.velocidadMovimiento = 0.1;
    this.model = this.createModel();
    this.add(this.model);
  }

  controlNave(keyCode){
    if (this.inicio) {
      if(this.hayMenu && !this.hayTabla){
        if(keyCode == 38){
          if(this.posicionFlecha == 0){
            this.posicionFlecha = 2;
            this.flecha.position.z += 10;
          } else{
            this.posicionFlecha--;
            this.flecha.position.z -= 5;
          }
        }else if(keyCode == 40){
          if(this.posicionFlecha == 2){
            this.posicionFlecha = 0;
            this.flecha.position.z -= 10;
          } else{
            this.posicionFlecha++;
            this.flecha.position.z += 5;
          }
        } else if (keyCode == 32){
          if(this.posicionFlecha == 0){
            this.hayMenu = false;
            this.gameWin = false;
            this.model.remove(this.menu);
            this.model.remove(this.flecha);
            this.model.remove(this.objetoMenu);
            this.remove(this.model);
            this.model = null;
            this.model = this.createModel();
            this.add(this.model);
            this.textoMarcador.style = "display: initial";
          } else if (this.posicionFlecha == 2){

            this.model.remove(this.menu);
            this.model.remove(this.flecha);
            this.model.remove(this.objetoMenu);
            this.tabla = new Ground(88, 0.5, 100, new THREE.MeshPhongMaterial ({color: 0x000000}), false);
            this.model.add(this.tabla);
            this.hayTabla = true;
            $("#mostrarPuntuacion").click();
          }
        }
      } else if (this.hayTabla){
        if(keyCode == 27 || keyCode == 32){
          this.posicionFlecha = 0;
          document.getElementById("tablaPuntuacion").style.display = 'none';

          this.hayMenu = true;
          this.model.remove(this.tabla);
          this.hayTabla = false;
          this.model = this.createModel();
          this.add(this.model);
        }
      } else if (!this.gamePause && !this.hayTabla && !this.hayMenu){
        if(keyCode == 37){
          if(this.movIzq < 26){
            this.movIzq++;
            this.movDer--;
            this.nave.position.x -= 1.5;
          }
        } else if(keyCode == 39) {
          if(this.movDer < 26){
            this.movDer++;
            this.movIzq--;
            this.nave.position.x += 1.5;
          }
        } else if(keyCode == 32){
          var d = new Date();
          var n = d.getMilliseconds()
          var s = d.getSeconds();
          var m = d.getMinutes();
          var t = m * 60000 + s * 1000 + n;

          t = t - (this.minutosUltimoDisparo * 60000 + this.segundosUltimoDisparo * 1000 + this.milisegundosUltimoDisparo);

          if(t >= 500){
            this.createDisparo1();
            this.milisegundosUltimoDisparo = n;
            this.segundosUltimoDisparo = s;
            this.minutosUltimoDisparo = m;
          }
        } else if(keyCode == 80){
          this.gamePause = true;
        }
      } else if (this.gamePause){
        if(keyCode == 80){
          this.gamePause = false;
        }
  /*
        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();

        this.gameReturn = true;
        this.segundosUltimaPausa = s;
        this.minutosUlimaPausa = m;
  */
      }
    }

  }

  createDisparo1(){
    this.bala = new Disparo(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0x00FF00}), 1);
    this.bala.position.x = this.nave.position.x;
    this.bala.position.z = this.nave.position.z - 1;
    this.disparos.add(this.bala);
    var colision = false;

    this.model.add(this.disparos);

    this.hayDisparos = true;
  }

  createDisparoAlien(){
    this.balaAlien = new Disparo(0.4, 0.4, new THREE.MeshPhongMaterial ({color: 0x00FF00}), 2);
    var longitud = 0;
    var alienDispara = 0;

    if(this.hayAliensTipo1 && this.hayAliensTipo2 && this.hayAliensTipo3){

      longitud = this.alienTipo1.children.length + this.alienTipo2.children.length + this.alienTipo3.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      if (alienDispara < this.alienTipo1.children.length){
        this.balaAlien.position.x = this.alienTipo1.children[alienDispara].position.x;
        this.balaAlien.position.z = this.alienTipo1.children[alienDispara].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      } else if (alienDispara < this.alienTipo1.children.length + this.alienTipo2.children.length){
        this.balaAlien.position.x = this.alienTipo2.children[alienDispara - this.alienTipo1.children.length].position.x;
        this.balaAlien.position.z = this.alienTipo2.children[alienDispara - this.alienTipo1.children.length].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      } else if (alienDispara >= this.alienTipo1.children.length + this.alienTipo2.children.length){
        this.balaAlien.position.x = this.alienTipo3.children[alienDispara - (this.alienTipo1.children.length + this.alienTipo2.children.length)].position.x;
        this.balaAlien.position.z = this.alienTipo3.children[alienDispara - (this.alienTipo1.children.length + this.alienTipo2.children.length)].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      }

    } else if (this.hayAliensTipo1 && this.hayAliensTipo2){

      longitud = this.alienTipo1.children.length + this.alienTipo2.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      if (alienDispara < this.alienTipo1.children.length){
        this.balaAlien.position.x = this.alienTipo1.children[alienDispara].position.x;
        this.balaAlien.position.z = this.alienTipo1.children[alienDispara].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      } else if (alienDispara >= this.alienTipo1.children.length){
        this.balaAlien.position.x = this.alienTipo2.children[alienDispara - this.alienTipo1.children.length].position.x;
        this.balaAlien.position.z = this.alienTipo2.children[alienDispara - this.alienTipo1.children.length].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      }

    } else if (this.hayAliensTipo1 && this.hayAliensTipo3){

      longitud = this.alienTipo1.children.length + this.alienTipo3.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      if (alienDispara < this.alienTipo1.children.length){
        this.balaAlien.position.x = this.alienTipo1.children[alienDispara].position.x;
        this.balaAlien.position.z = this.alienTipo1.children[alienDispara].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      } else if (alienDispara >= this.alienTipo1.children.length){
        this.balaAlien.position.x = this.alienTipo3.children[alienDispara - this.alienTipo1.children.length].position.x;
        this.balaAlien.position.z = this.alienTipo3.children[alienDispara - this.alienTipo1.children.length].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      }

    } else if (this.hayAliensTipo2 && this.hayAliensTipo3){

      longitud = this.alienTipo2.children.length + this.alienTipo3.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      if (alienDispara < this.alienTipo2.children.length){
        this.balaAlien.position.x = this.alienTipo2.children[alienDispara].position.x;
        this.balaAlien.position.z = this.alienTipo2.children[alienDispara].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      } else if (alienDispara >= this.alienTipo2.children.length){
        this.balaAlien.position.x = this.alienTipo3.children[alienDispara - this.alienTipo1.children.length].position.x;
        this.balaAlien.position.z = this.alienTipo3.children[alienDispara - this.alienTipo1.children.length].position.z + 0.5;
        this.disparosAlien.add(this.balaAlien);
      }

    } else if (this.hayAliensTipo1){

      longitud = this.alienTipo1.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      this.balaAlien.position.x = this.alienTipo1.children[alienDispara].position.x;
      this.balaAlien.position.z = this.alienTipo1.children[alienDispara].position.z + 0.5;
      this.disparosAlien.add(this.balaAlien);

    } else if (this.hayAliensTipo2){

      longitud = this.alienTipo2.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      this.balaAlien.position.x = this.alienTipo2.children[alienDispara].position.x;
      this.balaAlien.position.z = this.alienTipo2.children[alienDispara].position.z + 0.5;
      this.disparosAlien.add(this.balaAlien);

    } else if (this.hayAliensTipo3){

      longitud = this.alienTipo3.children.length;
      alienDispara = Math.floor((Math.random() * longitud));

      this.balaAlien.position.x = this.alienTipo3.children[alienDispara].position.x;
      this.balaAlien.position.z = this.alienTipo3.children[alienDispara].position.z + 0.5;
      this.disparosAlien.add(this.balaAlien);

    }

    var colision = false;

    this.model.add(this.disparosAlien);

    this.hayDisparosAlien = true;
  }

  updateDisparosAliens(){
    var medioAnchoBala = this.disparosAlien.children[0].width;
    var medioAltoBala = this.disparosAlien.children[0].height * 3;

    var medioAnchoMuro1;
    var medioAnchoMuro2;
    var medioAnchoMuro3;
    var medioAnchoMuro4;

    var medioAltoMuro1;
    var medioAltoMuro2;
    var medioAltoMuro3;
    var medioAltoMuro4;

    if (this.hayMuro1) {
      medioAnchoMuro1 = this.muro1.width/2;
      medioAltoMuro1 = this.muro1.height/2;
    }

    if (this.hayMuro2) {
      medioAnchoMuro2 = this.muro2.width/2;
      medioAltoMuro2 = this.muro2.height/2;
    }

    if (this.hayMuro3) {
      medioAnchoMuro3 = this.muro3.width/2;
      medioAltoMuro3 = this.muro3.height/2;
    }

    if (this.hayMuro4) {
      medioAnchoMuro4 = this.muro4.width/2;
      medioAltoMuro4 = this.muro4.height/2;
    }

    var medioAnchoNave = this.nave.width * 4.5;
    var medioAltoNave = this.nave.height * 3;

    var colisionHorizontal = false;
    var colisionTotal = false;

    var i;
    for(i = 0; i < this.disparosAlien.children.length; i++){
      this.disparosAlien.children[i].position.z += 0.5;

      if (this.disparosAlien.children[i].position.z > 45) { //Fuera de escenario
        this.disparosAlien.remove(this.disparosAlien.children[i]);
        i--;
      } else {
          colisionHorizontal = false;
          colisionTotal = false;

          //Colisiones Muros

          for(var j = 0; j < this.muro1.muro.children.length && !colisionTotal; j++){ // Colisión con el primer muro
            var vector = this.muro1.calcularPosicionGlobalHijo(j);

            colisionHorizontal = false;
            colisionTotal = false;

            if(((this.disparosAlien.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro1) &&
              (this.disparosAlien.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro1)) ||
              ((this.disparosAlien.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro1) &&
              (this.disparosAlien.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro1))){
              colisionHorizontal = true;
            }

            if (colisionHorizontal) {
              if (((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro1) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro1)) ||
                ((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro1) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro1))) {

                this.disparosAlien.remove(this.disparosAlien.children[i]);
                if(this.muro1.ladrilloGolpeado[j] == false){
                  this.muro1.cambiaEstado(j);
                } else {
                  this.muro1.muro.remove(this.muro1.muro.children[j]);
                  this.muro1.ladrilloGolpeado.splice(j, 1);
                }
                colisionTotal = true;
                if (this.muro1.muro.children.length <= 0) {
                  this.hayMuro1 = false;
                }
              }
            }
          }

          for(var j = 0; j < this.muro2.muro.children.length && !colisionTotal; j++){ // Colisión con el segundo muro
            var vector = this.muro2.calcularPosicionGlobalHijo(j);

            colisionHorizontal = false;
            colisionTotal = false;

            if(((this.disparosAlien.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro2) &&
              (this.disparosAlien.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro2)) ||
              ((this.disparosAlien.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro2) &&
              (this.disparosAlien.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro2))){
              colisionHorizontal = true;
            }

            if (colisionHorizontal) {
              if (((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro2) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro2)) ||
                ((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro2) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro2))) {

                this.disparosAlien.remove(this.disparosAlien.children[i]);
                if(this.muro2.ladrilloGolpeado[j] == false){
                  this.muro2.cambiaEstado(j);
                } else {
                  this.muro2.muro.remove(this.muro2.muro.children[j]);
                  this.muro2.ladrilloGolpeado.splice(j, 1);
                }
                colisionTotal = true;
                if (this.muro2.muro.children.length <= 0) {
                  this.hayMuro2 = false;
                }
              }
            }
          }


          for(var j = 0; j < this.muro3.muro.children.length && !colisionTotal; j++){ // Colisión con el tercer muro
            var vector = this.muro3.calcularPosicionGlobalHijo(j);

            colisionHorizontal = false;
            colisionTotal = false;

            if(((this.disparosAlien.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro3) &&
              (this.disparosAlien.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro3)) ||
              ((this.disparosAlien.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro3) &&
              (this.disparosAlien.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro3))){
              colisionHorizontal = true;
            }

            if (colisionHorizontal) {
              if (((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro3) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro3)) ||
                ((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro3) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro3))) {

                this.disparosAlien.remove(this.disparosAlien.children[i]);
                if(this.muro3.ladrilloGolpeado[j] == false){
                  this.muro3.cambiaEstado(j);
                } else {
                  this.muro3.muro.remove(this.muro3.muro.children[j]);
                  this.muro3.ladrilloGolpeado.splice(j, 1);
                }
                colisionTotal = true;
                if (this.muro3.muro.children.length <= 0) {
                  this.hayMuro3 = false;
                }
              }
            }
          }




          for(var j = 0; j < this.muro4.muro.children.length && !colisionTotal; j++){ // Colisión con el cuarto muro
            var vector = this.muro4.calcularPosicionGlobalHijo(j);

            colisionHorizontal = false;
            colisionTotal = false;

            if(((this.disparosAlien.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro4) &&
              (this.disparosAlien.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro4)) ||
              ((this.disparosAlien.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro4) &&
              (this.disparosAlien.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro4))){
              colisionHorizontal = true;
            }

            if (colisionHorizontal) {
              if (((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro4) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro4)) ||
                ((this.disparosAlien.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro4) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro4))) {

                this.disparosAlien.remove(this.disparosAlien.children[i]);
                if(this.muro4.ladrilloGolpeado[j] == false){
                  this.muro4.cambiaEstado(j);
                } else {
                  this.muro4.muro.remove(this.muro4.muro.children[j]);
                  this.muro4.ladrilloGolpeado.splice(j, 1);
                }
                colisionTotal = true;
                if (this.muro4.muro.children.length <= 0) {
                  this.hayMuro4 = false;
                }
              }
            }
          }


          if(!colisionTotal){
            colisionHorizontal = false;
            colisionTotal = false;

            if(((this.disparosAlien.children[i].position.x + medioAnchoBala >= this.nave.position.x - medioAnchoNave) &&
              (this.disparosAlien.children[i].position.x + medioAnchoBala <= this.nave.position.x + medioAnchoNave)) ||
              ((this.disparosAlien.children[i].position.x - medioAnchoBala >= this.nave.position.x - medioAnchoNave) &&
              (this.disparosAlien.children[i].position.x - medioAnchoBala <= this.nave.position.x + medioAnchoNave))){

              colisionHorizontal = true;

            }

            if (colisionHorizontal) {
              if (((this.disparosAlien.children[i].position.z - medioAltoBala <= this.nave.position.z + medioAltoNave) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= this.nave.position.z - medioAltoNave)) ||
                ((this.disparosAlien.children[i].position.z - medioAltoBala <= this.nave.position.z + medioAltoNave) &&
                (this.disparosAlien.children[i].position.z + medioAltoBala >= this.nave.position.z - medioAltoNave))) {
                  this.disparosAlien.remove(this.disparosAlien.children[i]);
                  i--;

                  this.chocaNave = true;

                  var d = new Date();
                  var s = d.getSeconds();
                  var m = d.getMinutes();
                  this.segundosUltimoChoque = s;
                  this.minutosUltimoChoque = m;

                  this.contadorVidas.remove(this.contadorVidas.children[0]);

                  colisionTotal = true;

                  this.marcador -= 10;
                  this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);

                  for(var j = 0; j < this.disparosAlien.children.length; j++)
                    this.disparosAlien.remove(this.disparosAlien.children[j]);

                  if(this.contadorVidas.children.length == 0){
                    this.finJuego();
                  }
                }
              }
          }

          }
        }

    if (this.disparosAlien.children.length <= 0) {
      this.hayDisparosAlien = false;
    }
  }

  updateDisparos(){

    var medioAnchoAlien1;
    var medioAnchoAlien2;
    var medioAnchoAlien3;
    var medioAnchoAlien4;

    var medioAltoAlien1;
    var medioAltoAlien2;
    var medioAltoAlien3;
    var medioAltoAlien4;

    var medioAltoBala = this.disparos.children[0].height * 3;
    var medioAnchoBala = this.disparos.children[0].width/2;

    var medioAnchoMuro1;
    var medioAnchoMuro2;
    var medioAnchoMuro3;
    var medioAnchoMuro4;

    var medioAltoMuro1;
    var medioAltoMuro2;
    var medioAltoMuro3;
    var medioAltoMuro4;

    if (this.hayMuro1) {
      medioAnchoMuro1 = this.muro1.width/2;
      medioAltoMuro1 = this.muro1.height/2;
    }

    if (this.hayMuro2) {
      medioAnchoMuro2 = this.muro2.width/2;
      medioAltoMuro2 = this.muro2.height/2;
    }

    if (this.hayMuro3) {
      medioAnchoMuro3 = this.muro3.width/2;
      medioAltoMuro3 = this.muro3.height/2;
    }

    if (this.hayMuro4) {
      medioAnchoMuro4 = this.muro4.width/2;
      medioAltoMuro4 = this.muro4.height/2;
    }



    if (this.hayAliensTipo1) {
      medioAnchoAlien1 = this.alienTipo1.children[0].width*4;
      medioAltoAlien1 = this.alienTipo1.children[0].height*4;
    }

    if (this.hayAliensTipo2) {
      medioAnchoAlien2 = (this.alienTipo2.children[0].width*4)+ (this.alienTipo2.children[0].width/2);
      medioAltoAlien2 = this.alienTipo2.children[0].height*4;
    }

    if (this.hayAliensTipo3) {
      medioAnchoAlien3 = (this.alienTipo3.children[0].width*3)+ (this.alienTipo3.children[0].width/2);
      medioAltoAlien3 = this.alienTipo3.children[0].height*4;
    }

    if(this.hayAliensTipo4){
      medioAnchoAlien4 = this.alienTipo4.children[0].width * 8;
      medioAltoAlien4 = this.alienTipo4.children[0].height * 3.5;
    }

    var colisionHorizontal = false;
    var colisionTotal = false;

    var i;
    for(i = 0; i < this.disparos.children.length; i++){
      this.disparos.children[i].position.z -= 1;

      if (this.disparos.children[i].position.z <= -35) { //Fuera de escenario
        this.disparos.remove(this.disparos.children[i]);
        i--;
      } else {
        colisionHorizontal = false;
        colisionTotal = false;

        //Colisiones Muros

        for(var j = 0; j < this.muro1.muro.children.length && !colisionTotal; j++){ // Colisión con el primer muro
          var vector = this.muro1.calcularPosicionGlobalHijo(j);

          colisionHorizontal = false;
          colisionTotal = false;

          if(((this.disparos.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro1) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro1)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro1) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro1))){
            colisionHorizontal = true;
          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro1) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro1)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro1) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro1))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;

              if(this.muro1.ladrilloGolpeado[j] == false){
                this.muro1.cambiaEstado(j);
              } else {
                this.muro1.muro.remove(this.muro1.muro.children[j]);
                this.muro1.ladrilloGolpeado.splice(j, 1);
              }
              colisionTotal = true;
              if (this.muro1.muro.children.length <= 0) {
                this.hayMuro1 = false;
              }
            }
          }
        }



        for(var j = 0; j < this.muro2.muro.children.length && !colisionTotal; j++){ // Colisión con el segundo muro
          var vector = this.muro2.calcularPosicionGlobalHijo(j);

          colisionHorizontal = false;
          colisionTotal = false;

          if(((this.disparos.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro2) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro2)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro2) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro2))){
            colisionHorizontal = true;
          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro2) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro2)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro2) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro2))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;

              if(this.muro2.ladrilloGolpeado[j] == false){
                this.muro2.cambiaEstado(j);
              } else {
                this.muro2.muro.remove(this.muro2.muro.children[j]);
                this.muro2.ladrilloGolpeado.splice(j, 1);
              }
              colisionTotal = true;
              if (this.muro2.muro.children.length <= 0) {
                this.hayMuro2 = false;
              }
            }
          }
        }


        for(var j = 0; j < this.muro3.muro.children.length && !colisionTotal; j++){ // Colisión con el tercer muro
          var vector = this.muro3.calcularPosicionGlobalHijo(j);

          colisionHorizontal = false;
          colisionTotal = false;

          if(((this.disparos.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro3) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro3)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro3) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro3))){
            colisionHorizontal = true;
          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro3) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro3)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro3) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro3))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;

              if(this.muro3.ladrilloGolpeado[j] == false){
                this.muro3.cambiaEstado(j);
              } else {
                this.muro3.muro.remove(this.muro3.muro.children[j]);
                this.muro3.ladrilloGolpeado.splice(j, 1);
              }
              colisionTotal = true;
              if (this.muro3.muro.children.length <= 0) {
                this.hayMuro3 = false;
              }
            }
          }
        }




        for(var j = 0; j < this.muro4.muro.children.length && !colisionTotal; j++){ // Colisión con el cuarto muro
          var vector = this.muro4.calcularPosicionGlobalHijo(j);

          colisionHorizontal = false;
          colisionTotal = false;

          if(((this.disparos.children[i].position.x + medioAnchoBala >= vector.x - medioAnchoMuro4) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= vector.x + medioAnchoMuro4)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= vector.x - medioAnchoMuro4) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= vector.x + medioAnchoMuro4))){
            colisionHorizontal = true;
          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro4) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro4)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= vector.z + medioAltoMuro4) &&
              (this.disparos.children[i].position.z + medioAltoBala >= vector.z - medioAltoMuro4))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;

              if(this.muro4.ladrilloGolpeado[j] == false){
                this.muro4.cambiaEstado(j);
              } else {
                this.muro4.muro.remove(this.muro4.muro.children[j]);
                this.muro4.ladrilloGolpeado.splice(j, 1);
              }
              colisionTotal = true;
              if (this.muro4.muro.children.length <= 0) {
                this.hayMuro4 = false;
              }
            }
          }
        }




        //Colisiones Aliens
        for(var j = 0; j < this.alienTipo1.children.length && !colisionTotal; j++){ // Colisión con el primer bloque de Aliens
          colisionHorizontal = false;
          colisionTotal = false;
          if(((this.disparos.children[i].position.x + medioAnchoBala >= this.alienTipo1.children[j].position.x - medioAnchoAlien1) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= this.alienTipo1.children[j].position.x + medioAnchoAlien1)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= this.alienTipo1.children[j].position.x - medioAnchoAlien1) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= this.alienTipo1.children[j].position.x + medioAnchoAlien1))){
            colisionHorizontal = true;

          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo1.children[j].position.z + medioAltoAlien1) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo1.children[j].position.z - medioAltoAlien1)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo1.children[j].position.z + medioAltoAlien1) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo1.children[j].position.z - medioAltoAlien1))) {
                this.disparos.remove(this.disparos.children[i]);
                i--;

                this.alienTipo1.remove(this.alienTipo1.children[j]);
                colisionTotal = true;

                this.marcador += 10;
                this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);



                if (this.alienTipo1.children.length <= 0) {
                  this.hayAliensTipo1 = false;
                }
            }
          }
        }



        for(var j = 0; j < this.alienTipo2.children.length && !colisionTotal; j++){// Colisión con el segundo bloque de Aliens
          colisionHorizontal = false;
          colisionTotal = false;
          if(((this.disparos.children[i].position.x + medioAnchoBala >= this.alienTipo2.children[j].position.x - medioAnchoAlien2) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= this.alienTipo2.children[j].position.x + medioAnchoAlien2)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= this.alienTipo2.children[j].position.x - medioAnchoAlien2) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= this.alienTipo2.children[j].position.x + medioAnchoAlien2))){
            colisionHorizontal = true;

          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo2.children[j].position.z + medioAltoAlien2) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo2.children[j].position.z - medioAltoAlien2)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo2.children[j].position.z + medioAltoAlien2) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo2.children[j].position.z - medioAltoAlien2))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;
              this.alienTipo2.remove(this.alienTipo2.children[j]);
              colisionTotal = true;

              this.marcador += 20;
              this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);

              if (this.alienTipo2.children.length <= 0) {
                this.hayAliensTipo2 = false;
              }
            }
          }
        }



        for(var j = 0; j < this.alienTipo3.children.length && !colisionTotal; j++){// Colisión con el tercer bloque de Aliens
          colisionHorizontal = false;
          colisionTotal = false;
          if(((this.disparos.children[i].position.x + medioAnchoBala >= this.alienTipo3.children[j].position.x - medioAnchoAlien3) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= this.alienTipo3.children[j].position.x + medioAnchoAlien3)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= this.alienTipo3.children[j].position.x - medioAnchoAlien3) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= this.alienTipo3.children[j].position.x + medioAnchoAlien3))){
            colisionHorizontal = true;

          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo3.children[j].position.z + medioAltoAlien3) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo3.children[j].position.z - medioAltoAlien3)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo3.children[j].position.z + medioAltoAlien3) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo3.children[j].position.z - medioAltoAlien3))) {

              this.disparos.remove(this.disparos.children[i]);
              i--;
              this.alienTipo3.remove(this.alienTipo3.children[j]);
              colisionTotal = true;

              this.marcador += 30;
              this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);

              if (this.alienTipo3.children.length <= 0) {
                this.hayAliensTipo3 = false;
              }
            }
          }
        }


        if(this.hayAliensTipo4 && !colisionTotal){ // Colisión con el cuarto bloque de Aliens
          colisionHorizontal = false;
          colisionTotal = false;
          if(((this.disparos.children[i].position.x + medioAnchoBala >= this.alienTipo4.children[0].position.x - medioAnchoAlien4) &&
            (this.disparos.children[i].position.x + medioAnchoBala <= this.alienTipo4.children[0].position.x + medioAnchoAlien4)) ||
            ((this.disparos.children[i].position.x - medioAnchoBala >= this.alienTipo4.children[0].position.x - medioAnchoAlien4) &&
            (this.disparos.children[i].position.x - medioAnchoBala <= this.alienTipo4.children[0].position.x + medioAnchoAlien4))){
            colisionHorizontal = true;

          }

          if (colisionHorizontal) {
            if (((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo4.children[0].position.z + medioAltoAlien4) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo4.children[0].position.z - medioAltoAlien4)) ||
              ((this.disparos.children[i].position.z - medioAltoBala <= this.alienTipo4.children[0].position.z + medioAltoAlien4) &&
              (this.disparos.children[i].position.z + medioAltoBala >= this.alienTipo4.children[0].position.z - medioAltoAlien4))) {
                this.disparos.remove(this.disparos.children[i]);
                i--;

                this.alienTipo4.remove(this.alienTipo4.children[0]);
                colisionTotal = true;
                this.hayAliensTipo4 = false;

                this.marcador += 100;
                this.textoMarcador.innerHTML = "Score: " +  this.marcador + "  Nivel: " + (this.nivelActual + 1);
            }
          }
        }

      }
    }
    if (this.disparos.children.length <= 0) {
      this.hayDisparos = false;
    }
  }

  updateAliens(){
    var i;
    var posMin = 100;
    var posMax = -100;
    if(this.hayAliensTipo1){
      for(i = 0; i < this.alienTipo1.children.length; i++){
        if(posMin > this.alienTipo1.children[i].position.x){
          posMin = this.alienTipo1.children[i].position.x;
        }
        if(posMax < this.alienTipo1.children[i].position.x){
          posMax = this.alienTipo1.children[i].position.x;
        }
      }
    }
    if(this.hayAliensTipo2){
      for(i = 0; i < this.alienTipo2.children.length; i++){
        if(posMin > this.alienTipo2.children[i].position.x){
          posMin = this.alienTipo2.children[i].position.x;
        }
        if(posMax < this.alienTipo2.children[i].position.x){
          posMax = this.alienTipo2.children[i].position.x;
        }
      }
    }
    if(this.hayAliensTipo3){
      for(i = 0; i < this.alienTipo3.children.length; i++){
        if(posMin > this.alienTipo3.children[i].position.x){
          posMin = this.alienTipo3.children[i].position.x;
        }
        if(posMax < this.alienTipo3.children[i].position.x){
          posMax = this.alienTipo3.children[i].position.x;
        }
      }
    }

    if(this.hayAliensTipo4){
      if(this.alienTipo4.children[0].position.x >= -40)
        this.alienTipo4.children[0].position.x -= 0.2;
      else{
        this.alienTipo4.remove(this.alienTipo4.children[0]);
        this.hayAliensTipo4 = false;
      }
    }


    if(this.haciaDer){
      if(posMax < this.limite){
        if(this.hayAliensTipo1)
          for(i = 0; i < this.alienTipo1.children.length; i++)
            this.alienTipo1.children[i].position.x += this.velocidadMovimiento;
        if(this.hayAliensTipo2)
          for(i = 0; i < this.alienTipo2.children.length; i++)
            this.alienTipo2.children[i].position.x += this.velocidadMovimiento;
        if(this.hayAliensTipo3)
          for(i = 0; i < this.alienTipo3.children.length; i++)
            this.alienTipo3.children[i].position.x += this.velocidadMovimiento;
      }else {
        if(this.hayAliensTipo1)
          for(i = 0; i < this.alienTipo1.children.length; i++)
            this.alienTipo1.children[i].position.z += 0.75;
        if(this.hayAliensTipo2)
          for(i = 0; i < this.alienTipo2.children.length; i++)
            this.alienTipo2.children[i].position.z += 0.75;
        if(this.hayAliensTipo3)
          for(i = 0; i < this.alienTipo3.children.length; i++)
            this.alienTipo3.children[i].position.z += 0.75;

        this.haciaDer = false;
      }
    } else {
      if(posMin > -this.limite){
        if(this.hayAliensTipo1)
          for(i = 0; i < this.alienTipo1.children.length; i++)
            this.alienTipo1.children[i].position.x -= this.velocidadMovimiento;
        if(this.hayAliensTipo2)
          for(i = 0; i < this.alienTipo2.children.length; i++)
            this.alienTipo2.children[i].position.x -= this.velocidadMovimiento;
        if(this.hayAliensTipo3)
          for(i = 0; i < this.alienTipo3.children.length; i++)
            this.alienTipo3.children[i].position.x -= this.velocidadMovimiento;
      }else {
        if(this.hayAliensTipo1)
          for(i = 0; i < this.alienTipo1.children.length; i++)
            this.alienTipo1.children[i].position.z += 0.75;
        if(this.hayAliensTipo2)
          for(i = 0; i < this.alienTipo2.children.length; i++)
            this.alienTipo2.children[i].position.z += 0.75;
        if(this.hayAliensTipo3)
          for(i = 0; i < this.alienTipo3.children.length; i++)
            this.alienTipo3.children[i].position.z += 0.75;

        this.haciaDer = true;
        if(this.limiteVelocidad > this.velocidadMovimiento)
          this.velocidadMovimiento += 0.05;
      }
    }
  }
}
