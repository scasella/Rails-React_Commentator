var EmojiList = React.createClass({
getInitialState() {
  return {
    data: {}
  }
},
componentDidMount() {
  $.getJSON('/emojiData.json', function(data) {
  this.setState({ data: data })
  }.bind(this));
},
render() {
  return (
    <div id="emoji-div">
    {this.renderList()}
    </div>
  )
},
renderList() {
  if(this.state.data.results == null) {
    return <div></div>
  } else {
  var newArray = this.state.data.results.collection1.map(function(item) {
    return (
         <span id="emoji-span" key={item.emoji.alt} className="glyphicon" onClick={() => this.clickFunc(item.emoji.alt)} > {ReactEmoji.emojify(item.emoji.alt, {emojiType: 'emojione', attributes: {width: '28px', height: '28px'}})}</span>
    )
  }.bind(this));
  return (   <li id="emoji-li" className="list-group-item"> {newArray} </li> )
}
},
clickFunc(e) {
  this.props.handleClick(e)
}
})
