"use strict";

var Page = React.createClass({
   displayName: "Page",

   getInitialState: function getInitialState() {
      return {
         posts: [],
         filters: []
      };
   },
   updatePosts: function updatePosts() {
      var idx = this.state.posts.map(function (v) {
         v.post_id;
      }).indexOf(post.post_id);
      this.state.posts[idx] = post;
      this.setState({
         posts: this.state.posts
      });
   },
   componentWillMount: function componentWillMount() {
      $.getJSON("/posts").then((function (posts) {
         this.setState({
            posts: posts
         });
      }).bind(this));
   },
   render: function render() {
      var listPosts = this.state.posts.map(function (v, i) {
         return React.createElement(
            "div",
            { className: "tile", key: i },
            React.createElement(Post, {
               title: v.title,
               alias: v.alias,
               body: v.body,
               post_id: v.post_id,
               user_id: v.user_id
            })
         );
      });
      return React.createElement(
         "div",
         null,
         React.createElement(
            "h2",
            null,
            "Front Page"
         ),
         React.createElement(MenuBox, null),
         listPosts
      );
   }
});

var Post = React.createClass({
   displayName: "Post",

   render: function render() {
      return React.createElement(
         "div",
         null,
         React.createElement(
            "a",
            { href: "/users/" + this.props.user_id + "/posts/" + this.props.post_id },
            React.createElement(
               "h3",
               null,
               this.props.title
            )
         ),
         React.createElement(
            "h5",
            null,
            "Created by: ",
            React.createElement(
               "a",
               { href: "/users/" + this.props.user_id + "/posts" },
               this.props.alias
            )
         )
      );
   }
});

var MenuBox = React.createClass({
   displayName: "MenuBox",

   render: function render() {
      return React.createElement(
         "div",
         { className: "menu" },
         React.createElement(
            "label",
            null,
            " Search "
         ),
         React.createElement("input", { type: "text" }),
         React.createElement(
            "label",
            null,
            " Newest "
         ),
         " ",
         React.createElement("input", {
            type: "checkbox",
            value: "newest"
         }),
         React.createElement("br", null),
         React.createElement(
            "label",
            null,
            " Unanswered "
         ),
         " ",
         React.createElement("input", {
            type: "checkbox",
            value: "unanswered"
         }),
         React.createElement("br", null),
         React.createElement(
            "label",
            null,
            " JavaScript "
         ),
         " ",
         React.createElement("input", {
            type: "checkbox",
            value: "javascript"
         })
      );
   }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('container'));