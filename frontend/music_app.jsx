var React = require('react'),
    ReactDOM = require('react-dom');

$(function() {
  var content = document.getElementById('content');
  if (content) {
    ReactDOM.render(<Router>{routes}</Router> , content);
  }
});
