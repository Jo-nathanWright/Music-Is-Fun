import { ProxyState } from "../AppState.js";
import { sandBoxApi } from "../Services/AxiosService.js";
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
  if (ProxyState.activeSong) {
    document.getElementById("active").innerHTML = ProxyState.activeSong.activeTemplate
  } else {
    document.getElementById("active").innerHTML = ''
  }

}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  const playlist = ProxyState.playlist
  let template = ''
  playlist.forEach(p => template += p.playlistTemplate)
  document.getElementById('playlist').innerHTML = template
}


//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on('songs', _drawResults)
    ProxyState.on('activeSong', _drawActive)
    ProxyState.on('playlist', _drawPlaylist)
    this.getMySongs()
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

  async getMySongs() {
    try {
      await songService.getMySongs()
    } catch (error) {
      console.error('There was an Issue getting your songs')
    }
  }
  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  async addSong(id) {
    try {
      await songService.addSong(id)
    } catch (error) {
      console.error('There was an Issue adding that song')
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      console.log(id)
      await songService.removeSong(id)
    } catch (error) {
      console.error('There was an Issue deleting that song ' + error)
    }
  }
}
