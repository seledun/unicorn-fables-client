import {SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID} from "./keys.jsx";


    
// Import API keys
const spotify_client_id = SPOTIFY_CLIENT_ID;
const spotify_client_secret = SPOTIFY_CLIENT_SECRET;

 async function Spotify()  {
        console.log("SPOTIFY!");


    const result = await fetch('https://accounts.spotify.com/api/token', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+ btoa(spotify_client_id + ':' + spotify_client_secret)
           // 'Authorization': "Basic " + new Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64")
        },
        body: 'grant_type=client_credentials'

    });

    const data = await result.json();    
    return data.access_token;
}; 


async function spotifySearch(token, query) {
    console.log("Inne i Inne i searchTrack: " + query)   
    console.log('https://api.spotify.com/v1/search?q='+ query +'&type=track')
    console.log(token);
 
    const result = await fetch('https://api.spotify.com/v1/search?q='+ query +'&type=track', { 
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token }
    });

    const data = await result.json();
    return data;
};



export {Spotify, spotifySearch};



/*
const getPlaylist = async (token) => {
    console.log("Inne i getPlaylist")
    let playlist_id = "68cO5wxW5lbw7kR2Mpht9l?si=2f026131f99644f5"; //DAG - lös natt: 71tnr2kYXHe0YLcXsXeO4G?si=f13c5e5f0e8c422f
 
    const result = await fetch('https://api.spotify.com/v1/playlists/{'+ playlist_id +'}/tracks', { 
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token }
    });

    const data = await result.json();
    return data;  
} */

