var React = require('react'),
    SignIn = require('./sign_in'),
    ReactConstants = require('../../constants/react_constants'),
    SessionStore = require('../../stores/sessions_store'),
    UserStore = require('../../stores/users_store');

var LandingPage = React.createClass({
  getInitialState: function() {
    return({ user: "" });
  },

  componentDidMount: function() {
    this.listener = UserStore.addListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  componentWillReceiveProps: function() {
    debugger
    if (UserStore.all().length !== 0 && this.props.currentUser !== -1) {
      this.setState({ user: UserStore.find(this.props.currentUser).username });
    }
  },

  onChange: function() {
    var user = UserStore.find(this.props.currentUser);

    if (user) {
      this.setState({ user: user.username });
    } else {
      this.setState({ user: "" });
    }
  },

  render: function() {
    return(
      <div>
        <div className="song-snap-title">
          songsnap
          <SignIn currentUser={this.state.user}/>
        </div>

        <h1>{this.state.user}</h1>
        <form method="get" action="/soundcloud/signin">
          <input className="sign-out-link" type="submit" value="sign out"></input>
        </form>
      </div>
    );
  }

});

module.exports = LandingPage;
