angular
    .module('distorcao')
    .controller('simuladorController', simuladorController);

function simuladorController() {
    var vm = this;

    //Funções
    vm.novoCombatente = novoCombatente;
    vm.removeCombatente = removeCombatente;

    //Variáveis
    vm.combatenteSimulador = {};
    vm.combatenteSimulador[0] = {
        nome: "Combatente 1",
        inicializacao: 0,
        acao: 0
    }

    function novoCombatente(){
        if(Object.keys(vm.combatenteSimulador).length > 0){
            ultimaKey = Object.keys(vm.combatenteSimulador);
            ultimaKey = +ultimaKey[ultimaKey.length-1];
        }else{
            ultimaKey = -1;
        }
        vm.combatenteSimulador[ultimaKey + 1] = {
            nome: vm.nomeCombatente,
            inicializacao: 0,
            acao: 0
        }
        vm.nomeCombatente = "";
    }

    function removeCombatente(index){
        key = Object.keys(vm.combatenteSimulador);
        delete vm.combatenteSimulador[key[index]];
    }

}