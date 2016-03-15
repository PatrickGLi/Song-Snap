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


  render: function() {
    var button;
    if (!this.state.user) {
      var button = (
        <div className="start-buttons">
          <div className="signup-button" data-toggle="modal" data-target="#myModal">try me</div>
          <div className="signin-button" data-toggle="modal" data-target="#myModal2">sign back in</div>
          <a className="link" href="https://www.youtube.com/watch?v=uPhvtZm60SU&feature=youtu.be">don't have a soundcloud account? watch a demo</a>
          <div>Hi</div>
        </div>
      );
    } else {
      button = <div></div>
    }

    return(
      <div>
        {button}
      </div>
    );
  }

});

module.exports = LandingPage;
