/**
 * Created by Mackenzie on 5/7/2015.
 */
$(document).ready(function () {
    $('#createCoachBtn').click( function(){
        var payload = {
            SportID: $('#SportID').val(),
            HSTeamID: $('#hsteamid').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#create_coach_form").attr("action"),
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