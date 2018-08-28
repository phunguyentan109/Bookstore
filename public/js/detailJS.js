$(function(){
	$(".btn-watched").on("click", function(){
		$(".each-watched").toggleClass("hide-watched");
	});

	$("#writeCmt").on("click", () => {
		$("#cmtInput").toggleClass("hideInput");
		$("#avaImg").toggleClass("hideInput");
		$("#placeWrite").toggleClass("hideInput");
		$("#writeCmt").hide();
	});

	$("#cancel").on("click", () => {
		$("#cmtInput").toggleClass("hideInput");
		$("#avaImg").toggleClass("hideInput");
		$("#placeWrite").toggleClass("hideInput");
		$("#writeCmt").show();
	});

	onEvent();

	$("#send").on("click", () => {
		storeComment($("#rateVal").text(), $("#titleValue").val(), $("#reviewValue").val())
		.then(val => showComment(val));
	})
})

function getID() {
	let url = window.location.pathname;  
	return url.substring((url).lastIndexOf("/")+1, url.length);
}

function hoverRate(star){
	let stars = Array.from($(".uncheck"));
	$(stars.filter((val, index) => index <= Number(star))).toggleClass("uncheck");
	$("#rateVal").text(Number(star)+1);
	$("#rateColor").attr("class", "rated");
}

function removeRate(){
	$(".uncheck").removeClass("uncheck");
	$(".check").addClass("uncheck");
	$("#rateColor").attr("class", "noRate");
	$("#rateVal").text("0");
	onEvent();
}

function onEvent(){
	$(".check").on("click", (e) => getRate($(e.target).closest(".check").attr("id")[1]));

	$(".uncheck")
	.on("mouseover", (e) => hoverRate($(e.target).closest(".uncheck").attr("id")[1]))
	.on("mouseleave", () => removeRate());
}

function eraseInput(){
	removeRate();
	$("#titleValue").val("");
	$("#reviewValue").val("");
}

function getRate(star){
	$(".check")
	.off("mouseover")
	.off("mouseleave")
	.off("click");
}

async function storeComment(rate, title, review){  
  try{
  	return await $.post("/api/comment/new", {bookID: getID(), cmtTitle: title, rating: rate, reviews: review});
  } catch(err) {
  	console.log(err);
  }
}

function showComment(data){
	let rate = Number($("#rateVal").text());
	var starList = "";
	for(let i = 0; i < 5; i++){
		if(i < rate)
			starList += `<i class="fas fa-star get"></i>`;
		else
			starList += `<i class="fas fa-star not"></i>`;	 
	}
	console.log(starList);
	let newComment = $(`<div class="col-md-1 text-center ava">
							<i class="fas fa-book-reader readerImg"></i>
						</div>
						<div class="col-md-10 commentator">
							<div class="cmtInfo">
								<p><b>${data.user.username}</b> has rated it ${starList}
								</p>
								<p class="time">Feb 10th, 2016</p>	
							</div>
							<h4><b>${$("#titleValue").val()}</b></h4>
							<p class="review">${$("#reviewValue").val()}</p>
							<span class="useful">This review is useful, isn't it?</span><button class="thanks"><i class="far fa-thumbs-up"></i> Likes (10)</button>
						</div>`);
	$("#listCmt").prepend(newComment);
	eraseInput();
	$("#noReview").hide();
}