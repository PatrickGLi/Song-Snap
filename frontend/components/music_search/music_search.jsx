var React = require('react'),
    SessionStore = require('../../stores/sessions_store'),
    TrackStore = require('../../stores/tracks_store'),
    ReactConstants = require('../../constants/react_constants'),
    Face = require('./face');

var MusicSearch = React.createClass({
  getInitialState: function() {
    return ({
      track: null
    });
  },

  componentDidMount: function() {
    this.listener = TrackStore.addListener(this.onGetTrack);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onGetTrack: function() {
    this.setState({ track: TrackStore.currentTrack() });
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

    return (
      <div>
        {result}
        {cam}
      </div>
    );
  }
});

module.exports = MusicSearch;
