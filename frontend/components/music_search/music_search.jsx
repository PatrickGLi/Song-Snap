var React = require('react'),
    SessionStore = require('../../stores/sessions_store'),
    TrackStore = require('../../stores/tracks_store'),
    EmotionStore = require('../../stores/emotions_store'),
    UserStore = require('../../stores/users_store'),
    MusicSearchActions = require('../../actions/music_search_actions'),
    ReactConstants = require('../../constants/react_constants'),
    Face = require('./face');

var MusicSearch = React.createClass({
  getInitialState: function() {
    return ({
      track: null,
      emotion: null,
      trackLoading: false
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
    this.setState({ track: TrackStore.currentTrack(),
                    trackLoading: false });
  },

  onGetEmotion: function() {
    var currentEmotion = EmotionStore.currentEmotion();

    if (currentEmotion !== null) {
      switch (currentEmotion) {
          case "did not detect":
            var response = "sorry, was your face in the frame?"
            break;
          case "neutral":
            var response = "chill sounds and my usual vibe.";
            $('body').css({
            background: "#595959",
            transition: "background 7s"
            });
            break;
          case "anger":
            var response = "feeling a little Angry?";
            $('body').css({
            background: "#190000",
            transition: "background 7s"
            });
            break;
          case "contempt":
            var response = "feeling some contempt, hmph..";
            $('body').css({
            background: "#ff8f66",
            transition: "background 7s"
            });
            break;
          case "disgust":
            var response = "looking for something nasty.";
            $('body').css({
            background: "#001900",
            transition: "background 7s"
            });
            break;
          case "fear":
            var response = "don't be scared.";
            $('body').css({
            background: "#990000",
            transition: "background 7s"
            });
            break;
          case "happiness":
            var response = "feeling happy or upbeat : )";
            $('body').css({
            background: "#ffa5d2",
            transition: "background 7s"
            });
            break;
          case "sadness":
            var response = "feeling sad.";
            $('body').css({
            background: "#b5dbe8",
            transition: "background 7s"
            });
            break;
          case "surprise":
            var response = "surprise!";
            $('body').css({
            background: "#885ead",
            transition: "background 7s"
            });
        }

      this.setState({ emotion: response });

      if (currentEmotion !== "did not detect") {
        setTimeout(function(){
          this.setState({ trackLoading: true });
        }.bind(this), 1000);
      }
    }
  },

  render: function(){
    var loadSpinner;
    if (this.state.trackLoading) {
      loadSpinner = (
        <div className="spinner">
        </div>
      );
    } else {
      loadSpinner = <div></div>;
    }

    var cam;
    if (SessionStore.currentAccessToken() !== null &&
        SessionStore.currentAccessToken() !== "-1" &&
        SessionStore.currentAccessToken() !== "") {
      cam = (
        <Face tracks={this.state.track}/>
      );
    } else {
      cam = (
        <form method="get" action="/soundcloud/signin">
          <input className="connect-soundcloud pulse" type="submit" value="get started"></input>
        </form>
      );
    }

    var result;
    if (this.state.track !== null && this.state.track !== -1) {
      trackString = this.state.track['html']
      result = <div className="filler" dangerouslySetInnerHTML={{ __html: trackString }} />
    } else {
      result = <div className="filler">
      </div>
    }

    var emotion;
    if (this.state.emotion === null) {
      emotion = <div></div>
    } else {
      emotion = <div className="emotion">{this.state.emotion}</div>
    }

    return (
      <div>
        {loadSpinner}
        {emotion}
        {cam}
        {result}
      </div>
    );
  }
});

module.exports = MusicSearch;
