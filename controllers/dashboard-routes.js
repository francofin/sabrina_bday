const router = require("express").Router();
const { Post, Comment, Image, User } = require("../models/");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        include: [User, Image, Comment]
    })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            console.log(posts);
            if(!posts.length) {
                res.render("profile", {
                    layout: "addition",
                    posts,
                    loggedIn: req.session.loggedIn,
                    user_name: req.session.username
                });
            } else {
            const userinfo = posts[0].User;
            console.log(userinfo);
            console.log(req.session);
            console.log(posts[0].image.data);
            // posts.forEach((post) => {
            //     post.imageURL = 'data:image/jpg;base64,' + Buffer.from(post.Image.data, 'binary').toString('base64');
            // });

        res.render("profile", {
            layout: "addition",
            posts,
            userinfo,
            loggedIn: req.session.loggedIn,
            user_name: req.session.username,
            first_name: req.session.first_name
        });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.redirect("/");
        });
});

module.exports = router;