(function(){

    angular
        .module('distorcao')
        .service('distorcaoService', distorcaoService);
    
    function distorcaoService(){
        var service = {            
            gambiarraNgOptions: gambiarraNgOptions,
            findObjectById: findObjectById,
            gambiarraJsonToNgOptions: gambiarraJsonToNgOptions
        };
        
        return service;        

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

        //Descobrir uma forma de fazer isso funcionar
        function gambiarraJsonToNgOptions(jsonData, list, selected, defaultValue=null){
            list = jsonData;
                
            if(defaultValue !== null){
                selected = findObjectById(list, defaultValue);
            }else{
                if(list.length > 0){                    
                    selected = list[0];
                }                    
            }
        }

        function findObjectById(lista_objetos, id){
            if(lista_objetos === null) return;
            for(i = 0; i < lista_objetos.length; i++){
                if(lista_objetos[i].id == id){
                    return lista_objetos[i];
                }
            }
        }
    }
    
    })();