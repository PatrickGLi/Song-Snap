var React = require('react'),
    SignIn = require('./sign_in'),
    ReactConstants = require('../../constants/react_constants'),
    SessionStore = require('../../stores/sessions_store'),
    UserStore = require('../../stores/users_store'),
    TrackStore = require('../../stores/tracks_store');
    Face = require('../music_search/face');

var LandingPage = React.createClass({
  getInitialState: function() {
    return({
      user: ""
    });
  },

  componentDidMount: function() {
    this.listener = UserStore.addListener(this.onChange);
    debugger
    if (SessionStore.currentAccessToken() !== -1) {
      this.props.history.pushState(null, "music");
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    this.setState({ user: UserStore.currentUser() });
  },

  componentWillReceiveProps: function(nextProps) {
    if (UserStore.currentUser() &&
        nextProps.currentUser !== -1 &&
        nextProps.currentUser !== null) {
      this.setState({ user: UserStore.currentUser().username });
    } else {
      this.setState({ user: "" });
    }
  },

  changeBackground: function() {
    console.log("hey");
    // debugger

$('body').css({
background: "grey",
transition: "background 7s"
});


    },


  // background: linear-gradient(156deg, #ff00f5, #ffc40d);

  render: function() {
    return(
      <div>
        <SignIn currentUser={this.state.user}/>

        <form method="get" action="/soundcloud/signin">
          <input className="connect-soundcloud pulse" type="submit" value="get started"></input>
        </form>
        <div className="test" onClick={this.changeBackground}></div>
      </div>
    );
  }

});

module.exports = LandingPage;
