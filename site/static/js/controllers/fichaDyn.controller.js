angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController($http) {
	var vm = this;
	
	//Funções
    vm.getAtributosSistema = getAtributosSistema;

    //Variáveis
    vm.sistema=null;
	vm.attNivel=0;
	vm.attVigor=0;
	vm.attDeterminacao=0;
	vm.attForca=0;
	vm.attDestreza=0;
	vm.attMental=0;
	vm.msgErro = null;
	vm.validacao = '^[+0-9.,]+$';
	
	//Implementação de funções
	function getAtributosSistema(){                
        if (vm.sistema === undefined){
            vm.atributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/atributos/' + vm.sistema
            }).then(function successCallback(response) {                
                vm.atributos = response.data;
                
            }, function errorCallback(response) {
                console.log(response)
                vm.atributos = null;
            });
        }        
    }

}
