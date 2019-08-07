
/* Accesibilidad para subir, comandos de voz */
var deletreo = "";
var siguiente="";

responsiveVoice.setDefaultVoice("Spanish Latin American Female");

window.addEventListener('load', ejecutarArtyom);
function ejecutarArtyom() {
        artyom.initialize({
        lang: "es-ES", // idioma nativo para reproducción del lector
        continuous: false, // Evitar el reconocimiento ya que usamos la herramienta annyang
        listen: false, // Iniciar TODO: Esta variable con FALSE permite desactivar el sintetizador !
        debug: true, // Muestra un informe en la consola
        speed: 1.3 // Velocidad normal con  1
        
        });
        
            artyom.say("Estas en la sección principal, comando ayuda disponible");


};

function ejecutar_ayuda() {

    artyom.say( "Estas en la pagina principal,  con comandos de voz pronuncia opcion 1, para ir a la página principal, opcion 2, para buscar, opcion 3, para publicar, opcion 4, para ver solicitudes, opcion 5, para ver las noticias, opcion 6 para acceder a tu perfil, opcion 7 para cerrar , opcion 8 para subir una publicacion, opcion 9 para acceder a la lista de publicaciones");          

}

function ejecutar_ayuda_subir(){

    artyom.say('Los datos a introducir son: titulo,autor,fecha,categoria,resumen,introduccion,contenido,conclusiones,referencias, subir archivo y demas detalles al final se envia todo pronunciando, enviar publicación. Seccion para subir publicacion, para el caso de categoria,resumen,introduccion,contenido,conclusiones,referencias pronuncia uno de ellos seguido de  elemento, seguido del número de elemento y luego el texto que deseas ingrezar, ejemplo:  resumen elemento 1, seguido del texto, para enviar la publicación decir comando, enviar publicación');
}
function pegarDeletreo(parametro){

    if(deletreo != ""){
        $(parametro).val(deletreo);
    }
}
/* TODO: */


