import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export default function InfiniteScroller() {
  const [isFetching, setIsFetching] = useState(false);
  const debounceTime = 100;
  const bottomOffset = 6;
  useEffect(() => {
    const handleScroll = () => {
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
      if (windowBottom >= docHeight - bottomOffset * window.innerHeight) {
        setIsFetching(true);
      }
    };
    window.addEventListener("scroll", debounce(handleScroll, debounceTime));
    return () =>
      window.removeEventListener(
        "scroll",
        debounce(handleScroll, debounceTime)
      );
  }, [isFetching]);
  return [isFetching, setIsFetching];
}
