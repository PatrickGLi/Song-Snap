var React = require('react'),
    SessionStore = require('../../stores/sessions_store'),
    TrackStore = require('../../stores/tracks_store'),
    EmotionStore = require('../../stores/emotions_store'),
    ReactConstants = require('../../constants/react_constants'),
    Face = require('./face');

var MusicSearch = React.createClass({
  getInitialState: function() {
    return ({
      track: null,
      emotion: null
    });
  },

  componentDidMount: function() {
    this.listener = TrackStore.addListener(this.onGetTrack);
    this.listener2 = EmotionStore.addListener(this.onGetEmotion);
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onGetTrack: function() {
    this.setState({ track: TrackStore.currentTrack() });
  },

  onGetEmotion: function() {
    this.setState({ emotion: EmotionStore.currentEmotion() })
  },

  render: function(){
    var cam;
    if (SessionStore.currentAccessToken() !== null && SessionStore.currentAccessToken() !== "-1") {
      cam = (
        <Face/>
      );
    } else {
      cam = (
        <form method="get" action="/soundcloud/signin">
          <input className="connect-soundcloud pulse" type="submit" value="get started"></input>
        </form>
      );
    }

    var result;
    if (this.state.track !== null) {
      trackString = this.state.track['html']
      result = <div dangerouslySetInnerHTML={{ __html: trackString }} />
    } else {
      result = <div></div>
    }

    var emotion;
    if (this.state.emotion === null) {
      emotion = <div></div>
    } else {
      emotion = <div className="emotion">Current emotion: {this.state.emotion}</div>
    }

    return (
      <div>
        {result}
        <div className="emotion">Current emotion: (change later){this.state.emotion}</div>
        {cam}
      </div>
    );
  }
});

module.exports = MusicSearch;
