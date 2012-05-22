/*	
//	EXTEND OBJECT
//
//	Devuelve el valor de la constante pasada por parametro
//	@params:
//		STRING constante	- nombre de la constante a devolver
//
//	@return:
//		UNKNOW				- el valor de la constante
*/

Object.prototype.getConst = function(constante){
	return this["__"+constante+"__"] || null;
}

/*
//	EXTEND OBJECT
//	
//	Define el valor de la constante pasada por parametro
//	@params:
//		STRING constante	- nombre de la constante a devolver
//		UNKNON valor	 	- el valor a definir en la constante
//
//	@return:
//		UNKNOW				- el valor de la constante
*/

Object.prototype.setConst = function(constante , valor){
	return this["__"+constante+"__"] = valor;
}

/*
//	EXTEND WINDOW
//	
//	Define la funcionalidad de Import
//	@params:
//		ARRAY clases		- array de strings de las clases a importar
//		FUNCTION callback 	- la funcion a ejecutar cuando el import ha terminado
//
//	@return:
//		NULL				- null
*/

window.listOfClases = [];
window.listOfCallbacks = [];

window.Import = function(clases , callback, debug){
	var numComplete = 0; 										//numero de clases importadas

	for(clase in clases){										//por cada clase en clases
		if(typeof clases[clase] != "string" || 					//si la clase no es un string o 
			listOfClases.indexOf(clases[clase]) >= 0) 			//si la clases ya esta importada
			continue; 											//continue con la siguiente clase

		var filePath = "",										//nombre del archivo a llamar
			xhr = new XMLHttpRequest(),							//crear un objeto de AJAX
			filePath = clases[clase].replace(/\./g,"/");		//reemplazar los puntos por slashes
		
		if(debug){												//El modo debug, inserta los archivos en etiquetas script
			var _script = document.createElement('script');		//Se crea el elemento script
			listOfCallbacks.push(callback);						//Se manda el callback a una cola

			_script.onload = function(){						
				listOfClases.push(clases[clase]);				//inserte la clase a importar en la lista
	    		numComplete++;									//sume uno a la lista de clases importadas

	    		if(numComplete == clases.length){				//si la lista de cargas completas es igual al total de clases
	    			setTimeout(listOfCallbacks.pop(),1000);		//ejecute el ultimo callback de la cola
	    		}
			}
			_script.src = location.href+filePath+".js";			//Define la fuente del script
			document.getElementsByTagName('head')[0].appendChild(_script);//Lo agrega al head
			continue;											//continue con la siguiente clase
		}

		xhr.onreadystatechange = onComplete;					//cuando este listo el xhr llamar a onComplete
		xhr.open('GET', location.href+filePath+".js", false);	//abrir la conexion y llamar al archivo con el metodo get
	  	xhr.send(null);											//enviar la peticion
	}

	function onComplete(){
		if(this.readyState == 4) {								//cuando este en el estado 4
	    	if(this.status == 200) {							//y el estado del archivo sea 200
	    		eval(this.responseText);						//ejecute el script
	    		listOfClases.push(clases[clase]);				//inserte la clase a importar en la lista
	    		numComplete++;									//sume uno a la lista de clases importadas

	    		if(numComplete == clases.length)				//si la lista de cargas completas es igual al total de clases
	    			callback();									//ejecute el callback
	    	}
	    }
	}
}