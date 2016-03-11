var React = require('react'),
    SessionStore = require('../../stores/sessions_store'),
    Face = require('./face');

var MusicSearch = React.createClass({

  componentDidMount: function() {
    console.log(SessionStore.currentAccessToken());
    debugger
  },

  render: function(){
    return (
      <div>
        <form method="get" action="/soundcloud/signin">
          <input className="connect-soundcloud pulse" type="submit" value="get started"></input>
        </form>
      </div>
    );
  }
});

module.exports = MusicSearch;
