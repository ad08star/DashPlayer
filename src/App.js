import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import shaka from "shaka-player";

var manifestUri =
  "//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";

var manifest2 =
  "http://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd";

var manifest3 =
  "http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd";

var manifest5 =
  "http://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd";

var manifest6 =
  "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
var manifest4 =
  "http://rdmedia.bbc.co.uk/dash/ondemand/bbb/2/client_manifest-common_init.mpd";

var manifest7 =
  "http://rdmedia.bbc.co.uk/dash/ondemand/testcard/1/client_manifest-events.mpd"; //testing stream

class App extends Component {
  constructor() {
    super();
    this.initPlayer = this.initPlayer.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }
  componentDidMount() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
  }

  playVideo(num) {
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer(num);
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  }

  initPlayer(num) {
    var player = new shaka.Player(this.refs.video);

    // Listen for error events.
    player.addEventListener("error", this.onErrorEvent);
    var mani = "";
    if (num === 1) {
      mani = manifestUri;
    } else if (num === 2) {
      mani = manifest2;
    } else if (num === 3) {
      mani = manifest3;
    } else if (num === 4) {
      mani = manifest4;
    } else if (num === 5) {
      mani = manifest5;
    } else if (num === 6) {
      mani = manifest6;
    } else if (num === 7) {
      mani = manifest7;
    }

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(mani)
      .then(function() {
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  }

  componentWillUnmount() {
    // unmount stuff
    // kill stream hogging...:)
  }

  render() {
    return (
      <div>
        <button type="button" onClick={e => this.playVideo(1)}>
          Click Me! 1
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(2)}>
          Click Me! 2
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(3)}>
          Click Me! 3
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(4)}>
          Click Me! 4
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(5)}>
          Click Me! 5
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(6)}>
          Click Me! 6
        </button>
        <br />
        <button type="button" onClick={e => this.playVideo(7)}>
          Click Me! 7
        </button>
        <h2>Player</h2>
        <video ref="video" width="640" poster={logo} controls autoPlay />
      </div>
    );
  }
}

export default App;
