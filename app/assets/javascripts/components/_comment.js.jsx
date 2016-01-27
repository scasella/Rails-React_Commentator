var Comment = React.createClass({
getInitialState: function() {
  return { showImg: true }
},
render: function() {
  var imgStyle = {
    display: 'none'
  }
  return (
     <li className="list-group-item">
      <span id="badge" className="label label-info">{this.formatDateTime(this.props.time)}</span>
      <p>{this.loadPic()}{"\u00a0"}{"\u00a0"}{"\u00a0"}{this.props.text}</p>
      <div id="image-container"><img onError={this.setError} style={this.state.showImg ? null : imgStyle } className="img-thumbnail" id="post-image" src={this.props.image}></img></div>
    </li>
  )
},
setError: function() {
  this.setState({ showImg: false })
},
loadPic: function() {
  if(this.props.author == "Elise") {
    return <img className="img-rounded" src="/assets/elisePic.jpg" height="60" width="50"/>
  } else if(this.props.author == "Stephen") {
    return <img className="img-rounded" src="/assets/stephenPic.jpg" height="60" width="50"/>
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
