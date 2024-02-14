


   function putSongDataOnForm(song){
      $("#kk-title").val("");
      $("#kk-artist").val("");
      $("#kk-game").val("");
      $("#kk-time").val("");
      $("#kk-link").val("");
      $("#kk-is-lofi").prop("checked", false);
      $("#inlineRadio1").prop("checked", false);
      $("#weatherRadio3").prop("checked", true);
      console.log(song)

      var d_title = "";
      if(song["title"] != undefined)
         d_title = song["title"];
      else
         d_title = song["name"];

      var d_title_lowerandspaceless = d_title.toLowerCase().replaceAll(" ", "");
      var d_artist = ""
      var d_link = song["uri"]

   /* Artist */
      if(song["artists"] != undefined){
         for(var i in song["artists"]){
            if(d_artist != "") 
               d_artist += ", "
            d_artist += song["artists"][i]["name"]
         }
      }else{
         d_artist = song["artist"];
      }

   /* Game */
      var d_game = ""
      if(d_title_lowerandspaceless.includes("newhorizons"))
         d_game = "NH";
      else if(d_title_lowerandspaceless.includes("cityfolk"))
         d_game = "CF";
      else if(d_title_lowerandspaceless.includes("wildworld"))
         d_game = "WW";
      else if(d_title_lowerandspaceless.includes("newleaf"))
         d_game = "NL";
      else
         d_game = "Undefined"

   /* TIME */
   /* who needs to be smart, just brute force it */
      var d_time = ""
      if(d_title_lowerandspaceless.includes("1am"))
         d_time = "1am"
      else if(d_title_lowerandspaceless.includes("2am"))
         d_time = "2am"
      else if(d_title_lowerandspaceless.includes("3am"))
         d_time = "3am"
      else if(d_title_lowerandspaceless.includes("4am"))
         d_time = "4am"
      else if(d_title_lowerandspaceless.includes("5am"))
         d_time = "5am"
      else if(d_title_lowerandspaceless.includes("6am"))
         d_time = "6am"
      else if(d_title_lowerandspaceless.includes("7am"))
         d_time = "7am"
      else if(d_title_lowerandspaceless.includes("8am"))
         d_time = "8am"
      else if(d_title_lowerandspaceless.includes("9am"))
         d_time = "9am"
      else if(d_title_lowerandspaceless.includes("10am"))
         d_time = "10am"
      else if(d_title_lowerandspaceless.includes("11am"))
         d_time = "11am"
      else if(d_title_lowerandspaceless.includes("12pm"))
         d_time = "12pm"
      else if(d_title_lowerandspaceless.includes("1pm"))
         d_time = "1pm"
      else if(d_title_lowerandspaceless.includes("2pm"))
         d_time = "2pm"
      else if(d_title_lowerandspaceless.includes("3pm"))
         d_time = "3pm"
      else if(d_title_lowerandspaceless.includes("4pm"))
         d_time = "4pm"
      else if(d_title_lowerandspaceless.includes("5pm"))
         d_time = "5pm"
      else if(d_title_lowerandspaceless.includes("6pm"))
         d_time = "6pm"
      else if(d_title_lowerandspaceless.includes("7pm"))
         d_time = "7pm"
      else if(d_title_lowerandspaceless.includes("8pm"))
         d_time = "8pm"
      else if(d_title_lowerandspaceless.includes("9pm"))
         d_time = "9pm"
      else if(d_title_lowerandspaceless.includes("10pm"))
         d_time = "10pm"
      else if(d_title_lowerandspaceless.includes("11pm"))
         d_time = "11pm"
      else if(d_title_lowerandspaceless.includes("12pm"))
         d_time = "12pm"
      else d_time = "Undefined"


   /* Weather */
      if(d_title_lowerandspaceless.includes("rain"))
         $("#weatherRadio2").prop("checked", true);
      else if(d_title_lowerandspaceless.includes("sunny"))
         $("#weatherRadio1").prop("checked", true);
      else
         $("#weatherRadio3").prop("checked", true);

   /* KK Song */
      if(d_title_lowerandspaceless.includes("k.k.") || d_title_lowerandspaceless.includes("kk"))
         $("#kk-is-kk").prop("checked", true);

   /* Lofi Song */
      if(d_title_lowerandspaceless.includes("lofi")){
         $("#kk-is-lofi").prop("checked", true);
         $("#inlineRadio1").prop("checked", true);
      }
      


      $("#kk-title").val(d_title);
      $("#kk-artist").val(d_artist);
      $("#kk-game").val(d_game);
      $("#kk-time").val(d_time);
      $("#kk-link").val(d_link);
   }




   $("#skipss").on("click", function(){
      if($("#playlisthiddenresults").data("kk-result") != undefined && $("#playlisthiddenresults").data("kk-result").length > 0){
         putSongDataOnForm($("#playlisthiddenresults").data("kk-result").shift());
         $("#amtleft").text($("#playlisthiddenresults").data("kk-result").length + " Left.");
      }
   });

   $("#spotify-search-btn").on("click", function(){
      let username = $("#username").val();
      let password = $("#password").val();
      let spotifylink = $("#spotify-song").val();
      let apiurl = 'https://jarofmilk.com/testingapi/KKRadioNewSong/getSpotifyInfoFromLink/'

      $.ajax({
         type: "POST",
         url: apiurl,
         timeout: 20000,    
         crossDomain: true,
         dataType: "json",
         data: {"spotifylink":`${spotifylink}`, "kk-playlistoralbum":$("#kk-playlistoralbum").is(":checked")},
         beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', btoa(username + ":" + password)); 
         },
         success: function(data) {
            if(data["msg"] == "playlist"){
               $("#playlisthiddenresults").data("kk-result", data["data"]);
               if($("#playlisthiddenresults").data("kk-result") != undefined && $("#playlisthiddenresults").data("kk-result").length > 0){
                  putSongDataOnForm($("#playlisthiddenresults").data("kk-result").shift());
                  $("#amtleft").text($("#playlisthiddenresults").data("kk-result").length + " Left.")
               }
               console.log(data);
            }else{
               putSongDataOnForm(data["data"]);
            }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            if(XMLHttpRequest.responseJSON != undefined && !XMLHttpRequest.responseJSON["success"]){
               alert(XMLHttpRequest.responseJSON["error"]);
            }
         } 
      });
   });

   $("#KK-song-form").submit(function(e){
      e.preventDefault();
      var form = $(this);
      var values = form.serializeArray();
       values = values.concat(
            jQuery('#KK-song-form input[type=checkbox]:not(:checked)').map(
               function() {
                  return {"name": this.name, "value": false}
               }).get()
      );

      let username = $("#username").val();
      let password = $("#password").val();
      /* NEED A CHECKBOX FOR KK SONG & A CHECKBOX FOR LOCATION (LIKE THE ROOST). MAYBE CAN GET TITLE/ARTIST? */
      $.ajax({
         type: "POST",
         url: 'https://jarofmilk.com/testingapi/KKRadioNewSong/',
         timeout: 20000,    
         crossDomain: true,
         dataType: "json",
         data: values,
         beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', btoa(username + ":" + password)); 
         },
         success: function(data) {
            if(!data["success"]) alert("Adding Failed.  " + data["msg"]);
            else alert("Song Successfully Added! " + data["msg"]);
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) { 
            if(XMLHttpRequest.responseJSON != undefined && !XMLHttpRequest.responseJSON["success"]){
               alert(XMLHttpRequest.responseJSON["error"]);
            }
         } 
      });

      if($("#playlisthiddenresults").data("kk-result") != undefined && $("#playlisthiddenresults").data("kk-result").length > 0){
         putSongDataOnForm($("#playlisthiddenresults").data("kk-result").shift());
         $("#amtleft").text($("#playlisthiddenresults").data("kk-result").length + " Left.")
      }
   });
      
   