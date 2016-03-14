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
    var currentUserId = SessionStore.currentUserId();
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

    if (currentUserId !== null && currentUserId !== -1) {
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
    var logout;
    if (this.state.user !== "") {
      logout = <div className="logout" onClick={this.toggleLogin}>log out, {this.state.user}</div>
    } else {
      logout = <div></div>
    }

    return(
      <div>
        <div className="modal fade boxes" id="myModal3" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">about songsnap</h4>
              </div>
              <div className="modal-body">
                <p>Hey, this is a test project by Patrick Li. Photograph yourself and get a track that matches your expression. You can try happy, sad, angry, disgusted, contemptful, surprised, and neutral faces. Oh, and you need a Soundcloud account because it will grab one of your favorited or playlisted tracks. Have fun!</p>
              </div>
            </div>
          </div>
        </div>

        {logout}
        <div className="about-button" data-toggle="modal" data-target="#myModal3">about songsnap</div>
        <div className="song-snap-title">
          <img className="music-note" src="/assets/music_note.png"></img>
          songsnap
        </div>
        {this.props.children}
        <SignupModal/>
        <SigninModal/>
      </div>
    );
  }
});


module.exports = App;
