var deletreo = "";

window.addEventListener('load', ejecutarArtyom);

function ejecutarArtyom() {
        artyom.initialize({
        lang: "es-ES", // idioma nativo para reproducción del lector
        continuous: false, // Evitar el reconocimiento ya que usamos la herramienta annyang
        listen: false, // Iniciar TODO: Esta variable con FALSE permite desactivar el sintetizador !
        debug: true, // Muestra un informe en la consola
        speed: 1.3 // Velocidad normal con  1
        
        });
        
            artyom.say("Estas en el registro, comando ayuda disponible");


};



/*
$(document).ready(function() {
    $("a").click(function(event) {
      var href = $('a').attr('href');
      var id = $('a').attr('id');
      var valor = $('a').attr('text');
      
      alert(href);
      alert(id);
      alert(valor);
      event.preventDefault();
      abrir_elemento(href);
    });
  });

function abrir_elemento(enlace) {
    console.log('Ejecutado la funcion abrir_elemento');
 
    var a = document.createElement("a");

    a.target = "_self";

    a.href = enlace;

    a.click();
    

}
*/

function ejecutar_ayuda_registro() {

    artyom.say( "Estas en el formulario de registro, se tiene 6 campos de entrada, el primero es el tipo de discapacidad(moderada, grave, grave o ciega), los siguientes son nombre, usuario, password, país, profesión, los cuales al nombrarlos seguido del valor de entrada puedes registrarte, al final pronuncias, registrar, o pronunciar ir a login para regrezar, pronunciar ayuda avanzada para escritura");
          
}
function pegarDeletreo(tipo_input){
    /* Para eliminar caracteres especiales, tildes de los inputs recabados con el sintetizador de voz e incluir la ñ */

    if(tipo_input==='profesión'||tipo_input==='profesion')
        tipo_input=tipo_input.replace('sion','').replace('sión','');

    tipo_input=tipo_input.replace(' ', '').normalize('NFD')
    .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();

           /* stackoverflow(2019) Eliminar signos diacríticos en JavaScript. Eliminar tildes (acentos ortográficos), virgulillas, diéresis, cedillas.Recuperado de : https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos */

    if(deletreo != ""){
        console.log(tipo_input);
        
        if(document.body.contains(document.getElementsByName(tipo_input)[0])){
            document.getElementsByName(tipo_input)[0].value=deletreo;
            document.getElementsByName(tipo_input)[0].focus();
            if(tipo_input==='profe')
                tipo_input='profesión'
            artyom.say("Se ha pegado el deletreo en, "+tipo_input);
        }else{
            artyom.say("No existe el input con nombre :"+tipo_input);
        }
        
        

        
    }
}
/* T

/* TODO: */

function reanudarAnnyang() {

    annyang.start(); /* Una vez terminado de reproducir mensaje, se renueva la sintesis de comandos de voz*/
}

function pausar() {

    responsiveVoice.pause();
    annyang.start();
}

function continuar() {
    responsiveVoice.resume();

}

function cancelar() {
    responsiveVoice.cancel();

}

if (annyang) {
annyang.setLanguage('es-ES');
    var commands = {
        'ayuda': () => {
            $("#registro-sms-oculto").click();
        },
        'ayuda avanzada': () => {
            artyom.say("Para guardar en memoria pronuncia, deletrear, seguido del caracter asi susecivamente, luego pronuncias, pegar deletrear, seguido del nombre del input al que deseas asignar ");
        },
           'discapacidad visual *value': (value) => {
               $("#discapacidad-registro").val(
                   value
               );

 
           },
        
        'nombre *value': (value) => {
            $("#nombre-registro").val(value);
            console.log($("#nombre-registro").val(value));
                
        },
                
        'usuario *value': (value) => {
            $("#usuario-registro").val(
                value
                .toLowerCase()
            );

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
        'pegar deletrear en *value': (value) => {
            pegarDeletreo(value);
        },
        'borrar deletrear': () => {
            deletreo = '';
            console.log('deletreo esta:' + deletreo);
            artyom.say('deletreo borrado');
        },

        //introducimos el password
        'password *value': (value) => {
            $("#registro-password").val(value.toLowerCase());

        },
        //mostramos los valores del formulario
        'país *value': (value) => {
            $("#registro-pais").val(value);


        },
        'origen *value': (value) => {
                 $("#registro-pais").val(value);


        },
        'registrar': () => {
            $("#registro-submit").click();

        },
        'profesión *value': (value) => {
            $("#registro-profesion").val(value);

        },
        'registrar': () => {
            $("#registro-submit").click();

        },
   
        'eres nuevo': () => {
            $("#tengoCuenta").click();
            if (responsiveVoice.voiceSupport()) {

            responsiveVoice.speak("Has accedido");
            }

        },
        
        'ir a login': () => {
            document.getElementById('tengoCuenta').click();


        },
        'ir a login 2': () => {
            console.log('LLamando al comando ir a login 2');
            $("a").click(function(){
                console.log('LLamando al comando ir a login 2 pero dentro de la funcion');

            }

            );    

        },

        'donde estoy': () => {
            if (responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("Estas en el formulario registro de acceso");
            }

        },/* TODO: */
        'tengo cuenta': () => {
           /* "ESTO FUNCIONA" */ 
        document.getElementById('tengoCuenta').click();

        },

    };

    // Añadimos los comandos


    annyang.addCommands(commands);

    // Empezamos la escucha
    annyang.start();
}
if (!annyang) {
    console.log("El reconocimiento de voz de annyang no es compatible con el navegador");
    if (responsiveVoice.voiceSupport()) {
        responsiveVoice.speak(
            "El reconocimiento de voz de annyang no es compatible con el navegador, se recomienda Chrome"
        );

    }
}
