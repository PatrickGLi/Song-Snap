var React = require('react'),
    SignIn = require('./sign_in'),
    ReactConstants = require('../../constants/react_constants');

var LandingPage = React.createClass({



  render: function() {
    var signIn;
    if (ReactConstants.CURRENT_USER_ACCESS_TOKEN) {
      signIn = <SignIn/>
    } else {
      signIn = <div></div>;
    }

    return(
      <div>
        <div className="song-snap-title">
          <h1>songsnap</h1>
        </div>
        {signIn}
        <form method="get" action="/soundcloud/signin">
              <input className="sign-out-link" type="submit" value="sign out"></input>
            </form>
      </div>
    );
  }

});

module.exports = LandingPage;
