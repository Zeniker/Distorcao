angular
	.module('distorcao')
	.controller('fichaController', fichaController);

function fichaController(calculaBonus, configuracaoPadrao, exportaJson) {
	var vm = this;
	
	//Funções
	vm.inicializaFicha = inicializaFicha;
	vm.calcVida = calcVida;
	vm.calcPeso = calcPeso;
	vm.calcBonusForca = calcBonusForca;
	vm.calcBonusDestreza = calcBonusDestreza;
	vm.calcBonusMental = calcBonusMental;
	vm.calcMovimentacao = calcMovimentacao;
	vm.atualizaValores = atualizaValores;
	vm.transfereValores = transfereValores;
	vm.atualizarConfiguracao = atualizarConfiguracao;
	vm.carregaJson = carregaJson;
	vm.salvaConfiguracoes = salvaConfiguracoes;
	vm.exportaConfiguracoes = exportaConfiguracoes;

	//Variáveis
	vm.attNivel=0;
	vm.attVigor=0;
	vm.attDeterminacao=0;
	vm.attForca=0;
	vm.attDestreza=0;
	vm.attMental=0;
	vm.msgErro = null;
	vm.validacao = '^[+0-9.,]+$';

	//Configuração padrão, vinda do service
	configuracao = configuracaoPadrao;
	
	//Implementação de funções
	function inicializaFicha(){		
		atualizaValores();
	}	

	//Calculo de vida
	function calcVida(){
		vm.resultadoVida = configuracao.vidaBase + calculaBonus.retornaValorBonus(configuracao.intervaloVigor, configuracao.multiplicadorVigor, 
			vm.attVigor) + (vm.attNivel * configuracao.vidaPorNivel) + (vm.attDeterminacao * configuracao.vidaPorDeterminacao);
	}
	//Calculo de peso
	function calcPeso(){
		vm.resultadoPeso = configuracao.pesoBase + calculaBonus.retornaValorBonus(configuracao.intervaloPesoDeterminacao, configuracao.multiplicadorPesoDeterminacao, 
			vm.attDeterminacao) + calculaBonus.retornaValorBonus(configuracao.intervaloPesoForca, configuracao.multiplicadorPesoForca, vm.attForca);
	}
	//Calculo de bonus de força
	function calcBonusForca(){
		vm.resultadoBonusForca = Math.floor(calculaBonus.retornaValorBonus(configuracao.intervaloForca, configuracao.multiplicadorForca, vm.attForca));
	}
	//Calculo de bonus de destreza
	function calcBonusDestreza(){
		vm.resultadoBonusDestreza = Math.floor(calculaBonus.retornaValorBonus(configuracao.intervaloDestreza, configuracao.multiplicadorDestreza, vm.attDestreza));
	}
	//Calculo de bonus de mental
	function calcBonusMental(){
		vm.resultadoBonusMental = Math.floor(calculaBonus.retornaValorBonus(configuracao.intervaloMental, configuracao.multiplicadorMental, vm.attMental));
	}
	//Calculo de movimentação
	function calcMovimentacao(){
		vm.resultadoMovimentacao = configuracao.movimentacaoBase + Math.floor((vm.attDestreza * 0.10) + (vm.attForca * 0.05));
	}

	//Função que atualiza todos os resultados
	function atualizaValores(){
		vm.configNome = configuracao.nomeConfiguracao;
		vm.calcVida();
		vm.calcPeso();
		vm.calcBonusForca();
		vm.calcBonusDestreza();
		vm.calcBonusMental();
		vm.calcMovimentacao();
	}

	//Transfere os valores à modal, serve para sempre manter os valores atualizados.
	function transfereValores(){
		vm.configNome = configuracao.nomeConfiguracao;
		vm.configVidaBase = configuracao.vidaBase;
		vm.configVidaNivel = configuracao.vidaPorNivel;
		vm.configVidaDeterminacao = configuracao.vidaPorDeterminacao;
		vm.configIntervaloVigor = configuracao.intervaloVigor;
		vm.configMultiplicadorVigor = configuracao.multiplicadorVigor;
		vm.configIntervaloPesoDeterminacao = configuracao.intervaloPesoDeterminacao;
		vm.configMultiplicadorPesoDeterminacao = configuracao.multiplicadorPesoDeterminacao;
		vm.configIntervaloPesoForca = configuracao.intervaloPesoForca;
		vm.configMultiplicadorPesoForca = configuracao.multiplicadorPesoForca;
		vm.configIntervaloForca = configuracao.intervaloForca;
		vm.configMultiplicadorForca = configuracao.multiplicadorForca;
		vm.configIntervaloDestreza = configuracao.intervaloDestreza;
		vm.configMultiplicadorDestreza = configuracao.multiplicadorDestreza;
		vm.configIntervaloMental = configuracao.intervaloMental;
		vm.configMultiplicadorMental = configuracao.multiplicadorMental;
		vm.configMovimentacaoBase = configuracao.movimentacaoBase;
	}

	//Converte string em um array de numeros, para uso nos intervalos e multiplicadores
	function converteString(string){
		arrNumerica = [];
		temp = string.split(',');
		for(i = 0, tam = temp.length; i < tam; i++) arrNumerica[i] = +temp[i];
		return(arrNumerica);
	}

	function salvaConfiguracoes(){
		atualizarConfiguracao();
		atualizaValores();
	}

	function exportaConfiguracoes(){
		salvaConfiguracoes();
		exportaJson.eventoExport(configuracao, vm.configNome+".json");
	}

	//Função para atualizar configurações	
	function atualizarConfiguracao(){
		configuracao.nomeConfiguracao = vm.configNome;
		configuracao.vidaBase = vm.configVidaBase * 1;
		configuracao.vidaPorNivel = vm.configVidaNivel * 1; 
		configuracao.vidaPorDeterminacao = vm.configVidaDeterminacao * 1;
		configuracao.intervaloVigor = converteString(vm.configIntervaloVigor.toString());
		configuracao.multiplicadorVigor = converteString(vm.configMultiplicadorVigor.toString()); 
		configuracao.intervaloPesoDeterminacao = converteString(vm.configIntervaloPesoDeterminacao.toString());
		configuracao.multiplicadorPesoDeterminacao = converteString(vm.configMultiplicadorPesoDeterminacao.toString());
		configuracao.intervaloPesoForca = converteString(vm.configIntervaloPesoForca.toString());
		configuracao.multiplicadorPesoForca = converteString(vm.configMultiplicadorPesoForca.toString());
		configuracao.intervaloForca = converteString(vm.configIntervaloForca.toString());
		configuracao.multiplicadorForca = converteString(vm.configMultiplicadorForca.toString());
		configuracao.intervaloDestreza = converteString(vm.configIntervaloDestreza.toString());
		configuracao.multiplicadorDestreza = converteString(vm.configMultiplicadorDestreza.toString());
		configuracao.intervaloMental = converteString(vm.configIntervaloMental.toString());
		configuracao.multiplicadorMental = converteString(vm.configMultiplicadorMental.toString());
		configuracao.movimentacaoBase = vm.configMovimentacaoBase * 1;
	}

	//Pega arquivo .json e carrega ele no site
	function carregaJson(contents){
		configuracao = angular.fromJson(contents);		
		vm.atualizaValores();
	}

}
