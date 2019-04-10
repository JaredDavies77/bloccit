const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("flairs/new", {postId: req.params.postId, topicId: req.params.topicId, id: req.params.id});
    },
    create(req, res, next) {
        let newFlair = {
            name: req.body.title,
            color: req.body.body,
            postId: req.params.postId,
            id: req.params.id,
            topicId: req.params.topicId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err) {
                res.redirect(500, "/posts/:postId");
            } else {
                res.redirect(303, `/topics/${newFlair.topicId}/posts/${newFlair.postId}`);
            }
        });
    },

    edit(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
            
            if(err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("flairs/edit", {flair, topicId: req.params.topicId, postId: req.params.postId})
            }
        }) 
    },
    show(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if(err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("flairs/edit", {flair, topicId: req.params.topicId, postId: req.params.postId})
            }
        });
    },

    destroy(req, res, next) {
        flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}`)
            } else {
                res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
            }
        })
    },

    update(req, res, next){
        flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
          if(err || flair == null){
            res.redirect(404, `/topics/${req.params.topicId}/posts/${req.params.postId}/flairs/${req.params.id}/edit`);
          } else {
            res.redirect(`/topics/${req.params.topicId}/posts/${req.params.postId}`);
          }
        });
      }
}