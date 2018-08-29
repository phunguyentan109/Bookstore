$(async function(){
	$('.select2').select2();

	var list = await getBooks();
	if(list.length > 0) list.forEach(val => createBook(val));
	$('#example2').DataTable();

	$("tbody").on("click", ".edit", (e) => {
		fillData($(e.target).closest(".edit").parents("tr").data("content"))
	});
	$("#cancel").on("click", () => $("#overlay").toggleClass("hide"));

	$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })
    $("#addGenre").on("click", () => createGenreOption($("#genreList :selected").text()));

    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' });
    $('[data-mask]').inputmask();
})

const getBooks = async() => await $.getJSON("../api/book");

function createBook(book){
	if(book.deliveryFast){
		var delivery = `<td class="delivery"><b>${book.deliveryFast}</b></td>`
	} else {
		var delivery = `<td class="no-delivery"><b>${book.deliveryFast}</b></td>`
	}
	var genre = book.genre.reduce((acc, next, index) => {
		acc += next.genre.name;
		if(index != 0 & index != book.genre.length - 1 && index % 2 == 0)
			acc += "<br>/ "
		else if(index != book.genre.length - 1)
			acc += " / ";
		return acc;
	}, "");
	var row = $(`<tr>
					<td class="img"><img src="${book.image}" class="image"></td>
					<td>${book.name}</td>
					<td>${genre}</td>
					<td>${book.author.name}</td>
					<td>${book.price}</td>
					<td>${book.discount}</td>
					${delivery}
					<td>
						<button class="btn btn-success btn-sm edit">Edit</button>
						<button id="delete" class="btn btn-danger btn-sm">Delete</button>
					</td>
				</tr>`);
	row.data("id", book._id);
	row.data("content", book);
	$("tbody").prepend(row);
}

async function fillData(book){
	//bind data
	$("#isbn").val(book.isbn);
	$("#name").val(book.name);
	$("#image").attr("src", book.image);
	const authors = await getAuthors();
	authors.forEach(val => {
		auth = $(`<option value="${val._id}">${val.name}</option>`);
		$("#author").append(auth);
	});
	$("#author").val(book.author._id);
	$("#genres").empty();
	book.genre.forEach(val => createGenreOption(val.genre.name));
	const genres = await getGenres();
	genres.forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#genreList").append(item);
	});
	$("#price").val(book.price);
	$("#discount").val(book.discount);
	(await getSuppliers()).forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#supplier").append(item);
	})
	$("#supplier").val(book.supplier._id);
	(await getPublishers()).forEach(val => {
		let item = $(`<option value=${val._id}>${val.name}</option>`);
		$("#publisher").append(item);
	})
	$("#publisher").val(book.publisher._id);
	$("#publishDate").val(book.publishDate);
	var des = book.description.reduce((acc, next) => acc += (next.content + "\n"), "");
	$("#description").val(des);
	$("#delivery").val(book.deliveryFast);
	$("#cover").val(book.cover);
	$("#amount").val(book.amount);
	$("#language").val(book.language);	
	$("#overlay").toggleClass("hide");
}

function createGenreOption(genre){
	let item = $(`<span class="wrapGenre">
					<span class="removeSign"><i class="fas fa-times"></i></span>
					<span class="genreName">${genre}</span>
				</span>`);
	$("#genres").append(item);
}

const getAuthors = async() => await $.getJSON("../api/author");
const getGenres = async() => await $.getJSON("../api/genre");
const getSuppliers = async() => await $.getJSON("../api/supplier");
const getPublishers = async() => await $.getJSON("../api/publisher");