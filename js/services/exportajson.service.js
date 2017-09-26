(function(){
    
    angular
        .module('distorcao')
        .service('exportaJson', exportaJson);
    
    function exportaJson(){
        var service = {
            eventoExport: eventoExport
        };
        
        return service;
    
        //Exporta para o computador um objeto
	    //Fonte: https://stackoverflow.com/questions/30443238/save-json-to-file-in-angularjs
        function eventoExport(data, filename){
            if (!data) {
              console.error('No data');
              return(0);
            }
          
            if (!filename) {
              filename = 'download.json';
            }
          
            if (typeof data === 'object') {
              data = JSON.stringify(data, undefined, 2);
            }
          
            var blob = new Blob([data], {type: 'text/json'});
          
            // FOR IE:
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
            else{
                var e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');
          
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }
          };
    }
    
    })();