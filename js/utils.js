// utils.js

/******************************** Variables globales. ********************************/
//variables para el manuTramitsLobby.jsp
var empresarial = 'PGE';
var personal = 'PGP';
// expresiones regulares para reemplazar tildes y eÃ±es.
var ntildeRe = new RegExp('&ntilde;', 'g');
var ntildeCapRe = new RegExp('&Ntilde;', 'g');
var aacuteRe = new RegExp('&aacute;', 'g');
var aacuteCapRe = new RegExp('&Aacute;', 'g');
var eacuteRe = new RegExp('&eacute;', 'g');
var eacuteCapRe = new RegExp('&Eacute;', 'g');
var iacuteRe = new RegExp('&iacute;', 'g');
var iacuteCapRe = new RegExp('&Iacute;', 'g');
var oacuteRe = new RegExp('&oacute;', 'g');
var oacuteCapRe = new RegExp('&Oacute;', 'g');
var uacuteRe = new RegExp('&uacute;', 'g');
var uacuteCapRe = new RegExp('&Uacute;', 'g');
var uumlRe = new RegExp('&uuml;', 'g');
var uumlCapRe = new RegExp('&Uuml;', 'g');
var ampersandRe = new RegExp('&amp;', 'g');
var ampersand = new RegExp('&amp;', 'g');


// expresion regular para reemplazar las vocales tildadas por sin tildar.
var atildereplace = new RegExp('Ã¡', 'g');
var etildereplace = new RegExp('Ã©', 'g');
var itildereplace = new RegExp('Ã­', 'g');
var otildereplace = new RegExp('Ã³', 'g');
var utildereplace = new RegExp('Ãº', 'g');
var atildecapreplace = new RegExp('Ã', 'g');
var etildecapreplace = new RegExp('Ã‰', 'g');
var itildecapreplace = new RegExp('Ã', 'g');
var otildecapreplace = new RegExp('Ã“', 'g');
var utildecapreplace = new RegExp('Ãš', 'g');
//var dotreplace 		=  new RegExp ('.', 'g');
var commareplace = new RegExp(',', 'g');
//var asteriscreplace =  new RegExp ('*', 'g');

// Expresiones regulares para remplezar simbolos de <, > y " en XML
var lessthanreplace = new RegExp('&lt;', 'g');
var quotesreplace = new RegExp('&#034;', 'g');
var greaterthanreplace = new RegExp('&gt;', 'g');

// jsanca: expresion para verificar si es una cantidad.
var IS_AMOUNT_EXPRESSION = "^-?(\\d)+(\\.(\\d)+)*$";
// ExpresiÃ³n regular verificar que los caracteres no sean solo espacios.
var IS_SECURITY_ANSWER_EXPRESION = "^[a-z0-9A-Z]+((\\s)[a-z0-9A-Z]+)*$";
// Patron para uso de las fechas
var DD_MM_YYYY = "dd/MM/yyyy";
// Patron para uso de las fechas
var MM_DD_YYYY = "MM/dd/yyyy";
// jchavess: Juego de caracteres numÃ©ricos (para usar en el mÃ©todo inCharSet)
var NUMERICAL_CHAR_SET = "0123456789";
//jgonzaleza: Juego de carateres alfanumÃ©ricos (para usar en el mÃ©todo inCharSet)
var ALPHA_CHAR_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZYÃ±Ã¡Ã©Ã­Ã³ÃºÃ‘ÃÃ‰ÃÃ“Ãš0123456789 ";
//rmontoya: Juego de carateres alfanumÃ©ricos (para usar en el mÃ©todo inCharSet)
var ALPHA_NUMERIC_CHAR_SET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZY0123456789";
//Valores por defecto para el ancho y alto del "pop-up" que crea el mÃ©todo vnt(page, width, height)
var popupWidth = 650;
var popupHeight = 440;
// Expresion regular para validar una direcciÃ³n de correo electrÃ³nico, debe coincidir con la registrada en el globalParameters-config.xml
// var EMAIL_REGULAR_EXPRESSION = "^([a-zA-Z0-9\-_]+)((\.[a-zA-Z0-9\-_]+)*)[@]([a-zA-Z0-9\-_]+)[\.]([a-zA-Z0-9\-_]+)((\.[a-zA-Z0-9\-_]+)*)$";
/************************************* Funciones. *************************************/

/**
Carga la pÃ¡gina y los componentes que requieran inicializaciÃ³n.
jvillalobos. 08-11-2004
*/
function loadBody(selectedMenuOption) {
    // oculta las listas del menÃº. Se hace de esta manera para que los usuarios
    // que no tienen javascript habilitado puedan ver las opciones.
    // se llama 2 veces a la funciÃ³n porque en el primer llamado se asigna el
    // display como block y en el segundo llamado se asigna como none.
    toggleObject("BankProductsItemSubOptionList", "block");
    toggleObject("BankProductsItemSubOptionList", "block");
    toggleObject("CreditProductsItemSubOptionList", "block");
    toggleObject("CreditProductsItemSubOptionList", "block");
    toggleObject("InvestmentProductsItemSubOptionList", "block");
    toggleObject("InvestmentProductsItemSubOptionList", "block");
}

