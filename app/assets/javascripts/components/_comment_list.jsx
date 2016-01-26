var CommentList = React.createClass({
startUp: function() {
  setInterval(this.checkNew(), 1000);
},
render: function() {
  this.startUp();
  var newArray = this.props.comments;
  newArray.reverse();
  var commentNodes = newArray.map(function(comment) {
    return <Comment author={comment.author} text={comment.text} time={comment.created_at} key={comment.id} />
    });

  return (

    <div className="comment-list">
      <ul className="list-group">
      { commentNodes }
      </ul>
    </div>
  )
},
checkNew: function() {
  if(this.props.comments.length != commentCount) {
     document.title = "New Comment!"
    if(document.hasFocus()) {
      commentCount = this.props.comments.length
      document.title = "Elise & Stephen's Chat"
    }
  }
},
})

var commentCount = 0
