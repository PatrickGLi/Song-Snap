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
          <h1>songsnap</h1>
        </div>
        <SignIn currentUser={this.state.user}/>

      <h1>{this.state.user}</h1>
        <form method="get" action="/soundcloud/signin">
              <input className="sign-out-link" type="submit" value="sign out"></input>
            </form>
      </div>
    );
  }

});

module.exports = LandingPage;
