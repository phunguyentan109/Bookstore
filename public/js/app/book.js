$(async function(){
	// resetForm();
	$('.select2').select2();

	var list = await getBooks();
	if(list.length > 0) list.forEach(val => $("tbody").prepend(createRow(val)));
	$('#bookTable').DataTable();

	$("tbody").on("click", ".edit", async(e) => {
		await resetForm();
		$("#save").html(`Save changes`);
		fillData($(e.target).closest(".edit").parents("tr"));
	});

	$("tbody").on("click", ".delete", (e) => {
		if(confirm("Do you want to remove this book's data?")) deleteBook($(e.target).closest(".delete").parents("tr"))
	});
	$("#cancel").on("click", async() => {
		$("#overlay").toggleClass("hide");
		await resetForm();
	});

	$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })
    $("#addGenre").on("click", () => createGenreOption($("#genreList :selected").text(), $("#genreList :selected").val()));

    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
    $('[data-mask]').inputmask();

    $("#save").on("click", () => gatherData());

    $("#clickMainUpload").on("click", () => $("#mainUploader").click());

    $("#addNew").on("click", async() => {
    	await resetForm();
    	$("#save").html(`Confirm`);
    	$("#overlay").toggleClass("hide");
    });

    $("#genres").on("click", ".removeSign", (e) => {
    	if(confirm("Remove this genre?")) $(e.target).closest(".removeSign").parents(".wrapGenre").remove()
    });
})

//==================================================================================
// GET JSON DATA
//==================================================================================
const getBooks = async() => await $.getJSON("/api/book");
const getAuthors = async() => await $.getJSON("/api/author");
const getGenres = async() => await $.getJSON("/api/genre");
const getSuppliers = async() => await $.getJSON("/api/supplier");
const getPublishers = async() => await $.getJSON("/api/publisher");

//==================================================================================
// CALL AJAX 
//==================================================================================
async function createBook(book){
	try{
		var newB = await $.ajax({
			method: "POST",
			url: "/api/book/new",
			processData: false,
			contentType: false,
			data: book
		});
		let newBook = await $.getJSON("/api/book/" + newB._id);
		console.log(newBook);
	} catch(err){
		console.log(err);
	}
}

async function updateBook(bookid, book){
	try{
		await $.ajax({
			method: "PUT",
			url: "/api/book/" + bookid,
			processData: false,
	    	contentType: false,
			data: book
		});
		let updateData = await $.getJSON("/api/book/" + bookid);
		console.log(updateData);
		updateRow(updateData);
	}catch(err){
		console.log(err);
	}
}

async function deleteBook(book){
	try{
		let del = await $.ajax({
			method: "DELETE",
			url: "/api/book/" + book.data("id")
		});
		console.log(del);
		$('#bookTable').DataTable().row(book).remove().draw(true);
		fillMsg("Delete book's information successfully!", "far fa-trash-alt");
	}catch(err){
		console.log(err);
	}
}

//==================================================================================
// WORKING WITH DATA ON FRONTEND 
//==================================================================================
async function fillData(row){
	var book = row.data("content");
	$("#overlayContent").data("row", row);
	
	//bind data
	$("#overlayContent").data("content", book);
	$("#isbn").val(book.isbn);
	$("#name").val(book.name);
	if(book.image !== ""){
		$("#image").attr("src", book.image);
		$("#image").removeClass("hide");
		$("#no-image").addClass("hide");
	}
	$("#author").val(book.author._id);
	book.genre.forEach(val => createGenreOption(val.genre.name, val.genre._id));
	$("#price").val(book.price);
	$("#discount").val(book.discount);
	$("#supplier").val(book.supplier._id);
	$("#publisher").val(book.publisher._id);
	$("#publishDate").val(book.publishDate);
	var des = book.description.reduce((acc, next) => acc += ("\n" + next));
	$("#description").val(des);
	$("#delivery").val(book.deliveryFast + "");
	$("#cover").val(book.cover);
	$("#amount").val(book.amount);
	$("#language").val(book.language);
	$("#addImg").empty();
	for(let i = 0; i < book.moreImage.length; i++){
		$("#addImg").append(`<div class="col-md-4">
								<div class="hasImg">
									<img src=${book.moreImage[i]} class="moreImg">
									<div class="opaBG"></div>
									<i class="fas fa-file-excel"></i>
								</div>
							</div>`);
	}
	for(let i = 0; i < 3 - book.moreImage.length; i++){
		$("#addImg").append(`<div class="col-md-4">
								<div class="addImg">
									<i class="fas fa-plus-circle addMoreImg"></i>
								</div>
							</div>`);
	}
	$("#overlay").toggleClass("hide");
}

