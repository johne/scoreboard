import React from "react";
import { Fade } from "react-slideshow-image";
const htmlparser2 = require("htmlparser2");

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
    this.fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: false
    };
  }

  thumb = img => {
    return img.node.thumbnail_resources[3].src;
  };

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  parseResult = data => {
    let parsed = {};
    const parser = new htmlparser2.Parser(
      {
        onopentag(name, attribs) {},
        ontext(text) {
          const search = "window._sharedData = ";
          if (text.startsWith(search)) {
            const jsonText = text.substr(
              search.length,
              text.length - search.length - 1
            );
            parsed = JSON.parse(jsonText, (key, value) => {
              console.log(key);
              if (typeof value === "string") {
                if (key === "src") {
                  return value;
                } else {
                  return "";
                }
              } else {
                return value;
              }
            });
          }
        },
        onclosetag(tagname) {}
      },
      { decodeEntities: true }
    );

    parser.write(data);
    parser.end();

    const topImagesRaw =
      parsed.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_top_posts
        .edges;
    const allRaw = parsed.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges.slice(
      0,
      10
    );

    const images = topImagesRaw.map(this.thumb).concat(allRaw.map(this.thumb));

    this.shuffleArray(images);

    this.setState({ images });
  };

  componentDidMount() {
    fetch("https://www.instagram.com/explore/tags/elliskids/", {
      method: "GET"
    })
      .then(result => {
        result.text().then(html => this.parseResult(html));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render = () => {
    const { images } = this.state;
    this.fadeProperties.defaultIndex = Math.floor(
      Math.random() * images.length
    );

    console.log(this.fadeProperties.defaultIndex);
    return (
      <Fade {...this.fadeProperties}>
        {this.state.images.map((url, index) => (
          <img key={index} style={{ width: "100%" }} src={url} />
        ))}
      </Fade>
    );
  };
}

export default Feed;
