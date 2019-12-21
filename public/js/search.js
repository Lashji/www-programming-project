$(document).ready(function () {
    $("#questionnaire-search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#questionnaire-container tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});