const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Post", () => {

  beforeEach((done) => {
      
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
//#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a post object with a title, body, and assigned topic", (done) => {
//#1
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system.",
        topicId: this.topic.id
      })
      .then((topic) => {

//#2
        expect(topic.title).toBe("Expeditions to Alpha Centauri");
        expect(topic.description).toBe("A compilation of reports from recent visits to the star system.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

   it("should not create a topic with missing title or description", (done) => {
    Topic.create({
      title: "Expeditions to Alpha Centauri"
    })
    .then((topic) => {
    
      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there

      done();

    })
    .catch((err) => {

      expect(err.message).toContain("Topic.description cannot be null");
      done();

    })
  });

  });
  describe("#setTopic()", () => {

    it("should associate a topic and a post together", (done) => {

// #1
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {

// #2
        expect(this.post.topicId).toBe(this.topic.id);
// #3
        this.post.setTopic(newTopic)
        .then((post) => {
// #4
          expect(post.topicId).toBe(newTopic.id);
          done();

        });
      })
    });

  });
  describe("#getPosts()", () => {

    it("should return the associated posts", (done) => {

        this.topic.getPosts()     //returns an array of Sequelize Model instances
        .then((posts) => {
          expect(posts[0].title);
          done();
        })

    });

  });
});