var currentUpdateEvent;
var addStartDate;
var addEndDate;
var globalAllDay;


//aqui se podrian agregar los datos extra para editar  
function updateEvent(event, element) {
	
		if ($(this).data("qtip")) $(this).qtip("destroy");

		currentUpdateEvent = event;
        
		$('#updatedialog').dialog('open');
		$("#eventName").val(event.title);
		$("#eventDesc").val(event.description);
        $("#eventId").val(event.id);
        $("#addMontoupdate").val(event.num_req);
        $("#UpdateEventTipo").val(event.tipo);
		//$("#eventStart").text("" + event.start);

		//if (event.end === null) {
		//	$("#eventEnd").text("");
		//}
		//else {
		//	$("#eventEnd").text("");
		//}
	

	return false;
}

function updateSuccess(updateResult) {
	//alert(updateResult);
}

function deleteSuccess(deleteResult) {
	//alert(deleteResult);
}

function addSuccess(addResult) {
// if addresult is -1, means event was not added
//    alert("added key: " + addResult);

	if (addResult !== -1) {
		$('#calendar').fullCalendar('renderEvent',
						{
							title: $("#addEventName").val(),
							start: addStartDate,
							end: addEndDate,
							id: addResult,
							description: $("#addEventDesc").val(),
							allDay: globalAllDay
						},
						true // make the event "stick"
					);


        $('#calendar').fullCalendar('unselect');
        document.getElementById("addEventName").value = "";
        document.getElementById("addEventDesc").value = "";
        document.getElementById("addMonto").value = "0";

	}
}

function UpdateTimeSuccess(updateResult) {
	//alert(updateResult);
}
//carga cuadro
function selectDate(start, end, allDay) {

		$('#addDialog').dialog('open');
		$("#addEventStartDate").text("" + start.toLocaleString());
        $("#addEventEndDate").text("" + end.toLocaleString());

        var datetimeNow = new Date( start.toLocaleString());
       
        var hourNow = datetimeNow.getHours() + 6;
        var minuteNow = datetimeNow.getMinutes();
        var minuteFin;
        var horaFin;

        if (minuteNow =="0") {
            minuteFin = "30";
            horaFin = hourNow;
        } else if (minuteNow == "30") {
            minuteFin = "00";
            horaFin = hourNow + 1;
        }

        if (hourNow < 10) {hourNow = "0" + hourNow;}
        if (minuteNow < 10) {minuteNow = "0" + minuteNow;}
        if (horaFin < 10) {horaFin = "0" + horaFin;}
        
        var hora = hourNow + ":" + minuteNow;
        var horafin = horaFin  + ":" + minuteFin;
        document.getElementById("hora_inicio_manual").value = hora;
        document.getElementById("hora_inicio_manual_fin").value = horafin;

		addStartDate = start;
		addEndDate = end;
		globalAllDay = allDay;
}

function updateEventOnDropResize(event, allDay) {
	var eventToUpdate = {
		id: event.id,
        start: event.start,
        monto: event.num_req,
        tipo: event.tipo
	};

    if (event.end === null) {
		eventToUpdate.end = eventToUpdate.start;
	}
	else {
		eventToUpdate.end = event.end;
	}

	// FullCalendar 2.x
	var endDate;
	if (!event.allDay) {
		endDate = new Date(eventToUpdate.end + 60 * 60000);
		endDate = endDate.toJSON();
	}
	else {
		endDate = eventToUpdate.end.toJSON();
	}

	eventToUpdate.start = eventToUpdate.start.toJSON();
	eventToUpdate.end = eventToUpdate.end.toJSON(); //endDate;
    eventToUpdate.allDay = event.allDay;
 

	PageMethods.UpdateEventTime(eventToUpdate, UpdateTimeSuccess);
}

function eventDropped(event, dayDelta, minuteDelta, allDay, revertFunc) {
	if ($(this).data("qtip")) $(this).qtip("destroy");

	// FullCalendar 2.x
	updateEventOnDropResize(event);
}

function eventResized(event, dayDelta, minuteDelta, revertFunc) {
	if ($(this).data("qtip")) $(this).qtip("destroy");

	updateEventOnDropResize(event);
}

function checkForSpecialChars(stringToCheck) {
	//var pattern = /[^A-Za-z0-9 ]/;
	var pattern = /[^A-Za-z0-9áÁéÉíÍóÓúÜÚñÑ ]/;
	return pattern.test(stringToCheck); 
}

/*verifica que el evento sea de todo eld ia*/
function isAllDay(startDate, endDate) {
	var allDay;

	if (startDate.format("HH:mm:ss") == "00:00:00" && endDate.format("HH:mm:ss") == "00:00:00") {
		allDay = true;
		globalAllDay = true;
	}
	else {
		allDay = false;
		globalAllDay = false;
	}
	
	return allDay;
}

