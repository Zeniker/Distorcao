$('#id_tipo_atributo').on('change', function(){
     var valor = this.value;
     var valor_maximo = $('#id_valor_maximo_atributo');
     var valor_minimo = $('#id_valor_minimo_atributo');

     if(valor === '1'){
         valor_maximo.val(null);
         valor_maximo.prop('disabled', true);
         valor_minimo.val(null);
         valor_minimo.prop('disabled', true);
     }else{
         valor_maximo.prop('disabled', false);
         valor_minimo.prop('disabled', false);
     }
});

$('#id_form_atributo').ready(function(){
    $('#id_tipo_atributo').change();
})