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
//	
//	Define la funcionalidad de Import
//	@params:
//		ARRAY clases		- array de strings de las clases a importar
//		FUNCTION callback 	- la funcion a ejecutar cuando el import ha terminado
//
//	@return:
//		NULL				- null
*/

var __clases__ = [],
	clases = [];

window.Import = function(clases , callback){
	
	if(!!clases){
		__clases__.push(new __loader__({
			"clases": clases,
			"callback": callback
		}));
	}else if(!!callback){
		callback();
		traceback();
	}

}

function traceback(){
	var __clase__ = __clases__.pop();
	if(!!__clase__){
		__clase__.callback();
		delete __clase__;
		traceback();
	}
}

function __loader__(params){
	var script,
		filePath
		__this__ = this;

	this.numOfCalls = params.clases.length;

	this.classComplete = 0;

	this.callback = function(){
		//if(this.classComplete === this.numOfCalls)
			 params.callback();
	}

	for(var clase = 0, l = params.clases.length; clase < l; clase++){
		filePath = params.clases[clase].replace(/\./g,"/");

		script = document.createElement('script');

		script.clase = params.clases[clase];

		script.onload = function(){
			__this__.classComplete++;
			clases.push(this.clase);
			//__this__.callback();
		}

		script.src = location.href+filePath+".js";

		this.head.appendChild(script);
	}
}

__loader__.prototype.head = document.getElementsByTagName('head')[0];