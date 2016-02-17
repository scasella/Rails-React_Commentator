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

  if(this.refs.image.value.length <= 1) {
  var emptyImage = "noImage"
  emptyImage.trim()
  image = emptyImage
  }

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
hiddenStyle: {display: 'none'},
render: function() {
  return (
    <div>

      <span style={this.state.selectedName != "" ? this.hiddenStyle : null} className="dropdown">
        <button id="login-btn" className="btn btn-info dropdown-toggle btn-lg" type="button" data-toggle="dropdown">{this.state.dropdownTitle}
          {"\u00a0"}<span className="caret"></span></button>
        <br />
        <ul className="dropdown-menu">
          <li onClick={this.setName} id="Elise"><a onClick={this.setName} id="Elise">Elise</a></li>
          <li onClick={this.setName} id="Stephen"><a onClick={this.setName} id="Stephen">Stephen</a></li>
        </ul>
      </span>



      <div style={this.state.selectedName != "" ? null : this.hiddenStyle} id="form-well" className="well">

        <form ref="form" className="comment-form" action={this.props.form.action} acceptCharset="UTF-8" method="post" onSubmit={this.handleSubmit}>

          <input type="hidden" className="form-control" name={this.props.form.csrf_param} value={this.props.form.csrf_token} />
          <input type="hidden" ref="author" className="form-control" name="comment[author]" value={this.state.selectedName} placeholder="Your name" />

          <input ref="text" style={this.state.selectedName == "" ? this.hiddenStyle : null} onKeyPress={this.keyPressed} className="form-control" name="comment[text]" placeholder={this.introText()} autoComplete="off" />

          <p /><button id="post_button" style={this.state.selectedName != "" ? null : this.hiddenStyle} disabled={this.disablePost()} className="btn btn-success" type="submit">Post comment</button>

          {"\u00a0"}{"\u00a0"}<span style={this.state.selectedName != "" ? null : this.hiddenStyle} className="dropdown">
          <button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown"><span className="glyphicon glyphicon-gift" />
            {"\u00a0"}<span className="caret"></span></button>
          <ul id="#emoji-ul"className="dropdown-menu">
            <EmojiList handleClick={this.emojiClicked} />
          </ul>
          </span>

          {"\u00a0"}{"\u00a0"}<button id="img_button" style={this.state.selectedName != "" ? null : this.hiddenStyle} className="btn btn-button-name" disabled={this.imgShow()} type="button" data-toggle="collapse" data-target="#demo"><span className="glyphicon glyphicon-picture" /></button>
          <span id="demo" className="collapse">
            <input ref="image" id="image-field" onChange={this.renderImage} className="form-control input-sm" name="comment[image]" placeholder="Paste image URL..." />
          </span>

        </form>
        <p />
        <div>
          <img id="post-image" style={this.imgShow() ? null : this.hiddenStyle}  src={this.state.previewSrc}></img>
        </div>
      </div>
    </div>
  )
},
emojiClicked(e) {
  this.refs.text.value = this.refs.text.value +" "+ `${e}`
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
  GLOBAL_POSTER = val
  this.refs.text.focus();
},
});
