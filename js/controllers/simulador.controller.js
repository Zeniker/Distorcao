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

    //Variáveis
    vm.combatenteSimulador = {};
    vm.acoes = [];
    vm.posicaoTurno = 5;
    vm.logCombate = "";
    vm.atividadeTurno = [];

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
            acao: 0
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

    function calculaPosicaoTurno(valor){
        vm.posicaoTurno = (valor * 100) / 150;
    }

    function iniciaCombate(){        
        Object.keys(vm.combatenteSimulador).forEach(percorreCombatentes);
        
        vm.atividadeTurno.forEach(percorreAtividades);
    }

    function percorreAtividades(atividade){
        texto = vm.combatenteSimulador[atividade.chaveCombatente].nome;

        switch(atividade.tipo){
            case 0: texto += " iniciou"
                break;
            
            case 1: texto += " está no meio de"
                break;
            
            case 2: texto += " finalizou"
                break;
        }

        texto += " " + vm.acoes[atividade.chaveAcao].nome + "(" + atividade.inicializacaoAtividade.toString() + ").\n";

        vm.logCombate += texto;

        console.log(atividade);
    }

    function percorreCombatentes(key){
        acao = vm.acoes[vm.combatenteSimulador[key].acao];

        novaAtividade(key, 
            0, 
            substituiInitECalculaAcao(
                acao.inicio, 
                vm.combatenteSimulador[key].inicializacao),
            vm.combatenteSimulador[key].acao
        );

        novaAtividade(key, 
            1, 
            substituiInitECalculaAcao(
                acao.meio, 
                vm.combatenteSimulador[key].inicializacao),
            vm.combatenteSimulador[key].acao
        );

        novaAtividade(key, 
            2, 
            vm.combatenteSimulador[key].inicializacao,
            vm.combatenteSimulador[key].acao
        );
        
    }

    function novaAtividade(chaveCombatente, tipo, inicializacaoAtividade, chaveAcao){
        atividade = {
            chaveCombatente: chaveCombatente,
            tipo: tipo,
            inicializacaoAtividade: inicializacaoAtividade,
            chaveAcao: chaveAcao
        }

        vm.atividadeTurno.push(atividade);
    }

    function substituiInitECalculaAcao(expressao, valor){
        while(expressao.indexOf("init") > -1){
            expressao = expressao.replace("init", valor.toString());
        }            
        
        return Math.floor(eval(expressao));
    }    

}