/**
 * Created by Mackenzie on 4/25/2015.
 */
$(document).ready(function () {
    $('#createHSBtn').click( function(){
        var payload = {
            name: $('#name').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#create_user_form").attr("action"),
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