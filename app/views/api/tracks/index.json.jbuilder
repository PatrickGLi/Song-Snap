json.array! @filtered_tracks do |track|
  json.id track.id
  json.title track.title
  json.track_url track.permalink_url
  json.uri track.uri
  json.description track.description
end
