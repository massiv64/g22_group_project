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
   render: function () {
      var listPosts = this.state.posts.map(function (v, i) {
         return <div className="tile" key={i}>
               <Post
                  title={v.title}
                  alias={v.alias}
                  body={v.body}
                  post_id={v.post_id}
                  user_id={v.user_id}
               />
            </div>;
      });
      return <div>
         <h2>Front Page</h2>
         <div className="menu">
            <label> Newest </label>
            &nbsp;
            <input 
               type="checkbox"
               value="newest"
            />
            <br/>
            <label> Unanswered </label>
            &nbsp;
            <input 
               type="checkbox"
               value="unanswered"
            />
            <br/>
            <label> JavaScript </label>
            &nbsp;
            <input 
               type="checkbox"
               value="javascript"
            />
         </div>
         {listPosts}
      </div>
   }
});

var Post = React.createClass({
	render: function () {
		return <div>
         <a href={"/users/" + this.props.user_id + "/posts/" + this.props.post_id}>
            <h3>
            {this.props.title}
            </h3>
         </a>
         <h5>Created by:&nbsp;
            <a href={"/users/" + this.props.user_id + "/posts"}>
               {this.props.alias}
            </a>
         </h5>
      </div>
	}
});

ReactDOM.render(<Page />, document.getElementById('container'));