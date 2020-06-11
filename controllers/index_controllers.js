module.exports.index = (req, res) => {
  res.render("index");
};

module.exports.notFound = (req, res) => {
  res.json({
    message: `sorry can't find it 😀`,
    error: true,
  });
};
