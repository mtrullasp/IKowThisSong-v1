import * as React from "react";
import { match } from "react-router";
import { AppState } from "../../stores/AppStore";
import { inject } from "mobx-react";
import DeezerPlayerHTML5 from "./DeezerPlayerHTML5";
import DeezerPlayerFlash from "./DeezerPlayerFlash";

interface IProps {
  match: match<any>;
  appState?: AppState;
}
@inject("appState")
class ArtistTracks extends React.Component<IProps, {}> {
    constructor(props: IProps, context: any) {
      super(props, context);
    }

    static defaultProps = {};

    render() {
      const AppId = this.props.appState.APP_ID;
      const host = "https://www.deezer.com/plugins/";
      const artistId: string = this.props.match.params['artistid'];
      const src: string = host + "player?format=classic&autoplay=true&playlist=true&width=700&height=550&color=007FEB&" +
        "layout=light&size=medium&type=radio&limit=20&id=artist-" + artistId + "&" + AppId + "\\";
      return (
    	  <DeezerPlayerFlash src={src}/>
      );
    }
}

export default ArtistTracks;