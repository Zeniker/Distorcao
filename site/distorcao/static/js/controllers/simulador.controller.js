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
    vm.pararMovimento = pararMovimento;
    vm.alterarDirecao = alterarDirecao;

    //Variáveis
    vm.combatenteSimulador = {};
    vm.acoes = [];
    vm.posicaoTurno = 0;
    vm.posicaoTurnoPercentual = 0;
    vm.logCombate = "";
    vm.atividadesTurno = [];
    vm.inicializacaoMudancaDirecao = 10;
    vm.inicializacaoPararMovimento = 10;

    /*O estado turno tem 3 valores
        0: início do turno
        1: aguardando confirmação de ação (permitido mudar de direção, parar o movimento)
        2: aguardando nova ação
    */
    vm.estadoTurno = 0;    

    iniciouTurno = false;
    chaveCombatenteAtivo = 0;

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
        switch(vm.estadoTurno){
            case 0:
                Object.keys(vm.combatenteSimulador).forEach(adicionaAcoesCombatente);                    

                break;

            case 2:
                adicionaAcoesCombatente(chaveCombatenteAtivo);                

                break;
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
                case 0: 
                    texto += " iniciou";
                    continuar = false;
                    alteraEstadoTurnoEHabilitaCombatente(1);

                    break;
                
                case 1: texto += " está no meio de"
                    break;
                
                case 2: 
                    texto += " finalizou";
                    continuar = false;
                    alteraEstadoTurnoEHabilitaCombatente(2);

                    break;

                case 4:
                    texto += " parou a ação";
                    continuar = false;
                    alteraEstadoTurnoEHabilitaCombatente(2);

                    break;

                case 5:
                    texto += " mudou a direção de";
                    continuar = false;
                    alteraEstadoTurnoEHabilitaCombatente(1);

                    break;

            }

            texto += " " + vm.acoes[atividade.chaveAcao].nome + "(" + atividade.inicializacaoAtividade.toString() + ").\n";

            vm.logCombate += texto;        

            calculaposicaoTurnoPercentual(atividade.inicializacaoAtividade);
            
            vm.atividadesTurno.splice(0, 1);
        }        
    }
    
    function alteraEstadoTurnoEHabilitaCombatente(valorEstadoTurno){        
        vm.combatenteSimulador[atividade.chaveCombatente].desabilitado = false;
        chaveCombatenteAtivo = atividade.chaveCombatente;
        vm.estadoTurno = valorEstadoTurno;
    }

    function adicionaAcoesCombatente(key){
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

        vm.combatenteSimulador[key].desabilitado = true;
        
    }

    function novaAtividade(chaveCombatente, tipo, inicializacaoAtividade, chaveAcao){
        atividade = {
            chaveCombatente: chaveCombatente,
            tipo: tipo,
            inicializacaoAtividade: inicializacaoAtividade + vm.posicaoTurno,
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
        vm.estadoTurno = 0;
        calculaposicaoTurnoPercentual(0);        
        vm.atividadesTurno = [];
    }

    function habilitaCombatentes(key){
        vm.combatenteSimulador[key].desabilitado = false;
    }

    function alterarDirecao(){
        chaveAcaoCombatente = buscaAcaoAtualCombatente(chaveCombatenteAtivo);

        atrasaAtividadeTurno(chaveCombatenteAtivo, vm.inicializacaoMudancaDirecao);

        novaAtividade(chaveCombatenteAtivo, 
            5, 
            vm.inicializacaoMudancaDirecao,
            chaveAcaoCombatente
        );

        vm.combatenteSimulador[chaveCombatenteAtivo].desabilitado = true;

        iniciaCombate();

    }

    function atrasaAtividadeTurno(chaveCombatente, valorASomar){
        for(indice = 0; indice < vm.atividadesTurno.length; indice++){
            if(vm.atividadesTurno[indice].chaveCombatente == chaveCombatente){
                vm.atividadesTurno[indice].inicializacaoAtividade += valorASomar;
            }
        }
    }
    
    function pararMovimento(){
        chaveAcaoCombatente = buscaAcaoAtualCombatente(chaveCombatenteAtivo);

        removeAcoesCombatente(chaveCombatenteAtivo);        

        novaAtividade(chaveCombatenteAtivo, 
            4, 
            vm.inicializacaoPararMovimento,
            chaveAcaoCombatente
        );

        vm.combatenteSimulador[chaveCombatenteAtivo].desabilitado = true;

        iniciaCombate();
    }

    function removeAcoesCombatente(chaveCombatente){
        indice = 0;
        while(indice < vm.atividadesTurno.length){
            if(vm.atividadesTurno[indice].chaveCombatente == chaveCombatente){
                vm.atividadesTurno.splice(indice, 1);
            }else{
                indice++;
            }
        }
    }

    function buscaAcaoAtualCombatente(chaveCombatente){
        for(indice = 0; indice < vm.atividadesTurno.length; indice++){
            if(vm.atividadesTurno[indice].chaveCombatente == chaveCombatente){
                return vm.atividadesTurno[indice].chaveAcao;
            }
        }

        return -1;
    }

}