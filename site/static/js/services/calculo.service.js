(function(){

    angular
        .module('distorcao')
        .service('calculoService', calculoService);
    
    function calculoService($http){
        var service = {
            getCalculo: getCalculo,
            getFormOptions: getFormOptions,
            sendFormData: sendFormData,
            gambiarraNgOptions: gambiarraNgOptions,
            findObjectById: findObjectById
        };
        
        return service;
    
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

        function gambiarraNgOptions(objeto){
            novoObjeto = {}

            angular.forEach(objeto, function(value, key){
                if(angular.isObject(value)){
                    novoObjeto[key] = value.id;
                }else{
                    
                    novoObjeto[key] = value;
                }
            })

            return novoObjeto;
        }

        function findObjectById(lista_objetos, id){
            for(i = 0; i < lista_objetos.length; i++){
                if(lista_objetos[i].id == id){
                    return lista_objetos[i];
                }
            }
        }
    }
    
    })();