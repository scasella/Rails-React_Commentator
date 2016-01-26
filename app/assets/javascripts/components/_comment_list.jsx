var CommentList = React.createClass({
getInitialState: function() {
  return {
    topCreatedAt: "",
    startUp: true
  }
},
componentDidMount: function() {
  setInterval(this.checkNew, 3000);
},
render: function() {
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
  var newArray = this.props.comments;
  newArray.reverse();
  if(this.state.startUp == true) {
    document.title = "Elise & Stephen's Chat";
    this.setState({ topCreatedAt: newArray[0].created_at });
    this.setState({ startUp: false });
  } else {
  if(document.hasFocus()) {
    this.setState({ topCreatedAt: newArray[0].created_at })
    document.title = "Elise & Stephen's Chat"
  } else {
    if(this.state.topCreatedAt != newArray[0].created_at ) {
      document.title = "New Comment <3"
   }
  }
}
}
})
