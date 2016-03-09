var React = require('react');

var LandingPage = React.createClass({


  render: function() {
    return(
      <div>
        <div className="song-snap-title">
          <h1>songsnap</h1>
        </div>

        <form method="get" action="signin">
              <input className="sign-out-link" type="submit" value="sign out"></input>
            </form>
      </div>
    );
  }

});

module.exports = LandingPage;
