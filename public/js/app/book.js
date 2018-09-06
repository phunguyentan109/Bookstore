$(async function(){
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

    $(".addImg").on("click", (e) => $(e.target).closest(".addImg").find(".subUploader")[0].click());

    $("#addNew").on("click", async() => {
    	await resetForm();
    	$("#save").html(`Confirm`);
    	$("#overlay").toggleClass("hide");
    });

    $("#genres").on("click", ".removeSign", (e) => {
    	if(confirm("Remove this genre?")) $(e.target).closest(".removeSign").parents(".wrapGenre").remove()
    });

    $(".fas.fa-file-excel").on("click", (e) => removeSubImg($(e.target).closest(".fas.fa-file-excel").closest(".col-md-4")));
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
			data: book
		});
		await uploadMainImg(newB._id);
		await uploadSubImg(newB._id);
		let newBook = await $.getJSON("/api/book/" + newB._id);
		addRow(newBook);
	} catch(err){
		console.log(err);
	}
}

async function updateBook(bookid, book){
	try{
		await $.ajax({
			method: "PUT",
			url: "/api/book/" + bookid,
			data: book
		});
		await uploadMainImg(bookid);
		await uploadSubImg(bookid);
		let updateData = await $.getJSON("/api/book/" + bookid);
		updateRow(updateData);
	}catch(err){
		console.log(err);
	}
}

async function uploadMainImg(bookid){
	try{
		let imgFile = $("#mainUploader")[0].files[0];
		let fd = new FormData();
		fd.append("bookid", bookid);
		fd.append("image", imgFile);
		
		await $.ajax({
			method: "PUT",
			url: "/api/book/mainImg",
			processData: false,
	    	contentType: false,
	    	cache: false,
			data: fd
		});
	}catch(err){
		console.log(err);
	}
}

