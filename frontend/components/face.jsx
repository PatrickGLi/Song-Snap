var React = require('react'),
    FaceActions = require('../actions/face_actions');

var Face = React.createClass({


  componentDidMount: function() {
    // FaceActions.getFaceEmotions();


  },

  render: function() {
    return (
      <div>
        Face
        <form action="server.cgi" method="post" encType="multipart/form-data">
  <input type="file" name="image" accept="image/*" capture/>
  <input type="submit" value="Upload"/>
</form>
      </div>
    )
  }
});

module.exports = Face;
