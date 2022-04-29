const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  swcMinify: false, // it should be false by default
});
