angular.module('distorcao')
.controller('contrFicha', function($scope){
	//Valores iniciais
	$scope.attNivel = 0;
	$scope.attVigor = 0;
	$scope.attDeterminacao = 0;
	$scope.attForca = 0;
	$scope.attDestreza = 0;
	$scope.attMental = 0;
	$scope.resultadoVida = 400;
	$scope.resultadoPeso = 40;
	$scope.resultadoBonusForca = 0;
	$scope.resultadoBonusDestreza = 0;
	$scope.resultadoBonusMental = 0;
	$scope.resultadoMovimentacao = 2;

	configuracao = null;

	calcBonus = function(intervalo, multiplicador, attr){
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

	//Calculo de vida
	$scope.calcVida = function(){
		$scope.resultadoVida = configuracao.vidaBase + calcBonus(configuracao.intervaloVida, configuracao.multiplicadorVida, 
			$scope.attVigor) + ($scope.attNivel * configuracao.vidaPorLevel) + ($scope.attDeterminacao * configuracao.vidaPorDeterminacao);
	}
	//Calculo de peso
	$scope.calcPeso = function(){
		$scope.resultadoPeso = configuracao.pesoBase + calcBonus(configuracao.intervaloPesoDeterminacao, configuracao.multiplicadorPesoDeterminacao, 
			$scope.attDeterminacao) + calcBonus(configuracao.intervaloPesoForca, configuracao.multiplicadorPesoForca, $scope.attForca);
	}
	//Calculo de bonus de força
	$scope.calcBonusForca = function(){
		$scope.resultadoBonusForca = calcBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, $scope.attForca);
	}
	//Calculo de bonus de destreza
	$scope.calcBonusDestreza = function(){
		$scope.resultadoBonusDestreza = calcBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, $scope.attDestreza);
	}
	//Calculo de bonus de mental
	$scope.calcBonusMental = function(){
		$scope.resultadoBonusMental = calcBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, $scope.attMental);
	}
	//Calculo de movimentação
	$scope.calcMovimentacao = function(){
		$scope.resultadoMovimentacao = 2 + Math.floor(($scope.attDestreza * 0.10) + ($scope.attForca * 0.05));
	}

	//Pega arquivo .json e carrega ele no site
	$scope.carregaJson = function(contents){
		configuracao = angular.fromJson(contents);		
		$scope.resultadoVida = configuracao.vidaBase;
		$scope.resultadoPeso = configuracao.pesoBase;
	}
});
