$('.owl-carousel').owlCarousel({
    items:1,
    loop:true,
    margin:10,
    nav:false,
    dots: true
})

$(document).ready(function(){
  $('.owl-carousel').owlCarousel();
});

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
