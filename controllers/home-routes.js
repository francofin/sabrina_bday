const router = require("express").Router();
// const { Post, Comment, User, Image } = require("../models/");

router.get("/", (req, res) => {
    res.render("homepage");
});




// GET '/' show login page if not logged in and dashboard if logged in
router.get("/login", (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect("/");
    //     return;
    // }

    res.render("login", {
        layout: 'addition'
    });
});


router.get('/about', (req, res) => {

    res.render("about", {
        layout:'addition',
        loggedIn: req.session.loggedIn
    });
  });


router.get('/contact', (req, res) => {

    res.render("contact", {
        layout:'addition',
        loggedIn: req.session.loggedIn
    });
});


router.get("/signup", (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect("/");
    //     return;
    // }

    res.render("signup", {
        layout: 'addition'
    });
});

module.exports = router;