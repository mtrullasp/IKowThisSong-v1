import { action, observable, reaction, computed, toJS } from "mobx";
import { History } from "history";

import {
  MTRULLASP_USER_ID,
  ROUTE_ARTISTS,
  ROUTE_COMPOSERS,
  ROUTE_HOME,
  ROUTE_PLAYLIST,
  ROUTE_PLAYLISTS, ROUTE_TRACKS
} from "../util/constants";
//import composersTs from "../data/composers";
//import { getComposers, insertConposers } from "../data/dbComposers";
//import composersPhoto from "../data/composersPhoto";
//import composers from "../data/composers";
import * as $ from "jquery";
import axios from "axios";

export class IComposer {
  IdComposer: number;
  IdDeezer: number;
  Nom: string;
  Nivell: number;
  Bio: string;
  AnyoNeix: number;
  AnyoDefu: number;
  PictureMediumURL: string;
}

export interface IDZ {
  Event: {
    subscribe: (key: string, callback: Function) => void;
  };
  api: any;
  login: (callback: (response: any) => any, perms: any) => void;
  player: {
    playPlaylist(playlistId: number, autoPlay: boolean, index: number);
    getCurrentIndex(): number;
    isPlaying: boolean;
    next: () => void;
    prev: () => void;
    play: () => void;
    pause: () => void;
  };
}

declare let window: any;
const DZ: IDZ = window.DZ;

//const {getFirstImageURL} = require("../../node_modules/first-image-search-load");

export interface IAlbum {
  id: number;
  title: string;
  cover_medium: string;
  cover_big: string;
}

export interface IInterpret {
  id: number;
  name: string;
}

export interface ITrack {
  id: number; //The track's Deezer id
  readable: boolean; //true if the track is readable in the player for the current user	boolean
  title: string; //The track's fulltitle	string
  title_short: string; //The track's short title	string
  title_version: string; //The track version	string
  unseen: boolean; //The track unseen status	boolean
  isrc: string; //The track isrc	string
  link: string; //The url of the track on Deezer	url
  share: string; //The share link of the track on Deezer	url
  duration: number; //The track's duration in seconds	int
  track_position: number; //The position of the track in its album	int
  disk_number: number; //The track's album's disk number	int
  rank: number; //The track's Deezer rank	int
  release_date: Date; //The track's release date	date
  explicit_lyrics: boolean; //Whether the track contains explicit lyrics	boolean
  preview: string; //The url of track's preview file. This file contains the first 30 seconds of the track	url
  bpm: number; //beats per minute	float
  gain: number; //Signal strength	float
  available_countries: Array<string>; //List of countries where the track is available	list
  alternative: string; //Return an alernative readable track if the current track is not readable	track
  contributors: Array<Object>; //Return a list of contributors on the track	list
  artist: IInterpret; //	artist object containing : id, name, link, share, picture, picture_small, PictureMediumURL, picture_big, picture_xl, nb_album, nb_fan, radio, tracklist, role	object
  album: IAlbum; //	album object containing : id, title, link, cover, cover_small, cover_medium, cover_big, cover_xl, release_date	object
}

export interface IResponseComment {
  data: Array<IComment>;
  total: number;
}

export interface IComment {
  id: string;
  text: string;
}

export interface IUser {
  name: string;
  id: string;
}

export interface IResponseCollection<P> {
  data: Array<P>;
  next: string;
}

export class TArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  time_add: string;
  isComposer: boolean;
}

export interface IPlaylist {
  id: number;
  title: string;
  description: string;
  duration: number;
  rating: number;
  nb_tracks: number;
  fans: number;
  creator: IUser;
  link: string;
  picture_medium: string;
  picture_big: string;
  picture: string;
}

export class TMyTab {
  id: string;
  index: number;
  title: string;
  routePath: string;
  count?: number;
  onEnter?: () => void;
}

