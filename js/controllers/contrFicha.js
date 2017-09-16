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

	//Intervalos e multiplicadores de vigor
	arrIntvVigor = [15, 25, 40]; 
	arrMultiVigor = [15, 20, 15, 10];

	//Intervalos e multiplicadores de determinação
	arrIntvDeterminacaoPeso = [20, 40];
	//arrIntvDeterminacaoDebuff = [25, 50, 90];
	arrMultiDeterminacaoPeso = [1.5, 1.25, 1];
	//arrMultiDeterminacaoDebuff = [2, 1, 0.25, 0];

	//Intervalos e multiplicadores de força
	arrIntvForcaBonus = [40];
	arrIntvForcaPeso = [40];
	arrMultiForcaBonus = [2.5, 1];
	arrMultiForcaPeso = [0.3, 0.1];

	//Intervalos e multiplicadores de destreza
	arrIntvDestreza = [40];
	arrMultiDestreza = [2.5, 1];

	//Intervalos e multiplicadores de mental
	arrIntvMental = [10, 30, 50, 65];
	arrMultiMental = [1, 2.5, 3, 2.5, 1.5];

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
		$scope.resultadoVida = 400 + calcBonus(arrIntvVigor, arrMultiVigor, $scope.attVigor) + ($scope.attNivel * 5) + ($scope.attDeterminacao * 5);
	}
	//Calculo de peso
	$scope.calcPeso = function(){
		$scope.resultadoPeso = 40 + calcBonus(arrIntvDeterminacaoPeso, arrMultiDeterminacaoPeso, $scope.attDeterminacao) + calcBonus(arrIntvForcaPeso, arrMultiForcaPeso, $scope.attForca);
	}
	//Calculo de bonus de força
	$scope.calcBonusForca = function(){
		$scope.resultadoBonusForca = calcBonus(arrIntvForcaBonus, arrMultiForcaBonus, $scope.attForca);
	}
	//Calculo de bonus de destreza
	$scope.calcBonusDestreza = function(){
		$scope.resultadoBonusDestreza = calcBonus(arrIntvDestreza, arrMultiDestreza, $scope.attDestreza);
	}
	//Calculo de bonus de mental
	$scope.calcBonusMental = function(){
		$scope.resultadoBonusMental = calcBonus(arrIntvMental, arrMultiMental, $scope.attMental);
	}
	//Calculo de movimentação
	$scope.calcMovimentacao = function(){
		$scope.resultadoMovimentacao = 2 + Math.floor(($scope.attDestreza * 0.10) + ($scope.attForca * 0.05));
	}

	//Pega arquivo .json e carrega ele no site
	$scope.carregaJson = function(contents){
		$scope.resultado = angular.fromJson(contents);
		console.log($scope.resultado.mensagem);
	}
});
