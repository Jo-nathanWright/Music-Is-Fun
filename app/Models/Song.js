export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    //console.log(this._id);
    return `
    <div onclick="app.songsController.getSong('${this._id}')">
    <img src="${this.albumArt}" alt="${this.album}">
   <h3>${this.artist}</h3>
   <p>${this.title}</p>
    </div>
        `;
  }

  get activeTemplate() {
    return `
      <p>Now playing:</p>
      <img src="${this.albumArt}" alt="${this.artist}">
      <h2>${this.artist} - ${this.title}</h2>
      <p>Ablum: ${this.album} | Buy now $${this.price}</p>
      <audio controls
          src="${this.preview}"></audio>
      <button type="button" class="btn btn-primary">➕</button>
    `
  }

  get playlistTemplate() {
    return `

        `;
  }
}
