var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

/* タスクを登録するルーティング */
router.post("/tasks", async function (req, res, next) {
  const postTasks = await tasks.postTasks(req.body);
  res.send(postTasks);
});

/* タスク一覧を取得するルーティング */
router.get("/tasks", async function (req, res, next) {
  const getTasks = await tasks.getTasks();
  res.send(getTasks);
});

module.exports = router;
