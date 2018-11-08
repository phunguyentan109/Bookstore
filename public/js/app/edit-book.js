$(function(){
	bindData()
	$("#clickMainUpload").on("click", () => $("#mainUploader").click());
	$("#addGenre").on("click", () => addGenre($("#genreList :selected")));
	$(".genreList").on("click", ".removeSign", (e) => removeGenre($(e.target).closest(".removeSign").parent()));
	$("#uploader").on("click", () => $("#subUploader").click());
	$("#confirm").on("click", () => confirmData());
	$('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
	$('[data-mask]').inputmask();
})

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
async function bindData(){
	let book = await $.getJSON("/api/book/raw/" + HtmlUtil.getUrlId());
	FormUtil.bindObject(".enterBook", book);
	$("#image").attr("src", book.image);
	book.genre.forEach(val => createGenre(val.genre.name, val.genre._id));
	(book.moreImage).forEach(img => createImage(img.url));
}

const hasChildren = (parent, child) => HtmlUtil.showEmpty(parent, child);

function isGenreExist(id){
	let arr = Array.from($(".genreList>span"));
	return arr.map(val => $(val).data("genreid")).includes(id);
}

async function confirmData(){
	let data = gatherData();
	if(data.raw.genre.length > 0){
		beginProgress();
		await updateBook(data);
		window.location.href = "/app/book";
	} else {
		alert("Please select the genre for the book!");
	}
}

async function updateBook(book){
	try{
		let fd = new FormData();
		fd.append("book", JSON.stringify(book.raw));
		fd.append("main", book.img);
		for (var i = 0; i < book.imgs.length; i++) {
			fd.append("sub", book.imgs[i]);
		}
		await $.ajax({method: "PUT", url: "/api/book/" + HtmlUtil.getUrlId(), processData: false, contentType: false, cache: false, data: fd});
	}catch(err){
		console.log(err);
	}
}

function gatherData(){
	let data = FormUtil.getObject(".enterBook");
	data.genre = HtmlUtil.get$data(".genreList>span", "genreid");
	let	image = "";
	if($("#image").data("file")) image = $("#image").data("file"); 
	let	images = HtmlUtil.get$data(".uploading", "file");
	return {raw: data, img: image, imgs : images};
}

function addGenre(genre){
	if(!isGenreExist(genre.val())){
		createGenre(genre.text(), genre.val());
	} else {
		alert("This genre has been added!");
	}
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
	let img = UploadUtil.getUrl("#subUploader");
	createImage(img.url, "uploading", img.detail);
	hasChildren(".rowImage");
}

function createImage(url, upload = "", detail = ""){
	let image = $(`<div class="col-md-1 ${upload}">
		<img src=${url} class="img-responsive">
		</div>`);
	image.data("file", detail);
	$(".rowImage").prepend(image);
	hasChildren(".rowImage");
}

function createGenre(name, id){
	let item = $(`<span>
		<span class="removeSign"><i class="fas fa-times"></i></span>
		<span>${name}</span>
		</span>`);
	item.data("genreid", id);
	$(".genreList").append(item);
	hasChildren(".genreList");
}

function removeGenre(genre){
	if(confirm("Remove this genre?")) genre.remove();
	hasChildren(".genreList");
}

function beginProgress(){
	HtmlUtil.animateBtn("#confirm");
	HtmlUtil.disableBtn("a", "#uploader", "#clickMainUpload", "#addGenre");
}