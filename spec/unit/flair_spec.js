const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;
const User = require("../../src/db/models").User;


describe("Flair", () => {

    beforeEach((done) => {
      this.topic;
      this.post;
      this.flair;
      this.user;
      sequelize.sync({force: true}).then((res) => {
        User.create({
          email: "starman@tesla.com",
          password: "Trekkie4lyfe"
        })
        .then((user) => {
          this.user = user; //store the user
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system."
        })
        .then((topic) => {
          this.topic = topic;
          Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            topicId: this.topic.id,
            userId: this.user.id
          })
          .then((post) => {
            this.post = post;
            Flair.create({
                name: "Flair",
                color: "Red",
                postId: this.post.id
            })
            .then((flair) => {
                this.flair = flair;
                done();
            })
            })
          });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
  
    });

    describe("#create()", () => {

        it("should create a flair object with a name and color", (done) => {
          Flair.create({
            name: "Flair",
            color: "Red",
          })
          .then((flair) => {
            expect(flair.name).toBe("Flair");
            expect(flair.color).toBe("Red");
            done();
   
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
   
      });

      it("should not create a flair with missing name, color, or assigned post", (done) => {
        Flair.create({
          Name: "Bookmark"
        })
        .then((flair) => {
   
         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, we'll catch the error in the catch block below
         // and set the expectations there
   
          done();
   
        })
        .catch((err) => {
   
          expect(err.message).toContain("Flair.color cannot be null");
          expect(err.message).toContain("Flair.postId cannot be null");
          done();
   
        })
      });
      describe("#setPost()", () => {

        it("should associate a post and a flair together", (done) => {
            Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            topicId: this.topic.id,
            userId: this.user.id
          })
          .then((newPost) => {
            expect(this.flair.postId).toBe(this.post.id);
            this.flair.setPost(newPost)
            .then((flair) => {
              expect(flair.postId).toBe(newPost.id);
              done();
   
            });
          });
        });
   
    });
    describe("#getPost()", () => {

     it("should return the associated post", (done) => {

       this.flair.getPost()
       .then((associatedPost) => {
         expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
         done();
       });

     });

   });
  });

