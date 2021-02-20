module.exports = async function seedDatabase(model, seedData, options) {
  // eslint-disable-next-line no-param-reassign
  options = {
    runSaveMiddleware: false,
    ...options,
  };

  try {
    return options.runSaveMiddleware
      ? await model.create(seedData)
      : await model.insertMany(seedData);
  } catch (error) {
    throw error;
  }
};
