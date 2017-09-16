angular.module('distorcao')
.controller('contrFicha', function($scope){
	$scope.attNivel = 0;
	$scope.attVigor = 0;
	$scope.attDeterminacao = 0;
	$scope.attForca = 0;
	$scope.attDestreza = 0;
	$scope.attMental = 0;
	$scope.resultadoVida = 400;

	arrIntervaloVida = [15, 25, 40];
	arrMultiplicadorVida = [15, 20, 15, 10];

	calculaVigor = function(intervalo, multiplicador, attr){
		total = 0;
		index = 0;
		intervAtual = intervalo[0];
		//console.log(intervalo.length);
		for (i = 0, tam = intervalo.length; i < tam; i++) {
			if(attr <= intervAtual){
				total += attr * multiplicador[i];
				//console.log("Primeiro if " + total);
				return(total);
			}
			attr -= intervAtual;
			total += intervAtual * multiplicador[i];
			if(intervalo[i+1] === undefined) break;
			intervAtual = intervalo[i+1] - intervalo[i];
			/*console.log("intervalo " + intervalo[i]);
			console.log("intervalo2 " + intervalo[i+1]);
			console.log("attr " + attr);
			console.log("IntervAtual " + intervAtual);
			console.log("index " + index);
			console.log("Segundo if " + total);*/
		}
		//console.log("Fora do for " + total);
		return(total + (attr * multiplicador[i + 1]));
	}

	$scope.calcNivel = function(){
		$scope.resultadoVida = 400 + calculaVigor(arrIntervaloVida, arrMultiplicadorVida, $scope.attVigor) + ($scope.attNivel * 5);
	}
});
