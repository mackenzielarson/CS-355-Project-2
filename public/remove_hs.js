/**
 * Created by Mackenzie on 4/27/2015.
 */
$(document).ready(function () {
    $('#removeHSBtn').click( function(){
        var payload = {
            name: $('#name').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#delete_hs_form").attr("action"),
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
