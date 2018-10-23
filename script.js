var holder = $('#holder');
var annotationsWrapper = $('#annotations-wrapper');
 
holder.on('dragover', function () { this.className = 'hover'; return false; });
holder.on('dragend', function () { this.className = ''; return false; });
holder.on('drop', function (e) {
  this.className = '';
  e.preventDefault();

  var file = e.originalEvent.dataTransfer.files[0],
      reader = new FileReader();
  reader.onload = function (event) {
    console.log(event.target);
    let contentBody = event.target.result;
    console.log("contentBody",contentBody);
    //let regex = /<text>(.*?)<\/text>/g;
    let xmlDoc = $.parseXML( contentBody );
    let $xml = $( xmlDoc );
    let title = $xml.find( "dc\\:title" ).text();
    let author = $xml.find( "dc\\:creator" ).text();
    let annotations = [];
    $xml.find('annotation').each(function() {
        let start = $(this).find('fragment').attr('start');
        let fileNameMatch = start.match(/\/([^\/]+)#/);
        let fileName = fileNameMatch? fileNameMatch[1]:'';
        let text = $(this).find('text').text();
    annotations.push(`<p><em>“${text}”</em></p>`);
    });
    annotationsWrapper.html(`
    <h2>${title} - <em>${author}</em></h2>${annotations.join('')}
    `);
    // let match;
    // const annotations = [];
    // while ( (match = regex.exec(contentBody)) !== null) {
    //   console.log("match",match);
    //   annotations.push(match[1]);
    // }
    
    // holder.html(annotations.map(a=>`<p>${a}</p>`).join(''));
  };
  //console.log(file);
  reader.readAsText(file);

  return false;
});