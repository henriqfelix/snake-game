window.onload = function () {
  let stage = document.querySelector("#stage");
  let ctx = stage.getContext("2d");
  let scoreData = document.querySelector("#score-data");
  let score = Number(scoreData.innerHTML);
  let bestData = document.querySelector("#best-data");

  document.addEventListener("keydown", keyPush);

  let lastKey = "";
  let v = 120;
  let interval = setInterval(game, v);
  let bestAux = localStorage.getItem("personalBest");
  bestData.innerHTML = bestAux;

  const vel = 1;

  let vx = (vy = 0);
  let px = 10;
  let py = 15;
  let tp = 20;
  let qp = 30;
  let ax = (ay = 15);

  let trail = [];
  let tail = 5;

  function game() {
    px += vx;
    py += vy;

    if (px < 0) {
      px = qp - 1;
    }
    if (px > qp - 1) {
      px = 0;
    }
    if (py < 0) {
      py = qp - 1;
    }
    if (py > qp - 1) {
      py = 0;
    }

    ctx.fillStyle = "#292929";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "#b91528";
    ctx.fillRect(ax * tp, ay * tp, tp, tp);

    ctx.fillStyle = "#CCCCCC";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
      // - - - GAME OVER - - -
      if (trail[i].x == px && trail[i].y == py) {
        gameover();
      }
    }

    trail.push({ x: px, y: py });
    while (trail.length > tail) {
      trail.shift();
    }

    if (ax == px && ay == py) {
      tail++;
      if (v > 56) {
        clearInterval(interval);
        v -= 2;
        interval = setInterval(game, v);
      }
      score++;
      scoreData.innerHTML = score;
      ax = Math.floor(Math.random() * qp);
      ay = Math.floor(Math.random() * qp);
    }
  }

  function gameover() {
    personalBest();
    clearInterval(interval);
    v = 120;
    interval = setInterval(game, v);
    vx = vy = 0;
    tail = 5;
    score = 0;
    lastKey = 0;
  }

  function personalBest() {
    if (score > bestAux) {
      bestAux = score;
      bestData.innerHTML = bestAux;
      localStorage.setItem("personalBest", bestAux);
    }
    return;
  }

  function keyPush(e) {
    // keys: 37 = left | 38 = up | 39 = right | 40 = down
    // keys: 65 = left | 87 = up | 68 = right | 83 = down

    if (v === 120) scoreData.innerHTML = "0";

    if ((e.keyCode === 37 || e.keyCode === 65) && lastKey !== "right") {
      vx = -vel;
      vy = 0;
      lastKey = "left";
    }
    if ((e.keyCode === 38 || e.keyCode === 87) && lastKey !== "down") {
      vx = 0;
      vy = -vel;
      lastKey = "up";
    }
    if ((e.keyCode === 39 || e.keyCode === 68) && lastKey !== "left") {
      vx = vel;
      vy = 0;
      lastKey = "right";
    }
    if ((e.keyCode === 40 || e.keyCode === 83) && lastKey !== "up") {
      vx = 0;
      vy = vel;
      lastKey = "down";
    }
  }
};
