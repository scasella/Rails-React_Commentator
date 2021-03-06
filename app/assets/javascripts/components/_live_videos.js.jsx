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
componentDidMount() {
  this.initialTestLogin = setInterval(this.isLoggedIn, 3000)
},
isLoggedIn() {
  if(GLOBAL_POSTER != "") {
    clearInterval(this.initialTestLogin)
  }
  this.forceUpdate()
},
initialTestLogin: null,
intervalGet: null,
intervalPost: null,
intervalGetResults: null,
hiddenStyle: {
  display: 'none'
},
broadcastBtnToggle: {
    background: '#000',
    color: 'red'
},
render() {
  return (
    <div>
      <div style={this.toggleVideoLoad() ? this.hiddenStyle : null } className="embed-responsive embed-responsive-16by9">
        <div id="ytplayer">
        </div>
      </div>
      {this.evaluateState()}
  </div>
  )
},
evaluateState() {
  if(this.state.initialized == false) {
    return (
      <div>
      <img className="img-circle" id="picture" src={this.props.imgSrc} alt={this.props.imgAlt} />
      <ul style={GLOBAL_POSTER == "" ? this.hiddenStyle : null} className="nav nav-tabs">
        <li className="active"><a href="#">Kibby</a></li>
        <li><a onClick={() => this.setState({ initialized: true })} href="#">Live Stream</a></li>
      </ul>
      <br />
      {GLOBAL_POSTER == "" ? null : this.atlasSlideshow()}
    </div> )

  } else {
    return (
        <div>
            <form ref="form" className="comment-form" action="/videos" acceptCharset="UTF-8" method="post" onSubmit={this.postVideo}>
          <br />
          <div id="video-well" className="well">
          <input ref="search" id="vid-search" className="form-control" placeholder="Search YouTube..." autoComplete="off" onChange={this.textEntered}></input>{"\u00a0"}{"\u00a0"}
            <button id="broadcast_button" style={this.intervalPost == null ? null : this.broadcastBtnToggle} disabled={!this.state.broadcastEnabled} className="btn btn-success btn-sm" type="submit">{this.intervalPost == null ? 'Broadcast' : 'Broadcasting'}</button>{"\u00a0"}{"\u00a0"}
            <button id="live_button" type="button" className="btn btn-sm btn-button-name" onClick={this.triggerLive}>Watch Live</button>{"\u00a0"}{"\u00a0"}
            <button type="button" className="btn btn-xs btn-danger" onClick={this.exitVideoEnv}><b>X</b></button>

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
atlasSlideshow() {
  return (<div id="slideshow-well" className="well">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
    <ol id="controls" className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
      <li data-target="#myCarousel" data-slide-to="4"></li>
      <li data-target="#myCarousel" data-slide-to="5"></li>
      <li data-target="#myCarousel" data-slide-to="6"></li>
      <li data-target="#myCarousel" data-slide-to="7"></li>
      <li data-target="#myCarousel" data-slide-to="8"></li>
      <li data-target="#myCarousel" data-slide-to="9"></li>
    </ol>
    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img id="item-img" src={this.props.k1} />
      </div>

      <div className="item">
        <img id="item-img" src={this.props.k2} />
      </div>

      <div className="item">
        <img id="item-img" src={this.props.k3} />
      </div>

      <div className="item">
        <img id="item-img" src={this.props.k4} />
        </div>

      <div className="item">
        <img src={this.props.k5} />
      </div>

      <div className="item">
        <img src={this.props.k6} />
      </div>

      <div className="item">
        <img src={this.props.k7} />
      </div>

      <div className="item">
        <img src={this.props.k8} />
      </div>

      <div className="item">
        <img src={this.props.k9} />
      </div>

      <div className="item">
        <img src={this.props.k10} />
      </div>
    </div>

    <a id="controls" className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a id="controls" className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>)
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
  clearInterval(this.intervalGet)
  clearInterval(this.intervalGetResults)
  this.intervalGet = null
  this.intervalGetResults = null
  this.setState({ initialized: false });
  player.pauseVideo()
  this.postVideo(null, true)
},
textEntered() {
  clearInterval(this.intervalGetResults)
  if(this.refs.search.value.length > 0) {
    this.setState({ toggleResults: true })
    this.intervalGetResults = setInterval(this.getResults,3000)
  } else {
    this.setState({ toggleResults: false })
  }
},
getResults() {
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
  clearInterval(this.intervalGet)
  this.intervalGet = null
  this.setState({ broadcastEnabled: true })
  this.setState({ selectedVideo: video });
  const miniUrl = 'http://www.youtube.com/v/' + `${video.id.videoId}`
  player.loadVideoByUrl(miniUrl);
  document.getElementById('ytplayer').style.display = "inline";
},

triggerLive() {
  clearInterval(this.intervalPost)
  this.intervalPost = null
  clearInterval(this.intervalGet)
  this.intervalGet = setInterval(this.getVideo, 3000)
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
if(tempData['watching'] != false) {
  if(tempData['poster'] != GLOBAL_POSTER) {
    if(player.getVideoUrl().search(tempData['url']) == -1 || Math.abs(parseFloat(player.getCurrentTime())  - parseFloat(tempData['time'])) > 5.0 && player.getVideoUrl().search(tempData['url']) != -1 ) {
      const miniUrl = 'http://www.youtube.com/v/' + tempData['url']
      player.loadVideoByUrl(miniUrl, parseFloat(tempData['time']))
      document.getElementById('ytplayer').style.display = "inline";
      this.forceUpdate()
    }
  }
} else {
  clearInterval(this.intervalGet)
  this.intervalGet = null
  player.pauseVideo()
}
},


assignBroadcastValues() {
  this.refs.time.value  = `${player.getCurrentTime()}`
  this.refs.url.value = `${this.state.selectedVideo.id.videoId}`
  this.refs.poster.value = GLOBAL_POSTER
  this.refs.watching.value = true
},
postVideo: function(event, exiting = null) {
  var shouldEnd = false

  if(exiting == true) {
    shouldEnd = true
  }

  if(event != null) {
    event.preventDefault()
    if(this.intervalPost != null) {
      clearInterval(this.intervalPost)
      this.intervalPost = null
      shouldEnd = true
    }
  }

  if(shouldEnd == true) {
      this.refs.time.value  = ""
      this.refs.url.value = ""
      this.refs.poster.value = GLOBAL_POSTER
      this.refs.watching.value = false
    } else {
      this.assignBroadcastValues()
      clearInterval(this.intervalGet)
      clearInterval(this.intervalPost)
      this.intervalPost = setInterval(this.postVideo,10000);
    }

    if(exiting == true && this.intervalPost == null) {
      clearInterval(this.intervalPost)
      return
    } else {
    const form = $(this.refs.form).serialize()
    $.ajax({
      url: '/videos',
      data: form,
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        console.log("cla")
      }.bind(this),
      error: function(xhr, status, err) {
      console.error(xhr, status, err)
      }.bind(this)
    })
    if(exiting == true) {
      clearInterval(this.intervalPost)
      this.intervalPost = null
    }
    this.forceUpdate()
    }
},
})
