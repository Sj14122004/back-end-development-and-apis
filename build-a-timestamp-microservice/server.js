import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

function handleTimestamp(dateParam, res) {
  let date;

  if (dateParam === undefined || dateParam === "") {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

app.get("/api", (_req, res) => {
  handleTimestamp(undefined, res);
});

app.get("/api/:date", (req, res) => {
  handleTimestamp(req.params.date, res);
});

const PORT = process.env.PORT || 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});