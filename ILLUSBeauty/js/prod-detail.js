$(document).ready(function () {
    $(".incr-btn").on("click", function (e) {
        var $button = $(this);
        var oldValue = $button.parent().find('.quantity').val();
        $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
        if ($button.data('action') == "increase") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below 1
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
                $button.addClass('inactive');
            }
        }
        $button.parent().find('.quantity').val(newVal);
        e.preventDefault();
    });


    $("#voteup").val('0');
    $("#votedown").val('55');
    // Create a click handler for your increment button
    $("#increaseButton").click(function () {
        var newValue = 1 + parseInt($("#voteup").val());
        $("#voteup").val(newValue);
    });
    // .. and your decrement button
    $("#decreaseButton").click(function () {
        var newValue = 1 + parseInt($("#votedown").val());
        $("#votedown").val(newValue);
    });


    $(".form2 #voteup").val('0');
    $(".form2 #votedown").val('44');
    // Create a click handler for your increment button
    $(".form2 #increaseButton").click(function () {
        var newValue = 1 + parseInt($(".form2 #voteup").val());
        $(".form2 #voteup").val(newValue);
    });
    // .. and your decrement button
    $(".form2 #decreaseButton").click(function () {
        var newValue = 1 + parseInt($(".form2 #votedown").val());
        $(".form2 #votedown").val(newValue);
    });
});
