var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store;
    TrackConstants = require('../constants/track_constants');
var _tracks = {};
var _embedded_track = null;

var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case TrackConstants.TRACKS_RECEIVED:
      resetTrack(payload.tracks);
      break;
  }
};

TrackStore.currentTrack = function() {
  return _embedded_track;
};

function resetTrack(tracks) {
  if (tracks !== -1) {
    _embedded_track = tracks.embedded_track
  } else {
    _embedded_track = -1;
  }

  TrackStore.__emitChange();
}

module.exports = TrackStore;
