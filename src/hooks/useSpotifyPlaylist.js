import { useState, useEffect } from 'react';

export function useSpotifyPlaylist(playlist_id, auth_token) {
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        async function fetchSearchResults() {
            let responseBody = {}
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/playlists/4S9D4eYUYqIR9CqiMfvNJo?${playlist_id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `${auth_token}`,
                        },
                        signal: controller.signal
                    }
                );
                responseBody = await response.json();
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled");
                } else {
                    setError(true);
                    throw e;
                }
            }
            if (!ignore) {
                setLoading(false);
                setError(false);
                setPlaylist(responseBody.tracks.items || []); // incase there are no results
            }
        }
        if (playlist_id) {
            fetchSearchResults();
        }
        return () => {
            setLoading(false);
            controller.abort();
            ignore = true;
        }
    }, [playlist_id, auth_token]);
    return [playlist, loading, error];
}
