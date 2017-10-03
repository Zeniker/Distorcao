angular
    .module('distorcao')
    .controller('simuladorController', simuladorController);

function simuladorController() {
    var vm = this;

    //Funções
    vm.novoCombatente = novoCombatente;
    vm.removeCombatente = removeCombatente;
    vm.importaAcoes = importaAcoes;
    vm.teste = teste;
    vm.iniciaCombate = iniciaCombate;    
    vm.novoTurno = novoTurno;

    //Variáveis
    vm.combatenteSimulador = {};
    vm.acoes = [];
    vm.posicaoTurno = 0;
    vm.posicaoTurnoPercentual = 0;
    vm.logCombate = "";
    vm.atividadesTurno = [];
    iniciouTurno = false;
    chaveCombatenteNovaAcao = 0;

    function novoCombatente() {
        if (Object.keys(vm.combatenteSimulador).length > 0) {
            ultimaKey = Object.keys(vm.combatenteSimulador);
            ultimaKey = +ultimaKey[ultimaKey.length - 1];
        } else {
            ultimaKey = -1;
        }
        vm.combatenteSimulador[ultimaKey + 1] = {
            nome: vm.nomeCombatente,
            inicializacao: 0,
            acao: 0,
            desabilitado: false
        }
        vm.nomeCombatente = "";
    }

    function removeCombatente(index) {
        key = Object.keys(vm.combatenteSimulador);
        delete vm.combatenteSimulador[key[index]];
    }

    function importaAcoes(contents) {
        vm.acoes = angular.fromJson(contents);
        console.log(vm.acoes);
    }

    function teste() {
        console.log(vm.combatenteSimulador);
    }

    function calculaposicaoTurnoPercentual(valor){
        vm.posicaoTurno = valor;
        vm.posicaoTurnoPercentual = (valor * 100) / 150;
    }

    function comparaAtividades(a, b){
        if(a.inicializacaoAtividade < b.inicializacaoAtividade){
            return -1
        }
        
        if(a.inicializacaoAtividade > b.inicializacaoAtividade){
            return 1;
        }

        return 0;
    }

    function iniciaCombate(){     
        if(!iniciouTurno){
            Object.keys(vm.combatenteSimulador).forEach(adicionaAcoesCombatente);
            iniciouTurno = true;
        }else{
            adicionaAcoesCombatente(chaveCombatenteNovaAcao);
        }
        

        vm.atividadesTurno.sort(comparaAtividades);
        
        percorreAtividades();
    }

    function percorreAtividades(){        
        var continuar = true;

        while(continuar && vm.atividadesTurno.length > 0){
            atividade = vm.atividadesTurno[0];

            texto = vm.combatenteSimulador[atividade.chaveCombatente].nome;

            switch(atividade.tipo){
                case 0: texto += " iniciou"
                    break;
                
                case 1: texto += " está no meio de"
                    break;
                
                case 2: 
                    texto += " finalizou"
                    continuar = false;
                    vm.combatenteSimulador[atividade.chaveCombatente].desabilitado = false;
                    chaveCombatenteNovaAcao = atividade.chaveCombatente;

                    break;
            }

            texto += " " + vm.acoes[atividade.chaveAcao].nome + "(" + atividade.inicializacaoAtividade.toString() + ").\n";

            vm.logCombate += texto;        

            calculaposicaoTurnoPercentual(atividade.inicializacaoAtividade);
            
            vm.atividadesTurno.splice(0, 1);
        }        
    }

    function adicionaAcoesCombatente(key){
        acao = vm.acoes[vm.combatenteSimulador[key].acao];

        novaAtividade(key, 
            0, 
            vm.posicaoTurno + substituiInitECalculaAcao(
                acao.inicio, 
                vm.combatenteSimulador[key].inicializacao),
            vm.combatenteSimulador[key].acao
        );

        novaAtividade(key, 
            1, 
            vm.posicaoTurno + substituiInitECalculaAcao(
                acao.meio, 
                vm.combatenteSimulador[key].inicializacao),
            vm.combatenteSimulador[key].acao
        );

        novaAtividade(key, 
            2, 
            vm.posicaoTurno + vm.combatenteSimulador[key].inicializacao,
            vm.combatenteSimulador[key].acao
        );

        vm.combatenteSimulador[key].desabilitado = true;
        
    }

    function novaAtividade(chaveCombatente, tipo, inicializacaoAtividade, chaveAcao){
        atividade = {
            chaveCombatente: chaveCombatente,
            tipo: tipo,
            inicializacaoAtividade: inicializacaoAtividade,
            chaveAcao: chaveAcao
        }

        vm.atividadesTurno.push(atividade);
    }

    function substituiInitECalculaAcao(expressao, valor){
        while(expressao.indexOf("init") > -1){
            expressao = expressao.replace("init", valor.toString());
        }            
        
        return Math.floor(eval(expressao));
    }    

    function novoTurno(){
        vm.logCombate += '===============================================================\n';
        Object.keys(vm.combatenteSimulador).forEach(habilitaCombatentes);
    }

    function habilitaCombatentes(key){
        vm.combatenteSimulador[key].desabilitado = false;
        
        calculaposicaoTurnoPercentual(0);
        
        vm.atividadesTurno = [];
    }

}