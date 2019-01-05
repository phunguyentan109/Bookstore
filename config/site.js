const {PATH_SITE} = require("./path");

function Site(){
    this.data = [
        {
            url: "/",
            pathName: "base"
        },
        {
            url: "/store",
            pathName: "store"
        },
        {
            url: "/cart",
            pathName: "cart"

        },
        {
            url: "/order",
            pathName: "order"
        }
    ]
}

Site.prototype.load = function(){
    return this.data.map(site => {
        return {...site, pathName: require(`${PATH_SITE}${site.pathName}`)};
    });
}

module.exports = new Site();
