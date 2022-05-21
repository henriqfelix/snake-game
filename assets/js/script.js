window.onload = function () {
  let stage = document.querySelector("#stage");
  let ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

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

    ctx.fillStyle = "red";
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
      if (v > 70) {
        console.log(v);
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
    switch (e.keyCode) {
      case 37: //left
        vx = -vel;
        vy = 0;
        break;
      case 38: //up
        vx = 0;
        vy = -vel;
        break;
      case 39: //right
        vx = vel;
        vy = 0;
        break;
      case 40: //down
        vx = 0;
        vy = vel;
        break;
    }
  }
};
