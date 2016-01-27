var CommentForm = React.createClass({
getInitialState: function() {
  return {
    selectedName: "",
    dropdownTitle: "Who are you?",
    previewSrc: ""
  }
},
handleSubmit: function(event) {
  event.preventDefault();

  var author = this.refs.author.value.trim();
  var text = this.refs.text.value.trim();
  var image = this.refs.image.value.trim();

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
  this.refs.image.value = "";
  this.setState({ previewSrc: false })
},
render: function() {
  var imgNoDisplay = {
    display: 'none'
  }
  return (
    <div className="well">

    <form ref="form" className="comment-form" action={this.props.form.action} acceptCharset="UTF-8" method="post" onSubmit={this.handleSubmit}>

    <input type="hidden" className="form-control" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
    <input type="hidden" ref="author" className="form-control" name="comment[author]" value={this.state.selectedName} placeholder="Your name" />

    <p><input ref="text" onKeyPress={this.keyPressed} className="form-control" name="comment[text]" placeholder={this.introText()} /></p>
    <p></p><button disabled={this.canPost()} className="btn btn-success" type="submit">Post comment</button>

    <span style={this.state.selectedName != "" ? imgNoDisplay : null} className="dropdown">
      {"\u00a0"}{"\u00a0"}<button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown">{this.state.dropdownTitle}
      {"\u00a0"}<span className="caret"></span></button>
      <ul className="dropdown-menu">
        <li onClick={this.setName} id="Elise"><a onClick={this.setName} id="Elise">Elise</a></li>
        <li onClick={this.setName} id="Stephen"><a onClick={this.setName} id="Stephen">Stephen</a></li>
      </ul>
    </span>

    {"\u00a0"}{"\u00a0"}<button className="btn-sm btn-button-name" disabled={this.imgShow()} data-toggle="collapse" data-target="#demo">Add image</button>
    <div id="demo" className="collapse">
      <input ref="image" id="image-field" onChange={this.renderImage} className="form-control input-sm" name="comment[image]" placeholder="Paste image URL..." />
    </div>

  </form><p></p>

    <div>
      <img id="post-image" style={this.imgShow() ? null : imgNoDisplay}  src={this.state.previewSrc}></img>
    </div>
</div>

  )
},
keyPressed() {
  this.forceUpdate()
},
imgShow() {
  if(this.state.previewSrc.length > 0) {
    return true
  } else {
    return false
  }
},
renderImage() {
  this.setState({ previewSrc: this.refs.image.value })
},
imgIsHidden() {
  if(this.state.previewSrc != "") {
    return false
  } else {
    return true
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
