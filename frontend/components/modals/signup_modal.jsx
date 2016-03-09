var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    AppActions = require('../../actions/app_actions.js'),
    SessionStore = require('../../stores/sessions_store');

var SignupModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      signupUsername: '',
      signupPassword: '',
      errors: []
    };
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    this.listener2 = UserStore.addListener(this.onUserChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.listener2.remove();
  },

  onChange: function() {
    this.setState({ errors: SessionStore.errors() });
  },

  onUserChange: function() {
    if (this.state.errors.length === 0) {
      $('#myModal2').modal('hide');
    }
  },

  signIn: function(){
    var credentials = {
      username: this.state.signupUsername,
      password: this.state.signupPassword
    };

    AppActions.createSession(credentials);
  },

  handleSignupSubmit: function(e){
    e.preventDefault();
    var user = {
      username: this.state.signupUsername,
      password: this.state.signupPassword
    };

    AppActions.createUser(user, this.signIn);
  },

  render: function() {

    return(
      <div className="boxes">
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
            <form onSubmit={this.handleSignupSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type='text'
                  valueLink={this.linkState('signupUsername')}
                  placeholder="Username"/>
              </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type='password'
                    valueLink={this.linkState('signupPassword')}
                    placeholder="Password"/>
                </div>

                <input
                  type="submit"
                  value="Create Account"
                  className="btn btn-default sign-up-btn"/>
              </form>

              <div>
                {this.state.errors}
              </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    );

  }

});

module.exports = SignupModal;
