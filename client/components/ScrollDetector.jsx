import React, { Component, Fragment } from "react";
import { getModels } from "../utils/apiWrapper";

import "../public/styles/scroll-detector.scss";

const maxUpdatesAtOnce = 20;
const maxUpdatesTotal = 200;

class ScrollDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loadMore: true,
      hasMore: true,
      isLoading: false,
      updates: [],
      message: "not at bottom",
      tempL: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const {
      loadUpdates,
      state: { error, isLoading, hasMore }
    } = this;
    const windowBottom = windowHeight + window.pageYOffset;
    if (isLoading) {
      <p> Loading... </p>;
    }
    if (error || isLoading || !hasMore) {
      return;
    }
    if (windowBottom >= docHeight) {
      this.setState({
        message: "bottom reached"
      });
      console.log(this.state);
      loadUpdates();
    } else {
      this.setState({
        message: "not at bottom"
      });
    }
  }

  loadUpdates = async () => {
    const nextUpdates = await getModels();
    if (nextUpdates === undefined) {
      return;
    }
    let length = this.state.updates.length;
    while (this.state.loadMore) {
      if (nextUpdates.data.slice(length, length + 1)[0] === undefined) {
        this.setState({
          hasMore: false
        });
        return;
      }
      let nextUpdate = {
        name: nextUpdates.data.slice(length, length + 1)[0].name,
        email: nextUpdates.data.slice(length, length + 1)[0].email,
        country: nextUpdates.data.slice(length, length + 1)[0].country,
        description: nextUpdates.data.slice(length, length + 1)[0].description,
        id: nextUpdates.data.slice(length, length + 1)[0]._id
      };
      this.setState(prevState => ({
        tempL: prevState.tempL + 1,
        loadMore: prevState.tempL < maxUpdatesAtOnce,
        hasMore: prevState.updates.length < maxUpdatesTotal,
        isLoading: false,
        updates: [...prevState.updates, nextUpdate]
      }));
    }
    this.setState({
      tempL: 0,
      loadMore: true
    });
  };
  componentDidMount() {
    this.loadUpdates();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { error, hasMore, isLoading, updates } = this.state;
    return (
      <div>
        {updates.map(update => (
          <Fragment key={update.name}>
            <hr />
            <div>
              <div>
                <p>User: {update.id}</p>
                <p>Country: {update.country}</p>
                <p>Email: {update.email}</p>
                <p>Project Name: {update.name}</p>
                <p>Description: {update.description}</p>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>You did it! You reached the end!</div>}
      </div>
    );
  }
}

export default ScrollDetector;
