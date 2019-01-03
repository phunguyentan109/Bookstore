$(function(){
    loadOrder();
})

function loadOrder() {
    $("#orderTable").DataTable({
        ajax: {
            url: "/api/order",
            dataSrc: (data) => Array.from(data).reverse()
        },
        columns: [
            {
                data: "_id",
                render: (data) => {
                    return `#${data}`;
                }
            },
            {data: "receiver"},
            {data: "dateCreated"},
            {data: "money"},
            {data: "status"},
            {
				render: () => `<button class="btn btn-success btn-sm edit">Cancelled</button>
							<button class="btn btn-danger btn-sm delete">Completed</button>`
			}
        ]
    })
}
