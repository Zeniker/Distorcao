(function(){

    angular
        .module('distorcao')
        .service('calculoService', calculoService);
    
    function calculoService($http){
        var service = {
            getCalculo: getCalculo,
            getFormOptions: getFormOptions,
            sendFormData: sendFormData,
            getCalculoSistema: getCalculoSistema
        };
        
        return service;

        function getCalculoSistema(sistema_id, callback){
            if (sistema_id === null || !angular.isNumber(+sistema_id)){
                return null
            }else{
                $http({
                    method: 'GET',
                    url: '/calculo/ajax/get_calculo_sistema/' + sistema_id
                }).then(callback, function errorCallback(response) {
                    console.log(response)
                    return null;
                });
            } 
        }
    
        function getCalculo(id_registro, callback){
            if (id_registro === null || !angular.isNumber(+id_registro)){
                return null
            }else{
                $http({
                    method: 'GET',
                    url: '/calculo/ajax/get_calculo/' + id_registro
                }).then(callback, function errorCallback(response) {
                    console.log(response)
                    return null;
                });
            }            
        }

        function getFormOptions(callback){
            $http({
                method: 'GET',
                url: '/calculo/ajax/get_form_options'
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });
        }

        function sendFormData(data, url_destino, callback){            
            $http({
                method: 'POST',
                data: JSON.stringify(data),
                url: url_destino
            }).then(callback, function errorCallback(response) {
                console.log(response)
                return null;
            });
        }         
    }
    
    })();