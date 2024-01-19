
$( document ).ready(function() {
   $("#content-container-container").children().first().show();
   updateColors(getHexFromTime());

   setInterval( function()
   { 
      if(!timeStop)  updateColors(getHexFromTime());
   } , 1000 );

   $( ".nav-item").on( "click", function() {
      var contentToShow = $(this).data("content");
      if(contentToShow == "art"){
         if(!createdArtImages) createArtImages();
      }
      if(!$("#" + contentToShow).is(":visible")){
         $("#content-container-container").children().slideUp("fast").promise().done(function(){
            $("#" + contentToShow).slideDown("fast",function(){
               $(window).scrollTop(0);
            });
         });
      }
   });
});

var timeStop = false;
$("#hexvalue").on( "mouseenter", function(){
   $(this).attr("id","tempID"); //Change ID to stop JS from changing text while hovering

   if($(this).data("stopped") == true){
      $(this).html("Resume Color Changing?");
   }else $(this).html("Pause Color Changing?");

}).on( "mouseleave", function(){
   $(this).attr("id","hexvalue");
});

$("#hexvalue").on( "click", function(){
   if($(this).data("stopped") != true){
      timeStop = true;
      $(this).html("Color Changing Paused");
      $(this).data("stopped", true);
      updateColors("#69306D");
   }else{
      timeStop = false;
      $(this).html("Color Changing Resumed");
      $(this).data("stopped", false);
   }
});

function getHexFromTime()
{
  var date =    new Date();
  var hours =   date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var arr=[hours,minutes,seconds].map(
     function(num){
        return (num<10) ? '0'+num : String(num); 
      });  

   hours =   arr[0];
   minutes = arr[1];
   seconds = arr[2];

  return "#" + hours + '' +  minutes + '' + seconds;
}

function invertColor(hex) {
   if (hex.indexOf('#') === 0) {
       hex = hex.slice(1);
   }
   // convert 3-digit hex to 6-digits.
   if (hex.length === 3) {
       hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   }
   if (hex.length !== 6) {
       throw new Error('Invalid HEX color.');
   }
   // invert color components
   var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
       g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
       b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
   // pad each with zeros and return
   return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
   len = len || 2;
   var zeros = new Array(len).join('0');
   return (zeros + str).slice(-len);
}

function updateColors(color){
   var inverted_color = invertColor(color);
   $("body").css("background-color", color);

   //nav tabs background and text
   $(".nav-tabs").css("background-color", inverted_color);
   $(".nav-tabs").css("color", color);
   $(".nav-tabs").children().children().css("color", color);

   //inverse nav tabs background and text
   $(".nav-tabs-inverse").css("background-color", color);
   $(".nav-tabs-inverse").css("color", inverted_color);
   $(".nav-tabs-inverse").children().children().css("color", inverted_color)

   //inverse section wrapper background and text
   $(".section-wrapper-inverse-title ").children().children("div").css("color", inverted_color)
   $('.section-wrapper-inverse').css("background-color", color);
   $('.section-wrapper-inverse-title').css("background-color", color);


   //iconify
   $(".iconify-skill-icon").css("color", inverted_color);
/*    $(".skills-box-cover").css("background-color", color); */
   

   $("footer").css("background-color", inverted_color);
   $("footer>*>div").css("color", color);

   $(".section-wrapper-title ").children().children("div").css("color", color)
   $('.section-wrapper').css("background-color", inverted_color);
   $('.section-wrapper-title').css("background-color", inverted_color);
   $('#hexvalue').html(color);
}

var createdArtImages = false;
function createArtImages(){
   var artFolder = 'assets/img/smallerImgs/art/'
   var count = 0;
   $.ajax({
        url : "https://jarofmilk.com/api/getArtPaths",
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        contentType: 'application/json',
        success: function (data) {
         console.log(data);
            for(var x in data["small"]){
               var path = data["small"][x];
               if (path.match(/\.(jpe?g|png|webp|gif)$/)) { 
                  count += 1;
                  var image = $('<a id="art-piece-' + count + '" class ="col"> <div class="section-wrapper rounded  mb-2 mx-1"> <div class="row rounded content-container-with-header p-0 m-0" > <div id="content" class="col rounded"> <div class="container p-0 m-0"> <div class="row"> <div class="col"> <img src="' + path + '" class="card-img-top art-card rounded"> </div> </div> </div> </div> </div> </div> </a>');
                  $("#art-col-"+count).append(image);
                  if(count >= 3){
                     count = 0;
                  }
               }
            }
        }
    }); 
    createdArtImages = true;
}