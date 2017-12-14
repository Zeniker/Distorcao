(function(){
    angular
        .module('distorcao')
        .controller('inicializacaoCombatenteController', inicializacaoCombatenteController);

    function inicializacaoCombatenteController(){
        var vm = this;

        /*Variáveis */
        vm.combatentes = [];

        //Funções
        vm.novoCombatente = novoCombatente;
        vm.novoCombatenteEnter = novoCombatenteEnter;
        vm.somaEnterPress = somaEnterPress;

        function somaEnterPress(keyEvent, combatente){
            if(keyEvent.which == 13){
                combatente.inicializacao += combatente.soma;
                combatente.soma = null;
            }
        }

        function novoCombatenteEnter(keyEvent){
            if(keyEvent.which == 13) novoCombatente();
        }

        function novoCombatente() {        
            if (Object.keys(vm.combatentes).length > 0) {
                ultimaKey = Object.keys(vm.combatentes);
                ultimaKey = +ultimaKey[ultimaKey.length - 1];
            } else {
                ultimaKey = -1;
            }
            vm.combatentes[ultimaKey + 1] = {
                nome: vm.nomeCombatente,
                inicializacao: 0,
                soma: null                
            }
            vm.nomeCombatente = "";
        }
    }


})();