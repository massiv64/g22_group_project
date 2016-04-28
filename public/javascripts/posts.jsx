"use strict";


var Page = React.createClass({
  displayName: "Page",
  getInitialState: function getInitialState() {
     return {
        user: {},
        post: {},
        post_author:{},
        categories: [],
        comments: [],
        editorValue: '',
     };
  },
  componentWillMount: function componentWillMount() {
    var uri = window.location.pathname; // current page uri (something like `/hello/test`)
    $.getJSON(uri).then((function(res){
      this.setState({
        post: res.post,
        post_author: res.post_author,
        comments: res.comments,
        categories: res.categories,
      });
      console.log(this.state.post)
    }).bind(this));
    $.getJSON('/account').then((function(user){
      this.setState({user: user});
      console.log(this.state.user)
    }).bind(this));
  },
  componentDidMount: function componentDidMount(){
    var simplemde = new SimpleMDE({
      element: document.getElementById("body"),
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        indentWithTabs: true,
      }
    });
  },
  handleTextChange: function handleTextChange(e){
    debugger;
  },
  handleSubmit: function handleSubmit(e){
    e.preventDefault();
    var user_id = this.state.user.id;
    var post_id = this.state.post.id;
    var content = this.state.editorValue;
    debugger
  },
  render: function(){
    var body = this.state.post.body;
    function createMarkup() { return {__html: body}; };
    var listComments = this.state.comments.map(function (v, i) {
       return (
          <div className="commentDiv" key={i}>
             <Comment
                commentContent={v.content}
             />
          </div>
        )
    });
    return (
      <div className="container">
        <h2 className="lead"> Title: {this.state.post.title}</h2>
        <div className="bodyDiv">
          <h4 className="lead"> Body:</h4>
          <div className="bodyBody">
            <img className="icon" src={this.state.post_author.photo}/>
            <div className="commentBody">
              <div
                dangerouslySetInnerHTML={createMarkup()}
              >
              </div>
            </div>
            <p className="postAuthor">Posted By {this.state.post_author.alias}</p>
          </div>
          <h4 className="lead">Comments: {this.state.comments.length}</h4>
          <CommentInput
            post={this.state.post}
            commentValue={this.commentValue}
            value={this.state.text}
          />
          {listComments}
        </div>
      </div>
    )
  }
});



var Comment = React.createClass({
  render: function(){
    var content = this.props.commentContent;
    function createMarkup() { return {__html: content}; };
    return (
        <div
          className="commentBody"
        >
        <div
          dangerouslySetInnerHTML={createMarkup()}
        >

        </div>
          <p className='commentAuthor'>Commented by: </p>
        </div>
    )
  }
});


var CommentInput = React.createClass({
  displayName: "Comment Dialog",
  render: function(){
    return (
      <div id='commentEdit'>
      <form id="form" action={"/posts/" + this.props.post.id + "/comments"} method="POST">
        <textarea
          id="body"
          rows="8"
          cols="20"
          name="comment[content]"
          onChange={this.props.handleTextChange}
          value={this.props.value}
          placeholder="Write a comment here!"
        />
        <input type="submit" value="Add this comment"/>
      </form>
      </div>
    )
  }
})

ReactDOM.render(<Page />, document.getElementById('container'));
