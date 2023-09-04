import React from "react";
import { Fade } from "react-slideshow-image";
import { FeedContainer } from "./styled";

const maxImages = 20;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.reloadIndex = maxImages - 1;
    this.state = { images: [], feedName: "ellisFamilyHoops" };
    this.fadeProperties = {
      duration: 8000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: false,
      defaultIndex: 1,
      onChange: (_oldI, newI) => {
        if (newI === this.reloadIndex) {
          this._loadData(newI);
          this.reloadIndex =
            this.reloadIndex === 0 ? maxImages - 1 : this.reloadIndex - 1;
        }
      }
    };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  _parsePosts(posts, newI) {
    const images = posts.reduce((images, post) => {
      images.push(
        ...post.media
          .filter(media => media.uri.endsWith(".jpg"))
          .map(media => ({
            url: `http://ellis-scoreboard.local:3000/${media.uri}`,
            alt: `#${this.state.feedName}`
          }))
      );
      return images;
    }, []);

    this.shuffleArray(images);

    if (newI > -1) {
      images[newI] = this.state.images[newI];
    }

    this.setState({ images: [...images.slice(0, maxImages)] });
  }

  _loadData = (newI = -1) => {
    fetch("http://ellis-scoreboard.local:3000/content/posts_1.json")
      .then(response => response.json())
      .then(posts => this._parsePosts(posts, newI));
  };

  componentDidMount() {
    this._loadData();
  }

  render = () => {
    return (
      <FeedContainer>
        <Fade
          style={{
            width: "100%",
            height: "100%"
          }}
          {...this.fadeProperties}
        >
          {this.state.images.map((imgInfo, index) => (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignContent: "center"
              }}
              key={index}
            >
              <div>
                <img
                  key={index}
                  style={{ width: "100%" }}
                  alt={imgInfo.alt}
                  src={imgInfo.url}
                />
              </div>
            </div>
          ))}
        </Fade>
      </FeedContainer>
    );
  };
}

export default Feed;
