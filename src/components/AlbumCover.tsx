import { SavedTrack } from 'spotify-types';

interface AlbumCoverArgs {
  track: SavedTrack;
}

export const AlbumCover = ({ track }: AlbumCoverArgs) => {
  const src = track.track.album.images[0]?.url;
  if (src) return <img src={src} style={{ width: 400, height: 400 }} />;
};
