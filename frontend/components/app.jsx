var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    LandingPage = require('./landing_page/landing_page'),
    SessionStore = require('../stores/sessions_store'),
    AppActions = require('../actions/app_actions.js');

var App = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      username: '',
      password: '',
    };
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    AppActions.fetchAllUsers();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function(){
    this.setState({
      currentUser: SessionStore.currentUser(),
    });
  },

  signIn: function(user){
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };

    AppActions.createSession(credentials);
  },

  handleSubmit: function(e){
    e.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    };

    AppActions.createUser(user, this.signIn);
  },

  render: function() {
    return(
      <div>
        <LandingPage currentUser={this.state.currentUser}/>


        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">welcome to songsnap</h4>
            </div>
            <div className="modal-body">
              photograph yourself. get a playlist for your mood.
            </div>
            <div className="modal-body">

              <div className="form-group">
                <input
                  className="form-control"
                  type='text'
                  valueLink={this.linkState('username')}
                  placeholder="Username"/>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    id="password"
                    className="form-control"
                    type='password'
                    valueLink={this.linkState('password')}
                    placeholder="Password"/>
                </div>

                <input
                  type="submit"
                  value="Create Account"
                  className="btn btn-default sign-up-btn"/>
              </form>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }
});





module.exports = App;
