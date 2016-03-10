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

  componentWillReceiveProps: function(nextProps) {
    if (UserStore.all().length !== 0 &&
        nextProps.currentUser !== -1 &&
        nextProps.currentUser !== null) {
      this.setState({ user: UserStore.find(nextProps.currentUser).username });
    } else {
      this.setState({ user: "" });
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
    var user;
    if (this.state.user !== "") {
      user = "Hi " + this.state.user
    } else {
      user = ""
    }

    return(
      <div>
        <div className="song-snap-title">
          songsnap
          <SignIn currentUser={this.state.user}/>
        </div>

        <div className="username">{user}</div>
        <form method="get" action="/soundcloud/signin">
          <input className="connect-soundcloud pulse" type="submit" value="get started"></input>
        </form>

        <div className="test" onClick={this.changeBackground}>Hi</div>
      </div>
    );
  }

});

module.exports = LandingPage;