/*
Resalta una serie de elementos en el menÃº para hacer notar cuÃ¡l opciÃ³n estÃ¡ seleccionada.
jvillalobos. 22-09-2004
*/
function selectMenuItem(option, subOptionList, subOption) {
    var opt = findObject(option);
    var subOpt;

    if (opt) {
        opt.style["fontWeight"] = "bold";

        if (toggleObject(subOptionList, "block")) {
            toggleObject(subOption, "inline");
        }
    }
}

/*
Encuentra un objeto en el documento.
jvillalobos. 14-09-2004
*/
function findObject(n, d) {

    var p, i, x;

    if (!d) {
        d = document;
    }

    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
    }

    if (!(x = d[n]) && d.all) {
        x = d.all[n];
    }

    for (i = 0; !x && i < d.forms.length; i++) {
        x = d.forms[i][n];
    }

    for (i = 0; !x && d.layers && i < d.layers.length; i++) {
        x = findObject(n, d.layers[i].document);
    }

    if (!x && d.getElementById) {
        x = d.getElementById(n);
    }

    return x;
}

/*
Realiza un efecto de rollover sobre una imagen.
jvillalobos. 14-09-2004
*/
function rollOverImage() {
    var i, x;
    var j = 0;
    var a = rollOverImage.arguments;

    document.preloadedImages = new Array;

    for (i = 0; i < (a.length - 2); i += 3) {
        if ((x = findObject(a[i])) != null) {
            document.preloadedImages[j++] = x;

            if (!x.oSrc) {
                x.oSrc = x.src;
            }

            x.src = a[i + 2];
        }
    }
}

/*
Realiza un efecto de rollout en una imagen.
jvillalobos. 14-09-2004
*/
function rollOutImage() {
    var i, x, a = document.preloadedImages;

    for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
        x.src = x.oSrc;
    }
}

/*
Aparece / desaparece un objeto. 'name' es el nombre del objeto y 'type' es el tipo de
display del objeto (block o inline). Retorna false si el objeto no fue encontrado.
jvillalobos. 21-09-2004
*/
function toggleObject(name, type) {
    var obj = findObject(name);
    var result = false;

    if (obj) {
        if (obj.style["display"] == null || obj.style["display"] == "none" ||
            obj.style["display"] == "") {

            if (type) {
                obj.style["display"] = type;
            } else {
                obj.style["display"] = "block";
            }
        } else {
            obj.style["display"] = "none";
        }

        result = true;
    }

    return result;
}

/**
Permite controlar los submits dobles. Muestra un mensaje si el usuario intenta
hacer doble submit.
*/

function validSubmit() {
    var result = false;
    submitCount++;

    if (submitCount == 1) {
        result = true;
    } else {
        addDialogToPage();
    }
    return result;
}

/**
Muestra un dialogo de espera que bloquea la pÃ¡gina miestras se carga 
si el usuario intenta hacer doble submit.
*/
var isDialogActive = false;
var isWaiting = false;
var isFirstTime = true;
function addDialogToPage() {
    if (!isDialogActive) {
        /* Div que bloque la pagina mientras carga */
        var frontDialogDiv = document.createElement("div");
        frontDialogDiv.id = "loading-lock-dialog";

        /* Div del dialogo de carga */
        var loaderDialogDiv = document.createElement("div");
        loaderDialogDiv.id = "dialog-lock-content";

        /* TÃ­tulo del dialogo */
        var loaderDialogTitle = document.createElement("p");
        loaderDialogTitle.id = "dialog-lock-title";
        var titleText = document.createTextNode(loadingtitleLabel);
        loaderDialogTitle.appendChild(titleText);
        loaderDialogDiv.appendChild(loaderDialogTitle);

        /* Texto del dialogo */
        var loaderDialogText = document.createElement("p");
        loaderDialogText.id = "dialog-lock-text";
        var dialogText = document.createTextNode(loadingtextLabel);
        loaderDialogText.appendChild(dialogText);
        loaderDialogDiv.appendChild(loaderDialogText);

        /* BotÃ³n de cerrar el dialogo */
        var loaderDialogClose = document.createElement("div");
        loaderDialogClose.id = "dialog-close-button";
        loaderDialogDiv.appendChild(loaderDialogClose);

        /* Imagen del dialogo */
        var loaderDialogImage = document.createElement("div");
        loaderDialogImage.id = "dialog-lock-image";
        loaderDialogDiv.appendChild(loaderDialogImage);

        /* Se agrega dialogo en la pÃ¡gina */
        document.body.insertBefore(frontDialogDiv, document.body.firstChild);
        document.body.insertBefore(loaderDialogDiv, document.body.firstChild);
        isDialogActive = true;
    }

    if (!isFirstTime) {
        document.getElementById('dialog-lock-title').innerHTML = loadingtitleLabel2;
        document.getElementById('dialog-lock-text').innerHTML = loadingtextLabel2;
    }

    if (!isWaiting) {
        /*Incializa las propiedades de estilo "Display" para el dialogo*/
        document.getElementById('dialog-close-button').style.display = "none";
        document.getElementById('loading-lock-dialog').style.display = "block";
        document.getElementById('dialog-lock-content').style.display = "block";
        isWaiting = true;
        /*Presenta un botÃ³n de cerrar al cabo de un tiempo determinado.*/
        function showCloseButton() {
            document.getElementById('dialog-close-button').style.display = "block";
            document.getElementById('dialog-close-button').onclick = function () {
                document.getElementById('loading-lock-dialog').style.display = "none";
                document.getElementById('dialog-lock-content').style.display = "none";
                document.getElementById('dialog-close-button').style.display = "none";
                isWaiting = false;
                isFirstTime = false;
            };
        };
        /*Establece el tiempo de espera para presentar el botÃ³n de cerrar*/
        setTimeout(showCloseButton, timeoutLoading);
    }
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        removeAttrHref();
    }
}

