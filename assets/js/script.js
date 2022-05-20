window.onload = function () {
  let stage = document.querySelector("#stage");
  let ctx = stage.getContext("2d");

  ctx.fillStyle = "#292929";
  ctx.fillRect(0, 0, stage.width, stage.height);
};
