angular
	.module('distorcao')
	.controller('fichaDynController', fichaController);

function fichaController(sistemaService, narracaoService, atributoService, subatributoService, distorcaoService,
                         calculoService, calculaBonus, fichaService, $window, $q) {
	var vm = this;
	
	//Funções    
    vm.carregaDados = carregaDados;
    vm.changeSistema = changeSistema;    
    vm.alteraValorInicial = alteraValorInicial;
    vm.alteraAtributo = alteraAtributo;
    vm.sendFormData = sendFormData;

    //Variáveis
    vm.sistema = null;
    vm.lista_atributos = null;
    vm.lista_subatributos = null;
    vm.lista_sistemas = null;
    vm.lista_calculos = null;
    vm.valores_iniciais = [];
    vm.ficha_atributo = [];
    vm.ficha_subatributo = [];
	
    //Implementação de funções
    function carregaDados(ficha_id, destino){
        vm.destino = destino;
        vm.form = {};
        vm.form.ficha = {};
        vm.form.atributo = [];
        vm.form.subatributo = [];
        vm.form.ficha.id = null;
        vm.form.ficha.nome_ficha = null;
        vm.form.ficha.fk_id_narracao = null;

        if(ficha_id === undefined){
            sistemaService.getSistemas(carregaSistemas);
        }else{
            vm.form.id = ficha_id;
            sistemaService.getSistemas(carregaSistemas);
            getFicha(ficha_id);
        }
    }

    function carregaSistemas(response){
        vm.lista_sistemas = response.data;
    }

    function changeSistema(){   
        getNarracoes();     
        getAtributos();
        getSubatributos();
        getCalculos();
    }

    function getNarracoes(narracaoPadrao = null){
        var d = $q.defer();
        if (vm.sistema === undefined){
            vm.lista_narracoes = null;
        }else{            
            narracaoService.getNarracoesSistema(vm.sistema.id, function(response){
                vm.lista_narracoes = response.data;
                
                if(narracaoPadrao !== null){
                    vm.form.ficha.fk_id_narracao = distorcaoService.findObjectById(vm.lista_narracoes, narracaoPadrao);
                }else{
                    if(vm.lista_narracoes.length > 0){
                        vm.form.ficha.fk_id_narracao= vm.lista_narracoes[0];
                    }                          
                }
                d.resolve();
            });            
        }
        return d.promise;
    }

    function inicializaArrayValores(lista, tipo){
        valores = [];

        for(i = 0; i < lista.length; i++){
            valores[i] = {};
            valores[i].fk_id_ficha = 0;
            switch (tipo){
                case 1:
                    valores[i].id = null;
                    valores[i].fk_id_atributo = lista[i].id;
                    valores[i].valor_atributo = 0;
                    break;
                case 2:
                    valores[i].id = null;
                    valores[i].fk_id_subatributo = lista[i].id;
                    valores[i].valor_subatributo = 0;
                    break;
                case 3:
                    valores[i].valor_inicial = 0;
                    valores[i].valor_total = 0;
                    break;
                default:
                    break;
            }

        }

        return valores;
    }

    function getAtributos(inicializaValores = true){
        var d = $q.defer();
        if (vm.sistema === undefined){
            vm.lista_atributos = null;
        }else{            
            atributoService.getAtributosSistema(vm.sistema.id, function(response){                
                vm.lista_atributos = response.data;                                                                

                if(inicializaValores == true){
                    vm.ficha_atributo = inicializaArrayValores(vm.lista_atributos, 1);
                }
                d.resolve();
            });
        }

        return d.promise;
    }

    function getSubatributos(inicializaValores = true){
        var d = $q.defer();
        if (vm.sistema === undefined){
            vm.lista_subatributos = null;
        }else{            
            subatributoService.getSubatributosSistema(vm.sistema.id, function(response){
                vm.lista_subatributos = response.data;                

                if(inicializaValores == true){
                    vm.ficha_subatributo = inicializaArrayValores(vm.lista_subatributos, 2);
                    vm.valores_iniciais = inicializaArrayValores(vm.lista_subatributos, 3);
                }else{
                    for(i in vm.lista_subatributos){
                        recalculaSubatributo(vm.lista_subatributos[i].id);
                    }
                }
                d.resolve();
            });            
        }
        return d.promise;
    }

    function getCalculos(){
        if (vm.sistema === undefined){
            vm.lista_calculos = null;
        }else{            
            calculoService.getCalculoSistema(vm.sistema.id, function(response){
                vm.lista_calculos = response.data;
            });            
        }
    }

    function alteraAtributo(index){
        valor = vm.ficha_atributo[index].valor_atributo;
        atributoAtual = vm.ficha_atributo[index].fk_id_atributo;

        for(i in vm.lista_calculos) {
            if (vm.lista_calculos[i].fk_id_atributo == atributoAtual) {
                recalculaSubatributo(vm.lista_calculos[i].fk_id_subatributo);
            }
        }
    }

    function recalculaSubatributo(subatributo_id){            
        valorInicial = 0.0;        
        indiceValorSubatributo = 0;
        subAtributo = null;
        for(i in vm.lista_subatributos){            
            if(vm.lista_subatributos[i].id == subatributo_id){                
                valorInicial = vm.valores_iniciais[i].valor_inicial;
                indiceValorSubatributo = i;
                subAtributo = vm.lista_subatributos[i];
                break;
            }
        }

        var valorTotal = 0;

        if(valorInicial != undefined && angular.isNumber(+valorInicial)){
            valorTotal = Number(valorInicial);
        }else{
            valorTotal = 0;
        }

                
        for(i in vm.lista_calculos){                        
            calculoAtual = vm.lista_calculos[i];
            if(calculoAtual.fk_id_subatributo != subatributo_id){
                continue;
            }            

            valorAtributo = null;
            for(j = 0; j < vm.lista_atributos.length; j++){                
                if(vm.lista_atributos[j].id == calculoAtual.fk_id_atributo){
                    valorAtributo = vm.ficha_atributo[j].valor_atributo;
                }
            }

            if(calculoAtual.tipo_calculo == 1){

                valorTotal += calculaBonus.retornaValorBonusString(calculoAtual.intervalo_calculo, calculoAtual.multiplicador_calculo, valorAtributo);
            }else{
                valorTotal += (valorAtributo * (calculoAtual.percentual_calculo / 100));
            }

        }

        if([2,4].indexOf(subAtributo.tipo_subatributo) > -1) {
            valorTotal = Math.floor(valorTotal);
        }

        vm.valores_iniciais[indiceValorSubatributo].valor_total = valorTotal;
        vm.ficha_subatributo[indiceValorSubatributo].valor_subatributo = valorInicial;
    }

    function alteraValorInicial(indice){
        recalculaSubatributo(vm.lista_subatributos[indice].id);
    }

    function sendFormData(){
        var formData = {};
        formData.ficha = {};
        formData.ficha = distorcaoService.gambiarraNgOptions(vm.form.ficha);
        formData.ficha_atributo = vm.ficha_atributo;
        formData.ficha_subatributo = vm.ficha_subatributo;

        fichaService.sendFormData(formData, vm.destino, sendFormDataResponse);
    }

    function sendFormDataResponse(response){
        if(response.data.status == 'OK'){
            $window.location.href = response.data.data;
        }
    }

    function getFicha(ficha_id){
        fichaService.getFicha(ficha_id, getFichaResponse);
    }

    function getFichaResponse(response){
        var ficha = response.data.ficha[0];
        var ficha_atributo = response.data.ficha_atributo;
        var ficha_subatributo = response.data.ficha_subatributo;


        vm.form.ficha = ficha;
        narracaoService.getNarracao(ficha.fk_id_narracao, function(response){
            vm.sistema = distorcaoService.findObjectById(vm.lista_sistemas, response.data[0].fk_id_sistema);

            vm.ficha_atributo = ficha_atributo;

            vm.ficha_subatributo = ficha_subatributo;

            for(i in ficha_subatributo){
                vm.valores_iniciais[i] = {};
                vm.valores_iniciais[i].valor_inicial = ficha_subatributo[i].valor_subatributo;
                vm.valores_iniciais[i].valor_total = 0;
            }
            getNarracoes(ficha.fk_id_narracao);

            $q.all([
                getCalculos(),
                getAtributos(false),
            ]).then(function(){
                getSubatributos(false);
            });
        });
    }

}
