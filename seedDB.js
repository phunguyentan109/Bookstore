var db = require("./models"),
	passport = require("passport"),
	LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());	

var bookList = [
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1533973343/book15.jpg",
		name: "The Fault In Our Stars",
		isbn: "0062409859",
		price: "28.08",
		discount: "20",
		discountPrice: "60000",
		rating: "5",
		pageNumber: "278",
		cover: "Paperpack",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		moreImage: [
			"https://res.cloudinary.com/kyle1998/image/upload/v1535407823/book15Back.jpg", 
			"https://res.cloudinary.com/kyle1998/image/upload/v1535407828/book15Page.jpg"
		],
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531521/book14.jpg",
		name: "And Then There Were None",
		isbn: "0062409859",
		price: "30",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531479/book2.jpg",
		name: "A Brave New World",
		isbn: "0062409859",
		price: "45",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531483/book3.jpg",
		name: "The Ultimate Hihitchker's Guide To The Galaxy",
		isbn: "0062409859",
		price: "60",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531495/book4.jpg",
		name: "Nineteen Eighty Four",
		isbn: "0062409859",
		price: "20",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531500/book5.jpg",
		name: "Farenheit 451",
		isbn: "0062409859",
		price: "40",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531502/book6.jpg",
		name: "The Hunger Games",
		isbn: "0062409859",
		price: "35",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531512/book8.jpg",
		name: "The Complete Sherlock Holmes",
		isbn: "0062409859",
		price: "32",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531514/book9.jpg",
		name: "Everything, Everything",
		isbn: "0062409859",
		price: "43",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531516/book10.jpg",
		name: "Dune",
		isbn: "0062409859",
		price: "48",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531517/book11.jpg",
		name: "Journey To The Center Of The Earth",
		isbn: "0062409859",
		price: "56",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531518/book12.jpg",
		name: "The Fellowship Of The Ring",
		isbn: "0062409859",
		price: "38",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531518/book13.jpg",
		name: "So You Don't Get Lost In The Neighborhood",
		isbn: "0062409859",
		price: "27",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: true,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1536068374/book1.jpg",
		name: "Go Set A Watchman",
		isbn: "0062409859",
		price: "24",
		discount: "20",
		discountPrice: "60000",
		rating: "5",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "14/6/2015",
		language: "English",
		deliveryFast: false,
		amount: 10,
		description: [
			"Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.",
			"Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love."
		]
	}
];

var genreList = [
	{
		name: "Young Adult Fiction",
		description: ""
	},
	{
		name: "Crime",
		description: ""
	},
	{
		name: "Mystery",
		description: ""
	},
	{
		name: "Psychological Thriller",
		description: ""
	},
	{
		name: "Horror Fiction",
		description: ""
	},
	{
		name: "Science Fiction",
		description: ""
	},
	{
		name: "Dystopian-Utopian Fiction",
		description: ""
	},
	{
		name: "Comedy Science Fiction",
		description: ""
	},
	{
		name: "Social Science Fiction",
		description: ""
	},
	{
		name: "Political Fiction",
		description: ""
	},
	{
		name: "Adventure Fiction",
		description: ""
	},
	{
		name: "Fiction",
		description: ""
	},
	{
		name: "Soft Science Fiction",
		description: ""
	},
	{
		name: "Conspiracy Fiction",
		description: ""
	},
	{
		name: "Planetary Romance",
		description: ""
	},
	{
		name: "Fantasy Fiction",
		description: ""
	},
	{
		name: "Military Science Fiction",
		description: ""
	},
	{
		name: "Psychological Fiction",
		description: ""
	},
	{
		name: "Literary Fiction",
		description: ""
	},
	{
		name: "Historical Fiction",
		description: ""
	}
];

var authorList = [
	{
		image: "",
		name: "John Green",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Agatha Christie",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Aldous Huxley",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Douglas Adam",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "George Orwell",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Ray Bradbury",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Suzanne Collins",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Conan Doyle",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Nicola Yoon",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Frank Herbert",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Jules Verne",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "J. R. R. Tolkien",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Patrick Modiano",
		description: "",
		follower: 0
	},
	{
		image: "",
		name: "Harper Collins",
		description: "",
		follower: 0
	}
];

const supplierList = [
	{
		name: "Baker & Taylor",
		description: ""
	},
	{
		name: "Publisher Group West",
		description: ""
	},
	{
		name: "America West Books",
		description: ""
	},
	{
		name: "Independent Publishers Group",
		description: ""
	}
];

const publisherList = [
	{
		name: "Pearson",
		description: ""
	},
	{
		name: "Read Elsevier",
		description: ""
	},
	{
		name: "Thompson Reuters",
		description: ""
	},
	{
		name: "Random House",
		description: ""
	}
]

var supplierOne = {
	name: "Bella Distribution",
	description: ""
}

var pubOne = {
	name: "HarperCollins",
	description: ""
}

var customerList = [
	{
		username: "tuan",
		email: "tuan@gmail.com",
		viewname: "Tuan Minh",
		address: "224 Pham Van Chi",
		city: "Ho Chi Minh",
		country: "Vietnam",
		role: 1
	},
	{
		username: "phu",
		email: "kyleharris815490@gmail.com",
		viewname: "Phu Nguyen",
		address: "113 Truong Quang Trong",
		city: "Quang Ngai",
		country: "Vietnam",
		role: 1
	},
	{
		username: "nam",
		email: "nam@gmail.com",
		viewname: "Nam Lam",
		address: "325 Hai Ba Trung",
		city: "Vo Tung",
		country: "Vietnam",
		role: 1
	}
]

