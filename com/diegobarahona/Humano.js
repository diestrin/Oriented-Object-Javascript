Import(["com.diegobarahona.Mamifero"],function(){
	window.Humano = function(nombre){

		/*CONSTRUCT*/ function init(){

		}

		this.nombre = nombre;
		
		return init(); //Ejecuta el constructor
	}

	Humano.prototype = new Mamifero();
});