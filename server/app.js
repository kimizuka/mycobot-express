require('dotenv').config();
const express = require('express');
const { PythonShell } = require('python-shell');
const app = express();
const http = require('http').Server(app);

const duration = 100;

app.use(express.json());
app.use('/', express.static(`${ __dirname }/public`));
app.post('/', (req, res) => {
  try {
    // https://www.elephantrobotics.com/wp-content/uploads/2021/03/myCobot-User-Mannul-EN-V20210318.pdf
    const angles = [0, 0, 0, 0, 0, 0];

    angles[0] = Math.max(-90, Math.min(req.body.yaw || 0, 90)); // J1
    // angles[1]; // J2
    // angles[2]; // J3
    angles[3] = Math.max(-90, Math.min(req.body.pitch || 0, 90)); // J4
    // angles[4]; // J5
    angles[5] = Math.max(-175, Math.min(req.body.roll || 0, 175)); // J6

    PythonShell.runString(
      `from pymycobot.mycobot import MyCobot; MyCobot('${ process.env.MY_COBOT_PORT }').send_angles([${ angles }], ${ duration })`,
      null,
      (err) => err && console.error(err)
    );
  } catch (err) {
    console.error(err);
  }
  res.send(200);
});

try {
  const angles = [0, 0, 0, 0, 0, 0];

  PythonShell.runString(
    `from pymycobot.mycobot import MyCobot; MyCobot('${ process.env.MY_COBOT_PORT }').send_angles([${ angles }], ${ duration })`,
    null,
    (err) => err && console.error(err)
  );
} catch(err) {
  console.error(err);
}

http.listen(3000, '0.0.0.0');