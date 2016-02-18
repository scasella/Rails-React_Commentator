var CommentList = React.createClass({
getInitialState: function() {
  return {
    topCreatedAt: "",
    startUp: true
  }
},
componentDidMount: function() {
  if(this.props.comments.length > 0) {
  setInterval(this.checkNew, 500);
  }
},
render: function() {
  var commentNodes = this.props.comments.map(function(comment) {
    return <Comment elisePic={this.props.elisePic} stephenPic={this.props.stephenPic} author={comment.author} image={comment.image} text={comment.text} time={comment.created_at} key={comment.id}/>
    }.bind(this));

  return (

    <div className="comment-list">
      <ul id="comment-ul" className="list-group">
      { commentNodes }
      </ul>

      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <div><img id="modal-img" src={GLOBAL_IMG} /></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
},
checkNew: function() {
  var newArray = this.props.comments;
  if(this.state.startUp == true) {
    document.title = "Elise & Stephen's Chat";
    this.setState({ topCreatedAt: newArray[0].text });
    this.setState({ startUp: false });
  } else {
  if(document.hasFocus()) {
    this.setState({ topCreatedAt: newArray[0].text })
    document.title = "Elise & Stephen's Chat"
  } else {
    if(this.state.topCreatedAt != newArray[0].text && this.state.topCreatedAt != null) {
      document.title = "New Comment <3"
   }
  }
}
}
})

var GLOBAL_POST_TEXT = ""
var GLOBAL_IMG = ""
