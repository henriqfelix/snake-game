window.onload = function () {
  let stage = document.querySelector("#stage");
  let ctx = stage.getContext("2d");

  setInterval(game, 60);

  const vel = 1;
  let vx = (vy = 0);
  let px = (py = 10);
  let tp = 20;
  let qp = 20;
  let ax = (ay = 15);
  let trail = [];
  trail = 5;

  function game() {
    px += vx;
    py += py;

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

    ctx.fillStyle = "gray";
    for (let i; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);
      if (trail[i].x === px && trail[i].y === py) {
        vx = vy = 0;
      }
    }

    trail.push({ x: px, y: py });
    while (trail.length > trail) {
      trail.shift();
    }

    if (ax === px && ay === py) {
      trail++;
      ax = Math.floor(Math.random() * qp);
      ay = Math.floor(Math.random() * qp);
    }
  }
};
