const { saveData } = require("../services/dataService");

exports.test = (req, res) => {
  res.json({ ok: true });
};

exports.receiveData = (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ error: "no data" });
  }

  const result = saveData(data);

  res.json({
    status: "received",
    data: result
  });
};