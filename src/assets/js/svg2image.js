
'use strict';

(function ($) {
    /*
    var btn = document.querySelector('button');
var svg = document.querySelector('svg');
var canvas = document.querySelector('canvas');
  var canvas = document.getElementById('canvas');
*/
    $.svg2image = function(btn, svg) {
        


function triggerDownload (imgURI) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
  });

  var a = document.createElement('a');
  a.setAttribute('download', 'MY_COOL_IMAGE.png');
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');
  a.dispatchEvent(evt);
}

btn.addEventListener('click', function () {
    var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var data = (new XMLSerializer()).serializeToString(svg);
  var DOMURL = window.URL || window.webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  var url = DOMURL.createObjectURL(svgBlob);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
  };

  img.src = url;
});
    }


})(jQuery);