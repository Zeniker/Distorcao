$('.filter-atributo').on('change', function(){
    var url = $(this).attr('data-url');
    url = url.substring(0, url.length-1)    
    url += $(this).val()

    $.ajax({
        'url' : url,
        'type' : 'GET',
        'success' : function(result){
            $('#table-atributo').html(result);            
        },
        'error': function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); 
            console.log("Erro: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    });
})