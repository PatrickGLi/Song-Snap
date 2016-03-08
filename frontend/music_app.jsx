var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    LandingPage = require('./components/landing_page'),
    App = require('./components/app'),
    MusicSearch = require('./components/music_search/music_search');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}/>
    <Route path="music" component={MusicSearch}/>
  </Route>
);

$(function() {
  var content = document.getElementById('content');
  if (content) {
    ReactDOM.render(<Router>{ routes }</Router> , content);
  }
});
