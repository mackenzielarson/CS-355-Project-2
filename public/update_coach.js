$(document).ready(function () {
    $('#updateCoachBtn').click( function(event){
        event.preventDefault();
        var payload = {
            hsteamid: $('#hsteamid').val(),
            coachid: $('#coachid').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            address: $('#address').val()
        };

        $.ajax({
            url: $("#update_coach_form").attr("action"),
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