/**
 * Remueve el href de los <a>
 * Se llama despues de validar un submit para que 
 * el doble clik sobre el elemento con el href no interrumpa
 * la carga de las paginas.
 */
function removeAttrHref() {

    var disableElements = document.getElementsByTagName('a');

    for (var i = 0; i < disableElements.length; i++) {
        disableElements[i].removeAttribute('href');
    }
}

/**
 Oculta el dialogo de espera que bloquea la pÃ¡gina miestras se carga. 
*/
function closeDialogLoading() {
    document.getElementById('loading-lock-dialog').style.display = "none";
    document.getElementById('dialog-lock-content').style.display = "none";
    document.getElementById('dialog-close-button').style.display = "none";
    isWaiting = false;
    isFirstTime = true;
}

/**
Permite controlar los submits dobles. 
Ejecuta el submit del FORM.
*/
function singleSubmit(form) {
    var result = validSubmit();
    if (result) {
        form.submit();
    }
    return result;
}

/**
 * Reemplaza las ocurrencias de referencias a entidades HTML (e.g. &ntilde ;, &aacute ;,...)
 * por sus caracteres equivalentes.
 */
function replaceCharacterEntities(str) {
    // ver las variables globales.
    str = str.replace(ntildeRe, '\u00F1');
    str = str.replace(ntildeCapRe, '\u00D1');
    str = str.replace(aacuteRe, '\u00E1');
    str = str.replace(aacuteCapRe, '\u00C1');
    str = str.replace(eacuteRe, '\u00E9');
    str = str.replace(eacuteCapRe, '\u00C9');
    str = str.replace(iacuteRe, '\u00ED');
    str = str.replace(iacuteCapRe, '\u00CD');
    str = str.replace(oacuteRe, '\u00F3');
    str = str.replace(oacuteCapRe, '\u00D3');
    str = str.replace(uacuteRe, '\u00FA');
    str = str.replace(uacuteCapRe, '\u00DA');
    str = str.replace(uumlRe, '\u00FC');
    str = str.replace(uumlCapRe, '\u00FC');
    str = str.replace(ampersandRe, '\u0022');

    return str;
}

/**
 * Reemplaza las tildes de las vocales
 * por sus caracteres equivalentes.
 */
function replaceTildeCharacter(str) {
    // ver las variables globales.

    str = str.replace(atildereplace, 'a');

    str = str.replace(etildereplace, 'e');
    str = str.replace(itildereplace, 'i');
    str = str.replace(otildereplace, 'o');
    str = str.replace(utildereplace, 'u');
    str = str.replace(atildecapreplace, 'A');
    str = str.replace(etildecapreplace, 'E');
    str = str.replace(itildecapreplace, 'I');
    str = str.replace(otildecapreplace, 'O');
    str = str.replace(utildecapreplace, 'U');
    str = str.replace('.', '');
    str = str.replace(commareplace, '');
    str = str.replace('*', '');
    return str;



}


/**
 * Selecciona del select, el item con el indice indicado en index.
 */
function selectIndex(select, index) {
    if (index < select.length) { select.selectedIndex = index; }
} // selectIndex.

/**
 * Selecciona del select, el item con el value indicado en option.
 */
function selectOption(select, option) {
    for (var i = 0; i < select.length; ++i) {
        if (select.options[i].value == option) {
            select.options[i].selected = true;
            return;
        }
    }
} // selectOption.

/**
 * Hides - shows a group of tags by the id value and the tag type
 * @param tag tag type, i.e.: 'tr' 'a'
 * @param tagId id value
 * @param hide if true hides the tags, otherwise shows the hidden tags
 */
function hideTags(tag, tagId, hide) {
    obj = document.getElementsByTagName(tag);

    for (i = 0; i < obj.length; i++) {
        if (obj[i].id == tagId) {
            if (hide) { obj[i].style.display = ''; }
            else { obj[i].style.display = 'none'; }
        }
    }
}

/**
 * Allows writing only numbers that may contain a dot in a textbox. Do not allows negative numbers
 * @param event the keypressed event
 * @param obj the object to be checked
 * @usage i.e. <input type='text' onkeypress='return checkNumber(event,this)'/>
 */
function checkNumber(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }
    // check double dot
    if (obj.value.indexOf('.') != -1 && code == 46) return false;

    return ((code >= 48 && code <= 57) || code == 46 || code == 8 || code == 9 || (code == 35 && noIE == true));
}
/**
 * Allows writing only numbers,with no dots in a textbox. Do not allows negative numbers
 * @param event the keypressed event
 * @param obj the object to be checked
 * @usage i.e. <input type='text' onkeypress='return checkNumberNoDot(event,this)'/>
 */
function checkNumberNoDot(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }
    return ((code >= 48 && code <= 57) || code == 8 || code == 13 || code == 9 || (code == 35 && noIE == true));
}
/**
 * Allows writing only numbers and letters in a textbox. Do not allows negative numbers
 * @param event the keypressed event
 * @param obj the object to be checked
 */
