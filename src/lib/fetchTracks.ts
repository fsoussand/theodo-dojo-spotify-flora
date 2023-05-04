import { PlaylistTrack, SavedTrack, Track } from 'spotify-types';
import { Playlist } from 'spotify-types/typings/playlist';

const apiToken: string =
  'BQDQaWSxWqn_SiU9VJJRiK7FS7E6JfjxidR53wl1FWHrtFJYWGR-9CW3dOWewOyRjZO7qsK6evKLpO963K5xNl67N2gPQwfdlUOaVGbNpFtfIjC1ErUVkscGbKI5VGzUNTuHyhU2O5H58PBIq4qrXS3jrl6_9bzaSAVAOny5RWzVj-2DKRh9ivriwYYfxsuTYAXRraA72SszGKGcRAS7vVhIaWOv8z4sib7ejfPT_o-R-CpqjGJFPRbp__ZuUqwwfHuBaRMjrMObOaKw_ZRpgCHg5jqrfSwcG0JefI4_HBdw0uDItGdYroVYGLHyqSl6B_YM6AheJ_uJsELI4RObIq-i';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