export class AppState {
  constructor() {
    window.addEventListener("keydown", event => {
      console.log(event.key);
      if (event.key === "MediaTrackNext") {
        this.playerNext();
      }
      if (event.key === "MediaTrackPrevious") {
        this.playerPrev();
      }
      if (event.key === "Escape") {
        this.playerPause();
        this.goBack();
      }
    });

    /*
    getComposers().then(resp => {
      this.composers = resp;
    });
*/
    this.userArtistsFromApi = [];

    DZ.Event.subscribe("player_play", () => {
      this.activeTrackIndex = DZ.player.getCurrentIndex();
      this.imageSide = "hifiAntic.gif";
    });

    DZ.Event.subscribe("player_paused", () => {
      this.imageSide = "hifiAnticFix.gif";
    });

    DZ.Event.subscribe("player_position", (resp: Array<any>) => {
      this.trackProgress = resp[0]; //
    });

    //insertConposers(composers);

    reaction(
      () => this.userId,
      user => {
        /**
         * Coomposers. API Propi SQL SERVER ASP.NET WEB API
         */
        this.getComposers();
        /**
         * Artists
         */
        DZ.api(
          "user/me/artists?limit=1000",
          (artists: IResponseCollection<TArtist>) => {
            this.userArtistsFromApi = artists.data;
            //this.setTabActiveIndex(0);

            /*this.userArtistsFromApi.forEach(artist => {
              if (artist.PictureMediumURL.endsWith("000000-80-0-0.jpg")) {
                const nomsencer = artist.name.split(" ");
                const cognom =
                  nomsencer.length > 1
                    ? nomsencer[nomsencer.length - 1].trim().toLowerCase()
                    : nomsencer[0].trim().toLowerCase();
                /!*
                artist.PictureMediumURL =
                  "https://www.biografiasyvidas.com/biografia/" +
                  cognom.charAt(0) +
                  "/fotos/" +
                  cognom +
                  ".jpg";
*!/
                /!*
                DZ.api(
                  "artist/" + artist.id + "/comments",
                  (comments: IResponseComment) => {
                    if (comments.total) {
                      comments.data.forEach(comment => {
                        if (comment.text.startsWith("{")) {
                          try {
                            const json = JSON.parse(comment.text);
                            artist.PictureMediumURL = json["photo"];
                          } catch (e) {}
                        }
                      });
                    }
                  }
                );
*!/
              }
            });*/
            //dthis.getdMoreUserArtists(artists.next);
          }
        );

        /**
         * Playlists
         */
        this.isLoading = true;
        DZ.api(
          "user/me/playlists?limit=10000",
          (list: IResponseCollection<IPlaylist>) => {
            this.isLoading = false;
            this.userPlaylistsFromApi = list.data;
            this.tabDataSet.find(tab => tab.id === "playlists").count =
              list.data.length;
          }
        );
      }
    );

    reaction(
      () => this.userArtistsFromApi,
      artists => {
        this.tabDataSet.find(
          tab => tab.id === "composers"
        ).count = this.composersCount();
        this.tabDataSet.find(
          tab => tab.id === "artists"
        ).count = this.artistsCount();
      }
    );

    reaction(
      () => this.composers.length,
      () => {
        this.tabDataSet.find(
          tab => tab.id === "composers"
        ).count = this.composersCount();
      }
    );

    /**
     * Events
     */
  }
  /*
  getdMoreUserArtists = (urlParam: string) => {
    if (!urlParam) {
      return;
    }
    const p = urlParam.indexOf("user/me/");
    const url = urlParam.substr(p);
    DZ.api(url, (artists: IResponseCollection) => {
      this.userArtistsFromApi = artists.data;
      //this.getdMoreUserArtists(artists.next);
    });
    DZ.api(url, (playlists: IResponseCollection) => {
      this.userPlaylistsFromApi = playlists.data;
      //this.getdMoreUserArtists(artists.next);
    });
  };
*/

  @action getComposers(): Promise<any> {
    const URL_COMPOSERS = "http://localhost:50688/api/composers";
    return axios.get(URL_COMPOSERS).then(resp => {
      this.composersFromApi = resp.data;
    });
  }

  @observable user: IUser;

  /*
  DZ.Event.subscribe("player_play", function(evt_name) {
    alert("playing");

    console.log("Player is playing");
  });
*/

  @action
  playerNext() {
    const index = this.activeTrackIndex + 1;
    this.playerChangeIndex(index);
  }

