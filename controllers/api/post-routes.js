// require express router
const router = require("express").Router();

// require multer uploader
const uploader = require("../../utils/upload");
// require fs
const fs = require("fs");
// require models
const { Post, Vote, User, Image } = require("../../models/");

// require withAuth function
const withAuth = require("../../utils/auth");

// POST '/' create Post
router.post("/", withAuth, uploader.single('file'), function(req, res) {
    const body = req.body;
    console.log("post-body", req.body);

    Post.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
            Image.create({
                data:req.file.filename,
                name: req.file.originalname,
                file_type: req.file.mimetype,
                postId: newPost.id
            })
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
          ],
        order: [['created_at', 'DESC']], 
        include: [
            Image,
            Vote,
            User,
            Comment            
        ]    
    })
        .then(dbPostData => {
           res.json(dbPostData);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/upvote', (req, res) => {
    // make sure the session exists first
    console.log("body respnse", req.body);
    if (req.session) {
        console.log("body respnse", req.body);
      // pass session id along with all destructured properties on req.body
      Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote })
        .then(updatedVoteData => {
            console.log(updatedVoteData);
            res.json(updatedVoteData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
          console.log("body respnse", req.body);
        });
    }
  });

// DELETE '/:id' delete Post by ID
router.delete("/:id", (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;