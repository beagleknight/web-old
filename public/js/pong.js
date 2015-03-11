(function () {
    "use strict";

    var canvas = document.querySelector('canvas'),
        ctx    = canvas.getContext("2d"),
        ball   = {
            position: { x: 0, y: 0 },
            velocity: { x: 5, y: 5 },
            size: { width: 25, height: 25 }
        },
        CANVAS_WIDTH = 800,
        CANVAS_HEIGHT = 600;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    function update () {
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;

        if (ball.position.y + ball.size.width >= CANVAS_HEIGHT || ball.position.y < 0) {
          ball.velocity.y *= -1;
        }

        if (ball.position.x + ball.size.height >= CANVAS_WIDTH || ball.position.x < 0) {
          ball.velocity.x *= -1;
        }
    }

    function render () {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#fff";
        ctx.fillRect(ball.position.x, ball.position.y, ball.size.width, ball.size.height);
    }

    function loop () {
      update();
      render();
      window.requestAnimationFrame(loop);
    }

    loop();
}());
