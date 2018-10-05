$(function(){
	$(".section>div>p>span").on("click", (e) => changeFilter($(e.target).closest("span")));
})

function changeFilter(span){
	console.log("run");
	removeFilter();
	let type = span.text().trim();
	span.attr("class", `filter ${type}`);
	span.html(`<i class="fas fa-filter"></i> ${type}`)
}

function removeFilter(){
	let spans = $(".section>div>p>span");
	for(let span of spans){
		$(span).attr("class", "");
		$(span).html($(span).text().trim());
	}

}