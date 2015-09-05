



function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function get3words(lon, lat) {
  var w3w_str = (httpGet('https://api.what3words.com/position?key=LLB8V03S&position='+lon+','+lat));
  var w3w_words = JSON.parse(w3w_str).words;
  return w3w_words;
}

jQuery('.lon, .lat').on('blur', function(){
  var $this = jQuery(this);

  if (jQuery('.lon').length && jQuery('.lat').length) {
    jQuery('.what3words').find('span').text(get3words(jQuery('.lon').val(), jQuery('.lat').val())).parent().show();  
  }

  //alert('blur'+$this.val());


});
