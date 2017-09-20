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
	$scope.infoConfigCarregada = 'Configurações padrões';

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
	/*carregouConfiguracao = function(){
		if(configuracao !== undefined){
			$scope.msgErro = null;
			return true;
		}else{
			$scope.msgErro = 'Arquivo de configuração não foi carregado';
			return false;
		}
	}*/

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
		$scope.resultadoBonusForca = Math.floor(calcBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, $scope.attForca));
	}
	//Calculo de bonus de destreza
	$scope.calcBonusDestreza = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoBonusDestreza = Math.floor(calcBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, $scope.attDestreza));
	}
	//Calculo de bonus de mental
	$scope.calcBonusMental = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoBonusMental = Math.floor(calcBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, $scope.attMental));
	}
	//Calculo de movimentação
	$scope.calcMovimentacao = function(){
		/*if(!carregouConfiguracao()){
			exit;
		}*/
		$scope.resultadoMovimentacao = configuracao.movimentacaoBase + Math.floor(($scope.attDestreza * 0.10) + ($scope.attForca * 0.05));
	}

	//Função que atualiza todos os resultados
	$scope.atualizaValores = function(){
		$scope.calcVida();
		$scope.calcPeso();
		$scope.calcBonusForca();
		$scope.calcBonusDestreza();
		$scope.calcBonusMental();
		$scope.calcMovimentacao();
	}

	//Transfere os valores à modal, serve para sempre manter os valores atualizados.
	$scope.transfereValores = function(){
		$scope.configVidaBase = configuracao.vidaBase;
		$scope.configVidaNivel = configuracao.vidaPorNivel;
		$scope.configVidaDeterminacao = configuracao.vidaPorDeterminacao;
		$scope.configIntervaloVigor = configuracao.intervaloVigor;
		$scope.configMultiplicadorVigor = configuracao.multiplicadorVigor;
		$scope.configIntervaloPesoDeterminacao = configuracao.intervaloPesoDeterminacao;
		$scope.configMultiplicadorPesoDeterminacao = configuracao.multiplicadorPesoDeterminacao;
		$scope.configIntervaloPesoForca = configuracao.intervaloPesoForca;
		$scope.configMultiplicadorPesoForca = configuracao.multiplicadorPesoForca;
		$scope.configIntervaloForca = configuracao.intervaloForca;
		$scope.configMultiplicadorForca = configuracao.multiplicadorForca;
		$scope.configIntervaloDestreza = configuracao.intervaloDestreza;
		$scope.configMultiplicadorDestreza = configuracao.multiplicadorDestreza;
		$scope.configIntervaloMental = configuracao.intervaloMental;
		$scope.configMultiplicadorMental = configuracao.multiplicadorMental;
		$scope.configMovimentacaoBase = configuracao.movimentacaoBase;
	}

	//Converte string em um array de numeros, para uso nos intervalos e multiplicadores
	converteString = function(string){
		arrNumerica = [];
		temp = string.split(',');
		for(i = 0, tam = temp.length; i < tam; i++) arrNumerica[i] = +temp[i];
		return(arrNumerica);
	}

	//Função para atualizar configurações
	$scope.atualizarConfiguracao = function(){
		configuracao.vidaBase = $scope.configVidaBase * 1;
		configuracao.vidaPorNivel = $scope.configVidaNivel * 1; 
		configuracao.vidaPorDeterminacao = $scope.configVidaDeterminacao * 1;
		configuracao.intervaloVigor = converteString($scope.configIntervaloVigor.toString());
		configuracao.multiplicadorVigor = converteString($scope.configMultiplicadorVigor.toString()); 
		configuracao.intervaloPesoDeterminacao = converteString($scope.configIntervaloPesoDeterminacao.toString());
		configuracao.multiplicadorPesoDeterminacao = converteString($scope.configMultiplicadorPesoDeterminacao.toString());
		configuracao.intervaloPesoForca = converteString($scope.configIntervaloPesoForca.toString());
		configuracao.multiplicadorPesoForca = converteString($scope.configMultiplicadorPesoForca.toString());
		configuracao.intervaloForca = converteString($scope.configIntervaloForca.toString());
		configuracao.multiplicadorForca = converteString($scope.configMultiplicadorForca.toString());
		configuracao.intervaloDestreza = converteString($scope.configIntervaloDestreza.toString());
		configuracao.multiplicadorDestreza = converteString($scope.configMultiplicadorDestreza.toString());
		configuracao.intervaloMental = converteString($scope.configIntervaloMental.toString());
		configuracao.multiplicadorMental = converteString($scope.configMultiplicadorMental.toString());
		configuracao.movimentacaoBase = $scope.configMovimentacaoBase * 1;
		$scope.infoConfigCarregada = 'Configurações personalizadas';
	}

	//Pega arquivo .json e carrega ele no site
	$scope.carregaJson = function(contents){
		configuracao = angular.fromJson(contents);		
		/*$scope.resultadoVida = configuracao.vidaBase;
		$scope.resultadoPeso = configuracao.pesoBase;*/
		$scope.atualizaValores();
	}
});