function checkOnlyNumberAndLetters(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }
    return ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||
        code == 8 || code == 13 || code == 9 || (code == 35 && noIE == true));
}
/*
* Checks that the keys CRTL+V are not pressed
* @param event the keydown event
* @param obj the object to be checked
* @return false if the CRTL+V is pressed otherwise returns true
*/
function noPaste(event, obj) {

    if (event.modifiers && Event.CONTROL_MASK) {
        return false; //netscape 4.0
    }
    else if (event.ctrlKey && (event.keyCode == 86)) {
        return false;//iexplorer, netscape 6.0, firefox
    }
    else return true;

}

/**
 * Check if VALUE is empty. Either 0 or "" or empty string "   ".
 * @param str input string
 * @return boolean
 * @see http://
 */
function isEmpty(str) {
    var ret = false;

    if (typeof str == "string") {
        if ((str == "") || (str.search(/^\\s*$/) != -1)) {
            ret = true;
        }
    }
    else if (typeof str == "number") {
        if (str == 0 || str == 0.0) ret = true;
    }
    return ret;
}

/**
 * Parsea un String y lo convierte en un objeto de fecha de javascript
 * si no se especifica el formato utiliza el formato DD_MM_YYYY por defecto
 * @param str String que contiene la fecha a parsear
 * @param dateFormat String que contiene el formato de la fecha
 */
