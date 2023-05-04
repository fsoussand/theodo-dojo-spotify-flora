import logo from './assets/logo.svg';
import './App.css';
import { trackUrls } from './assets/track-urls';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTracks } from './lib/fetchTracks';
import { AlbumCover } from './components/AlbumCover';
import { SavedTrack } from 'spotify-types';
import Swal from 'sweetalert2';

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const getTrackId = (index: number) => {
    if (tracks && tracks[index]) return tracks[index]?.track.id;
  };

  const [currentTrackId, setCurrentTrackId] = useState(getTrackId(trackIndex));

  const goToNextTrack = () => {
    setTrackIndex(trackIndex + 1);
    if (tracks && tracks[trackIndex]) {
      setCurrentTrackId(tracks[trackIndex]?.track.id);
    }
  };

  const getAlbumCover = () => {
    if (tracks) {
      const currentTrack = tracks[trackIndex];
      return <AlbumCover track={currentTrack} />;
    }
    return <p>'No title loaded'</p>;
  };

  const getTrackUrl = () => {
    if (tracks) {
      const currentTrack = tracks[trackIndex];
      const url = currentTrack?.track.preview_url;
      return url;
    }
  };

  const getTrackNameButton = (index: number) => {
    if (tracks) {
      const trackName = tracks[index]?.track.name;
      return <button>{trackName}</button>;
    }
    return <p>'No title loaded'</p>;
  };

  const checkAnswer = (id: string) => {
    if (id === currentTrackId) {
      Swal('Bravo', 'Sous-titre', 'success');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test de Flora</h1>
      </header>
      <div className="App-images"></div>
      <div className="App-buttons"></div>
      <button onClick={goToNextTrack}>Next track</button>
      <audio src={getTrackUrl()} autoPlay controls />
      <p>What is this song ?</p>
      <div>
        {getTrackNameButton(trackIndex)}
        {getTrackNameButton(trackIndex + 1)}
        {getTrackNameButton(trackIndex + 2)}
      </div>
    </div>
  );
};

export default App;
