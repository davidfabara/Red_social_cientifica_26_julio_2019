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
        
            artyom.say("Estas en el login, comando ayuda disponible");


};

function ejecutar_ayuda_login() {

    artyom.say( "Estas en el formulario de login, se tiene 2 campos de entrada, puedes acceder a ellos pronunciándolos, el primero es usuario, el segundo es el password, el tercero es acceder si eres nuevo, di:  ir a registro, para ayuda avanzada, pronuncia este comando");          

}
function pegarDeletreo(tipo_input){
    /* Para eliminar caracteres especiales, tildes de los inputs recabados con el sintetizador de voz e incluir la ñ */
    if(tipo_input==='password')
        tipo_input=tipo_input.replace('word','');

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
            if(tipo_input==='pass')
                tipo_input='password'
            artyom.say("Se ha pegado el deletreo en, "+tipo_input);
        }else{
            artyom.say("No existe el input con nombre :"+tipo_input);
        }
        
        

        
    }
}
/* TODO: */


if (annyang) {
    annyang.setLanguage('es-ES');

    var commands = {
        'ayuda': () => {
            $("#login-sms-oculto").click();
          

        },
        'ayuda avanzada': () => {
            artyom.say("Para guardar en memoria pronuncia, deletrear, seguido del caracter asi susecivamente, luego pronuncias, pegar deletrear, seguido del nombre del input al que deseas asignar ");
        },
        'información': () => {
            $("#login-sms-oculto").trigger("click");
        },
        'usuario *value': (value) => {
            $("#login-usuario").val(
                value
                .toLowerCase()
                .replace('arroba', '@')
                .replace(/ /g, '')
                .replace(' ', '') /* Unirá la interpretacion de varias palabras y las tomará como 1*/
            
                
            );
            

            

            annyang.start();
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
            artyom.say("Deletreo borrado:"+deletreo);
        },

        //introducimos el password
        'password *value': (value) => {
            $("#password-input").val(value.toLowerCase());
            pegarDeletreo("#password-input","password");
        },
        //mostramos los valores del formulario
        'acceder': () => {
            $("#submit-input").click();

        }, // Redirigir a la sección de registro
        'ir a registro': () => {
            document.getElementById('link_a_registro').click();


        },
        'donde estoy': () => {
            artyom.say("El lector se ha iniciado");
            console.log("El lector se ha iniciado");
          

        },
       

    };

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