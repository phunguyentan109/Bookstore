var mongoose = require("mongoose");
var Book = require("./models/bookModel");

var bookList = [
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528526079/qjn5w9qvkmoyrnfmyhgr.jpg",
		name: "Murder On The Orient Express",
		author: "Agatha Christie",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "60000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531521/book14.jpg",
		name: "And Then There Were None",
		author: "Agatha Christie",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531479/book2.jpg",
		name: "A Brave New World",
		author: "Aldous Huxley",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531483/book3.jpg",
		name: "The Ultimate Hihitchker's Guide To The Galaxy",
		author: "Douglas Adam",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531495/book4.jpg",
		name: "Nineteen Eighty Four",
		author: "George Orwell",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531500/book5.jpg",
		name: "Farenheit 451",
		author: "Ray Bradbury",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531502/book6.jpg",
		name: "The Hunger Games",
		author: "Suzanne Collins",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531512/book8.jpg",
		name: "The Complete Sherlock Holmes",
		author: "Conan Doyle",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531514/book9.jpg",
		name: "Everything, Everything",
		author: "Nicola Yoon",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531516/book10.jpg",
		name: "Dune",
		author: "Frank Herberts",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531517/book11.jpg",
		name: "Journey To The Center Of The Earth",
		author: "Jules Verne",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531518/book12.jpg",
		name: "The Fellowship Of The Ring",
		author: "J.R.R. Tolkien",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528531518/book13.jpg",
		name: "So You Don't Get Lost In The Neighborhood",
		author: "Patrick Modiano",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "70000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	},
	{
		image: "https://res.cloudinary.com/kyle1998/image/upload/v1528524059/t2djtqki9wroko3to3cx.jpg",
		name: "Go Set A Watchman",
		author: "Harper Lee",
		isbn: "0062409859",
		price: "85000",
		discount: "20",
		discountPrice: "60000",
		rating: "5",
		publisher: "HarperCollins",
		pageNumber: "278",
		cover: "Hardcover",
		publishDate: "July 14th 2015",
		language: "English"
	}
];

function loadData(){
	Book.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("Remove books!");
			bookList.forEach(function(book){
				Book.create(book, function(err){
					if(err){
						console.log(err);
					}
				})
				console.log("Load data done");
			})
		}
	});
}

module.exports = loadData;