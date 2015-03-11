(function () {
    "use strict";

    var canvas = document.querySelector('canvas'),
        ctx    = canvas.getContext("2d"),
        ball   = {
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            size: { width: 25, height: 25 }
        },
        racket = {
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            size: { width: 25, height: 150 }
        },
        cpuRacket = {
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            size: { width: 25, height: 150 }
        },
        keys = {
        },
        score = 0,
        cpuScore = 0,
        KEY_ARROW_UP = 38,
        KEY_ARROW_DOWN = 40,
        CANVAS_WIDTH = 800,
        CANVAS_HEIGHT = 600;

    document.addEventListener("keydown", function (event) {
        keys[event.which] = true;
    });

    document.addEventListener("keyup", function (event) {
        keys[event.which] = false;
    });

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    function update () {
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;

        if (keys[KEY_ARROW_DOWN] && (racket.position.y + racket.size.height) < CANVAS_HEIGHT) {
            racket.position.y += 5;
        } else if (keys[KEY_ARROW_UP] && racket.position.y > 0) {
            racket.position.y -= 5;
        }

        if (ball.position.y > (cpuRacket.position.y + (cpuRacket.size.height / 2)) && (cpuRacket.position.y + cpuRacket.size.height) < CANVAS_HEIGHT) {
            cpuRacket.position.y += 5;
        } else if (ball.position.y < (cpuRacket.position.y + (cpuRacket.size.height / 2)) && cpuRacket.position.y > 0) {
            cpuRacket.position.y -= 5;
        }

        if (ball.position.y + ball.size.width >= CANVAS_HEIGHT || ball.position.y < 0) {
            ball.velocity.y *= -1;
        }

        if (ball.position.x < (racket.position.x + racket.size.width) && 
                ball.position.x > racket.position.x && 
                ball.position.y > racket.position.y && 
                (ball.position.y - ball.size.height) < (racket.position.y + racket.size.height)) {
            ball.velocity.x *= -1;
        }

        if ((ball.position.x + ball.size.width) > cpuRacket.position.x && 
                ball.position.x > cpuRacket.position.x && 
                ball.position.y > cpuRacket.position.y && 
                (ball.position.y - ball.size.height) < (cpuRacket.position.y + cpuRacket.size.height)) {
            ball.velocity.x *= -1;
        }

        if (ball.position.x >= CANVAS_WIDTH || (ball.position.x + ball.size.width) < 0) {
            if (ball.position.x >= CANVAS_WIDTH) {
                score += 1;
            } else {
                cpuScore += 1;
            }

            init();
        }
    }

    function render () {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#fff";
        ctx.fillRect(ball.position.x, ball.position.y, ball.size.width, ball.size.height);
        ctx.fillRect(racket.position.x, racket.position.y, racket.size.width, racket.size.height);
        ctx.fillRect(cpuRacket.position.x, cpuRacket.position.y, cpuRacket.size.width, cpuRacket.size.height);
        ctx.font = "100px Courier New";
        ctx.fillText(score, CANVAS_WIDTH * 0.1, 100);
        ctx.fillText(cpuScore, CANVAS_WIDTH - (CANVAS_WIDTH * 0.1) - ctx.measureText("0").width, 100);
    }

    function init () {
        racket.position = {
            x: 25,
            y: CANVAS_HEIGHT / 2 - racket.size.height / 2
        };
        cpuRacket.position = {
            x: CANVAS_WIDTH - cpuRacket.size.width - 25,
            y: CANVAS_HEIGHT / 2 - cpuRacket.size.height / 2
        };
        ball.position = { 
            x: CANVAS_WIDTH / 2 - ball.size.width / 2,
            y: CANVAS_HEIGHT / 2 - ball.size.height / 2,
        };
        ball.velocity = {
            x: -5,
            y: -5
        };
    }

    function loop () {
      update();
      render();
      window.requestAnimationFrame(loop);
    }

    init();
    loop();
}());
