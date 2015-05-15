/**
 * Created by Mackenzie on 5/9/2015.
 */
$(document).ready(function () {
    $('#updateSportBtn').click( function(event){
        event.preventDefault();
        var payload = {
            sportid: $('#sportid').val(),
            hsname: $('#hsname').val(),
            sname: $('#sname').val(),
            sclass: $('#sclass').val(),
            sgender: $('#sgender').val(),
            wins: $('#wins').val(),
            losses: $('#losses').val()
        };

        $.ajax({
            url: $("#update_sport_form").attr("action"),
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