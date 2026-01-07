// =========================================
// ROBOT ARM KINEMATICS SIMULATOR
// =========================================
// Global scripts for RoboArm Academy
console.log("RoboArm Academy App Loaded");

// Future logic for mobile menus or global themes goes here.

const canvas = document.getElementById('robotCanvas');

if (canvas) { // Check if we are on the correct page
    const ctx = canvas.getContext('2d');
    const originX = 250; 
    const originY = 350; 
    const L1 = 120; 
    const L2 = 100; 
    const target = { x: 350, y: 150, radius: 10 };

    const slider1 = document.getElementById('theta1');
    const slider2 = document.getElementById('theta2');
    const display1 = document.getElementById('val1');
    const display2 = document.getElementById('val2');
    const posX = document.getElementById('posX');
    const posY = document.getElementById('posY');
    const statusMsg = document.getElementById('status-msg');

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Convert Degrees to Radians (Correcting for canvas coordinate system)
        let t1_deg = parseInt(slider1.value);
        let t2_deg = parseInt(slider2.value);
        let t1 = -t1_deg * (Math.PI / 180); 
        let t2 = -t2_deg * (Math.PI / 180);

        display1.innerText = t1_deg;
        display2.innerText = t2_deg;

        // Forward Kinematics
        let j1_x = originX + L1 * Math.cos(t1);
        let j1_y = originY + L1 * Math.sin(t1);

        let j2_x = j1_x + L2 * Math.cos(t1 + t2);
        let j2_y = j1_y + L2 * Math.sin(t1 + t2);

        // Update Coordinate Display
        posX.innerText = (j2_x - originX).toFixed(2);
        posY.innerText = -(j2_y - originY).toFixed(2); 

        // Draw Robot
        // Base
        ctx.fillStyle = "#333";
        ctx.fillRect(originX - 20, originY, 40, 20);

        // Link 1
        ctx.beginPath(); ctx.moveTo(originX, originY); ctx.lineTo(j1_x, j1_y);
        ctx.lineWidth = 10; ctx.strokeStyle = "#2563eb"; ctx.stroke();

        // Joint 1
        ctx.beginPath(); ctx.arc(j1_x, j1_y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "white"; ctx.fill(); ctx.stroke();

        // Link 2
        ctx.beginPath(); ctx.moveTo(j1_x, j1_y); ctx.lineTo(j2_x, j2_y);
        ctx.lineWidth = 8; ctx.strokeStyle = "#0ea5e9"; ctx.stroke();

        // End Effector
        ctx.beginPath(); ctx.arc(j2_x, j2_y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#0f0"; ctx.fill();

        // Target
        ctx.beginPath(); ctx.arc(target.x, target.y, target.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; ctx.fill();
        ctx.strokeStyle = "red"; ctx.stroke();

        // Collision Check
        let dist = Math.hypot(j2_x - target.x, j2_y - target.y);
        if (dist < (10 + target.radius)) {
            statusMsg.innerText = "SUCCESS: Target Reached!";
            statusMsg.style.color = "green";
        } else {
            statusMsg.innerText = "Target Missed. Keep adjusting!";
            statusMsg.style.color = "red";
        }
    }

    slider1.addEventListener('input', draw);
    slider2.addEventListener('input', draw);
    draw();
}