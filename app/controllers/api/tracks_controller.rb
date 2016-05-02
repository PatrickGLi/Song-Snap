class Api::TracksController < ApplicationController
  def index
    unless params[:faceData].nil?
      mood_scores = params[:faceData]["0"][:scores]
      mood = calculate_mood(mood_scores)

      @filtered_tracks, @embed_single_track = retrieve_track(mood)
    end
  end

  def music
    render :json
  end

  private

  def retrieve_track(mood)
    if current_user.tracks.empty?
      tracks = current_user.soundcloud_client.get("/me/favorites")
      playlists = current_user.soundcloud_client.get("/me/playlists")

      playlists.each do |playlist|
        tracks.concat(playlist.tracks)
      end

      filtered_tracks = filter_tracks(tracks, mood)

      unless filtered_tracks.nil? || filtered_tracks.empty?
        embed_single_track = current_user.soundcloud_client.get('/oembed', :url => filtered_tracks.sample.permalink_url, autoplay: true)
      else
        embed_single_track = -1
      end

      return [filtered_tracks, embed_single_track]
    else
      filtered_tracks = filter_tracks(current_user.tracks)
    end
  end

  def filter_tracks(tracks, mood)
    filtered_tracks = tracks.select do |track|
      case mood
      when "neutral"
        track.genre =~ /Indie|indie|relax|Relax|hip hop|Hip Hop|Hip hop|Hop|hop|vibes|Vibes|future|Future|jazz|Jazz|classical|Classical|alternative|Alternative|school|School|sex|Sex/ ||
        track.tag_list =~ /Indie|indie|relax|Relax|vibes|Vibes|hip hop|Hip Hop|Hip hop|Hop|hop|future|Future|jazz|Jazz|classical|Classical|alternative|Alternative|school|School|sex|Sex/
      when "anger"
        track.genre =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro(?!nic)|Electro(?!nic)|techno|Techno|dirty|Dirty/ ||
        track.tag_list =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro(?!nic)|Electro(?!nic)|techno|Techno|dirty|Dirty/
      when "contempt"
        track.genre =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro(?!nic)|Electro(?!nic)|techno|Techno|dirty|Dirty/ ||
        track.tag_list =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro(?!nic)|Electro(?!nic)|techno|Techno|dirty|Dirty/
      when "disgust"
        track.genre =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro|Electro|techno|Techno|dirty|Dirty/ ||
        track.tag_list =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro|Electro|techno|Techno|dirty|Dirty/
      when "fear"
        track.genre =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro|Electro|techno|Techno|dirty|Dirty/ ||
        track.tag_list =~ /Rap|rap|trap|Trap|deep|Deep|heavy|Heavy|filthy|Filthy|electro|Electro|techno|Techno|dirty|Dirty/
      when "happiness"
        track.genre =~ /(?!eep) house|(?!ass) house|(?!eep) House|(?!ass) House|dance|Dance|pop|Pop|club|Club|summer|Summer|tropical|Tropical|festival|Festival|funk|Funk|groov|Groov|edm|EDM|Edm/ ||
        track.title =~ /love|Love/ ||
        track.tag_list =~ /(?!eep) house|(?!ass) house|(?!eep) House|(?!ass) House|dance|Dance|pop|Pop|club|Club|summer|Summer|tropical|Tropical|festival|Festival|funk|Funk|groov|Groov|edm|EDM|Edm/ &&
        track.tag_list =~ /(?!Bass)|(?!bass)|(?!filthy)|(?!Filthy)|(?!Deep)|(?!deep)/
      when "sadness"
        track.genre =~ /chill|Chill|rb|RB|r&b|R&B|mood|Mood|sad|Sad|soul|Soul/ ||
        track.title =~ /sad|Sad/ ||
        track.tag_list =~ /chill|Chill|rb|RB|r&b|R&B|mood|Mood|sad|Sad|soul|Soul/
      when "surprise"
        track.genre =~ /(?!eep) house|(?!ass) house|(?!eep) House|(?!ass) House|dance|Dance|pop|Pop|club|Club|summer|Summer|tropical|Tropical|festival|Festival|funk|Funk|groov|Groov|edm|EDM|Edm/ ||
        track.tag_list =~ /(?!eep) house|(?!ass) house|(?!eep) House|(?!ass) House|dance|Dance|pop|Pop|club|Club|summer|Summer|tropical|Tropical|festival|Festival|funk|Funk|groov|Groov|edm|EDM|Edm/
      end
    end

    filtered_tracks
  end

  def calculate_mood(mood_scores)
    highest = 0
    mood = ""

    mood_scores.each do |k, v|
      converted_value = v.to_f
      if converted_value > highest
        highest = converted_value
        mood = k
      end
    end

    mood
  end
end
