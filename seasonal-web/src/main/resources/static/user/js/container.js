$(".input-text").focus(function () {
    $(this).parent("div").addClass("form-section-focus");
    $(this).parent("div").addClass("form-section-active");
});
$(".input-text").blur(function () {
    if ($(this).val() !== "") {
        $(this).parent("div").removeClass("form-section-focus");
        $(this).parent("div").addClass("form-section-valid");
        $(this).parent("div").addClass("form-section-error");

    } else {
        $(this).parent("div").removeClass("form-section-focus");
        $(this).parent("div").removeClass("form-section-active");
        $(this).parent("div").removeClass("form-section-error");
        $(this).parent("div").removeClass("form-section-valid");
    }
});
$(".address-item-new").click(function () {
    $(".container").css("display", "block");
});
$(".close").click(function () {
    $(".container").css("display", "none");

})