var CommentBox = React.createClass({
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
    <div className="col-md-12">
      <div className="col-md-1"></div>
      <div className="col-md-3"><br /><img className="img-circle" id="picture" src={ this.props.imgSrc } alt={this.props.imgAlt} /></div>
      <div className="col-md-4">
      <br />
      <CommentList comments={this.state.comments} />
      <hr />
      </div>
      <div className="col-md-4">
      <h3>{"\u00a0"}Add a comment</h3>

      <CommentForm form={this.state.form} refresh={this.refresh} onCommentSubmit={this.handleCommentSubmit} /> </div>
    </div>
  )
}
})
