angular
    .module('distorcao')
    .controller('CalculoController', CalculoController);

function CalculoController(atributoService, subatributoService, calculoService, distorcaoService, $window) {
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
        vm.form.tipo_calculo = null;
        vm.form.multiplicador_calculo = null;
        vm.form.intervalo_calculo = null;

        if(id === undefined){
            calculoService.getFormOptions(carregaOpcoesIniciais);
        }else{
            vm.form.id = id;    
            calculoService.getFormOptions(carregaOpcoesIniciais);        
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
                    vm.form.fk_id_atributo = distorcaoService.findObjectById(vm.lista_atributos, atributoPadrao);
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
                    vm.form.fk_id_subatributo = distorcaoService.findObjectById(vm.lista_atributos, subatributoPadrao);
                }else{
                    if(vm.lista_subatributos.length > 0){
                        vm.form.fk_id_subatributo= vm.lista_subatributos[0];
                    }                          
                }                
            });            
        }
    }

    function sendFormData(){                        
        formData = distorcaoService.gambiarraNgOptions(vm.form);            
        
        calculoService.sendFormData(formData, vm.destino, function(response){
            if(response.data.status == 'OK'){                
                $window.location.href = response.data.data;
            }
        });
    }

    function getAtributoSubatributo(calculo_id){
        if (calculo_id === undefined){
            //vm.lista_subatributos = null;
        }else{            
            calculoService.getCalculo(calculo_id, function(response){
                registro = response.data[0];

                vm.form.intervalo_calculo = registro.intervalo_calculo;
                vm.form.multiplicador_calculo = registro.multiplicador_calculo;
                vm.form.tipo_calculo = distorcaoService.findObjectById(vm.lista_tipo_calculo, registro.tipo_calculo);
                vm.form.fk_id_sistema = distorcaoService.findObjectById(vm.lista_sistema, registro.fk_id_sistema);
                getAtributos(registro.fk_id_atributo);
                getSubatributos(registro.fk_id_subatributo);

                

            });            
        }
    }   

}
