import logo from './assets/logo.svg';
import './App.css';
import { trackUrls } from './assets/track-urls';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTracks } from './lib/fetchTracks';
import { AlbumCover } from './components/AlbumCover';
import { SavedTrack } from 'spotify-types';

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const goToNextTrack = () => {
    setTrackIndex(trackIndex + 1);
  };

  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const getAlbumCover = () => {
    if (tracks) {
      const currentTrack = tracks[trackIndex];
      return <AlbumCover track={currentTrack} />;
    }
    return <p>'No title loaded'</p>;
  };

  const getTrackNameDiv = (index: number) => {
    if (tracks) {
      const trackName = tracks[index]?.track.name;
      return <p>{trackName}</p>;
    }
    return <p>'No title loaded'</p>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test de Flora</h1>
      </header>
      <div className="App-images">
        <p>Il va falloir modifier le code pour faire un vrai blind test !</p>
      </div>
      <div className="App-buttons"></div>
      <button onClick={goToNextTrack}>Next track</button>
      {getAlbumCover()}
      {getTrackNameDiv(1)}
      {getTrackNameDiv(2)}
      {getTrackNameDiv(3)}
    </div>
  );
};

export default App;
