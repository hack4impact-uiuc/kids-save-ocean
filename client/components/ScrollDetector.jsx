import React, { Component, Fragment } from "react";
import { getModels, getModelsByID } from "../utils/apiWrapper";

import "../public/styles/scroll-detector.scss";
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
    if (error || isLoading || !hasMore) return;
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
    const updates = await getModels();
    if (updates == undefined) {
      console.log("Hi");
      return;
    }
    console.log(updates.data.slice(0, 1)[0].name);
    while (this.state.loadMore) {
      if (
        updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0] == undefined
      ) {
        this.setState({
          hasMore: false
        });
        return;
      }
      let length = this.state.updates.length;
      let update = {
        name: updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0].name,
        email: updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0].email,
        country: updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0].country,
        description: updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0].description,
        id: updates.data.slice(
          this.state.updates.length,
          this.state.updates.length + 1
        )[0]._id
      };
      this.setState({
        tempL: this.state.tempL + 1,
        loadMore: this.state.tempL < 20,
        hasMore: this.state.updates.length < 200,
        isLoading: false,
        updates: [...this.state.updates, update]
      });
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
