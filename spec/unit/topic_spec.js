const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
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
              description: "A compilation of reports from recent visits to the star system.",
              posts: [{
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
              }]
            }, {
              include: {
                model: Post,
                as: "posts"
              }
            })
            .then((topic) => {
              this.topic = topic; //store the topic
              this.post = topic.posts[0]; //store the post
              done();
            })
          })
        });
      });
    
        describe("#create()", () => {
            it("should create a topic object and store it in the database when create function is called", (done) => {
                Topic.create({
                    title: "Guitars",
                    description: "A list of guitars used for stage performance"
                })
                .then((topic) => {
                    expect(topic.title).toBe("Guitars");
                    expect(topic.description).toBe("A list of guitars used for stage performance");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
        describe("#getPosts()", () => {
            it("should return associated post", (done) => {
                this.topic.getPosts({
                    include: [{
                        model: Post,
                        as: "posts"
                    }]
                })
                .then((associatedPost) => {
                    expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

      
    
}); 