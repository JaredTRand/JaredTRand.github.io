
$( document ).ready(function() {
   $("#content-container-container").children().first().show() 
   

   $( ".nav-item").on( "click", function() {
      var contentToShow = $(this).data("content");

      if(!$("#" + contentToShow).is(":visible")){
         $("#content-container-container").children().slideUp("fast").promise().done(function(){
            $("#" + contentToShow).slideDown("fast");
         });
      }
   });
});
