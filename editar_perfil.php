<?php 
session_start();
require('funciones.php');
require('clases/clases.php');
verificar_session();

	
	$usuario = usuarios::usuario_por_codigo($_SESSION['CodUsua']);
	/*
	Como ['CodUsua'] es univoco y con la funcion que ejecuta la consulta SQl sobre "select * from usuarios where CodUsua = :CodUsua", obtenemos todas las columnas de la "TABLA usuarios" como CodUsua,nombre,	usuario,pass,pais,profesion,edad,foto_perfil, la consulta SQL implica todos los datos del usuario de SESSIOn por lo tanto solo sobre 1 usuario.
	*/

	if(isset($_POST['editar']))
	{
		
		if(!empty($_FILES)){
			$destino = 'subidos/';
			$destino_archivo_generico = 'img/';
			
			$archivoSinConf=$_FILES['foto']['name'];
			$img = $destino . $_FILES['foto']['name'];

			$tipo=explode('.', $archivoSinConf);
			$tipo1 = end($tipo);

			if($tipo1 == 'jpg' || $tipo1 == 'JPG' || $tipo1 == 'png' || $tipo1 == 'PNG'){
				
				$foto_perfil = $destino . $_FILES['foto']['name'];
				$tmp = $_FILES['foto']['tmp_name'];
				move_uploaded_file($tmp, $foto_perfil);
				/*Solo si es una imagen, se procesara de lo contrario nos quedamos con la foto anterior */	
			}else{
				$foto_perfil = $usuario[0]['foto_perfil'];
					
			}
			
		}else{
			$foto_perfil = $usuario[0]['foto_perfil'];	
		}

	/*tmp_name es el nombre temporal que le da el sistema al archivo */
	
		/*
		En la siguiente linea se declara e inicializa el arreglo $datos 
		*/
	
		$datos = array(
				$_POST['nombre'],
				$_POST['usuario'],
				$_POST['profesion'],
				$_POST['pais'],
				$foto_perfil,
				$_POST['discapacidad']
			);

		if(strpos($datos[1], " ")  == false)
		{
			/*
			 strpos controla ( en este caso)el argumento "espacio", porque un usuario no puede tener espacios dentro de el 
			*/
			usuarios::editar($_SESSION['CodUsua'], $datos);
			/*
			editar() implica a la funcion de la clase usuarios que con sus argumentos pueden recibirse como parametros en la consulta SQL de ; ("update usuarios set nombre = :nombre, usuario = :usuario, profesion = :profesion, pais = :pais, foto_perfil = :foto_perfil, discapacidad = :discapacidad where CodUsua = :CodUsua");
			*/
			if($_SESSION['discapacidad'] !=$_POST['discapacidad'])
				$_SESSION['discapacidad'] =$_POST['discapacidad'];
			/* Solo si hay una actualizacion en el tipo de discapaciad, se actualizara la variable de sesion */
			header('location: editar_perfil.php');
			/* 
			recargamos para actualizar visiblemente los cambios ya procesados en base de datos
			 */
		}
	}

 ?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<title>Editar Perfil</title>
 	<link rel="stylesheet" href="css/login.css">

	 <script type="text/javascript" src="javascript/mostrar_contenido.js"></script>
	 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
	 <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script>
	 <script src=" http://code.responsivevoice.org/responsivevoice.js"></script>
	 <script type="text/javascript" src="javascript/accesibilidad_reproducir_contenido.js"></script>
 </head>
 <body>
	
 	<div class="contenedor-form">
 		<h1>Editar perfil</h1>
		 <label for="subir-sms-oculto" onclick="responsive_voice('Los datos a introducir son: Nombre,usuario, profesion, pais, discapacidad visual, foto de perfil, al final se envia todo con el icono editar, para volver al perfil, haces click en volver al perfil','Seccion para editar perfil')"><strong>Ayuda para editar el perfil:📢</strong></label>
	<h1 class="speech-post" style="display:none;" id="subir-sms-oculto"></h1>
		 <form action="<?php echo $_SERVER['PHP_SELF'] ?>" enctype="multipart/form-data" method="post">
			<label for="nombre-edit"><strong>Nombre</strong>
			</label>
			<input type="text" id="nombre-edit" name="nombre" class="input-control" value="<?php echo $usuario[0]["nombre"]; ?>">
			 
			<label for="usuario-edit"><strong>Usuario</strong>
			</label>
			 <input type="text" id="usuario-edit" name="usuario" class="input-control" value="<?php echo $usuario[0]["usuario"]; ?>">
			 
			<label for="profesion-edit"><strong>Profesion</strong>
			</label>
			 <input type="text" id="profesion-edit" name="profesion" class="input-control" value="<?php echo $usuario[0]["profesion"]; ?>">
			
			<label for="pais-edit"><strong>Pais</strong>
			</label>
			<input type="text" id="pais-edit" name="pais" class="input-control" value="<?php echo $usuario[0]["pais"]; ?>">

			<label for="discapacidad-edit"><strong>Discapacidad Visual</strong>
			</label>
			
			<select name="discapacidad" id="discapacidad-edit" class="categoria">
				<option id="discapacidad-edit1" class="opcion">Sin discapacidad</option>
				<option id="discapacidad-edit2" class="opcion">Discapacidad moderada</option>
				<option id="discapacidad-edit3" class="opcion">Discapacidad grave o ciega</option>
				<option id="discapacidad-edit3" class="opcion">proteccion de la vista</option>
				<option selected class="opcion"><?php echo $usuario[0]["discapacidad"]; ?></option>

			</select>
			 <?php /*EL VALOR  VALUE, incrusta los valores en el campo de texto porque son  correspondientes al que el usuario contiene registrados  referente a el perfil en la base de datos, cuando nosotros hacemos clic en editar, se registraran los mismos  */
			 ?>
			<img src="<?php echo $usuario[0]["foto_perfil"]; ?>"alt="<?php echo "Foto de perfil de : ".$usuario[0]["nombre"];?>" class="publi-img-perfil_de_loginCSS">
			<?php /* La clase publi-img-perfil en style.css se ha agregado para dar formato a la fotografia incrustada como referencia para ser mostrarse mientras se edita */?>
			<label for="editar-foto"><strong>Editar foto</strong></label>
			 <input type="file" id="editar-foto"name="foto">
			 <?php /*Cuando hacemos click en acpetar los cambios, podremos ver la imagen actualizada de la foto de perfil */?>
 			<input type="submit" value="Editar" name="editar" class="log-btn">
 		</form>
 		<div class="registrar">
 			<a href="perfil.php?CodUsua=<?php echo $_SESSION['CodUsua']; ?>">Volver al perfil</a>
			 <?php /* Para volver al perfil del usuario de SESSION */?>
 		</div>
 	</div>
 </body>
 </html>