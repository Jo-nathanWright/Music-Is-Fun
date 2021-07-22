import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res)
      })

      .catch(err => {
        throw new Error(err);
      });
  }

  async getSong(id) {
    let activeSong = await ProxyState.songs.find(s => s.id == id)
    // let res = await iTuneApi.get('search?term=' + id)
    console.log("Id from the service " + id)
    ProxyState.activeSong = activeSong
    // ProxyState.playlist = ProxyState.playlist
    console.log(ProxyState.activeSong);
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    const res = await sandBoxApi.get()
    ProxyState.playlist = res.data.map(p => new Song(p))
    //TODO What are you going to do with this result
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    const res = await sandBoxApi.post('', ProxyState.activeSong)
    console.log(res.data);
    const newSong = new Song(res.data)
    ProxyState.playlist = [...ProxyState.playlist, newSong]
    ProxyState.activeSong = newSong
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    const res = await sandBoxApi.delete("" + id)
    console.log(res);
    ProxyState.playlist = ProxyState.playlist.filter(p => p.id != id)
    ProxyState.activeSong = null
  }
}

const service = new SongsService();
export default service;
