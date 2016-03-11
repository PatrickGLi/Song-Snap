var React = require('react'),
    ReactConstants = require('../../constants/react_constants'),
    SessionStore = require('../../stores/sessions_store'),
    UserStore = require('../../stores/users_store'),
    TrackStore = require('../../stores/tracks_store'),
    Face = require('../music_search/face');

var LandingPage = React.createClass({
  getInitialState: function() {
    return({
      user: false
    });
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onSessionChange);
    this.listener2 = UserStore.addListener(this.onUserChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onSessionChange: function() {
    if (SessionStore.currentUserId() !== null && SessionStore.errors().length <= 0) {
      this.setState({ user: true });
    } else {
      this.setState({ user: false });
    }
  },

  onUserChange: function() {
    if (UserStore.currentUser() && UserStore.errors().length <= 0) {
      this.props.history.pushState(null, "music");
    } else {
      this.setState({ user: false });
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
    var button;
    if (!this.state.user) {
      var button = (
        <div>
          <div className="signup-button" data-toggle="modal" data-target="#myModal">try me</div>
          <div className="signin-button" data-toggle="modal" data-target="#myModal2">sign back in</div>
        </div>
      );
    } else {
      button = <div></div>
    }

    return(
      <div>
        {button}
        <div className="test" onClick={this.changeBackground}></div>
      </div>
    );
  }

});

module.exports = LandingPage;
