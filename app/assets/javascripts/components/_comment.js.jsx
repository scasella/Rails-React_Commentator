var Comment = React.createClass({

render: function() {
  return (
     <li className="list-group-item">
      <h4>{this.props.author} said:</h4>
      <p>{this.props.text}</p><span className="badge">{this.formatDateTime(this.props.time)}</span><br />
    </li>
  )
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
    let deliverText = finalTime+" "+finalDate
    return deliverText
  }
}

})
