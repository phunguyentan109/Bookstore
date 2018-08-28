$(async function(){
	$('.select2').select2();

	var list = await getBooks();
	if(list.length > 0) list.forEach(val => createBook(val));
	$('#example2').DataTable();

	$(".edit").on("click", (e) => {
		fillData($(e.target).closest(".edit").parents("tr").data("content"))
	});
	$("#cancel").on("click", () => $("#overlay").toggleClass("hide"));

	$('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })

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
	var authors = await getAuthors();
	authors.forEach(val => {
		auth = $(`<option value="${val._id}">${val.name}</option>`);
		$("#author").append(auth);
	});
	$("#author").val(book.author._id);
	$("#genres").empty();
	book.genre.forEach(val => {
		var item = $(`<span class="wrapGenre">
						<span class="removeSign"><i class="fas fa-times"></i></span>
						<span class="genreName">${val.genre.name}</span>
					</span>`);
		item.data("id", val.genre._id);
		$("#genres").append(item);
	})

	$("#overlay").toggleClass("hide");
}

const getAuthors = async() => await $.getJSON("../api/author");