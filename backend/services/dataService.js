exports.saveData = (data) => {
  return {
    id: Date.now(),
    ...data
  };
};