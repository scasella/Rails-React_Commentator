var App = React.createClass({
componentDidMount: function() {
  setInterval(this.refresh, 5000);
},
getInitialState: function() {
  return JSON.parse(this.props.presenter);
},
handleCommentSubmit: function( formData, action ) {
  $.ajax({
    data: formData,
    url: action,
    type: "POST",
    dataType: "json",
    success: function(data) {
      this.setState({ comments: data});
    }.bind(this)
  });
},
refresh: function() {
  $.ajax({
      url: "/comments",
      dataType: "json",
      success: function(data) {
        this.setState({ comments: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
},
render: function() {
  return (
      <div>
        <div className="col-md-4">
          <br />
            <CommentList elisePic={this.props.elisePic} stephenPic={this.props.stephenPic} comments={this.formatArray()} />
            <hr />
        </div>
            <div className="col-md-3">
          <div id="form-row" className="row">
          <h4>{"\u00a0"}Add a comment</h4>
          <CommentForm form={this.state.form} refresh={this.refresh} onCommentSubmit={this.handleCommentSubmit} /></div></div>
      </div>
)
},
formatArray() {
  var comments = this.state.comments
  comments.reverse()
  return comments
}
})
