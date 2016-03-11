var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    LandingPage = require('./landing_page/landing_page'),
    SessionStore = require('../stores/sessions_store'),
    AppActions = require('../actions/app_actions.js'),
    SigninModal = require('./modals/signin_modal'),
    SignupModal = require('./modals/signup_modal');

var App = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      user: ""
    };
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    this.listener2 = UserStore.addListener(this.onUserChange);
    var currentUser = SessionStore.currentUser()
    if (currentUser !== -1) {
      AppActions.fetchCurrentUser(currentUser);
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onUserChange: function() {
    var user = UserStore.currentUser();

    if (user) {
      this.setState({ user: user.username });
    } else {
      this.setState({ user: "" });
    }
  },

  onChange: function(){
    var currentUser = SessionStore.currentUser();
    this.setState({
      currentUser: currentUser,
    });
  },

  render: function() {
    var user;
    if (this.state.user !== "") {
      user = "Hi " + this.state.user;
    } else {
      user = "";
    }

    return(
      <div>
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
