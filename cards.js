$(function() {
    $(".card-wrapper").mousemove(function(event) {
        var card = $(event.target).children();
        var glare = $(card.children()[0]);

        var card_width = card.width();
        var card_height = card.height();

        var card_top = card.offset().top;
        var card_left = card.offset().left;

        var mouse_x_relative = event.pageX - card_left;
        var mouse_y_relative = event.pageY - card_top;

        var mouse_percentage_x = (mouse_x_relative / card_width) * 2 - 1;
        var mouse_percentage_y = (mouse_y_relative / card_height) * 1.2 - 1;

        max_movement = 10;

        card.css({
            transform: "rotateY(" + parseInt(max_movement * mouse_percentage_x) + "deg) rotateX(" + parseInt(max_movement * mouse_percentage_y) + "deg)"
        })

        glare.css({
            transform: "translate(" + (mouse_percentage_x * 100) + "px, " + (mouse_percentage_y * 50) + "px)"

        })

    }) 
});