function parseDate(str, dateFormat) {
    re = /(\d{1,2})\/(\d{1,2})\/(\d{4})/
    var arr = re.exec(str);
    var mDate;

    if (dateFormat) {
        if (dateFormat == DD_MM_YYYY) {
            mDate = new Date(parseInt(arr[3]), parseInt(arr[2], 10) - 1, parseInt(arr[1], 10));
        }
        else if (dateFormat == MM_DD_YYYY) {
            mDate = new Date(parseInt(arr[3]), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
        }
    }
    else {
        mDate = new Date(parseInt(arr[3]), parseInt(arr[2], 10) - 1, parseInt(arr[1], 10));
    }
    return mDate;
}
/**
* Compara amount1 con amount2
* Si es menor retorna -1
* Si es mayor retorna 1
* Si es igual retorna 0
*/
function compareAmount(amount1, amount2) {
    var result = 0;
    if (parseFloat(amount1) > parseFloat(amount2)) {
        result = 1;
    }
    else if (parseFloat(amount1) < parseFloat(amount2)) {
        result = -1;
    }
    return result;
}
/*
* Funcion que compara la fecha initDate con la fecha endDate se
* agrega el patrÃ³n de las fechas para su comparacion
* -1 en caso de que la fecha inicio sea menor que la fecha fin 
* 1 en caso de que la fecha inicio sea mayor que la fecha fin 
* 0 en cualquier otro caso
*/
function compareDate(initDate, endDate, datePattern) {
    var result = 0;
    var endDateCmp = parseDate(endDate, datePattern);
    var initDateCmp = parseDate(initDate, datePattern);
    //Verifica si la fecha de inicio es menor que la fecha final 
    if (initDateCmp < endDateCmp) {
        result = -1;
    }//si la fecha final es mayor que la actual
    else if (initDateCmp > endDateCmp) {
        result = 1;
    }
    return result;
}

/*********************************************************************************************************
  * Elimina los espacios en blanco de la cadena, al final de la cadena.
  * retorna la cadena sin espacios.
  * jsanca
  */
function trimLast(svalue) {
    // Elimina uno o mas espacios.

    var re = /[ ]+/;
    return svalue.replace(re, "");
} // trim.

/*********************************************************************************************************
* Verifica si el string es un monto, verifica signo negativo.
* retorna true si es un monto false en caso contrario.
* jsanca
*/
function isAmount(svalue) {

    var regExp = RegExp(IS_AMOUNT_EXPRESSION);
    return regExp.test(svalue);
} // isAmount

/* Realiza el submit del los form de descarga y resetea el contador de submit.
jrgonzalez*/
function submitDownload(form) {
    form.submit();
    submitCount = 0;
}

/**
 * Creates a new secondary browser window and loads the referenced resource.
 * 
 * @param theURL This is the string of the referenced resource that will be loaded 
 * in the new window. strUrl can be an HTML document on the web, it can be an image 
 * file or any type of file which is supported by the browser.	
 * 
 * @param winName This is the string that just names the new window. Such string can 
 * be used to be the target of links and forms when the target attribute of an <a>
 * element or of a <form> is specified. This string parameter should not contain any 
 * blank space. strWindowName does not specify the title of the new window.
 * 
 * @param features Optional parameter. This parameter is the string which lists the 
 * requested window features (window functionalities and toolbars) of the new browser 
 * window. This string parameter must not contain any blank space. Each requested window 
 * feature must be separated by a comma inside the character string. 
 */
function MM_openBrWindow(theURL, winName, features) {
    window.open(theURL, winName, features);
}

/**
 * Valida si una hilera se compone exclusivamente de los caracteres de un conjunto de caracteres.
 * @param str la hilera que se va a validar.
 * @param charset el conjunto de caracteres contra el que se va a comparar la hilera.
 * @return true si la hilera se compone solo de caracteres contenidos en el conjunto de caracteres.
 * false en caso contrario.
 * jvillalobos. 02-06-2005 
 */
function inCharset(str, charset) {
    var result = true;

    for (var i = 0; i < str.length; i++) {
        if (charset.indexOf(str.charAt(i)) < 0) {
            result = false;
            break;
        }
    }

    return result;
}

/**
 * Determina si una hilera corresponde a un email.
 * @param str hilera que se va a validar.
 * @return true si la hilera es un correo electrÃ³nico. false en caso contrario.
 */
function isEmail(str) {
    var result = false;
    var length = str.length;
    var pos = str.indexOf('@');
    // busca un '@' dentro de la hilera.
    if (pos > 0 && pos < length - 1) {
        var user = str.substring(0, pos);
        var server = str.substring(pos + 1, length);
        var serverLength = server.length;
        var pointPos = server.indexOf('.');
        // verifica que no haya otro '@' y que haya un '.' en la parte del servidor.
        if (user.indexOf('@') < 0 && server.indexOf('@') < 0 &&
            pointPos > 0 && pointPos < (serverLength - 1) &&
            server.charAt(serverLength - 1) != '.') {
            result = true;
        }
    }

    return result;
}
/**
 * Completa un nÃºmero con N decimales a la derecha
 * @param number Numero
 * @param decimal Cantidad de decimales
 * jchavess
 */
function completeDecimals(number, decimals) {
    var returnValue = trimLast(number);
    var dotIndex = number.indexOf(".");

    if (dotIndex == -1) {
        returnValue = returnValue + ".";
        dotIndex = returnValue.length - 1;
    }

    for (i = returnValue.length - 1 - dotIndex; i < decimals; i++) {
        returnValue = returnValue + "0";
    }

    return returnValue;
}

/**
 * Valida si una hilera corresponde o no a una respuesta de seguridad.
 * @param str hilera que se va a validar.
 * @return true si la hilera corresponde a una respuesta de seguridad. false en caso contrario.
 */
function isSecurityAnswer(str) {
    var length = str.length;
    var regExp = RegExp(IS_SECURITY_ANSWER_EXPRESION, 'g');

    return (!isEmpty(str) && length <= 30 && length >= 6 && str.match(regExp));
}

/** Resetea un formulario tomando en cuenta el submitCount	
 * @author jgonzalez
 * @version 1.0
 * Fecha: 14-07-2005*/
function resetForm(form) {
    if (submitCount > 0) {
        //alert(redirectLabel);
        addDialogToPage();
    } else {
        return form.reset();
    }
}

/**********************************************************************************************/
/* Revisa que la fecha contenida en initField sea menor a endField 
* en caso de que initField sea mayor a endField muestra el label de comparaciÃ³n de fechas
* en caso de que la fecha inicial sea mayor que el dia actual muestra el label de comparaciÃ³n de fechas
* comparaciÃ³n de referencias
* @param initField objeto input inicial
* @param endField objeto input final
* @param todayField objeto con fecha del servidor
* @param datePattern patrÃ³n de fecha 
* Label necesarios:
*	emptyInitialDateAlert
*	emptyFinalDateAlert
*	invalidInitialDateAlert
*	invalidEndDateAlert
*	InitialDateHighEndDateAlert
*/
function checkAccountStateDates(initField, endField, todayField, datePattern) {
    var comparation = 0;
    var initDate = initField.value;//campo desde
    var endDate = endField.value;//campo hasta
    var todayDate = todayField; //campo para validar


    if (isEmpty(initDate)) {
        alert(emptyInitialDateAlert);
        initField.focus();
        return false;
    }

    if (isEmpty(endDate)) {
        alert(emptyFinalDateAlert);
        endField.focus();
        return false;
    }
    if (compareDate(initDate, todayDate, datePattern) > 0) {
        alert(invalidInitialDateAlert) // fecha inicio mayor a fecha actual
        return false;
    }

    if (compareDate(endDate, todayDate, datePattern) > 0) {
        endField.value = todayDate;
    }

    if (compareDate(initDate, endDate, datePattern) > 0) {
        alert(InitialDateHighEndDateAlert) // fecha inicio mayor a fecha final
        return false;
    }
    return true;
}

/*
* Funcion utilizada para sumar una unidad al mes pasado por parametro
* ademas rellena con un cero a la izquierda en caso de que sea menor a 10
* @param month mes a rellenar y/o modificar
* @return String con el mes modificado 
*/

function getNextMonth(month) {
    var result = new String(month + 1);
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}
/*
* Funcion utilizada para rellenar con un cero a la izquierda en caso de que el dia sea menor a 10
* @param day dia a rellenar y/o modificar
* @return String con el dia modificado 
*/
function getFormatDay(day) {
    var result = new String(day);
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}

/*
* Funcion utilizada para asignar el primer dia del mes actual
* @param field campo asignar la fecha
* @param todaDate fecha del dia actual
* @param datePattern patrÃ³n de fecha
* REVISION:
* Se modifica la funciÃ³n en el mÃ³dulo de RegeneraciÃ³n para que construya
* la variable initDate tomando en cuenta el formato de fecha enviado por parÃ¡metro
* @autor: javila
* FECHA: 02/11/2005
*/

function setInitDate(field, todayDate, datePattern) {

    var today = parseDate(todayDate.value, datePattern);
    var initDay = "01";
    var separator = "/";
    var initDate = "";
    /* Se pregunta si el formato para la fecha estÃ¡ en inglÃ©s para colocar de primero el mes */
    if (datePattern == MM_DD_YYYY) {
        initDate = getNextMonth(today.getMonth()) + separator + initDay + separator + today.getFullYear();
    } else {
        initDate = initDay + separator + getNextMonth(today.getMonth()) + separator + today.getFullYear();
    }
    field.value = initDate;
}



/*
* Funcion utilizada para asignar el ultimo dia del mes anterior. Debe contener con los siguientes campos
* en el form de estado de cuenta: initDate y lastMonthDate
* @param form form con los campos a asignar 
* @param datePattern patrÃ³n de fecha
*/
function setLastMonth(form, datePattern) {

    setInitDate(form.initDate, form.lastMonthDate, datePattern);
    form.endDate.value = form.lastMonthDate.value;
    return true;
}

/**
 Indica si la variable submitCount fue incrementada al enviar algun form
*/
function isSubmited() {
    var result = true;

    if (submitCount > 0) {
        //alert(redirectLabel);
        addDialogToPage();
    } else {
        result = false;
    }
    return result;
}

/*
* Funcion que compara la referencia inicial con la referencia final se
* agrega el patrÃ³n de las fechas para su comparaciÃ³n
* -1 en caso de que la referencia inicio sea menor que la referencia fin 
* 1 en caso de que la referencia inicio sea mayor que la referencia fin 
* 0 en cualquier otro caso
*/
function compareReference(initRef, endRef) {
    var result = 0;
    if (parseFloat(initRef) > parseFloat(endRef)) {
        result = 1;
    }
    else if (parseFloat(initRef) < parseFloat(endRef)) {
        result = -1;
    }
    return result;
}


/**
 * Abre una nueva ventana con la direcci?n especificada en los
 * par?metros, adem?s el tama?o se establece con los par?metros
 * width y height.
 */

function createTarget(form) {
    _target = form.target;
    _colon = _target.indexOf(":");
    if (_colon != -1) {
        form.target = _target.substring(0, _colon);
        form.args = _target.substring(_colon + 1);
    }
    else if (typeof (form.args) == "undefined") {
        form.args = "";
    }
    if (form.args.indexOf("{") != -1) {
        _args = form.args.split("{");
        form.args = _args[0];
        for (var i = 1; i < _args.length; i++) {
            _args[i] = _args[i].split("}");
            form.args += eval(_args[i][0]) + _args[i][1];
        }
    }
    form.args = form.args.replace(/ /g, "");
    _win = window.open('/ebac/images/common/Cblanco.gif', form.target, form.args);
    if (typeof (focus) == "function")
        _win.focus();
    form.submit();
    return true;
}

function checkInputText(event, obj) {
    var noIE = false;
    var code;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }
    if (code == 8 || code == 9) {
        return true;
    }
    return inCharset(String.fromCharCode(code).toUpperCase(), ALPHA_CHAR_SET);
}
/*
* Revisa el texto ingresado y solo permite alfanumericos.
* PLT CRI-10136
*/
function checkInputTextAlphaNumeric(event, obj) {
    var noIE = false;
    var code;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }
    if (code == 8 || code == 9) {
        return true;
    }
    return inCharset(String.fromCharCode(code).toUpperCase(), ALPHA_NUMERIC_CHAR_SET);
}

