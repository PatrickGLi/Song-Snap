var React = require('react'),
    ReactDOM = require('react-dom'),
    Face = require('./components/face.jsx');

$(function() {
  var content = document.getElementById('content');
  if (content) {
    ReactDOM.render(<Face/> , content);
  }
});
