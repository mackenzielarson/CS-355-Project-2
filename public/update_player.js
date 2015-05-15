$(document).ready(function () {
    $('#updatePlayerBtn').click( function(event){
        event.preventDefault();
        var payload = {
            hsteamid: $('#hsteamid').val(),
            playerid: $('#playerid').val(),
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            number: $('#number').val(),
            age: $('#age').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#update_player_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});