$(async function(){
	loadBook();
	$("tbody").on("click", ".delete", (e) => {
		if(confirm("Do you want to remove this book's data?"))
			deleteBook($(e.target).closest(".delete").parents("tr"));
	});
	$("tbody").on("click", ".edit", (e) => updateBook($(e.target).closest(".edit").parents("tr")));
})

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
function loadBook(){
	$("#bookTable").DataTable({
		ajax: {
			url: "/api/book",
			dataSrc: (data) => Array.from(data).reverse()
		},
		columns: [
			{
				data: "image",
				render: (data) => `<img src="${data}" class="image" id="imageRow">`
			},
			{data: "name"},
			{data: "isbn"},
			{
				data: "genre",
				render: (data) => getGenre(data)
			},
			{data: "author.name"},
			{data: "price"},
			{data: "discount"},
			{data: "deliveryFast"},
			{
				render: () => `<button class="btn btn-success btn-sm edit">Edit</button>
							<button class="btn btn-danger btn-sm delete">Delete</button>`
			}
		],
		columnDefs: [
			{
				targets: 0,
				createdCell:  (td) => $(td).attr("class", "img")
			},
			{
				targets: 7,
				createdCell: (td, cellData) => {
					if(cellData) $(td).addClass("delivery");
					else $(td).addClass("no-delivery");
				}
			}
		],
		order: [],
		createdRow: (row, data, index) => $(row).data("id", data._id)
	});
}

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


async function deleteBook(book){
	try{
		await $.ajax({method: "DELETE", url: "/api/book/" + book.data("id")});
		$("#bookTable").DataTable().ajax.reload();
		console.log("run");
	}catch(err){
		console.log(err);
	}
}

const updateBook = (book) => window.location.href = "/app/book/" + book.data("id");