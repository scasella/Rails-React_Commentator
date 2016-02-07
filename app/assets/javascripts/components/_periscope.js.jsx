var Periscope = React.createClass({
getInitialState() {
	return (
		{data: "",
		hasData: false}
	)	
},
render() {
	setInterval(this.renderResults,5000)
	return (
		<div>
		<h4>Live Videos</h4>
		<ul>
		{this.renderList()}
		</ul>
		</div>
	)
},
renderList() {
	if(this.state.hasData == true) {
	var newArray = this.state.data.map(function(index) {
		return <li><h5>index.description</h5>
		<h6>index.entities.url.urls[0].url</h6></li>
	}

	)

	return newArray
}
	return <div></div>
},
renderResults() {
	console.log("test")
	  const url = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&screen_name=twitterapi"

  $.ajax({
      url: url,
      dataType: "json",
       success: function(data) {
       console.log("test")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
}

})

{/*statuses[1] entities - url - urls[0] url*/}