var Periscope = React.createClass({
getInitialState() {
	return (
		{data: "",
		hasData: false}
	)	
},
componentDidMount() {
   this.renderResults()
},
render() {
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
	const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAB2JkAAAAAAAJkX%2BkhUmnZkaH6gShItQ%2FD6zqek%3DVmMMXuzTqLmOSU4d3TExpklODjcPpL82xgFZlP64vE8iEp8OUd'
	console.log("test")
	 $.ajax({
      url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&screen_name=twitterapi',
		contentType: "application/json",
		dataType: 'jsonp',
		cache: true, 
		jsonp : false,
   		jsonpCallback: 'jsonCallback',
   		beforeSend : function(xhr) {
      		xhr.setRequestHeader("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAB2JkAAAAAAAJkX%2BkhUmnZkaH6gShItQ%2FD6zqek%3DVmMMXuzTqLmOSU4d3TExpklODjcPpL82xgFZlP64vE8iEp8OUd");
      },
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