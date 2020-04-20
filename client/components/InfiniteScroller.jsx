import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function InfiniteScroller(callback) {
  const [isFetching, setIsFetching] = useState(false);
  const debounceTime = 50;
  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, debounceTime));
    return () =>
      window.removeEventListener(
        "scroll",
        debounce(handleScroll, debounceTime)
      );
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    callback(() => {});
  }, [isFetching]);

  function handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      body.clientHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (isFetching) {
      return;
    }
    if (windowBottom >= docHeight - 6 * window.innerHeight) {
      setIsFetching(true);
    }
  }
  return [isFetching, setIsFetching];
}
