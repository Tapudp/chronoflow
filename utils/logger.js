const constants = require('../constants');

// this can be used to push the logs to server/database
function logWithColour(colour, message) {
  const timeStamp = new Date().toString();
  console.log(`:: ${colour}[${timeStamp}] :: ${message}${constants.colours.resetColor}`);
}

module.exports = {
  info: function (...messageArgs) {
    logWithColour(constants.colours.greenColor, messageArgs);
  },
  warn: function (...messageArgs) {
    logWithColour(constants.colours.yellowColor, messageArgs);
  },
  error: function (...messageArgs) {
    logWithColour(constants.colours.redColor, messageArgs);
  },
};
