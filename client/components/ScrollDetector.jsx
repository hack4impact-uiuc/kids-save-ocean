import React, { Component, Fragment } from "react";
import request from "superagent";

class ScrollDetector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
      message: "not at bottom"
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
      loadUsers,
      state: { error, isLoading, hasMore }
    } = this;
    const windowBottom = windowHeight + window.pageYOffset;
    if (error || isLoading || !hasMore) return;
    if (windowBottom >= docHeight) {
      console.log("reached bottom ");
      this.setState({
        message: "bottom reached"
      });
      loadUsers();
    } else {
      this.setState({
        message: "not at bottom"
      });
    }
  }
  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get("https://randomuser.me/api/?results=10")
        .then(results => {
          const nextUsers = results.body.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(" "),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid
          }));
          this.setState({
            hasMore: this.state.users.length < 100,
            isLoading: false,
            users: [...this.state.users, ...nextUsers]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };
  componentDidMount() {
    this.loadUsers();

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { error, hasMore, isLoading, users } = this.state;
    return (
      <div>
        {users.map(user => (
          <Fragment key={user.username}>
            <hr />
            <div style={{ display: "flex" }}>
              <img
                alt={user.username}
                src={user.photo}
                style={{
                  borderRadius: "50%",
                  height: 72,
                  marginRight: 20,
                  width: 72
                }}
              />
              <div>
                <h2 style={{ marginTop: 0 }}>@{user.username}</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </Fragment>
        ))}
        <hr />
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!hasMore && <div>You did it! You reached the end!</div>}
      </div>
    );
  }
}

export default ScrollDetector;
