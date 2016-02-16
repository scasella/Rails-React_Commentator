{/*  document.getElementById('ytplayer').style.display = "none"*/ }

var LiveVideos = React.createClass({
getInitialState() {
  return {
  data: null,
  toggleResults: false,
  selectedVideo: {},
  initialized: false,
  broadcastEnabled: false
  }
},
interval: "",
intervalGetResults: "",
hiddenStyle: {
  display: 'none'
},
render() {
  return (
    <div id="center_contents_div" className="col-md-5">
      <div style={this.toggleVideoLoad() ? this.hiddenStyle : null } className="embed-responsive embed-responsive-16by9">
        <div id="ytplayer">
        </div>
      </div>
      {this.evaluateState()}
  </div>
  )
},
evaluateState() {
  clearInterval(this.intervalGetResults)
  if(this.state.initialized == false) {
    return (
      <div>
      <img className="img-circle" id="picture" src={this.props.imgSrc} alt={this.props.imgAlt} />
      <br />
      <div id="center_contents_div">
        <button type="button" id="live_button" className="btn btn-button-name" onClick={() => this.setState({ initialized: true })}><span className="glyphicon glyphicon-facetime-video" /></button>
      </div>
    </div> )

  } else {
    if(this.state.toggleResults == true) {
      this.intervalGetResults = setInterval(this.getResults,3000)
    }
    return (
        <div id="video-interface">
            <form ref="form" className="comment-form" action="/videos" acceptCharset="UTF-8" method="post" onSubmit={this.postVideo}>
          <br />
          <div id="video-well" className="well">
          <input ref="search" id="vid-search" className="form-control" placeholder="Search YouTube..." autoComplete="off" onChange={this.textEntered}></input>
          {"\u00a0"}{"\u00a0"}
            <button id="broadcast_button" disabled={!this.state.broadcastEnabled} className="btn btn-success" type="submit">Broadcast</button> {"\u00a0"}
            <button id="live_button" type="button" className="btn btn-button-name" onClick={this.triggerLive}>Live</button>
          </div>
          {this.renderResults()}
          <input type="hidden" ref="url" className="form-control" name="video[url]" />
          <input type="hidden" ref="time" className="form-control" name="video[time]" />
          <input type="hidden" ref="poster" className="form-control" name="video[poster]" />
          <input type="hidden" ref="watching" className="form-control" name="video[watching]" />
          </form>
        </div>
     )
    }
},
renderResults() {
  if(this.state.data != null) {
  const videoItems = this.state.data.map(function(video) {
    return (
      <VideoListItem videoSelect={this.handleSelectResult} key={video.etag} video={video} />
    );
  }.bind(this));

  return (
    <ul id="vid-list" >
      {videoItems}
    </ul>
  )
}
},
toggleVideoLoad() {
  if(this.state.initialized == true) {
  const currentVid = player.getVideoUrl()
  if(`${currentVid}` == 'https://www.youtube.com/watch') {
    return true
  } else {
    return false
  }
  } else {
  return true
}
},
exitVideoEnv() {
  this.setState({ initialized: false });
  player.pauseVideo()
},
textEntered() {
  if(this.refs.search.value.length > 0) {
  this.setState({ toggleResults: true })
} else {
  this.setState({ toggleResults: false })
}
},
getResults() {
  console.log("results called")
  const query = this.refs.search.value
  const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + query +"&order=relevance&regionCode=us&relevanceLanguage=en&type=video&key=AIzaSyAuQCVeNfKhtRk9KlChQPT1nO27DPO_5Ss"

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

handleSelectResult: function(video) {
  this.setState({ broadcastEnabled: true })
  this.setState({ selectedVideo: video });
  const miniUrl = 'http://www.youtube.com/v/' + `${video.id.videoId}`
  player.loadVideoByUrl(miniUrl);
  document.getElementById('ytplayer').style.display = "inline";
},

assignBroadcastValues() {
  this.refs.time.value  = `${player.getCurrentTime()}`
  this.refs.url.value = `${this.state.selectedVideo.id.videoId}`
  this.refs.poster.value = GLOBAL_POSTER

  this.refs.watching.value = true
},

triggerLive() {
  this.interval = setInterval(this.getVideo, 5000)
  this.setState({ broadcastEnabled: false })
},
getVideo() {

var tempData = {}

  $.ajax({
    url: '/videos',
    type: 'GET',
    dataType: 'json',
    async: false,
    success: function(data) {
      tempData = data[0]
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(xhr, status, err)
    }.bind(this)
  })

if(tempData['poster'] != GLOBAL_POSTER) {
  if(player.getVideoUrl().search(tempData['url']) == -1 || Math.abs(parseFloat(player.getCurrentTime())  - parseFloat(tempData['time'])) > 10.0 && player.getVideoUrl().search(tempData['url']) != -1 ) {
    const miniUrl = 'http://www.youtube.com/v/' + tempData['url']
    player.loadVideoByUrl(miniUrl, parseFloat(tempData['time']))
    document.getElementById('ytplayer').style.display = "inline";
    this.forceUpdate()
  }
}

},
postVideo: function(event) {
this.assignBroadcastValues()
if(event != null) {
event.preventDefault() }
const form = $(this.refs.form).serialize()

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
    clearInterval(this.interval)
    this.interval = setInterval(this.postVideo,15000);
},
})
