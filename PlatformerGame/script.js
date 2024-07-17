// Get DOM elements
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = innerWidth;
canvas.height = innerHeight;

// Constants
const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

// Player class
class Player {
  constructor() {
    this.position = { x: 10, y: 400 };
    this.velocity = { x: 0, y: 0 };
    this.width = 40;
    this.height = 40;
  }

  // Draw the player
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Update player position and handle gravity
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply gravity
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

    // Prevent player from moving out of the left boundary
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
  }
}

// Platform class
class Platform {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 200;
    this.height = 40;
  }

  // Draw the platform
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// Checkpoint class
class CheckPoint {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 40;
    this.height = 70;
  }

  // Draw the checkpoint
  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Claim the checkpoint (make it disappear)
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity; // Move off-screen
  }
}

// Initialize player, platforms, and checkpoints
const player = new Player();

const platformPositions = [
  { x: 500, y: 450 },
  { x: 700, y: 400 },
  // Add more platform positions as needed
];

const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
  { x: 1170, y: 80 },
  { x: 2900, y: 330 },
  // Add more checkpoint positions as needed
];

const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y)
);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw platforms
  platforms.forEach((platform) => {
    platform.draw();
  });

  // Draw checkpoints
  checkpoints.forEach((checkpoint) => {
    checkpoint.draw();
  });

  // Update and draw player
  player.update();

  // Handle player movement and collision
  handlePlayerMovement();

  // Check for checkpoint collision
  handleCheckpointCollision();
};

// Keyboard state
const keys = {
  rightKey: { pressed: false },
  leftKey: { pressed: false },
};

// Handle player movement based on key input
const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }

  switch (key) {
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed;
      player.velocity.x -= xVelocity;
      break;
    case "ArrowUp":
    case " ":
      player.velocity.y -= 8; // Jump
      break;
    case "ArrowRight":
      keys.rightKey.pressed = isPressed;
      player.velocity.x += xVelocity;
      break;
  }
};

// Start game function
const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  animate();
};

// Show checkpoint screen
const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;

  // Hide checkpoint screen after 2 seconds if active
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
  }
};

// Event listeners
startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});

// Helper functions

// Handle player movement and collision with platforms
const handlePlayerMovement = () => {
  // Handle horizontal movement
  if (keys.rightKey.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.leftKey.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }

  // Adjust platform positions when moving horizontally
  if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
    movePlatforms(-5);
  } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
    movePlatforms(5);
  }

  // Check for collisions with platforms
  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >= platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <= platform.position.x + platform.width - player.width / 3,
    ];

    if (collisionDetectionRules.every((rule) => rule)) {
      player.velocity.y = 0;
      return;
    }

    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <= platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    if (platformDetectionRules.every((rule) => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    }
  });
};

// Handle checkpoint collision
const handleCheckpointCollision = () => {
  checkpoints.forEach((checkpoint, index) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <= checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
    ];

    if (checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();

      // Show appropriate message for each checkpoint
      if (index === checkpoints.length - 1) {
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
        showCheckpointScreen("You reached a checkpoint!");
      }
    }
  });
};

// Move all platforms by a given offset
const movePlatforms = (offsetX) => {
  platforms.forEach((platform) => {
    platform.position.x += offsetX;
  });

  checkpoints.forEach((checkpoint) => {
    checkpoint.position.x += offsetX;
  });
};
