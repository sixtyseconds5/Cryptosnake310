import React, { useEffect, useRef } from "react";

export default function Game({ onEnd }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let snake = [{x: 50, y: 50}];
    let food = {x: 100, y: 100};
    let dx = 10, dy = 0;
    let score = 0;

    function draw() {
      ctx.clearRect(0,0,300,300);
      ctx.fillStyle = "green";
      snake.forEach(s => ctx.fillRect(s.x, s.y, 10, 10));

      ctx.fillStyle = "gold";
      ctx.fillRect(food.x, food.y, 10, 10);
    }

    function update() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = {x: Math.floor(Math.random()*30)*10, y: Math.floor(Math.random()*30)*10};
      } else {
        snake.pop();
      }
      snake.unshift(head);

      // Game over jika keluar canvas
      if (head.x < 0 || head.y < 0 || head.x >= 300 || head.y >= 300) {
        onEnd(score);
      }
    }

    function keyDown(e) {
      if (e.key === "ArrowUp") {dx = 0; dy = -10;}
      else if (e.key === "ArrowDown") {dx = 0; dy = 10;}
      else if (e.key === "ArrowLeft") {dx = -10; dy = 0;}
      else if (e.key === "ArrowRight") {dx = 10; dy = 0;}
    }

    document.addEventListener("keydown", keyDown);
    const interval = setInterval(() => { update(); draw(); }, 100);

    return () => { clearInterval(interval); document.removeEventListener("keydown", keyDown); };
  }, []);

  return <canvas ref={canvasRef} width={300} height={300} className="border border-gray-400 mx-auto mt-4"/>;
}