async function loadData(){
	try{
		// deleteMany & add books
		await db.Publisher.deleteMany({}).exec();
		await db.Supplier.deleteMany({}).exec();
		await db.Comment.deleteMany({}).exec();
		await db.Book.deleteMany({}).exec();
		await db.Author.deleteMany({}).exec();
		await db.Supplier.deleteMany({}).exec();
		await db.Publisher.deleteMany({}).exec();
		await db.User.deleteMany({}).exec();
		await db.Cart.deleteMany({}).exec();
		await db.Genre.deleteMany({}).exec();
		await db.BookGenre.deleteMany({}).exec();

		await createGenre();
		console.log("DONE LOADING GENRE DATA");
		
		await createSupplier();
		console.log("DONE LOADING SUPPLIER DATA");

		await createPublisher();
		console.log("DONE LOADING PUBLISHER DATA");

		// add book
		var newSup = await db.Supplier.create(supplierOne);
		var newPub = await db.Publisher.create(pubOne);
		for(let i = 0; i < bookList.length; i++){
			var newbook = await db.Book.create(bookList[i]);
			var newAuthor = await db.Author.create(authorList[i]);
			newbook.author = newAuthor._id;
			newbook.supplier = newSup._id;
			newbook.publisher = newPub._id;
			newbook.save();
		};
		console.log("DONE LOADING BOOK DATA");

		//Create Admin
		await createAdmin();
		console.log("DONE LOADING ADMIN DATA");

		//Create Customer
		await createCustomer();
		console.log("DONE LOADING CUSTOMER DATA");

		await loadGenreBook();
		console.log("DONE LOADING BOOK-GENRE DATA");
		console.log("#=== THE APP'S READY TO WORK! ===#");
	} catch(err){
		console.log(err);
	}
}

async function createAdmin(){
	var newAdmin = new db.User({username: "admin", email: "admin", viewname: "Jesus", role: 0});
	await db.User.register(newAdmin, "admin");
}

async function createCustomer(){
	for(let cust of customerList){
		let address = {
			receiver: cust.viewname,
			address: cust.address,
			city: cust.city,
			country: cust.country
		}
		let newAddress = await db.Address.create(address);
		let newCustomer = await db.User.register(cust, cust.username);
		newCustomer.otherAddress.push(newAddress._id);
		newCustomer.save();
	}
}

async function createSupplier(){
	for(let val of supplierList){
		await db.Supplier.create(val);
	}
}

async function createPublisher(){
	for(let val of publisherList){
		await db.Publisher.create(val);
	}
}

async function createGenre(){
	for(let val of genreList){
		await db.Genre.create(val);
	}
}

async function loadGenreBook(){
	var data = await db.Book.find({}).exec();
	for(var val of data){
		if(val.name == "The Fault In Our Stars"){
			var genre = await db.Genre.findOne({name: "Young Adult Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "And Then There Were None"){
			var genre = await db.Genre.findOne({name: "Crime"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Mystery"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Psychological Thriller"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Horror Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "A Brave New World"){
			var genre = await db.Genre.findOne({name: "Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Dystopian-Utopian Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "The Ultimate Hihitchker's Guide To The Galaxy"){
			var genre = await db.Genre.findOne({name: "Comedy Science Fiction"});
			doLink(val.id, genre._id);
		}

		if(val.name == "Nineteen Eighty Four"){
			var genre = await db.Genre.findOne({name: "Social Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Political Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Dystopian-Utopian Fiction"});
			doLink(val._id, genre._id)
		}

		if(val.name == "Farenheit 451"){
			var genre = await db.Genre.findOne({name: "Dystopian-Utopian Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "The Hunger Games"){
			var genre = await db.Genre.findOne({name: "Adventure Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Dystopian-Utopian Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "The Complete Sherlock Holmes"){
			var genre = await db.Genre.findOne({name: "Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Mystery"});
			doLink(val._id, genre._id);			
		}

		if(val.name == "Everything, Everything"){
			var genre = await db.Genre.findOne({name: "Young Adult Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "Dune"){
			var genre = await db.Genre.findOne({name: "Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Adventure Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Soft Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Conspiracy Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Planetary Romance"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Fantasy Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Military Science Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "Journey To The Center Of The Earth"){
			var genre = await db.Genre.findOne({name: "Science Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Adventure Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "The Fellowship Of The Ring"){
			var genre = await db.Genre.findOne({name: "Fantasy Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "So You Don't Get Lost In The Neighborhood"){
			var genre = await db.Genre.findOne({name: "Mystery"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Psychological Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Literary Fiction"});
			doLink(val._id, genre._id);
		}

		if(val.name == "Go Set A Watchman"){
			var genre = await db.Genre.findOne({name: "Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Literary Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Historical Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Political Fiction"});
			doLink(val._id, genre._id);
			genre = await db.Genre.findOne({name: "Adventure Fiction"});
			doLink(val._id, genre._id);		
		}	
	};
}

function doLink(bookid, genreid){
	db.BookGenre.create({book: bookid, genre: genreid});	
}

module.exports = loadData;