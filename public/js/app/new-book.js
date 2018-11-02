$(function(){
	$("#clickMainUpload").on("click", () => $("#mainUploader").click());
	$("#addGenre").on("click", () => addGenre($("#genreList :selected")));
	$(".genreList").on("click", ".removeSign", (e) => removeGenre($(e.target).closest(".removeSign").parent()));
	$("#uploader").on("click", () => $("#subUploader").click());
	$("#confirm").on("click", () => confirmData());
})

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
const hasChildren = (parent, child) => HtmlUtil.showEmpty(parent, child);

function isGenreExist(id){
	let arr = Array.from($(".wrapGenre"));
	return arr.map(val => $(val).data("genreid")).includes(id);
}

async function confirmData(){
	let data = gatherData();
	if(data.raw.genre.length > 0){
		beginProgress();
		await storeBook(data);
		window.location.href = "/app/book";
	} else {
		alert("Please select the genre for the book!");
	}
}

async function storeBook(book){
	try{
		let fd = new FormData();
		fd.append("book", JSON.stringify(book.raw));
		fd.append("main", book.img);
		for (var i = 0; i < book.imgs.length; i++) {
			fd.append("sub", book.imgs[i]);
		}
		await $.ajax({method: "POST", url: "/api/book", processData: false, contentType: false, cache: false, data: fd});
	}catch(err){
		console.log(err);
	}
}

function gatherData(){
	let data = FormUtil.getObject(".enterBook");
	data.genre = HtmlUtil.get$data(".genreList>span", "genreid");
	let	image = $("#image").data("file"); 
	let	images = HtmlUtil.get$data(".uploading", "file");
	return {raw: data, img: image, imgs : images};
}

//==================================================================================
// DRAW INTERFACE
//==================================================================================
function changeMainImg(){
	$("#no-image").addClass("hide");
	$("#image").removeClass("hide");
	let image = UploadUtil.getUrl("#mainUploader");
	$("#image").attr("src", image.url);
	$("#image").data("file", image.detail);
}

function addSubImg(){
	createImage(UploadUtil.getUrl("#subUploader"));
	hasChildren(".rowImage");
}

function createImage(file){
	let image = $(`<div class="col-md-1 uploading">
		<img src=${file.url} class="img-responsive">
		</div>`);
	image.data("file", file.detail);
	$(".rowImage").prepend(image);
}

function addGenre(genre){
	if(!isGenreExist(genre.val())){
		let item = $(`<span>
			<span class="removeSign"><i class="fas fa-times"></i></span>
			<span>${genre.text()}</span>
			</span>`);
		item.data("genreid", genre.val());
		$(".genreList").append(item);
		hasChildren(".genreList");
	} else {
		alert("This genre has been added!");
	}
}

function removeGenre(genre){
	if(confirm("Remove this genre?")) genre.remove();
	hasChildren(".genreList");
}

function beginProgress(){
	HtmlUtil.animateBtn("#confirm");
	HtmlUtil.disableBtn("a", "#uploader", "#clickMainUpload", "#addGenre");
}