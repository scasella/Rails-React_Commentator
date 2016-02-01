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
  var hiddenStyle = {
    display: 'none'
  }
  return (
    <div className="well">

    <form ref="form" className="comment-form" action={this.props.form.action} acceptCharset="UTF-8" method="post" onSubmit={this.handleSubmit}>

    <input type="hidden" className="form-control" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
    <input type="hidden" ref="author" className="form-control" name="comment[author]" value={this.state.selectedName} placeholder="Your name" />


    <span style={this.state.selectedName != "" ? hiddenStyle : null} className="dropdown">
      <button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown">{this.state.dropdownTitle}
      {"\u00a0"}<span className="caret"></span></button>
      <ul className="dropdown-menu">
        <li onClick={this.setName} id="Elise"><a onClick={this.setName} id="Elise">Elise</a></li>
        <li onClick={this.setName} id="Stephen"><a onClick={this.setName} id="Stephen">Stephen</a></li>
      </ul>
    </span>

    <input ref="text" style={this.state.selectedName == "" ? hiddenStyle : null} onKeyPress={this.keyPressed} className="form-control" name="comment[text]" placeholder={this.introText()} autoComplete="off" />

    <p /><button disabled={this.disablePost()} className="btn btn-success" type="submit">Post comment</button>

    {"\u00a0"}{"\u00a0"}<button className="btn btn-button-name btn-sm" disabled={this.imgShow()} data-toggle="collapse" data-target="#demo">Add image</button>
    <span id="demo" className="collapse">
      <input ref="image" id="image-field" onChange={this.renderImage} className="form-control input-sm" name="comment[image]" placeholder="Paste image URL..." />
    </span>

    <span className="dropdown">
    <button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown">Emojis
    {"\u00a0"}<span className="caret"></span></button>
      <ul id="#emoji-ul"className="dropdown-menu">
      <EmojiList handleClick={this.emojiClicked} />
      </ul>
    </span>

  </form><p></p>

    <div>
      <img id="post-image" style={this.imgShow() ? null : hiddenStyle}  src={this.state.previewSrc}></img>
    </div>
  </div>
  )
},
emojiClicked(e) {
  console.log(e)
  this.refs.text.value = this.refs.text.value + `${e}`
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
disablePost() {
  if(this.state.selectedName == "" || this.refs.text.value == "" && this.refs.image.value.length < 1) {
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
