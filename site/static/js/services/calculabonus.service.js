(function(){

angular
    .module('distorcao')
    .service('calculaBonus', calculaBonus);

function calculaBonus(){
    var service = {
		retornaValorBonus: retornaValorBonus,
		retornaValorBonusString: retornaValorBonusString
	};
	
	return service;

    function retornaValorBonus(intervalo, multiplicador, attr){
        total = 0;
		intervAtual = intervalo[0];
		for (i = 0, tam = intervalo.length; i < tam; i++) {
			if(attr <= intervAtual){				
				total += attr * multiplicador[i];
				return(total);
			}
			attr -= intervAtual;			
			total += intervAtual * multiplicador[i];
			if(intervalo[i+1] === undefined) break;
			intervAtual = intervalo[i+1] - intervalo[i];
		}
		return(total + (attr * multiplicador[i + 1]));
	}

	function converteStringParaArray(string){
		arrNumerica = [];
		temp = string.split(',');
		for(i = 0, tam = temp.length; i < tam; i++) arrNumerica[i] = +temp[i];
		return(arrNumerica);
	}
	
	function retornaValorBonusString(intervalo_string, multiplicador_string, attr){
		intervalo = converteStringParaArray(intervalo_string);
		multiplicador = converteStringParaArray(multiplicador_string);

		total = 0;
		intervAtual = intervalo[0];
		for (i = 0, tam = intervalo.length; i < tam; i++) {
			if(attr <= intervAtual){				
				total += attr * multiplicador[i];
				return(total);
			}
			attr -= intervAtual;			
			total += intervAtual * multiplicador[i];
			if(intervalo[i+1] === undefined) break;
			intervAtual = intervalo[i+1] - intervalo[i];
		}
		return(total + (attr * multiplicador[i + 1]));		
	}
}

})();