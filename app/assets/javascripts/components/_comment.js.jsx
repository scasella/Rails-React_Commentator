var Comment = React.createClass({
getInitialState: function() {
  return { showImg: true }
},
render: function() {
  return (
     <li id="com-li" className="list-group-item">
      <span id="badge"><h6>{this.formatDateTime(this.props.time)}</h6></span>
      <p><span>{this.loadPic()}</span>{"\u00a0"}{"\u00a0"}{"\u00a0"}<span id="com-text">{this.props.text}</span></p>
      <div id="image-container">{this.checkImg()}</div>
    </li>
  )
},
setError: function() {
  this.setState({ showImg: false })
},
loadPic: function() {
  if(this.props.author == "Elise") {
    return <img className="img-rounded" src={this.props.elisePic} height="60" width="50" />
  } else if(this.props.author == "Stephen") {
    return <img className="img-rounded" src={this.props.stephenPic} height="60" width="50" />
  }
},
checkImg: function() {
  var imgStyle = {
    display: 'none'
  }
  if(this.props.image) {
  return <img onError={this.setError} style={this.state.showImg ? null : imgStyle } className="img-thumbnail" id="post-image" src={this.props.image} />
  }
},
formatDateTime: function(datetime) {
  let time = datetime.substring(11,16)
  let date = datetime.substring(0,10)
  var addPM = false
  var finalTime = ""
  var timeConv = time.substring(0,2)
  timeConv = parseInt(timeConv)

  if(timeConv > 12) {
    finalTime = (timeConv - 12).toString() + time.substring(2,5)
    addPM = true
  } else {
    finalTime = time
  }

  let finalDate = date.substring(5,7) +"/"+ date.substring(8,10)
  if(addPM == true) {
    let deliverText = finalTime+"PM"+" "+finalDate
    return deliverText
  } else {
    let deliverText = finalTime+"AM"+" "+finalDate
    return deliverText
  }
}

})
