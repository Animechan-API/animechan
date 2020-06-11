module.exports.slugGen = (input) => {
  return input
    .toLowerCase()
    .replace(/[\W_| ]/g, " ")
    .replace(/\s+/g, "_");
};
