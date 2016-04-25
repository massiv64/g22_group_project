"use strict";

var Page = React.createClass({
   displayName: "Page",

   getInitialState: function getInitialState() {
      return {
         posts: []
      };
   },
   updatePosts: function updatePosts() {
      var idx = this.state.posts.map(function (v) {
         v.id;
      }).indexOf(post.id);
      this.state.posts[idx] = post;
      this.setState({
         posts: this.state.posts
      });
   },
   componentWillMount: function componentWillMount() {
      $.getJSON("/json/posts").then((function (posts) {
         this.setState({
            posts: posts
         });
      }).bind(this));
   },
   render: function render() {
      var listPosts = this.state.posts.map(function (v, i) {
         return React.createElement("div", { className: "tile", key: i }, React.createElement(Post, {}));
      });
      return React.createElement("div", null, React.createElement("h1", null, "Posts"), listPosts);
   }
});

var Post = React.createClass({
   displayName: "Post",

   render: function render() {
      return React.createElement("div", null);
   }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('container'));