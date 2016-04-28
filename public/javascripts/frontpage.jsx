"use strict";

var Page = React.createClass({
   displayName: "Page",

   getInitialState: function getInitialState() {
      return {
         posts: [],
         categories: [],
         filters: [],
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
   // Filters according to content in the search bar
   searchFilter: function searchFilter(e){
     var search = e.target.value.toLowerCase();
     var filtered;
      $.getJSON("/posts").then((function (posts) {
       filtered = posts.filter(function(val, index){
         return val.title.toLowerCase().indexOf(Search) > -1;
       })
       this.setState({posts: filtered})
      }.bind(this))
      );
   },
   // Filters posts by selected categories
   categoryFilter: function categoryFilter(e){
     var category = e.target.value;
     var idx = this.state.filters.indexOf(category);
     var filtered = [];
     if(e.target.checked){
       if(idx < 0){
        this.state.filters.push(category)
       }
     }
     else{
       if(idx > -1){
         this.state.filters.splice(idx, 1);
       }
     }
     $.getJSON('/posts').then((function(posts){
       var filtered = posts;
       this.state.posts.forEach(function (val, index){
         for(var i=0;i<this.state.filters.length;i++){
           if (this.state.filters[i] === val){
             filtered.push(val);
           }
           if (this.state.filters[i] !== val){
             filtered.splice(filtered.indexOf(val), 1);
           }
         }
       }.bind(this))
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
                  post_id={v.id}
                  user_id={v.user_id}
               />
            </div>
          )
      });
      return (
      <div>
         <h2>Welcome to the Stack App</h2>
         <MenuBox
            searchFilter={this.searchFilter}
            categoryFilter={this.categoryFilter}
            categories={this.state.categories}
          />
         {listPosts}
      </div>
    );
   }
});

var Post = React.createClass({
	render: function () {
		return <div className="wrapper">
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
          onClick={this.props.filter}
        />
        <label htmlFor={"check" + this.props.id}> {this.props.technology} </label>
        <br/>
      </div>
    )
  }
})

var MenuBox = React.createClass({
  render: function () {
    var filter = this.props.categoryFilter;
    var listCategories = this.props.categories.map(function(v, i) {
      return (
        <div className ="checkbox" key={i}>
          <Checkbox
            id={"check" + v.id}
            technology={v.technology}
            filter={filter}
          />
        </div>
      )
    })
		return <div className="dropdown">
      <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> Filter <span className="caret"></span>
      </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
          <form class="form-horizontal" role="form">
          <a href="#top"> Scroll to the Top </a>
          <br/>
          <div className="input-group">
  			     <label> Search: </label>
             <input onKeyUp={this.props.searchFilter} type="text"/>
             {listCategories}
          </div>
          </form>
      </div>
    </div>
	}
})

ReactDOM.render(<Page />, document.getElementById('container'));
