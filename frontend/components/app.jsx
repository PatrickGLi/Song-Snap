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
      signupUsername: '',
      signupPassword: '',
      signinUsername: '',
      signinPassword: ''
    };
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    if (SessionStore.currentUser() !== -1) {
      AppActions.fetchCurrentUser(SessionStore.currentUser());
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function(){
    this.setState({
      currentUser: SessionStore.currentUser(),
    });
  },

  render: function() {
    return(
      <div>
        <LandingPage currentUser={this.state.currentUser}/>
        <SignupModal/>
        <SigninModal/>
      </div>
    );
  }
});


module.exports = App;
