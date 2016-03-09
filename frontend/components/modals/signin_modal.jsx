var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    AppActions = require('../../actions/app_actions.js'),
    SessionStore = require('../../stores/sessions_store');
    UserStore = require('../../stores/users_store');

var SigninModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      signinUsername: '',
      signinPassword: '',
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

  handleSigninSubmit: function(e){
    e.preventDefault();
    var credentials = {
      username: this.state.signinUsername,
      password: this.state.signinPassword
    };

    AppActions.createSession(credentials);
  },

  render: function() {

    return(
      <div className="boxes">
      <div className="modal fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">welcome back!</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleSigninSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type='text'
                  valueLink={this.linkState('signinUsername')}
                  placeholder="Username"/>
              </div>

                <div className="form-group">
                  <input
                    className="form-control"
                    type='password'
                    valueLink={this.linkState('signinPassword')}
                    placeholder="Password"/>
                </div>

                <input
                  type="submit"
                  value="sign in"
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

module.exports = SigninModal;
