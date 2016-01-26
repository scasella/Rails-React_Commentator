var CommentForm = React.createClass({
getInitialState: function() {
  return {
    selectedName: "",
    dropdownTitle: "Who are you?"
  }
},
handleSubmit: function(event) {
  event.preventDefault();

  var author = this.refs.author.value.trim();
  var text = this.refs.text.value.trim();

  //Validate
  if (!text || !author) {
    return false;
  }

  //Submit
  var formData = $(this.refs.form).serialize();
  this.props.onCommentSubmit(formData, this.props.form.action);

  //Reset Form
  this.refs.author.value = "";
  this.refs.text.value = "";
},
render: function() {
  return (
    <div className="well">

    <form ref="form" className="comment-form" action={this.props.form.action} acceptCharset="UTF-8" method="post" onSubmit={this.handleSubmit}>

    <input type="hidden" className="form-control" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
    <input type="hidden" ref="author" className="form-control" name="comment[author]" value={this.state.selectedName} placeholder="Your name" />

    <p><input ref="text" className="form-control" name="comment[text]" placeholder={this.introText()} /></p>
    <p></p><button disabled={this.canPost()} className="btn btn-success" type="submit">Post comment</button>

    {"\u00a0"}{"\u00a0"}<span className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.dropdownTitle}
      {"\u00a0"}<span className="caret"></span></button>
      <ul className="dropdown-menu">
        <li onClick={this.setName} id="Elise"><a onClick={this.setName} id="Elise">Elise</a></li>
        <li onClick={this.setName} id="Stephen"><a onClick={this.setName} id="Stephen">Stephen</a></li>
      </ul>
    </span>

    </form></div>
  )
},
keyPressed(e) {
  if(e.which == 13 && this.canPost()) {
     this.refs.form.submit()
  }
},
introText() {
  if(this.state.selectedName != "") {
  return `${this.state.selectedName}` + " " + "says..."
  } else {
    return "Say something..."
  }
},
canPost() {
  if(this.state.selectedName == "" || this.refs.text.value == "") {
    return true
  } else {
    return false
  }
},
setName: function(event) {
  var val = event.target.id
  this.setState({ selectedName: val })
  this.setState({ dropdownTitle: val })
},
});
