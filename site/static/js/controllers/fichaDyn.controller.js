angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController($http) {
	var vm = this;
	
	//Funções
    vm.changeNarracaoConfigurations = changeNarracaoConfigurations;
    //vm.initNarracaoUpdate = initNarracaoUpdate;

    //Variáveis
    vm.narracao = null;
    vm.lista_atributos = null;
    vm.lista_subatributos = null;
	
    //Implementação de funções
    function changeNarracaoConfigurations(){
        getAtributos();
        getSubatributos();
    }

	function getAtributos(){          
        if (vm.narracao === undefined){
            vm.lista_atributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/atributos/' + vm.narracao
            }).then(function successCallback(response) {                
                vm.lista_atributos = response.data;
                
            }, function errorCallback(response) {
                console.log(response)
                vm.lista_atributos = null;
            });
        }        
    }

    function getSubatributos(){
        if (vm.narracao === undefined){
            vm.lista_subatributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/subatributos/' + vm.narracao
            }).then(function successCallback(response) {    
                console.log(response.data);
                vm.lista_subatributos = response.data;
                
            }, function errorCallback(response) {
                console.log(response)
                vm.lista_subatributos = null;
            });
        } 
    }

    /*function initNarracaoUpdate(){
        if(!(vm.narracao === undefined) || !(vm.narracao === null)){
            getPopulatedAtributos();
        }
    }

    function getPopulatedAtributos(){
        if (vm.narracao === undefined){
            vm.subatributos = null;
        }else{
            $http({
                method: 'GET',
                url: '/ficha/ajax/subatributos_values/' + vm.narracao + '/1'
            }).then(function successCallback(response) {
                console.log(response.data);
                vm.subatributos = response.data;

            }, function errorCallback(response) {
                console.log(response)
                vm.subatributos = null;
            });
        }
    }*/

}
