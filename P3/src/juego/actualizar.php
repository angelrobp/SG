<?php
if (isset($_POST['name']) && isset($_POST['points'])) {
	 //create a new DOM document
	 $xmldoc=new DomDocument();
	 $xmldoc->formatOutput=true;

	//Assign variables to store values

	 $jugador=$_POST['name'];
	 $puntuacion=$_POST['points'];
	 
	 if($xml=file_get_contents('puntuaciones.xml')){
		 $xmldoc->loadXML($xml);
		 $root=$xmldoc->firstChild;
		 

		  //crear elemento partida
		 $partida=$xmldoc->createElement('partida');


		 //Insertar partida en elemento root
		 $root->appendChild($partida);


		 //Crear elemento jugador
		 $jugadorTag=$xmldoc->createElement('jugador');


		 //Insertar jugador en partida
		 $partida->appendChild($jugadorTag);

		 //Crear contenido de jugador
		$jugadorText=$xmldoc->createTextNode($jugador);


		//Insertar contenido de jugador en jugador
		$jugadorTag->appendChild($jugadorText);
		 
		  //Crear elemento puntuacion
		 $puntuacionTag=$xmldoc->createElement('puntuacion');


		 //Insertar puntuacion en partida
		 $partida->appendChild($puntuacionTag);


		//Crear contenido de puntuacion
		$puntuacionText=$xmldoc->createTextNode($puntuacion);


		//Insertar contenido de puntuacion en puntuacion
		$puntuacionTag->appendChild($puntuacionText);

		 
		 //save the xml file using save('filename.xml') method
		 
		$xmldoc->save('puntuaciones.xml'); 
	}

	unset($_POST['name']);
	unset($_POST['points']);

}

if (isset($_POST['mostrar'])) {
	$mostrar = "<table><tr><th>Jugador</th><th>Puntuacion</th></tr>";
	$xml=simplexml_load_file("puntuaciones.xml");

	$indice = array();
	 
	$insertar = false;
	for ($i=0; $i < $xml->count() && count($indice) <= 5; $i++)
	  {
	  	$insertar = false;
	  	
	  	if (count($indice) < 1) {
			$indice[] = $i;
	  	}
	  	else {
	  		$insertado = false;
	  		for ($j=0; $j <count($indice) && !$insertado; $j++)
			{
			  	$insertar = false;
			  	$valorA = (int)$xml->partida[$indice[$j]]->puntuacion;
			  	$valorB = (int) $xml->partida[$i]->puntuacion;
			  	if ($valorA < $valorB) {
			  		if (count($indice) >=2) {
				  		for ($k=count($indice)-1; $k >= $j; $k--) {
				  			if ($k == count($indice)-1) {
				  				if (count($indice)<5) {
				  					$indice[] = $indice[$k];
				  				}
				  				
				  			}
				  			else {
				  				$indice[$k+1] = $indice[$k];
				  			}
				  		}
				  		
				  		$indice[$j] = $i;
				  		$insertado = true;
			  		}
			  		else {
			  			$aux = 0;
			  			if(count($indice) <5) {
							$indice[] = $indice[$j];
			  			}
				  		
				  		$indice[$j] = $i;
				  		$insertado = true;
			  		}
			  		
			  	}
			  	else {
			  		$insertar = true;
			  	}
			}
		  	if ($insertar) {
		  		if(count($indice) <5) {
					$indice[] = $i;
		  		}
		  		
		  		$insertado = true;
		  	}
	  	}
	  	
	  }

	for ($i=0; $i <count($indice); $i++)
	  {
	  	$mostrar = $mostrar."<tr><td>". $xml->partida[$indice[$i]]->jugador ."</td><td>". $xml->partida[$indice[$i]]->puntuacion ."</td></tr>";
	  }
	  $mostrar = $mostrar."</table>";
	 echo $mostrar;
	 unset($_POST['mostrar']);
}

