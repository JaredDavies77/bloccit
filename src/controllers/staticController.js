module.exports = {
    index(req, res, next){
        res.render("static/index", {title: "Welcome to Bloccit"});
    },
    aboutus(req, res, next){
        res.render("static/partials/aboutus", {title: "About Us"});
    }
  }