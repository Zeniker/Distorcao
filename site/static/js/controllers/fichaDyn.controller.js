angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController($http) {
	var vm = this;
	
	//Funções
    vm.changeNarracaoConfigurations = changeNarracaoConfigurations;

    //Variáveis
    vm.narracao = null;
    vm.atributos = null;
    vm.subatributos = null;	
	
    //Implementação de funções
    function changeNarracaoConfigurations(){
        getAtributos();
        getSubatributos();
    }

	function getAtributos(){          
        if (vm.narracao === undefined){
            vm.atributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/atributos/' + vm.narracao
            }).then(function successCallback(response) {                
                vm.atributos = response.data;
                
            }, function errorCallback(response) {
                console.log(response)
                vm.atributos = null;
            });
        }        
    }

    function getSubatributos(){
        if (vm.narracao === undefined){
            vm.subatributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/subatributos/' + vm.narracao
            }).then(function successCallback(response) {    
                console.log(response.data);
                vm.subatributos = response.data;
                
            }, function errorCallback(response) {
                console.log(response)
                vm.subatributos = null;
            });
        } 
    }

}
