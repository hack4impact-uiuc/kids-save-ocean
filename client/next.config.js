const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withSass(withCss({}));
