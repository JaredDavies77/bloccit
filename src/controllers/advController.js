const advQueries = require("../db/queries.advertisements.js");

module.exports = {
    index(req, res, next){
      advQueries.getAllAdvertisements((err, advertisements) => {
                if(err){
                  res.redirect(500, "static/index");
                } else {
                  res.render("advertisements/index", {advertisements});
                }
              })
    },
    new(req, res, next){
        res.render("advertisements/new");
      },
    create(req, res, next){
        let newAdvertisement = {
          title: req.body.title,
          description: req.body.description
        };
        advQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
          if(err){
            res.redirect(500, "/advertisements/new");
          } else {
            res.redirect(303, `/advertisements/${advertisement.id}`);
          }
        });
      }, 
      show(req, res, next){
             advQueries.getAdvertisement(req.params.id, (err, advertisement) => {
               if(err || advertisement == null){
                 res.redirect(404, "/");
               } else {
                 res.render("advertisements/show", {advertisement});
               }
             });
           },
        destroy(req, res, next){
            advQueries.deleteAdvertisement(req.params.id, (err, advertisement) => {
              if(err){
                res.redirect(500, `/advertisements/${advertisement.id}`)
              } else {
                res.redirect(303, "/advertisements")
              }
            });
          },
          edit(req, res, next){
            advQueries.getAdvertisement(req.params.id, (err, advertisement) => {
              if(err || advertisement == null){
                res.redirect(404, "/");
              } else {
                res.render("advertisements/edit", {advertisement});
              }
            });
          },
          update(req, res, next){

            //#1
                 advQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {
            
            //#2
                   if(err || advertisement == null){
                     res.redirect(404, `/advertisements/${req.params.id}/edit`);
                   } else {
                     res.redirect(`/advertisements/${advertisement.id}`);
                   }
                 });
               }
  }