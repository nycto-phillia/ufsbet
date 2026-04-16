const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("api funcionando");
});

app.post("/test", (req, res) => {
	res.json({
		ok: true,
		recebido: req.body
	});
});


const port = 3001;
app.listen(port, () => {
	console.log("servidor rodando em " + port);
});
