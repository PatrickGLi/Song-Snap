var React = require('react'),
    ReactConstants = require('../../constants/react_constants'),
    SignInActions = require('../../actions/signin_actions'),
    History = require('react-router').History;

var SignIn = React.createClass({
  mixins: [History],

  toggleLogin: function() {
    SignInActions.destroySession();
    // this.history.pushState(null, "/");
  },

  render: function() {
    var button;
    if (this.props.currentUser !== "") {
      button = <div className="logout" onClick={this.toggleLogin}>log off</div>
    } else {
      button = (
        <div>
          <div className="signup-button" data-toggle="modal" data-target="#myModal">try me</div>
          <div className="signin-button" data-toggle="modal" data-target="#myModal2">sign back in</div>
        </div>
      );
    }

    return(
      <div>
        {button}
      </div>
    );
  }
});

module.exports = SignIn;