async function resetForm(){
	$("#isbn").val("");
	$("#name").val("");
	$("#image").attr("src", "");
	$("#image").addClass("hide");
	$("#no-image").removeClass("hide");
	$("#author").empty();
	(await getAuthors()).forEach(val => {
		auth = $(`<option value="${val._id}">${val.name}</option>`);
		$("#author").append(auth);
	});
	$("#genres").empty();
	$("#genreList").empty();
	(await getGenres()).forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#genreList").append(item);
	});
	$("#supplier").empty();
	(await getSuppliers()).forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#supplier").append(item);
	})
	$("#publisher").empty();
	(await getPublishers()).forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#publisher").append(item);
	})
	$("#addImg").empty();
	for(let i = 0; i < 3; i++){
		$("#addImg").append(`<div class="col-md-4">
								<div class="addImg">
									<i class="fas fa-plus-circle addMoreImg"></i>
								</div>
							</div>`);
	}
	$("#description").val("");
	$("#amount").val("");
	$("#language").val("");
	$("#publishDate").val("");
	$("#price").val("");
	$("#discount").val("");
	$("#mainUploader").replaceWith($("#mainUploader").val('').clone(true));
}

function gatherData(){
	let mode = $("#save").html();
	if(mode === "Save changes") animateButton("Saving...");
	else animateButton("Creating...");
	let para = $("#description").val().split("\n");
	let fd = new FormData();
	let old = $("#overlayContent").data("content");
	fd.append("book[isbn]", $("#isbn").val());
	fd.append("book[name]", $("#name").val());
	fd.append("book[author]", $("#author").val());
	fd.append("book[price]", $("#price").val());
	fd.append("book[discount]", $("#discount").val());
	fd.append("book[deliveryFast]", $("#delivery").val());
	fd.append("book[supplier]", $("#supplier").val());
	fd.append("book[publisher]", $("#publisher").val());
	fd.append("book[publishDate]", $("#publishDate").val());
	fd.append("book[cover]", $("#cover").val());
	fd.append("book[amount]", $("#amount").val());
	fd.append("book[language]", $("#language").val());
	fd.append("book[description]", para);
	fd.append("image", $("#mainUploader")[0].files[0]);
	fd.append("genre", JSON.stringify(getUpdateGenre()));
	if(mode === "Save changes") updateBook($("#overlayContent").data("content")._id, fd);
	else createBook(fd);
}

function updateRow(data){
	let row = $("#overlayContent").data("row");
	row.find("#imageRow").attr("src", data.image);
	row.find("#nameRow").text(data.name);
	row.find("#isbnRow").text(data.isbn);
	row.find("#authorRow").text(data.author.name);
	row.find("#priceRow").text(data.price);
	row.find("#discountRow").text(data.discount);
	row.find("#deliveryRow").text(data.deliveryFast);
	row.find("#genreRow").html(getGenre(data.genre));
	row.data("id", data._id);
	row.data("content", data);
	stopAnimateButton("Save changes");
	$("#overlay").toggleClass("hide");
	resetForm();
	
	fillMsg("Update book's information successfully!");
}

//==================================================================================
// DRAW HTML 
//==================================================================================
function createRow(book){
	var row = $(`<tr>
					<td class="img"><img src="${book.image}" class="image" id="imageRow"></td>
					<td id="nameRow">${book.name}</td>
					<td id="isbnRow">${book.isbn}</td>
					<td id="genreRow">${getGenre(book.genre)}</td>
					<td id="authorRow">${book.author.name}</td>
					<td id="priceRow">${book.price}</td>
					<td id="discountRow">${book.discount}</td>
					${getDelivery(book.deliveryFast)}
					<td>
						<button class="btn btn-success btn-sm edit">Edit</button>
						<button class="btn btn-danger btn-sm delete">Delete</button>
					</td>
				</tr>`);
	row.data("id", book._id);
	row.data("content", book);
	return row;
}

const getDelivery = (delivery) => delivery ? `<td class="delivery"><b>${delivery}</b></td>` : `<td class="no-delivery"><b>${delivery}</b></td>`;

function createGenreOption(name, id){
	if(!getUpdateGenre().includes(id)){
		let item = $(`<span class="wrapGenre">
						<span class="removeSign" id="removeSign"><i class="fas fa-times"></i></span>
						<span class="genreName">${name}</span>
					</span>`);
		item.data("genreid", id);
		$("#genres").append(item);
	} else {
		alert("This genre has been added!");
	}
}

function animateButton(btnName){
	$("#save").attr("disabled", true);
	$("#cancel").attr("disabled", true);
	$("#save").html(`<i class="fa fa-spinner fa-spin"></i> ${btnName}`);
}

function stopAnimateButton(btnName){
	$("#save").attr("disabled", false);
	$("#cancel").attr("disabled", false);
	$("#save").html(btnName);
}

//==================================================================================
// SUPPORT METHODS 
//==================================================================================
function getGenre(genre){
	return genre.reduce((acc, next, index) => {
		acc += next.genre.name;
		if(index != 0 && index != genre.length - 1 && index % 2 == 0)
			acc += "<br>/ "
		else if(index != genre.length - 1)
			acc += " / ";
		return acc;
	}, "");
}

function getUpdateGenre(){
	let arr = Array.from($(".wrapGenre"));
	return arr.map(val => $(val).data("genreid"));
}

function changeMainImg(){
	const _url = window.URL || window.webkitURL;
	const file = $("#mainUploader")[0].files[0];
	$("#no-image").addClass("hide");
	$("#image").removeClass("hide");
	$("#image").attr("src", _url.createObjectURL(file));
}