  @action
  playerPrev() {
    const index = this.activeTrackIndex - 1;
    this.playerChangeIndex(index);
  }

  private isComposer = (artistId: number): boolean => {
    return false; //!!(this.composers.find(c => c.IdDeezer === artistId);
  };

  @observable userArtistsFromApi: Array<TArtist>;
  @computed
  get userArtistsFromApiResolt(): Array<TArtist> {
    return this.userArtistsFromApi.map(artist => {
      return { ...artist, isComposer: this.isComposer(artist.id) };
    });
  }

  @computed
  get userArtists(): Array<TArtist> {
    if (!this.userArtistsFromApiResolt) {
      return [];
    }
    return this.userArtistsFromApiResolt
      .filter((artist: TArtist) => {
        if (this.showOnlyComposers) {
          if (!this.isComposer(artist.id)) {
            return false;
          }
        } else if (this.isComposer(artist.id)) {
          return false;
        }
        return artist;
      })
      .filter((artist: TArtist) => {
        if (!this.artistNameFilter) {
          return true;
        }
        return artist.name
          .toLowerCase()
          .includes(this.artistNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
        if (a1.nb_fan > a2.nb_fan) {
          return -1;
        }
        if (a1.nb_fan < a2.nb_fan) {
          return 1;
        }
        return 0;
      });
  }

  //private composersPhotos = composersPhoto;
  private getArtistPhoto(artist: TArtist, defaultPhoto: string): string {
/*
    const myPhoto = this.composersPhotos.find(photo => photo.id === artist.id);
    if (!artist.isComposer) {
      return defaultPhoto;
    }
    return !!myPhoto ? myPhoto.foto : defaultPhoto;
*/
    return defaultPhoto;
  }
/*
  private getComposerPhoto(composer: IComposer): string {
    const myPhoto = this.composersPhotos.find(photo => photo.id === composer.IdDeezer);
    return !!myPhoto ? myPhoto.foto : '';
  }
*/

  @observable userPlayListSortField: string = "title";
  @observable userPlaylistsFromApi: Array<IPlaylist>;
  @computed
  get userPlaylists(): Array<IPlaylist> {
    if (!this.userPlaylistsFromApi) {
      return [];
    }
    const sortBy = this.userPlayListSortField;
    return this.userPlaylistsFromApi
      .filter((playlist: IPlaylist) => {
        if (!this.artistNameFilter) {
          return true;
        }
        return playlist.title
          .toLowerCase()
          .includes(this.artistNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
        if (a1[sortBy] > a2[sortBy]) {
          return -1;
        }
        if (a1[sortBy] < a2[sortBy]) {
          return 1;
        }
        return 0;
      });
  }

  private artistsCount(): number {
    return this.userArtistsFromApi.length;
  }

  private composersCount(): number {
    return this.composers.length;
  }

  @observable composersFromApi: Array<IComposer> = [];
  @computed
  get composers(): Array<IComposer> {
    return this.composersFromApi
      /*.filter(c => !!c.IdDeezer)*/
      .filter((composer: IComposer) => {
        if (!this.composerNameFilter) {
          return true;
        }
        return composer.Nom
          .toLowerCase()
          .includes(this.composerNameFilter.toLowerCase());
      })
      .sort((a1, a2): number => {
        if (a1.AnyoNeix > a2.AnyoNeix) {
          return 1;
        }
        if (a1.AnyoNeix < a2.AnyoNeix) {
          return -1;
        }
        return 0;
      });
  }

  @computed
  get userId(): string {
    if (!this.user) {
      return "";
    }
    return this.user.id;
  }

  @observable isPlayHover: boolean = false;
  @action
  setPlayHover(hover: boolean) {
    this.isPlayHover = hover;
    this.statusPlay = hover ? "Here we go!" : "";
  }
  @observable statusPlay: string;

  @action
  login() {
    DZ.login(
      response => {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          DZ.api("/user/me", (user: IUser) => {
            this.user = user;
            console.log("Good to see you, " + user.name + ".");
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { perms: "basic_access,email" }
    );
  }

  @observable APP_ID: string = "272642";

  @observable artistIdActive: number;

  @action
  setHistory(history: any) {
    this.history = history;
    this.history.listen(ls => {
      this.canGoBack = (this.history.length > 1);
      //this.canGoForward = (ls.state.action === 'pop');
    });
/*
    if (this.isEntornDiscover) {
      this.setTabActiveIndex(0);
    }
*/
  }
  @action
  go(path: string) {
    if (this.history.location.pathname === path) {
      return;
    }
    this.history.push(path);
  }
  @action
  goArtistTracks(artistId: number) {
    this.history.push("/Me/Artist/" + artistId.toString() + "/Tracks");
  }
  @observable canGoBack: boolean;
  @action
  goBack() {
    this.history.goBack();
  }
  @observable canGoForward: boolean;
  @action
  goForward() {
    this.history.goForward();
  }
  @action
  goHome() {
    this.go(ROUTE_HOME);
  }
  private history: History;

  @action
  goPlaylistTracks(playlistId: number) {
    //this.history.push("http://127.0.0.1:3000/Me/Playlist/1600104235/Tracks")
    if (!playlistId) {
      return;
    }
    DZ.player.playPlaylist(playlistId, true, 0);
    //this.history.push("/Me/Playlist/" + playlistId.toString() + "/Tracks");
  }

  @action
  filterByArtistNsme(artistNameFilter: string) {
    this.artistNameFilter = artistNameFilter;
  }
  @observable artistNameFilter: string;


  @action
  filterByComposerNsme(artistNameFilter: string) {
/*
    if (artistNameFilter.trimLeft().trimRight().length < 3) {
      return;
    }
*/
    this.composerNameFilter = artistNameFilter;
  }
  @observable composerNameFilter: string;
  /*
      getImageArtist = (artitstName: string): Promise<string> => {
        return getFirstImageURL(artitstName);
      }
  */

  private tabMyMusica = [ROUTE_ARTISTS, ROUTE_PLAYLISTS];

  @observable myMusicActiveIndex: number;
  @action
  setMyMusicActiveIindex(index: number) {
    this.go(this.tabMyMusica[index]);
    this.myMusicActiveIndex = index;
  }

  @observable myMusicActiveTabValue: string;
  @action
  setMyMusicActiveTabValue(value: string) {
    this.myMusicActiveTabValue = value;
  }

  @observable
  tabDataSet: Array<TMyTab> = [
    {
      id: "composers",
      index: 0,
      title: "My Composers",
      routePath: ROUTE_COMPOSERS,
      count: null,
      onEnter: () => {
        this.showOnlyComposers = true;
      }
    },
    {
      id: "artists",
      index: 1,
      title: "My artists",
      routePath: ROUTE_ARTISTS,
      count: null,
      onEnter: () => {
        this.showOnlyComposers = false;
      }
    },
    {
      id: "kassikRanks",
      index: 2,
      title: "My Klassic Ranks",
      routePath: ROUTE_ARTISTS,
      count: null,
      onEnter: () => {
        this.showOnlyComposers = false;
      }
    },
    {
      id: "playlists",
      count: null,
      index: 3,
      title: "My PlayLists",
      routePath: ROUTE_PLAYLISTS
    },
    {
      id: "albums",
      count: null,
      index: 4,
      title: "My Albums",
      routePath: ROUTE_PLAYLISTS
    },
    {
      id: "tracks",
      index: 5,
      count: null,
      title: "My Tracks",
      routePath: ROUTE_TRACKS
    },
    {
      id: "search",
      index: 6,
      title: "My Searchs",
      routePath: ROUTE_PLAYLISTS
    }
  ];

  @observable tabActiveIndex: number;

  @computed
  get tabActiveRoutePath(): string {
    if (this.tabActiveIndex < 0) {
      return null;
    }
    return this.tabDataSet[this.tabActiveIndex].routePath;
  }
  @computed
  get tabActiveId(): string {
    if (this.tabActiveIndex < 0) {
      return null;
    }
    return this.tabDataSet[this.tabActiveIndex].id;
  }
  @action
  setTabActiveIndex(index: number) {
    if (this.tabActiveIndex === index) {
      return;
    }
    this.tabActiveIndex = index;

    this.history.push(this.tabActiveRoutePath);
  }

  @action
  setActivePlaylist(id: number) {
    this.activePlayListId = id;
  }
  @action goActivePlayList(id: number) {
    this.go(ROUTE_PLAYLIST.replace(":playlistId", id.toString()));
  }

  @computed
  get activePlaylist(): IPlaylist {
    return this.userPlaylists.find(pl => pl.id === this.activePlayListId);
  }

  @observable showOnlyComposers: boolean = true;

  //@observable composers: Array<number> = composers;

  @action
  toggleComposer(artistId: number) {
    /*
    if (this.composers.includes(artistId)) {
      this.composers.splice(this.composers.indexOf(artistId), 1);
    } else {
      this.composers.push(artistId);
      //insertConposers(toJS(this.composers));
    }
*/
  }

  @computed
  get filterByKindArtist(): string {
    if (this.tabActiveId === "composers") {
      return "Filter by Composer";
    } else if (this.tabActiveId === "artists") {
      return "Filter by Artist";
    }
  }

  @observable fotos: string;

  @action
  setFotos() {
    this.fotos = JSON.stringify(
      this.userArtistsFromApi.map(artist => {
        return { id: artist.id, foto: artist.picture_medium };
      })
    );
  }

  /**
   * Tracks
   */
  @observable activePlayListId: number;
  @observable activeTracksList: Array<ITrack> = [];
  @observable activeTrackIndex: number;
  @computed get activeTrack(): ITrack {
    return this.activeTracksList[this.activeTrackIndex];
  }

  /*
  @computed get imageSide(): string {
    if (this.playerIsPlaying) {
      return "hifiAntic.gif";
    } else {
      return 'hifiAnticFix.gif';
    }
  }
*/

  @observable imageSide: string = "hifiAnticFix.gif";
  @computed
  get imageSizeOverlay(): string {
    if (this.playerIsPlaying) {
      return "pause.png";
    } else {
      return "transparentPlay.jpg";
    }
  }

  @computed
  get playerIsPlaying(): boolean {
    return DZ.player.isPlaying;
  }

  @action
  playerPlay() {
    DZ.player.play();
  }

  @action
  playerTogglePlay() {
    if (this.playerIsPlaying) {
      this.playerPause();
    } else {
      this.playerPlay();
    }
  }

  @action
  playerPause() {
    DZ.player.pause();
  }

  @action
  playerPlayPlaylist(playlistId: number, autoPlay: boolean, index: number) {
    DZ.player.playPlaylist(playlistId, autoPlay, index);
  }

  @action
  playerChangeIndex(index: number) {
    this.activeTrackIndex = index;
    DZ.player.playPlaylist(this.activePlayListId, true, index);
  }

  @observable trackProgress: number = 0;
  @computed get trackTotalTime(): number {
    return this.activeTrack.duration;
  }
  @computed get activeTrackCover(): string {
    if (!this.activeTrack) {
      return null;
    }
    return this.activeTrack.album.cover_medium;
  }
  @computed get activeTrackCoverBig(): string {
    if (!this.activeTrack) {
      return null;
    }
    return this.activeTrack.album.cover_big;
  }

  @computed
  get isEntornDiscover(): boolean {
    return this.history.location.pathname.startsWith("/discover");
  }

  @action upadateImatgeURL(IdComposer: number, PictureMediumURL: string): Promise<any> {
    const URL_PHOTO = "http://localhost:50688/api/ComposerPhoto";
    return axios.put( URL_PHOTO,{IdComposer: IdComposer, PictureMediumURL: PictureMediumURL});
  }

  @observable activeComposerId: number = -1;
  @computed get activeComposer(): IComposer {
    if (this.activeComposerId < 0) {
      return null;
    }
    return this.composers[this.activeComposerId];
  }
  @action setActiveComposer(id: number) {
    this.activeComposerId = id;
  }

  public secondsToTimeFormat(seconds: number): string {
    const ret = new Date(seconds * 1000).toISOString().substr(11, 8);
    return ret.startsWith('00:') ? ret.substr(3) : ret;
  }

  @observable isLoading: boolean = false;
}
