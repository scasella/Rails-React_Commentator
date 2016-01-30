
var VideoListItem = React.createClass({
render() {
  return (<li id="li-vid" className="list-group-item" onClick={() => this.props.videoSelect(this.props.video)} >
    <div id="li-vid" className="video-list-media">
      <div className="media-left">
        <img className="media-object" height="50" width="60" src={this.props.video.snippet.thumbnails.default.url} />
      </div>
      <div className="media-body">
        <div className="media-heading small">{this.props.video.snippet.title}</div>
      </div>
    </div>
  </li>
  )
}
})
