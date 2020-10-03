$(document).ready(function() {

// Start your code from here
let temas = ["FIFA", "Warzone", "Fortnite", "Avengers","Fall Guys"];
loadTemas();

function loadTemas(){
    for(var i = 0; i < temas.length; i++){
        $("#theme-buttons").append(`<button id="filter-btn" value="${temas[i]}">${temas[i]}</button>`);
    }
}

$("#gif-form").on("click", "#add-button", function(event){
    event.preventDefault();
    $("#theme-buttons").html("");
    temas.push($("#gif-input").val());
    loadTemas();
})

$("#theme-buttons").on("click", "#filter-btn",function(event) {
    event.preventDefault();
    $("#results").html("");

    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=qt0L6L2vHncZzpvxQW8WZllNsrKzqvnD&limit=10`,
        success: function(data) {
            data.data.forEach(element => {
                console.log(this.value);
                var gifContainer = $(`<div id = "gif-container"></div>`);
                var gif = $("<img>");
                gif.attr("src", element.images.fixed_height_still.url);
                gif.attr("data-animacion", element.images.fixed_height.url);
                gif.attr("data-still",element.images.fixed_height_still.url);
                gif.attr("data-enMovimiento", "no");
                gif.addClass("gif-item");
                gifContainer.append(`<p> Rating: ${element.rating}</p>`);
                gifContainer.append(gif);
                $("#results").append(gifContainer);
            });
        },
        error: function() {
            console.log("No se recupero la data");
        }
    });
})

$("body").on("click",".gif-item", function(event){

    var enMovimiento = $(this).attr("data-enMovimiento");

    if( enMovimiento === "no") {
        $(this).attr("src", $(this).attr("data-animacion"));
        $(this).attr("data-enMovimiento", "si");
        
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-enMovimiento", "no");
    }
})

});
