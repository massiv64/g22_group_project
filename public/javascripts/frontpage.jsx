"use strict";

var Page = React.createClass({
   displayName: "Page",

   getInitialState: function getInitialState() {
      return {
         posts: [],
         categories: [],
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
   searchFilter: function searchFilter(e){
     var search = e.target.value.toLowerCase();
     var filtered;
      $.getJSON("/posts").then((function (posts) {
       filtered = posts.filter(function(val, index){
         return val.title.toLowerCase().indexOf(search) > -1;
       })
       this.setState({posts: filtered})
      }.bind(this))
      );
   },
   componentWillMount: function componentWillMount() {
      $.getJSON("/posts").then((function (posts) {
         this.setState({
            posts: posts
         });
      }).bind(this));
      $.getJSON('/categories').then((function(categories) {
        this.setState({
          categories: categories
        });
      }).bind(this));
   },
   render: function () {
      var listPosts = this.state.posts.map(function (v, i) {
         return (
            <div className="tile" key={i}>
               <Post
                  title={v.title}
                  alias={v.alias}
                  body={v.body}
                  post_id={v.post_id}
                  user_id={v.user_id}
               />
            </div>
          )
      });
      return (
      <div>
         <h2>Front Page</h2>
         <MenuBox
            searchFilter={this.searchFilter}
            categories={this.state.categories}
          />
         {listPosts}
      </div>
    );
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

var Checkbox = React.createClass({
  render: function(){
    return (
      <div>
        <input
          id={"check" + this.props.id}
          type="checkbox"
          value={this.props.technology}
        />
        <label htmlFor={"check" + this.props.id}> {this.props.technology} </label>
        <br/>
      </div>
    )
  }
})

var MenuBox = React.createClass({
  render: function () {
    var listCategories = this.props.categories.map(function(v, i) {
      return (
        <div className ="checkbox" id={i}>
          <Checkbox
            id={"check" + v.id}
            technology={v.technology}
          />
        </div>
      )
    })
		return <div className="menu">
      <a href="#top"> Scroll to the Top </a>
      <br/>
			<label> Search </label>
      <input onKeyUp={this.props.searchFilter} type="text"/>
      {listCategories}
    </div>
	}
})

ReactDOM.render(<Page />, document.getElementById('container'));
