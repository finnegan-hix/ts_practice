enum Direction {
    Up,
    Down,
    Left,
    Right
}

interface Point {
    x: number;
    y: number;
}

class SnakeGame {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private gridSize: number;
    private direction: Direction;
    private snake: Point[];
    private food: Point;

    constructor(canvasId: string, gridSize: number) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.gridSize = gridSize;
        this.direction = Direction.Right;
        this.snake = [{ x: 10, y: 10 }];
        this.food = this.randomPosition();
        this.draw();
        this.bindEvents();
        this.gameLoop();
    }

    private bindEvents() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.direction = Direction.Up;
                    break;
                case "ArrowDown":
                    this.direction = Direction.Down;
                    break;
                case "ArrowLeft":
                    this.direction = Direction.Left;
                    break;
                case "ArrowRight":
                    this.direction = Direction.Right;
                    break;
            }
        });
    }

    private gameLoop() {
        setInterval(() => {
            this.move();
            this.draw();
            this.checkCollision();
        }, 100);
    }

    private move() {
        const head = { ...this.snake[0] };
        switch (this.direction) {
            case Direction.Up:
                head.y -= 1;
                break;
            case Direction.Down:
                head.y += 1;
                break;
            case Direction.Left:
                head.x -= 1;
                break;
            case Direction.Right:
                head.x += 1;
                break;
        }

        this.snake.unshift(head);
        if (head.x === this.food.x && head.y === this.food.y) {
            this.food = this.randomPosition();
        } else {
            this.snake.pop();
        }
    }

    private draw() {
   
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

       
        this.ctx.fillStyle = "green";
        this.snake.forEach((segment) => {
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
        });

       
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
    }

    private checkCollision() {
        const head = this.snake[0];
    
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            alert("Game Over!");
            location.reload(); 
        }

     
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                alert("Game Over!");
                location.reload(); // Reload page
            }
        }
    }

    private randomPosition(): Point {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
        };
    }
}


const game = new SnakeGame("canvas", 20); // Assuming there's a canvas element with id "canvas" in the HTML
