/**
 * Created by Mackenzie on 4/27/2015.
 */
$(document).ready(function () {
    $('#createSportBtn').click( function(){
        var payload = {
            hsname: $('#hsname').val(),
            sname: $('#sname').val(),
            sclass: $('#sclass').val(),
            sgender: $('#sgender').val(),
            wins: $('#wins').val(),
            losses: $('#losses').val()
        };

        $.ajax({
            url: $("#create_sport_form").attr("action"),
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