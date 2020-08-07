import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBackward,
  FaPlay,
  FaPause,
  FaMusic,
  FaForward,
} from "react-icons/fa";

export default class Songs extends Component {
  constructor() {
    super();
    this.state = {
      playingNow: "",
      songPlaying: 0,
      songArr: [
        {
          id: 1,
          category: "game",
          name: "Audio Track not found",
          url: "",
        },
      ],
    };
    this.audio = React.createRef();
  }

  componentDidMount() {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => response.json())
      .then((songArr) => this.setState({ songArr }))
      .catch((err) =>
        alert("There was a problem with the server, please try again later")
      );
  }

  playFunction = (index) => {
    this.audio.current.src = `https://assets.breatheco.de/apis/sound/${this.state.songArr[index].url}`;
    this.audio.current.play();
    this.setState({ songPlaying: index });
    this.setState({
      playingNow: `${this.state.songArr[index].id}) ${this.state.songArr[index].name}`,
    });
  };

  pauseFunction = () => {
    this.audio.current.pause();
  };

  forwardFunction = (index) => {
    if (index < this.state.songArr.length) {
      this.playFunction(index);
    }
  };

  backwardFunction = (index) => {
    if (index >= 0) {
      this.playFunction(index);
    }
  };

  render() {
    const songList = this.state.songArr.map((song, index) => {
      return (
        <li key={index} onClick={() => this.playFunction(index)}>
          <FaMusic color="#70a1ff" /> &nbsp;&nbsp;
          {`${song.id} ${song.name}`}
        </li>
      );
    });

    return (
      <Fragment>
        <p className="title">Awesome Audio Player</p>
        <p className="playing_now">
          {this.state.playingNow === ""
            ? "Nothing Playing Now"
            : `Now Playing . . . ${this.state.playingNow}`}
        </p>
        <div className="playlist overflow-auto">
          <ul>{songList}</ul>
        </div>
        <audio ref={this.audio} />
        <div>
          <FaBackward
            className="audiocontrol"
            onClick={() => this.backwardFunction(this.state.songPlaying - 1)}
            color="#5352ed"
            size="1.5rem"
          />
          &nbsp;&nbsp;&nbsp;
          <FaPlay
            className="audiocontrol"
            onClick={() => this.playFunction(this.state.songPlaying)}
            color="#5352ed"
            size="1.5rem"
          />
          &nbsp;&nbsp;
          <FaPause
            className="audiocontrol"
            onClick={() => this.pauseFunction()}
            color="#5352ed"
            size="1.5rem"
          />
          &nbsp;&nbsp;&nbsp;
          <FaForward
            className="audiocontrol"
            onClick={() => this.forwardFunction(this.state.songPlaying + 1)}
            color="#5352ed"
            size="1.5rem"
          />
        </div>
      </Fragment>
    );
  }
}
