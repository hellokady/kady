const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const refresh_map = new Set();

/**
 *
 * @param {Request} req
 * @param {boolean} [isRefreshToken]
 */
function genToken(req, isRefreshToken = false) {
  const JWT_KEY = isRefreshToken ? REFRESH_TOKEN_KEY : ACCESS_TOKEN_KEY;
  const options = isRefreshToken ? { expiresIn: "7d" } : { expiresIn: "2h" };
  const token = jwt.sign({ ip: req.ip }, JWT_KEY, options);

  return token;
}

/**
 *
 * @param {string} token
 * @param {boolean} [isRefreshToken]
 */
function verifyToken(token, isRefreshToken = false) {
  const JWT_KEY = isRefreshToken ? REFRESH_TOKEN_KEY : ACCESS_TOKEN_KEY;
  const verifyInfo = jwt.verify(token, JWT_KEY);

  return verifyInfo;
}

// 解决无法获取req.body参数
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 解决跨域
app.use(cors());

app.post("/login", (req, res) => {
  const access_token = genToken(req);
  const refresh_token = genToken(req, true);
  refresh_map.add(refresh_token);

  res.send({
    access_token,
    refresh_token,
  });
});

app.post("/refresh_token", (req, res) => {
  if (!req.body?.refresh_token) {
    res.json();
    return;
  }

  try {
    const refresh_token = req.body.refresh_token;
    // 保证刷新令牌只存在一个，只保存最新的刷新令牌
    if (!refresh_map.has(refresh_token)) {
      res.json();
      return;
    }
    verifyToken(refresh_token, true);
    refresh_map.delete(refresh_token);
    const new_access_token = genToken(req);
    const new_refresh_token = genToken(req, true);
    refresh_map.add(new_refresh_token);

    res.send({
      access_token: new_access_token,
      refresh_token: new_refresh_token,
    });
  } catch (error) {
    res.json();
  }
});

app.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json("请携带令牌");
    return;
  }
  try {
    const access_token = req.headers.authorization.split("Bearer ").pop();
    const verifyInfo = verifyToken(access_token);
    console.log(verifyInfo);

    next();
  } catch (error) {
    res.status(401).json(error);
    return;
  }
});

app.get("/info", (req, res) => {
  res.send({
    name: req.ip,
    avatar:
      "https://act-webstatic.mihoyo.com/puzzle/hk4e/pz_e8KxQhR1VI/resource/puzzle/2023/11/02/020c46f984d3f70064926490763c8bd2_3105912304969616489.png?x-oss-process=image/format,webp/quality,Q_90",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