/*
* Revisa la extensiÃ³n de una ruta
* @param svalue String a revisar
* @param extension extensiÃ³n a revisar
* @return true si el string a revisar cumple con la extensiÃ³n
* PLT CRI-02073
*/
/*function validateExtension(svalue,extension){
   	var regExp = RegExp ("\."+extension+"$");
   	return regExp.test (svalue);
}*/
/**
 * REVISION:
 * Se corrige para que valide no importa si es mayuscula o minuscula o mezclado.
 * @author gdelgadoh
 * @version 1.3
 * Date: 23-01-08
 * PLT: REG-00999
 */
function validateExtension(svalue, extensions) {
    var extension;
    var regExp;
    var valid = false;
    var extensionValue;

    if (svalue != null) {
        extensionValue = svalue.toLowerCase();
    } else {
        extensionValue = svalue;
    }

    for (var x = 0; x < extensions.length; x++) {
        extension = extensions[x];
        regExp = RegExp("\." + extension + "$");
        valid = regExp.test(extensionValue);
        if (valid) {
            return valid;
        }
    }
    return valid;
}

/**
 * Deshabilita los elementos de un form excepto el que posea el nombre 
 * contenido por sourceFieldName
 * @param sourceFieldName nombres de los campos que no se deben deshabilitar
 * @param disableElements true si deshabilita, false si habilita
 * @param sourForms nombres del forms sobre los que se deben deshabilitar los campos
 */
function disableFormFields(sourceFieldName, disableElements, sourceForms) {
    var curFieldName;
    var curFormName;
    var change = true;
    for (var k = 0; k < sourceForms.length; ++k) {
        curFormName = sourceForms[k];
        for (var i = 0; i < document.forms[curFormName].elements.length; ++i) {
            curFieldName = document.forms[curFormName].elements[i].name;
            change = true;
            for (var j = 0; j < sourceFieldName.length; ++j) {
                if (curFieldName == sourceFieldName[j]) {
                    change = false;
                }
            }
            if (change) {
                document.forms[curFormName].elements[i].disabled = disableElements;
            }
        }
    }
}

/**
 * Deshabilita los elementos de un form excepto el que posea el nombre 
 * contenido por sourceFieldName
 * @param sourceFieldName nombres de los campos que no se deben deshabilitar
 * @param disableElements true si deshabilita, false si habilita
 */