function qTipText(start, end, description) {
	var text;

	if (end !== null)
		text =  "<strong>Inicia:</strong> " + start.format("MM/DD/YYYY hh:mm T") + "<br/><strong>Termina:</strong> " + end.format("MM/DD/YYYY hh:mm T") + "<br/><br/>" + description;
	else
		text =  "<strong>Inicia:</strong> " + start.format("MM/DD/YYYY hh:mm T") + "<br/><strong>Termina:</strong><br/><br/>" + description;

	return text;
}

$(document).ready(function () {
	//var rol = $("[id*=lbl_rol]").text();
	//alert(rol);
    var rol = "integrador";

	// update Dialog
	$('#updatedialog').dialog({
		autoOpen: false,
		width: 450,
		buttons: {
			"Actualizar": function() {
				//alert(currentUpdateEvent.title);
				var eventToUpdate = {
					id: currentUpdateEvent.id,
					title: $("#eventName").val(),
                    description: $("#eventDesc").val(),
                    tipo: parseInt($("#UpdateEventTipo").val()),
                    num_req: parseInt($("#addMontoupdate").val())   
				};			
					PageMethods.UpdateEvent(eventToUpdate, updateSuccess);
					$(this).dialog("close");

					currentUpdateEvent.title = $("#eventName").val();
                    currentUpdateEvent.description = $("#eventDesc").val();
                    currentUpdateEvent.monto = $("#addMontoupdate").val();
                    currentUpdateEvent.tipo = $("#UpdateEventTipo").val();
                    currentUpdateEvent.num_req = $("#addMontoupdate").val();
                    
					$('#calendar').fullCalendar('updateEvent', currentUpdateEvent);

			},
			"Borrar": function() {

				if (confirm("De verdad quiere borrar esta actividad?")) {

					PageMethods.deleteEvent($("#eventId").val(), deleteSuccess);
					$(this).dialog("close");
					$('#calendar').fullCalendar('removeEvents', $("#eventId").val());
				}
			}
		}
	}); //update dialog

	//add dialog
	$('#addDialog').dialog({
		autoOpen: false,
		width: 450,
		buttons: {
			"Agregar": function() {
               
                var datetimeNow = new Date(addStartDate.toLocaleString());
                var horainicio = $("#hora_inicio_manual").val();
                var horafinal = $("#hora_inicio_manual_fin").val();
                var fechainicio = datetimeNow.format("yyyy-MM-dd") + " " + horainicio + ":00";
                var fechafinal = datetimeNow.format("yyyy-MM-dd") + " " + horafinal + ":00";

                var fechainicioFec = new Date(Date.parse(fechainicio.toLocaleString()));
                var fechafinalFec = new Date(Date.parse(fechafinal.toLocaleString()));

                addStartDate = fechainicioFec;
                addEndDate = fechafinalFec;
                //alert(fechafinalFec.toLocaleString());
                
				var eventToAdd = {
					title: $("#addEventName").val(),
					description: $("#addEventDesc").val(),
                    tipo: parseInt($("#addEventTipo").val()),
                    num_req: parseInt($("#addMonto").val()),
                   


					// FullCalendar 2.x
					start: addStartDate.toJSON(),
                    end: addEndDate.toJSON(),

					allDay: isAllDay(addStartDate, addEndDate)
				};
				
					PageMethods.addEvent(eventToAdd, addSuccess);
					$(this).dialog("close");
				
			}
		}
	}); //add dialog
 
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var options = {
		weekday: "long", year: "numeric", month: "short",
		day: "numeric", hour: "2-digit", minute: "2-digit"
	};

	$('#calendar').fullCalendar({
		// Sobreescribir los valores por defecto
		lang: 'es',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
		// A partir de que hora empieza 
		minTime: "08:00:00",
		maxTime: "21:00:00",  
		//hiddenDays: [0], //Esconde sabado y domingo
		
		theme: true,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
        },
        columnFormat: {
            week: 'ddd DD MMM' // override for english. different from the generated default, which is MM/DD
        }
        ,
		defaultView: 'agendaWeek',
		eventClick: updateEvent,
		selectable: true,
		selectHelper: true,
		select: selectDate,
		editable:(rol === "integrador") ? true : false,
		// de aqui jala los eventos
		events: "JsonResponse2.ashx",
		eventDrop: eventDropped,
		eventResize: eventResized,   
		eventRender: function(event, element) {
			//alert(event.title);
			element.qtip({
				content: {
					text: qTipText(event.start, event.end, event.description),
					title: '<strong>' + event.title + '</strong>'
				},
				position: {
					my: 'bottom left',
					at: 'top right'
				},
				style: { classes: 'qtip-shadow qtip-rounded' }
			});
		}
	});//termina el despliegue del calendario
}); //aqui termina el document ready
