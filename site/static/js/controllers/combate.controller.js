angular
    .module('distorcao')
    .controller('CombateController', CombateController);

function CombateController() {
    var vm = this;

    //Funções
    vm.adicionaCombatente = adicionaCombatente;
    vm.avancarCombate = avancarCombate;
    vm.reiniciarTurno = reiniciarTurno;

    //Variáveis
    vm.mostrarLimites = false;
    vm.tipoAtributo = 1;
    vm.nome_novo_combatente = "";
    vm.combatentes = [];
    vm.posicaoTurnoPercentual = 0;
    vm.posicaoTurno = 0;
    vm.maxPosicaoTurno = 150;
    vm.msg_erro = "";

    //Implementação de funções

    function adicionaCombatente(){
        vm.combatentes.push(criaCombatente(vm.nome_novo_combatente));
        // vm.nome_novo_combatente = "";
        console.log(vm.combatentes);
    }

    function criaCombatente(nome){
        var combatente = {};
        combatente.nome = nome;
        combatente.ini_atual = vm.posicaoTurno.toString();
        combatente.ini_futura = vm.posicaoTurno.toString();
        combatente.classe = "ativo";
        return combatente
    }

    function avancarCombate(){
        var menorIni = vm.maxPosicaoTurno;
        var menorIniIndice = -1;

        for(let i in vm.combatentes){
            var item = vm.combatentes[i];
            if(item.ini_futura === "" && item.ini_futura == null){
                item.ini_futura = vm.posicaoTurno.toString();
            }

            if(parseInt(item.ini_futura) < vm.posicaoTurno){
                return;
            }

            if(menorIni > item.ini_futura){
                menorIni = parseInt(item.ini_futura);
                menorIniIndice = i;
            }
            item.classe = "inativo";
        }

        vm.posicaoTurno = menorIni;
        if(menorIniIndice > -1){
            vm.combatentes[menorIniIndice].ini_atual = menorIni;
            vm.combatentes[menorIniIndice].classe = "ativo";
        }
        calculaPercentualTurno();

    }

    function calculaPercentualTurno(){
        vm.posicaoTurnoPercentual = (vm.posicaoTurno * 100) / vm.maxPosicaoTurno;
    }

    function reiniciarTurno(){
        vm.posicaoTurnoPercentual = 0;
        vm.posicaoTurno = 0;
        for(let i in vm.combatentes){
            var item = vm.combatentes[i];
            item.ini_futura = "0";
            item.ini_atual = "0";
        }
    }


}
