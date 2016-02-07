var LiveVideos = React.createClass({
getInitialState() {
  return {data: null,
  toggle: false,
  selectedVideo: {}
  }
},
render() {
  if(this.state.toggle == true) {
  setInterval(this.getVideos,5000)
  }
  return (
    <div className="col-md-5">
      {this.renderView()}
      <br />

        <input ref="search" id="vid-search" className="form-control" autoComplete="off" onChange={this.textEntered}></input>
        <div>
        {this.renderResult()}
      </div>
    </div>
  )
},
renderView() {
  if(this.state.selectedVideo.id != null) {
  const video = this.state.selectedVideo
  return (
    <div>
    <div className="embed-responsive embed-responsive-16by9">
      <iframe id="movie_player" className="embed-responsive-item" src={"https://www.youtube.com/embed/" + video.id.videoId +"?autoplay=1"} allowFullScreen></iframe>
    </div>
    <div className="details">
       <div><h6 className="text-center">{video.snippet.title}</h6><button type="button" onClick={this.postVideo} className="btn btn-primary">Broadcast</button></div>
    </div>
    <br /><img className="img-circle" id="picture" src={this.props.imgSrc} alt={this.props.imgAlt} />
    </div>
  )
  }
},
renderResult() {
  if(this.state.data != null) {
  const videoItems = this.state.data.map(function(video) {
    return (
      <VideoListItem videoSelect={this.handleSelect} key={video.etag} video={video} />
    );
  }.bind(this));

  return (
    <ul id="vid-list" >
      {videoItems}
    </ul>
  )
}
},
textEntered() {
  if(this.refs.search.value.length > 0) {
  this.setState({ toggle: true })
}
},
getVideos() {
  const query = this.refs.search.value
  const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + query +"&order=viewCount&regionCode=us&relevanceLanguage=en&type=video&key=AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss"

  $.ajax({
      url: url,
      dataType: "json",
      success: function(data) {
        this.setState({ data: data.items });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
},
handleSelect: function(video) {
  this.setState({ selectedVideo: video })
},
postVideo: function() {

const url = this.state.selectedVideo
const author = 'Elise'

const ytplayer = document.getElementById("movie_player");
const seconds = ytplayer.getCurrentTime
const watching = true

var form ={}
form['url'] = url
form['author'] = author
form['seconds'] = seconds
form['watching'] = watching

form.serialize

  $.ajax({
    url: '/videos',
    data: form,
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      console.log(data)
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err)
    }.bind(this)
  })

},
})
