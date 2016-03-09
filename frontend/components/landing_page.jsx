var React = require('react');

var LandingPage = React.createClass({
  signIn: function() {
    $.get('/signin', {}, function(eventsData) {
      
    });
  },

  render: function() {
    return(
      <div>
        <div id="gradient" />
        <div className="song-snap-title">
          <h1>songsnap</h1>
        </div>
        <div onClick={this.signIn}>
          <h2>Sign into SoundCloud</h2>
        </div>
      </div>
    );
  }

});

module.exports = LandingPage;
