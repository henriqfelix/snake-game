window.onload = function () {
  let stage = document.querySelector("#stage");
  let ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  let lastKey = 0;
  let v = 120;
  let interval = setInterval(game, v);

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
      ax = Math.floor(Math.random() * qp);
      ay = Math.floor(Math.random() * qp);
    }
  }

  function gameover() {
    clearInterval(interval);
    v = 120;
    interval = setInterval(game, v);
    vx = vy = 0;
    tail = 5;
  }

  function keyPush(e) {
    // keys: 37 = left | 38 = up | 39 = right | 40 = down

    if (e.keyCode === 37 && lastKey !== 39) {
      console.log(lastKey);
      console.log(e.keyCode);
      vx = -vel;
      vy = 0;
      lastKey = 37;
      return;
    }

    if (e.keyCode === 38 && lastKey !== 40) {
      vx = 0;
      vy = -vel;
      lastKey = 38;
      return;
    }

    if (e.keyCode === 39 && lastKey !== 37) {
      vx = vel;
      vy = 0;
      lastKey = 39;
      return;
    }

    if (e.keyCode === 40 && lastKey !== 38) {
      vx = 0;
      vy = vel;
      lastKey = 40;
      return;
    }
  }
};
