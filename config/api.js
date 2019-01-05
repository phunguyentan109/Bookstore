const {PATH_API} = require("./path");

function Api(){
    this.data = ["book", "cart", "comment", "author", "genre", "publisher", "supplier", "address", "order", "user", "order-book"];
}

Api.prototype.load = function(){
    return this.data.map(api => {
        return {url: `/api/${api}`, pathName: require(`${PATH_API}${api}`)};
    });
}

module.exports = new Api();