if (annyang) {
    annyang.setLanguage('es-ES');

    var commands = {
        'ayuda': () => {
            ejecutar_ayuda();
          

        },
        'ayuda para subir': () => {
            ejecutar_ayuda_subir();
          

        },
        'opción 1': () => {
            document.getElementById('vinculo_principal').click();
            
          

        },
        'opción 2': (value) => {
            console.log("opcion2 ejecutado");
            artyom.say("Pronunciar buscar, seguido de tu parametro de busqueda, para acceder, presionar la tecla enter");
            
            
          

        },

        'buscar *value': (value) => {
            console.log("Buscar ejecutado");
            
            
            document.getElementById('busqueda').value=value;
            document.getElementById('busqueda').focus();


            
        },
        'opción 3': () => {
            console.log("Publicar ejecutado");
            document.getElementById('publicar_principal').click();
            if (responsiveVoice.voiceSupport()) { 
      
                responsiveVoice.speak("Decir: subir publicación");
            }
  
            
        },
        'opción 4': () => {
            console.log("Publicar ejecutado");
            document.getElementById('nav-solicitud').children[0].focus();
            document.getElementById('icon-usuario').click();
            //document.getElementById('info-solicitud').click();
            artyom.say("Solicitudes mostradas");
     
        },
        'opción 6': () => {
            console.log("Perfil ejecutado");

            document.getElementById('navegacion_perfil').click();
            //document.getElementById('info-solicitud').click();
     
        },
        'opción 7': () => {
            console.log("Cerrar ejecutado");

            document.getElementById('navegacion_cerrar').click();
            //document.getElementById('info-solicitud').click();
     
        },
        'opción 9': (value) => {
            console.log("opcion9 ejecutado");
            artyom.say("Pronunciar, reporducir publicación, seguido del número de publicación, ejemplo, reproducir publicación 1");
            
            
          

        },

        'subir publicación': () => {
            mostrar_subir();
          

        },
        'que está escrito': () => {
            console.log("Escrito : "+deletreo);
            artyom.say("Escrito"+deletreo);
            

            /*
            $("#busqueda").trigger($.Event('keypress', { keycode: 13 }));
            */
            
        },
        'titulo *value': (value) => {

            artyom.say("Ingrezado "+value+" en el campo titulo");
            document.getElementById('titulo').value=value;
            document.getElementById('titulo').focus();

        },
        'autor *value': (value) => {
  
            artyom.say("Ingrezado "+value+" en el campo autor");
            document.getElementById('autor').value=value;
            document.getElementById('autor').focus();

        },
        'fecha *value': (value) => {
           
            artyom.say("El campo fecha tiene la fecha actual asignada, pero puedes modificarla manualmente");
            document.getElementById('fecha').value=value;
            document.getElementById('fecha').focus();

        },
        'categoría *value': (value) => {
           
            artyom.say(" Pronuncia Categoría seguido del número : 1. para  Ciencias generales, 2, ingeniería, 3, ciencias sociales, 4, Biología, Medicina");

            value=value.replace('uno','1').replace('dos','2').replace('tres','3').replace('cuatro','4').replace('cinco','5').replace('seis','6').replace('siete','7').replace('ocho','8').replace('nueve','9').replace(' ','');
            value=parseInt(value.charAt(0));
            value=value-1;
            document.getElementById('opcion2').focus();

            if(value==1||value==2||value==3||value==4){
                document.getElementById('categoria').children[value].selected=true;
            }
                
            

            artyom.say("seleccionado la opcion"+(value+1));
            console.log("seleccionado la opcion"+(value+1));

        },
        
 
        'deletrear *value': (value) => {
            

            /* Técnicas para mejorar la presición de la síntesis de voz para escritura de frases, palabras o letras concretas */

            if(deletreo == "")
                artyom.say("Decir palabras que evoquen el primer caracter para aumentar la presición");

            if(value.match("abrir paréntesis"))
                value=value.replace(value,'(');

            if(value.match("cerrar paréntesis"))
                value=value.replace(value,')');

            if(value.match("coma"))
                value=value.replace(value,', ');

            if(value.match("punto"))
                value=value.replace(value,'. ');

            if(value.match("espacio"))
                value=value.replace(value,' ');



                value=value.replace('be', 'b')
                .replace('be', 'b')
                .replace('ce', 'c')
                .replace('de', 'd')
                .replace('ele', 'l')
                .replace('efe', 'f')
                .replace('ge', 'g')
                .replace('ache', 'h')
                .replace('eme', 'm')
                .replace('eñe', 'ñ')
                .replace('ere', 'r')
                .replace('ese', 's')
                .replace('te', 't')
                .replace('uve', 'v')
                .replace('ye', 'y')
                .replace('zeta','z');
    
            if (value.match("mayúscula")){
                value=value.toUpperCase() 
    
            }else{
                value=value.toLowerCase()
            }
        
            
            deletreo += value.charAt(0);


           artyom.say("Dictado actual:"+deletreo);
            console.log(deletreo);

        },
        'borrar deletrear': () => {
            deletreo = '';
            console.log('deletreo esta:' + deletreo);
            artyom.say("Deletreo borrado:"+deletreo);
        },
        
        'donde estoy': () => {
            artyom.say("Estas en la sección principal con comando ayuda disponible");
          

        },
        'acceder': () => {
            $("#submit-input").click();

        }, // Para invocar todos los imput de registro
        'resumen elemento *value': (value) => {
            
            invocar_input_formulario('resumen', value);
          
            

        },
        'introducción elemento *value': (value) => {
            
            invocar_input_formulario('introduccion', value);
          
            

        },
        'contenido elemento *value': (value) => {
            
            invocar_input_formulario('contenido', value);
              

        },
        'conclusiones elemento *value': (value) => {
            
            invocar_input_formulario('conclusiones', value);
              

        },
        'conclusiones elemento *value': (value) => {
            
            invocar_input_formulario('conclusiones', value);
              

        },
        'referencias elemento *value': (value) => {
            
            invocar_input_formulario('referencias', value);
              

        },
        'enviar publicación': () => {
            artyom.say("Publicación enviada");
            document.getElementById('subir-submit').click();
           

        },


        'crear cita para resumen': (value) => {
            artyom.say("Hay 9 citas, con comando cita  resumen seguido del numero 1, para cita basada en el autor(cita textual y de menos de 40 palabras), 2, para cita basada en el texto(cita textual y de menos de 40 palabras), 3, para cita basada en el autor(cita textual y de mas de 40 palabras), 4, para cita basada en el texto(cita textual y de mas de 40 palabras), 5 para cita basada en el texto(parafraseo), 6, para cita basado en el autor(parafraseo), 7,  para autor corporativo, 8, paraautor anónimo, 9, para cita de una cita ");
          
            document.getElementById('citarRes2').click();

        },
        'reproducir publicación *value': (value) => {
            var valor=value.replace('uno','1').replace('dos','2').replace('tres','3').replace('cuatro','4').replace('cinco','5').replace('seis','6').replace('siete','7').replace('ocho','8').replace('nueve','9');
            value=parseInt(value.charAt(0));
            reproducir_publicacion(value-1);
              

        },

       
       

    };

    function reproducir_publicacion(value){
        if(document.body.contains( document.getElementById('speech_post'+value))){
            reproducir_contenido(value);
        }else{
            artyom.say("La publicación nombrada sobrepasa el límite o no existe, volver a intentar");
                console.log("El input es:"+value);
        }
    }

    function invocar_input_formulario(tipoInput,value){

        var valor=value.replace('uno','1').replace('dos','2').replace('tres','3').replace('cuatro','4').replace('cinco','5').replace('seis','6').replace('siete','7').replace('ocho','8').replace('nueve','9');
        var espacio=" ";
            var num=parseInt(valor.charAt(0));
            num=num-1;
            if (num===0){
                num=""; espacio="";
            }
                
           valor=valor.substring(2, valor.length);
           /* Comprobando la existencia del identificador invocado con la voz, para proceder a agregar el valor del input suministrado por invocación asociada con comando de voz */

           if(document.body.contains( document.getElementById(tipoInput+ espacio+ num))){
                document.getElementById(tipoInput+ espacio+ num).value=valor;
                artyom.say("Estas escribiendo en"+ tipoInput+" elemento "+(num+1)+", "+valor);
                document.getElementById(tipoInput+ espacio+ num).focus();
           }else{
                artyom.say("El imput no existe, volver a intentar");
                console.log("El input es:"+value);

           }

    }
    // Añadimos los comandos

    annyang.addCommands(commands);

    // Empezamos la escucha
    annyang.start();
}
if (!annyang) {
    console.log("El reconocimiento de voz de annyang no es compatible con el navegador");
    
        artyom.say(
            "El reconocimiento de voz de annyang no es compatible con el navegador, se recomienda Chrome"
        );

    
}