function disableFields(sourceFieldName, disableElements) {
    var curFieldName;
    var change = true;
    for (var i = 0; i < document.forms[0].elements.length; ++i) {
        curFieldName = document.forms[0].elements[i].name;
        change = true;
        for (var j = 0; j < sourceFieldName.length; ++j) {
            if (curFieldName == sourceFieldName[j]) {
                change = false;
            }
        }
        if (change) {
            document.forms[0].elements[i].disabled = disableElements;
        }
    }
}

/**
 Indica si la variable submitCount fue incrementada al enviar algun form
*/
function isSubmited() {
    var result = true;

    if (submitCount > 0) {
        addDialogToPage();
        //alert(redirectLabel);
    } else {
        result = false;
    }
    return result;
}

/**
 * Funcion que valida que la descripcion coincida con una serie de hileras en un arreglo
 */
function isValidDescription(description) {
    var result = true;
    for (i = 0; i < descArray.length && result; i++) {
        if (trim(descArray[i].description.toUpperCase()) == trim(description).toUpperCase()) {
            result = false;
        }
    }
    return result;
}

/**
 * Remueve los espacios al inicio de un String
 */
function lTrim(str) {
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(0)) != -1) {

        var j = 0, i = s.length;

        while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
            j++;
        s = s.substring(j, i);
    }

    return s;
}

/**
 * Remueve los espacios al final de un String
 */
function rTrim(str) {
    var whitespace = new String(" \t\n\r");
    var s = new String(str);

    if (whitespace.indexOf(s.charAt(s.length - 1)) != -1) {

        var i = s.length - 1;       // Get length of string

        while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
            i--;
        s = s.substring(0, i + 1);
    }

    return s;
}


/**
 * Remueve los espacios en blanco al inicio y final de un String
 */
function trim(str) {
    return rTrim(lTrim(str));
}

/* Abre una nueva ventana como un pop-up
* CRI-04106
* javila - lalvarado 24-10-2006
*/
function vnt(page, width, height) {
    date = new Date();
    if (date != null) {
        if (width == null || width <= 0 || isNaN(width)) {
            width = popupWidth;
        }
        if (height == null || height <= 0 || isNaN(height)) {
            height = popupHeight;
        }

        var winl = (screen.width - width) / 2;
        var wint = (screen.height - height) / 2;
        if (winl < 0) winl = 0;
        if (wint < 0) wint = 0;
        var settings = 'height=' + height + ',';
        settings += 'width=' + width + ',';
        settings += 'top=' + wint + ',';
        settings += 'left=' + winl + ',';
        settings += ", scrollbars=no, menubar=no, location=no, resizable=no";
        window.open(page, date.getTime(), settings);
    }
}


function validateCheckGroup(ckGroup) {
    var status = false;
    if (!ckGroup.length) {
        status = ckGroup.checked;
    } else {
        for (i = 0; i < ckGroup.length; i++) {
            if (ckGroup[i].checked) {
                status = true;
                break;
            }
        }
    }
    if (!status) {
        alert(checkConfirmTransaction);
    }
    return status;
}


function setCheckAllGroup(ckGroup, status) {

    if (!ckGroup.length) {
        ckGroup.checked = status;
    } else {
        for (i = 0; i < ckGroup.length; i++) {
            ckGroup[i].checked = status;
        }
    }
}

function isAllGroupChecked(ckGroup) {
    var status = true;
    if (!ckGroup.length) {
        status = ckGroup.checked;
    } else {
        for (i = 0; i < ckGroup.length; i++) {
            if (!ckGroup[i].checked) {
                status = false;
                break;
            }
        }
    }

    return status;
}

/**
 * CRI-14421 | eaguerom | 201211
 * Valida que una direcciÃ³n de correo electrÃ³nico sea vÃ¡lida de acuerdo con la expresiÃ³n
 * regular de validaciÃ³n: Se pasa por parametro.
 * Fecha: 20-11-2012
 * @author eaguerom
 */
function isValidEmail(mailbox, _regExp) {
    var trimMailBox = trim(mailbox);
    return trimMailBox.match(_regExp);
}




/**
 * CRI-04502
 * Valida que la diferencia entre una fecha inicial y final no supere un cierto nÃºmero de dÃ­as
 * Fecha: 02-04-2007
 * @author kjimenez
 */
function validDateRange(_initDate, _endDate, maxDayDiff) {
    var oneDay = 1000 * 60 * 60 * 24;
    var initDate = parseDate(_initDate, dateFormat);
    var endDate = parseDate(_endDate, dateFormat);
    var difference = (endDate - initDate) / oneDay;
    return difference <= maxDayDiff;
}

function validNumber(string) {
    var checkNum = "0123456789"
    var allValid = true;

    for (a = 0; a < string.length; a++) {
        ch = string.charAt(a);
        for (b = 0; b < checkNum.length; b++) {
            if (ch == checkNum.charAt(b)) {
                break;
            }
        }
        if (b == checkNum.length) {
            allValid = false;
            break;
        }
    }
    return allValid;
}/**
 * CRI-05012
 * Valida que que se ingrese la expresion correcta. Importante ingresar el tipo: int, dec, str
 * Fecha: 13-08-2007
 * @author jaltamirano
 */
