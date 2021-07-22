// @ts-ignore
export const sandBoxApi = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/YOURNAME/songs",
  timeout: 10000
});

// @ts-ignore
export const iTuneApi = axios.create({
  baseURL: "https://itunes.apple.com/",
  timeout: 10000
});
