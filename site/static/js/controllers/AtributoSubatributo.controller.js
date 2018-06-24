angular
    .module('distorcao')
    .controller('AtributoSubatributoController', AtributoSubatributoController);

function AtributoSubatributoController(atributoService, subatributoService, atributoSubatributoService, $window) {
    var vm = this;    

    //Funções
    vm.changeSistema = changeSistema;    
    vm.carregaDados = carregaDados;    
    vm.sendFormData = sendFormData;

    //Variáveis    
    vm.lista_atributos = null;
    vm.lista_subatributos = null;    
    vm.lista_sistema = null;
    vm.lista_tipo_calculo = null;
    vm.destino = null;

    //Implementação de funções
    function changeSistema(){
        vm.form.fk_id_atributo = null;
        vm.form.fk_id_subatributo = null;
        getAtributos();
        getSubatributos();
    }
    
    function carregaDados(id, destino){
        //Itens Form    
        vm.form = {};
        vm.form.id = null;
        vm.form.fk_id_sistema = null;
        vm.form.fk_id_atributo = null;
        vm.form.fk_id_subatributo = null;
        vm.form.tipo_relacao_atributo_subatributo = null;
        vm.form.multiplicador_atributo_subatributo = null;
        vm.form.intervalo_atributo_subatributo = null;

        if(id === undefined){
            atributoSubatributoService.getFormOptions(carregaOpcoesIniciais);
        }else{
            vm.form.id = id;    
            atributoSubatributoService.getFormOptions(carregaOpcoesIniciais);        
            getAtributoSubatributo(id);
        }
        vm.destino = destino;
        
    }

    function carregaOpcoesIniciais(response){
        vm.lista_sistema = response.data.sistemas;
        vm.lista_tipo_calculo = response.data.tipos_calculo;
        if(vm.lista_tipo_calculo.length > 0){
            vm.form.tipo_relacao_atributo_subatributo = vm.lista_tipo_calculo[0];
        }        
    }

    function getAtributos(atributoPadrao = null){
        if (vm.form.fk_id_sistema === undefined){
            vm.lista_atributos = null;
        }else{            
            atributoService.getAtributosSistema(vm.form.fk_id_sistema.id, function(response){
                vm.lista_atributos = response.data;
                
                if(atributoPadrao !== null){
                    vm.form.fk_id_atributo = atributoSubatributoService.findObjectById(vm.lista_atributos, atributoPadrao);
                }else{
                    if(vm.lista_atributos.length > 0){                    
                        vm.form.fk_id_atributo = vm.lista_atributos[0];
                    }                    
                }
                
            });
            
        }
    }    

    function getSubatributos(subatributoPadrao = null){
        if (vm.form.fk_id_sistema === undefined){
            vm.lista_subatributos = null;
        }else{            
            subatributoService.getSubatributosSistema(vm.form.fk_id_sistema.id, function(response){
                vm.lista_subatributos = response.data;
                
                if(subatributoPadrao !== null){
                    vm.form.fk_id_subatributo = atributoSubatributoService.findObjectById(vm.lista_atributos, subatributoPadrao);
                }else{
                    if(vm.lista_subatributos.length > 0){
                        vm.form.fk_id_subatributo= vm.lista_subatributos[0];
                    }                          
                }                
            });            
        }       
    }

    function sendFormData(){                        
        formData = atributoSubatributoService.gambiarraNgOptions(vm.form);            
        
        atributoSubatributoService.sendFormData(formData, vm.destino, function(response){
            if(response.data.status == 'OK'){                
                $window.location.href = response.data.data;
            }
        });
    }

    function getAtributoSubatributo(atributo_subatributo_id){
        if (atributo_subatributo_id === undefined){
            //vm.lista_subatributos = null;
        }else{            
            atributoSubatributoService.getAtributoSubatributo(atributo_subatributo_id, function(response){
                registro = response.data[0];

                vm.form.intervalo_atributo_subatributo = registro.intervalo_atributo_subatributo;
                vm.form.multiplicador_atributo_subatributo = registro.multiplicador_atributo_subatributo;
                vm.form.tipo_relacao_atributo_subatributo = atributoSubatributoService.findObjectById(vm.lista_tipo_calculo, registro.tipo_relacao_atributo_subatributo);
                vm.form.fk_id_sistema = atributoSubatributoService.findObjectById(vm.lista_sistema, registro.fk_id_sistema);
                getAtributos(registro.fk_id_atributo);
                getSubatributos(registro.fk_id_subatributo);

                

            });            
        }
    }    

}
