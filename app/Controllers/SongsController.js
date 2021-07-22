import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";


//Private
/**Draws the Search results to the page */
function _drawResults() {
  const song = ProxyState.songs
  let template = ''
  song.forEach(s => template += s.Template)
  document.getElementById('songs').innerHTML = template
}

function _drawActive() {
  document.getElementById("active").innerHTML = ProxyState.activeSong.activeTemplate
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActive)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);

    } catch (error) {
      console.error(error);
    }
  }
  async getSong(id) {
    try {
      await songService.getSong(id)
      console.log("Here is the song id : " + id);
    } catch (error) {
      console.error('There was an Issue getting that song')
    }

  }
  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
