//新規登録処理

const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 *  タスクを新規登録する　API
 *
 *  @returns レスポンス　JSON
 */
postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //ここにSQLを記述する
    console.log(body);
    const sql =
      "INSERT INTO todoapp.t_task (task_name, deadline, category_id) VALUES (?,?,?);";
    let d = [body.taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを一覧取得するAPI
 *
 *  @returns レスポンス　JSON
 */
getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここにSQLを記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id;";
    const [rows, fields] = await connection.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.postTasks = postTasks;
exports.getTasks = getTasks;
