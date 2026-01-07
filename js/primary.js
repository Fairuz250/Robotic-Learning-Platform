// =========================================
// 1. TOUCH SENSOR LOGIC
// =========================================
const bumperBtn = document.getElementById('bumper-btn');
const touchStatus = document.getElementById('touch-status');

if(bumperBtn) {
    bumperBtn.addEventListener('mousedown', function() {
        touchStatus.innerText = "COLLISION DETECTED!";
        touchStatus.style.color = "#dc2626";
    });

    bumperBtn.addEventListener('mouseup', function() {
        touchStatus.innerText = "CLEAR";
        touchStatus.style.color = "#64748b";
    });
    
    bumperBtn.addEventListener('mouseleave', function() {
        touchStatus.innerText = "CLEAR";
        touchStatus.style.color = "#64748b";
    });
}

// =========================================
// 2. ULTRASONIC SENSOR LOGIC
// =========================================
const distSlider = document.getElementById('distanceSlider');
const uCanvas = document.getElementById('ultrasonicCanvas');

if(distSlider && uCanvas) {
    const uCtx = uCanvas.getContext('2d');
    const distOutput = document.getElementById('distanceOutput');

    function drawUltrasonic() {
        uCtx.clearRect(0, 0, uCanvas.width, uCanvas.height);
        
        const wallX = parseInt(distSlider.value) + 50; 
        const sensorX = 30;
        const centerY = uCanvas.height / 2;

        distOutput.innerText = distSlider.value;

        // Draw Sensor
        uCtx.fillStyle = "#2563eb";
        uCtx.fillRect(0, centerY - 20, sensorX, 40);
        
        // Draw Wall
        uCtx.fillStyle = "#ef4444"; 
        uCtx.fillRect(wallX, 10, 20, uCanvas.height - 20);

        // Draw Waves
        uCtx.strokeStyle = "rgba(14, 165, 233, 0.5)";
        uCtx.lineWidth = 3;
        let distanceToWall = wallX - sensorX;
        
        for(let i = 1; i <= 3; i++) {
            uCtx.beginPath();
            let radius = (distanceToWall / 3) * i; 
            uCtx.arc(sensorX, centerY, radius, -Math.PI/4, Math.PI/4);
            uCtx.stroke();
        }
    }

    distSlider.addEventListener('input', drawUltrasonic);
    drawUltrasonic();
}

// =========================================
// 3. LIGHT SENSOR LOGIC
// =========================================
const lightSlider = document.getElementById('lightSlider');

if(lightSlider) {
    const lightPercentDisplay = document.getElementById('lightPercent'); 
    const sensorViewBulb = document.getElementById('sensorView'); 
    const rawValueDisplay = document.getElementById('lightValue');
    const statusDisplay = document.getElementById('lightStatus');

    function updateLightSensor() {
        let percentage = lightSlider.value;
        lightPercentDisplay.innerText = percentage;

        let rawValue = Math.floor(percentage * 10.23);
        rawValueDisplay.innerText = rawValue;

        // Bulb color calculation
        let red = 34 + (percentage * 2.2);
        let green = 34 + (percentage * 2.2);
        let blue = 34 + (percentage * 0.6);
        let newColor = `rgb(${red}, ${green}, ${blue})`;
        
        sensorViewBulb.style.backgroundColor = newColor;
        sensorViewBulb.style.boxShadow = `0 0 ${percentage/2}px ${newColor}`;

        if(percentage < 20) {
            statusDisplay.innerText = "It's Dark";
            statusDisplay.style.color = "#eab308"; 
        } else if (percentage < 60) {
            statusDisplay.innerText = "Dim Light";
            statusDisplay.style.color = "orange";
        } else {
            statusDisplay.innerText = "Very Bright!";
            statusDisplay.style.color = "red";
        }
    }

    lightSlider.addEventListener('input', updateLightSensor);
    updateLightSensor();
}