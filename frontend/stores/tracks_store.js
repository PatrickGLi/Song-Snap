var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store;
    TrackConstants = require('../constants/track_constants');
var _tracks = {}

var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case TrackConstants.TRACKS_RECEIVED:
      resetTracks(payload.tracks);
      break;
  }
};

TrackStore.all = function() {
  var tracks = [];
  Object.keys(_tracks).forEach(function(key){
    tracks.push(_tracks[key]);
  });
  return tracks;
};

function resetTracks(tracks) {
  tracks.forEach(function(track) {
    _tracks[track.id] = track;
  });

  TrackStore.__emitChange();
}

module.exports = TrackStore;
