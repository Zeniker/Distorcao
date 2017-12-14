(function(){

angular
    .module('distorcao')
    .service('calculaBonus', calculaBonus);

function calculaBonus(){
    var service = {
        retornaValorBonus: retornaValorBonus
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
}

})();