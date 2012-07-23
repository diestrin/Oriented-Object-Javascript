Import(false,function(){
	/*PRIVATE*/ function mover(direccion , velocidad){
		switch(direccion){
			case "x":
				setInterval(function(){
					this.x += 100;
				},velocidad);
				break;
			case "y":
				setInterval(function(){
					this.y += 100;
				},velocidad);
			default:
				break;
		}
	}
	
	window.Mamifero = function(){
	
		/*CONSTRUCT*/ function init(){
	
		}
	
		//Las constantes se declaran con doble guion bajo al inicio y al final, son constantes simuladas
	
		/*PUBLIC*/ this.__reproduccion__ = "sexual";
		/*PUBLIC*/ this.__nacimiento__ = "parto";
	
		/*PUBLIC*/ this.x = 0;
		/*PUBLIC*/ this.y = 0;
	
		/*PUBLIC*/ this.nombre = "Mamifero";
		/*PUBLIC*/ this.color_de_piel = "ffffff";
		
		return init(); //Ejecuta el constructor
	}
	
	/*PUBLIC*/ Mamifero.prototype.caminar = function(direccion){
		mover.call(direccion , 5);
	}
	
	/*PUBLIC*/ Mamifero.prototype.correr = function(direccion){
		mover.call(direccion , 10);
	}
});