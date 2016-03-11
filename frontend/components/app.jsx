var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    LandingPage = require('./landing_page/landing_page'),
    UserStore = require('../stores/users_store'),
    SessionStore = require('../stores/sessions_store'),
    AppActions = require('../actions/app_actions.js'),
    SigninModal = require('./modals/signin_modal'),
    SignupModal = require('./modals/signup_modal');

var App = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      currentUserId: SessionStore.currentUserId(),
      user: ""
    };
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onSessionChange);
    this.listener2 = UserStore.addListener(this.onUserChange);
    var currentUserId = SessionStore.currentUserId()
    if (currentUserId !== -1) {
      AppActions.fetchCurrentUser(currentUserId);
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onUserChange: function() {
    var user = UserStore.currentUser();

    if (user && UserStore.errors().length <= 0) {
      this.setState({ user: user.username });
    } else {
      this.setState({ user: "" });
    }
  },

  onSessionChange: function(){
    var currentUser;
    var currentUserId = SessionStore.currentUserId();

    if (currentUserId !== null) {
      currentUser = SessionStore.currentUser().username;
    } else {
      currentUser = "";
    }
    this.setState({
      currentUserId: currentUserId,
      user: currentUser
    });
  },

  toggleLogin: function() {
    AppActions.destroySession();
    this.props.history.pushState(null, "/");
  },

  render: function() {
    var user, logout;
    // debugger
    if (this.state.user !== "") {
      logout = <div className="logout" onClick={this.toggleLogin}>log out</div>
      user = "Hi " + this.state.user;
    } else {
      user = "";
      logout = <div></div>
    }

    return(
      <div>
        {logout}
        <div className="song-snap-title">
          songsnap
        </div>
        {this.props.children}
        <SignupModal/>
        <SigninModal/>
        <div className="username">{user}</div>
      </div>
    );
  }
});


module.exports = App;
