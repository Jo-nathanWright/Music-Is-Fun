export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
  }

  get Template() {
    //console.log(this._id);
    return `
    <div onclick="app.songsController.getSong('${this.id}')">
    <img src="${this.albumArt}" alt="${this.album}">
   <h3>${this.artist}</h3>
   <p>${this.title}</p>
    </div>
        `;
  }

  get activeTemplate() {
    return `
      <h4>Now playing:</h4>
      <div class="text-center">
      <img src="${this.albumArt}" alt="${this.artist}">
      <h3>${this.artist} - ${this.title}</h3>
      <p>Ablum: ${this.album} | Buy now $${this.price}</p>
      <audio controls
          src="${this.preview}"></audio>
      <button type="button" class="btn btn-primary" onclick="app.songsController.addSong('${this.id}')">➕</button>
      </div>
    `
  }

  get playlistTemplate() {
    return `
       <div class="bg-dark text-light text-center mb-2">
           <p>${this.artist}</p>
           <p>${this.title}</p>
           <button type="button" class="btn btn-primary mb-1" onclick="app.songsController.removeSong('${this.id}')">Delete</button>
       </div>
        `;
  }
}
