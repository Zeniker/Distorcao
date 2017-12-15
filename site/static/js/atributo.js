$('.filter-atributo').on('change', function(){    
    //var url = $(this).attr('data-url');

    //filter_atributo(url)    
});

function filter_atributo(url, page = 1){
    console.log(url);
    var url = $(this).attr('data-url');    

    objectData = new Object()

    objectData['sistema_id'] = $('sistema_filtro').val();

    $.ajax({
        'url' : url,
        'type' : 'POST',
        'async': true,
        'data' : objectData,
        'success' : function(result){
            console.log(result)
            //$('#table-atributo').html(result);         
        },
        'error': function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); 
            console.log("Erro: " + errorThrown);
            console.log(XMLHttpRequest.responseText);
        }
    });
}

$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name="csrfmiddlewaretoken"]').val()
    }
});


/*$('.next-page').on('click', function(event){
    event.preventDefault();
    type = $(this).closest('.pagination').attr('data-type');
    page_number = $(this).attr('data-page');

    functionName = 'filter_' + type;

    class_name = '.filter-' + type;

    url = $(class_name).attr('data-url');    

    window[functionName](url, page_number)    
});*/