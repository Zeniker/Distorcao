angular.module('distorcao')
.controller('contrFicha', function($scope){
	//Valores iniciais
	$scope.msgErro = null;
	configuracao = {
		vidaBase:400,
		pesoBase:40,
		vidaPorNivel:5,
		vidaPorDeterminacao:5,
		intervaloVigor:[15, 25, 40],
		multiplicadorVigor:[15, 20, 15, 10],
		intervaloPesoDeterminacao:[20, 40],
		multiplicadorPesoDeterminacao:[1.5, 1.25, 1],
		intervaloPesoForca:[40],
		multiplicadorPesoForca:[0.3, 0.1],
		intervaloForca:[40],
		multiplicadorForca:[2.5, 1],
		intervaloDestreza:[40],
		multiplicadorDestreza:[2.5, 1],
		intervaloMental:[10, 30, 50, 65],
		multiplicadorMental:[1, 2.5, 3, 2.5, 1.5],
		movimentacaoBase:2
	};

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

	//verifica se o arquivo de configuracao foi carregado
	carregouConfiguracao = function(){
		if(configuracao !== undefined){
			$scope.msgErro = null;
			return true;
		}else{
			$scope.msgErro = 'Arquivo de configuração não foi carregado';
			return false;
		}
	}

	//Calculo de vida
	$scope.calcVida = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoVida = configuracao.vidaBase + calcBonus(configuracao.intervaloVigor, configuracao.multiplicadorVigor, 
			$scope.attVigor) + ($scope.attNivel * configuracao.vidaPorNivel) + ($scope.attDeterminacao * configuracao.vidaPorDeterminacao);
	}
	//Calculo de peso
	$scope.calcPeso = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoPeso = configuracao.pesoBase + calcBonus(configuracao.intervaloPesoDeterminacao, configuracao.multiplicadorPesoDeterminacao, 
			$scope.attDeterminacao) + calcBonus(configuracao.intervaloPesoForca, configuracao.multiplicadorPesoForca, $scope.attForca);
	}
	//Calculo de bonus de força
	$scope.calcBonusForca = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoBonusForca = calcBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, $scope.attForca);
	}
	//Calculo de bonus de destreza
	$scope.calcBonusDestreza = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoBonusDestreza = calcBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, $scope.attDestreza);
	}
	//Calculo de bonus de mental
	$scope.calcBonusMental = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoBonusMental = calcBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, $scope.attMental);
	}
	//Calculo de movimentação
	$scope.calcMovimentacao = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoMovimentacao = 2 + Math.floor(($scope.attDestreza * 0.10) + ($scope.attForca * 0.05));
	}

	$scope.atualizaValores = function(){
		$scope.calcVida();
		$scope.calcPeso();
		$scope.calcBonusForca();
		$scope.calcBonusDestreza();
		$scope.calcBonusMental();
		$scope.calcMovimentacao();
	}

	//Pega arquivo .json e carrega ele no site
	$scope.carregaJson = function(contents){
		configuracao = angular.fromJson(contents);		
		/*$scope.resultadoVida = configuracao.vidaBase;
		$scope.resultadoPeso = configuracao.pesoBase;*/
		$scope.atualizaValores();
	}
});
