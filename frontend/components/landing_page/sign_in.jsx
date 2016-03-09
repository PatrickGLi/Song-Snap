var React = require('react'),
    ReactConstants = require('../../constants/react_constants'),
    SignInActions = require('../../actions/signin_actions'),
    History = require('react-router').History;

var SignIn = React.createClass({
  mixins: [History],

  toggleLogin: function() {
    SignInActions.destroySession();
    this.history.pushState(null, "/");
  },

  render: function() {
    var button;
    if (ReactConstants.CURRENT_USER_ID !== -1) {
      button = <div onClick={this.toggleLogin}>Logout</div>
    } else {
      button = <button data-toggle="modal" data-target="#myModal">try me</button>
    }

    return(
      <div>
        <div onClick={this.toggleLogin}>Logout</div>
        {button}
      </div>
    );
  }
});

module.exports = SignIn;
