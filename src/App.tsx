import logo from './assets/logo.svg';
import './App.css';
import { trackUrls } from './assets/track-urls';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTracks } from './lib/fetchTracks';

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const goToNextTrack = () => {
    setTrackIndex(trackIndex + 1);
  };

  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  if (tracks) console.log(tracks[0]?.track.name);

  const firstTrackNameDiv = tracks ? (
    <p>{tracks[0]?.track.name}</p>
  ) : (
    <p>'No title loaded'</p>
  );

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
      <audio src={trackUrls[trackIndex]} autoPlay controls />
      <button onClick={goToNextTrack}>Next track</button>
      <p>{tracks?.length}</p>
      {firstTrackNameDiv}
    </div>
  );
};

export default App;
