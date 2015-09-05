



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


//function get3wordsusingwords() {

  jQuery('.getwhat').on('click', function(){
    var $this = jQuery('.whatwords');
    console.log('blur..');

    if ($this.val().length) {

      var wordsArr = $this.val().split(' ');
      var wordsStr = wordsArr.join('.');

      var url = httpGet('https://api.what3words.com/w3w?key=LLB8V03S&string='+wordsStr);
      var w3w_lonlang = JSON.parse(url);

      //paramsw3w_lonlang.postion[0]
      console.log(w3w_lonlang);
      console.log(w3w_lonlang.position);

      var lon = w3w_lonlang.position[0];
      var lat = w3w_lonlang.position[1];

      var url = httpGet('/API?lon='+lon+'&lat='+lat);

      jQuery('.lon').val(lon);
      jQuery('.lat').val(lat);

      console.log('url:', url);
      console.log(typeof url);
      url = JSON.parse(url);

      var html = [
        '<div class="panel panel-default">'
          ,'<div class="panel-body">'
            ,url.plant
            ,'<br/>'
            ,url.temp
            ,'<br/>'
            ,url.rainfall
            ,'<br/>'
            ,url.Humidity
          ,'</div>'
        ,'</div>'
      ].join('');

      console.log(html)
      //jQuery(html).prepend('.row');

      jQuery('.plant').val(url.plant);
      jQuery('.temp').val(url.temp);
      jQuery('.rainfall').val(url.rainfall);
      jQuery('.humidity').val(url.Humidity);



    }

  });

  //get3wordsusingwords();



//}
