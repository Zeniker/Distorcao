$('.filter-atributo').on('change', function(){    
    filter_atributo(url)    
});

function filter_atributo(url, page = 1){
    var url = $(this).attr('data-url');    

    objectData = new Object()

    objectData['sistema_id'] = 

    $.ajax({
        'url' : url,
        'type' : 'POST',
        'success' : function(result){
            $('#table-atributo').html(result);         
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
        'X-CSRF-TOKEN': $('input[name="csrfmiddlewaretoken"]').val()
    }
});


$('.next-page').on('click', function(event){
    event.preventDefault();
    type = $(this).closest('.pagination').attr('data-type');
    page_number = $(this).attr('data-page');

    functionName = 'filter_' + type;

    class_name = '.filter-' + type;

    url = $(class_name).attr('data-url');    

    window[functionName](url, page_number)    
});