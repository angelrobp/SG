<!DOCTYPE html>

<html>

<head>
    <title>Space</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="style/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script   src="https://code.jquery.com/jquery-2.2.4.min.js"   integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"></script>
    <script type="text/javascript" src="../libs/three.js"></script>
    <script type="text/javascript" src="../libs/jquery-1.9.0.js"></script>
    <script type="text/javascript" src="../libs/stats.js"></script>
    <script type="text/javascript" src="../libs/dat.gui.js"></script>
    <script type="text/javascript" src="../libs/TrackballControls.js"></script>
    <script type="text/javascript" src="../libs/OrthographicTrackballControls.js"></script>
    <script type="text/javascript" src="Ground.js"></script>
    <script type="text/javascript" src="TheScene.js"></script>
    <script type="text/javascript" src="Nave.js"></script>
    <script type="text/javascript" src="Flecha.js"></script>
    <script type="text/javascript" src="Muro.js"></script>
    <script type="text/javascript" src="Alien.js"></script>
    <script type="text/javascript" src="Disparo.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <style>
        body{
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>

<div id="tablaPuntuacion"></div>
<div id="insertarNombre">
    <form id="saveNombre" style="max-width:500px;margin:auto">
      <h2>Escribe tu nombre</h2>
      <div class="input-container">
        <i class="fa fa-user icon"></i>
        <input class="input-name" type="text" placeholder="Username" name="usrnm" style="width: 100%;">
      </div>
      <button type="submit" class="btn">Registrarse</button>
    </form>
</div>
<div id="info"></div>
<div style="width: 100%; ">
    <!-- Div which will show statistical information -->
    <div id="Stats-output">
    </div>

    <!-- Div which will show several messages -->
    <div style="position:absolute; left:100px; top:10px" id="Messages">
    </div>

    <!-- Div which will hold the Output -->
    <div id="WebGL-output">
    </div>
</div>
<input id="mostrarPuntuacion" type="hidden" value="0">
<input id="actualizarPuntuacion" type="hidden" value="0">
<p id="nombreUsuario" hidden>Prueba</p>
<script>
    $('#actualizarPuntuacion').click(function() {
        var nombre = document.getElementById("nombreUsuario").innerHTML;
        var puntuacion = document.getElementById("actualizarPuntuacion").value;
        $.ajax({
         url: 'actualizar.php', //This is the current doc
         type: "POST",
         data: {name: nombre, points: puntuacion}
        });
    });

    $('#mostrarPuntuacion').click(function() {
        $.ajax({
         url: 'actualizar.php', //This is the current doc
         type: "POST",
         data: {mostrar: 'true'},
         success: function(data){
            document.getElementById("tablaPuntuacion").style.display = 'block'; 
            document.getElementById("tablaPuntuacion").innerHTML = data;
         }
        });
    });

</script>
</body>
</html>