async function uploadSubImg(bookid){
	try{
		let fd = new FormData();
		fd.append("bookid", bookid);
		let listImg = getMoreImage();
		let listChanges = getChangesMoreImage();
		for (var i = 0; i < listImg.length; i++) {
			fd.append("subImg", listImg[i]);
		}
		fd.append("changes", JSON.stringify(listChanges));
		await $.ajax({
			method: "PUT",
			url: "/api/book/subImg",
			processData: false,
	    	contentType: false,
	    	cache: false,
			data: fd
		});
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
	var arrMoreImg = Array.from($(".moreImg"));
	for(let i = 0; i < arrMoreImg.length; i++){
		if(i < book.moreImage.length){
			$(arrMoreImg[i]).attr("src", book.moreImage[i]);
			$($(".hasImg")[i]).removeClass("hide");
			$($(".addImg")[i]).addClass("hide");
		} else {
			$(arrMoreImg[i]).attr("src", "");
			$($(".hasImg")[i]).addClass("hide");
			$($(".addImg")[i]).removeClass("hide");	
		}
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
	var arrMoreImg = Array.from($(".moreImg"));
	for(let i = 0; i < 3; i++){
		$(arrMoreImg[i]).attr("src", "");
		if($(".subUploader")[i].files.length > 0)
			$($(".subUploader")[i]).replaceWith($(".subUploader").val('').clone(true));
		$($(".hasImg")[i]).addClass("hide");
		$($(".addImg")[i]).removeClass("hide");
	}
	$("#description").val("");
	$("#amount").val("");
	$("#language").val("");
	$("#publishDate").val("");
	$("#price").val("");
	$("#discount").val("");
	$("#mainUploader").replaceWith($("#mainUploader").val('').clone(true));
}

function isInputValid(){
	return getUpdateGenre().length > 0;
}

function gatherData(){
	if(isInputValid()){
		let mode = $("#save").html();
		if(mode === "Save changes") animateButton("Saving...");
		else animateButton("Creating...");
		let para = $("#description").val().split("\n");
		let book = {
			isbn: $("#isbn").val(),
			name: $("#name").val(),
			author: $("#author").val(),
			price: $("#price").val(),
			discount: $("#discount").val(),
			deliveryFast: $("#delivery").val(),
			supplier: $("#supplier").val(),
			publisher: $("#publisher").val(),
			publishDate: $("#publishDate").val(),
			cover: $("#cover").val(),
			amount: $("#amount").val(),
			language: $("#language").val(),
			description: para,
			genre: JSON.stringify(getUpdateGenre())
		}
		if(mode === "Save changes") updateBook($("#overlayContent").data("content")._id, book);
		else createBook(book);
	} else {
		alert("Please enter valid data to complete!");
	}
}

function updateRow(data){
	let row = $("#overlayContent").data("row");
	let className = data.deliveryFast ? "delivery" : "no-delivery";
	row.find("#imageRow").attr("src", data.image);
	row.find("#nameRow").text(data.name);
	row.find("#isbnRow").text(data.isbn);
	row.find("#authorRow").text(data.author.name);
	row.find("#priceRow").text(data.price);
	row.find("#discountRow").text(data.discount);
	row.find("#deliveryRow").html(`<b>${data.deliveryFast}</b>`);
	row.find("#deliveryRow").attr("class", className);
	row.find("#genreRow").html(getGenre(data.genre));
	row.data("id", data._id);
	row.data("content", data);
	stopAnimateButton("Save changes");
	$("#overlay").toggleClass("hide");
	resetForm();
	
	fillMsg("Update book's information successfully!");
}

function addRow(data){
	let optionCol = `<button class="btn btn-success btn-sm edit">Edit</button>
					<button class="btn btn-danger btn-sm delete">Delete</button>`;
	let row = [`<td class="img"><img src="${data.image}" class="image" id="imageRow"></td>`, data.name, data.isbn, getGenre(data.genre), data.author.name, data.price, data.discount, getDelivery(data.deliveryFast), optionCol];
	$("#bookTable").DataTable().row.add(row).draw();
	prependRow(data);
}

function prependRow(data){
	let table = $("#bookTable").DataTable();
	let length = table.data().length - 1;
	let newRow = table.row(length).data();

	//add css class for newly created row
	$(table.row(length).node()).find("td:nth-child(1)").addClass("img");

	for(let i = length; i > 0; i--){
		let className = $(table.row(i-1).node()).children("td:nth-child(8)").attr("class");
		let temp = table.row(i-1).data();
		let rowID = $(table.row(i-1).node()).data("id");
		let rowContent = $(table.row(i-1).node()).data("content");
		table.row(i-1).data(newRow);
		table.row(i).data(temp);
		$(table.row(i).node()).children("td:nth-child(8)").attr("class", className);
		$(table.row(i).node()).data("id", rowID);
		$(table.row(i).node()).data("content", rowContent);
	}
	let newClass = $(table.row(0).node()).children("td:nth-child(8)").text() === "true" ? "delivery" : "no-delivery"; 
	$(table.row(0).node()).find("td:nth-child(8)").attr("class", newClass);
	$(table.row(0).node()).data("id", data._id);
	$(table.row(0).node()).data("content", data);
	table.page(table.page()).draw(false);

	//finish creating
	stopAnimateButton("Confirm");
	$("#overlay").toggleClass("hide");
	resetForm();
	fillMsg("Create new book successfully!");
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

const getDelivery = (delivery) => delivery ? `<td class="delivery" id="deliveryRow"><b>${delivery}</b></td>` : `<td class="no-delivery" id="deliveryRow"><b>${delivery}</b></td>`;

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

function removeSubImg(imgPlace){
	imgPlace.children(".hasImg").addClass("hide");
	imgPlace.children(".addImg").removeClass("hide");
	imgPlace.children(".hasImg").children(".moreImg").attr("src", "");
	imgPlace.children(".subUploader").replaceWith($(".subUploader").val('').clone(true));
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

function getMoreImage(){
	let fileUpload = Array.from($(".subUploader")).filter(val => val.files.length > 0);
	return fileUpload.map(val => val.files[0]);
}

function getChangesMoreImage(){
	let blob = "blob:";
	let listChanges = Array.from($(".moreImg")).filter(val => $(val).attr("src") !== "" && !$(val).attr("src").includes(blob));
	return listChanges.map(val => $(val).attr("src"));
}

function changeMainImg(){
	const _url = window.URL || window.webkitURL;
	const file = $("#mainUploader")[0].files[0];
	$("#no-image").addClass("hide");
	$("#image").removeClass("hide");
	$("#image").attr("src", _url.createObjectURL(file));
}

function changeSubImg(uploader){
	const _url = window.URL || window.webkitURL;
	const file = $(uploader)[0].files[0];
	$(uploader).parents(".col-md-4").children(".hasImg").children(".moreImg").attr("src", _url.createObjectURL(file));

	$(uploader).parents(".col-md-4").children(".hasImg").removeClass("hide");
	$(uploader).parents(".col-md-4").children(".addImg").addClass("hide");
}