/**
 * Created by Mackenzie on 5/8/2015.
 */
$(document).ready(function () {
    $('#updateHSBtn').click( function(){
        var payload = {
            hsid: $('#hsid').val(),
            name: $('#name').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#update_hs_form").attr("action"),
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