function validateStringNumeric(xinput, tipval) {
    if (!event) var event = window.event;
    var xkey = event.keyCode;
    if (tipval == "int")
        if ((xkey < 48) || (xkey > 57)) event.returnValue = false;
    if (tipval == "dec") {
        if ((xkey < 46) || (xkey > 57)) event.returnValue = false;
    }



    if (tipval == "str")
        if (((xkey != 32) && (xkey < 65)) || ((xkey > 90) && (xkey < 97))) event.returnValue = false;
    if (tipval == "tlf")
        if (((xkey != 32) && (xkey < 45)) || (xkey > 57)) event.returnValue = false;

    if (tipval == "afn") {
        if (((xkey != 32) && (xkey < 45)) || (xkey > 57) ||
            ((xkey < 48) || (xkey > 57))) event.returnValue = false;
    }

}

function validateString(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }

    /// Letras a-z A-Z
    if (((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122))) return true;
    /// Direccionamiento: <-, ->
    if ((code == 37) || (code == 39)) return true;
    /// <-, Tab, Barra
    if ((code == 8) || (code == 9) || (code == 32)) return true;
    /// Inicio, Fin, Supr
    if ((code == 36) || (code == 35) || (code == 46)) return true;
    /// Ã±, Ã‘
    if ((code == 209) || (code == 241)) return true;

    return false;

}

function validateAlphaNumeric(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }

    /// Numeros 0-9
    if ((code >= 48) && (code <= 57)) return true;
    return validateString(event, obj);

    return false;

}

/**
 * CRI-05012
 * Cuenta los caracteres que se ingresan. Esto es limitado por el parametro total, que es el numero
 * de carac. que permite.
 * Fecha: 13-08-2007
 * @author jaltamirano
 */
function countCharacter(objText, total) {
    if (objText.value.length > total) {
        objText.value = objText.value.substring(0, total - 1);
    }
}

/**
 * CRI-05654
 * Verifica que el numero contenga numeros 0-9 con parentesis y guion.
 * Fecha: 07-01-2008
 * @author jaltamirano
 */
function validateNumberPhone(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }

    /// Direccionamiento: <-, ->
    if ((code == 37) || (code == 39)) return true;
    /// <-, Tab, Barra
    if ((code == 8) || (code == 9) || (code == 32)) return true;
    /// Inicio, Fin, Supr
    if ((code == 36) || (code == 35) || (code == 46)) return true;

    /// ( ) -
    if ((code == 40) || (code == 41) || (code == 45) || (code == 32)) return true;
    /// Numeros 0-9
    if ((code >= 48) && (code <= 57)) return true;

    return false;

}

function validateOtherCharacter(event, obj) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }

    if ((code == 35) || ((code >= 44) && (code <= 47))) return true;
    if ((code == 42) || (code == 59) || (code == 64) || (code == 95)) return true;
    if ((code == 225) || (code == 233) || (code == 237) || (code == 243) || (code == 250)) return true;
    return validateAlphaNumeric(event, obj);
}

function countCharacter(event, objText, total) {
    var noIE = false;
    if (!event) var event = window.event;
    if (event.keyCode) code = event.keyCode;
    else if (event.which) { code = event.which; noIE = true; }

    if (objText.value.length >= total) {
        objText.value = objText.value.substring(0, total);
        /// <=
        if ((code == 8)) return true;
        /// Inicio, Fin, Supr
        if ((code == 36) || (code == 35) || (code == 46)) return true;
        /// Direccionamiento: <-, ->
        if ((code == 37) || (code == 39)) return true;

        return false;
    } else {
        objText.value = objText.value.substring(0, total - 1);
    }
}

/**
 * Aligns - align a group of tags by the id value and the tag type
 * @param tag tag type, i.e.: 'tr', 'td'
 * @param tagId id value
 * @param align position of the tag, i.e: 'left', 'center'
 */
function alignTags(tag, tagId, align) {
    obj = document.getElementsByTagName(tag);
    for (i = 0; i < obj.length; i++) {
        if (obj[i].id == tagId) {
            obj[i].align = align;
        }
    }
}
/**
 * HON-01113
 * Verifica que el valor sea alfanumerico
 * Fecha: 14-12-2009
 * @author ecalderon
 */
function validateAlphaNumericString(event, obj) {
    var filter = /([A-Z]|[a-z]|[0-9]|\d|[\-]|[\_])/;
    if (!event) var event = window.event;
    if (event.keyCode) return true;
    else if (event.which) { code = event.which; }
    return (filter.test(String.fromCharCode(code)) || code == 8 || code == 13 || code == 9 || (code == 46));
}


/**
 * Reemplaza las ocurrencias de referencias a entidades HTML (e.g. &ntilde ;, &aacute ;,...)
 * por sus caracteres equivalentes.
 */
function replaceXMLCharacterEntities(str) {
    // ver las variables globales.
    str = str.replace(lessthanreplace, '<');
    str = str.replace(quotesreplace, '"');
    str = str.replace(greaterthanreplace, '>');

    return str;
}

/**
 * Valida que las tarjetas tengan una longitud vÃ¡lida.
 
function isValidCardLength(card){
	var result = false;
	if(card.length == 15){
		result = true;
	}else if(card.length == 16){
		result = true;
	}
	return result;
}*/


function asynSendOTP() {
    $.ajax({
        cache: false,
        type: "POST",
        url: "/ebac/common/asynSendOTP.go",
        timeout: 3000000,
        dataType: "text",
        timeout: 30000,
        beforeSend: function () {
        },
        // Mostramos un mensaje con la respuesta de Java
        success: function (xml, status) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });

    $("#sectionButton").show();
    $("#otpInput").show();
    $("#resend").show();
    $("#send").hide();
}