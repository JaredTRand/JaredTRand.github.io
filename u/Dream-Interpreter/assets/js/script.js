
$(document).ready(function () {
    $("#generated").hide()
    $("#submit-loading").hide()

    $("#submit").click(function () {
        dream = $("#dreamText").val();

        if(dream.length === 0){
            alert("Please describe your dream.");
        }else{
            $("#submit").hide();
            $("#submit-loading").show();

            
            $.ajax({
                type: "GET",
                url: 'https://jarofmilk.com/api/getDream/'+dream,
                timeout: 20000,    
                crossDomain: true,
                dataType: "json",
                success: function(data) {
                    $("#submit").show();
                    $("#submit-loading").hide();

                    $("#generated").show();
                    $("#generated").text(data.result); 
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    console.log(XMLHttpRequest);
                    console.log(textStatus);
                    console.log(errorThrown);

                    $("#submit").show();
                    $("#submit-loading").hide();

                    //$("#generated").show();
                    //$("#generated").text("Something went wrong! Please try again later when it isn't broken."); 
                    alert("Something went wrong! Please try again later when it isn't broken.");
                } 
            });
        }
    });
});
    