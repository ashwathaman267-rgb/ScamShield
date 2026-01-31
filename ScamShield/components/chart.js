// Simple Chart Component (Vanilla JS)

function createChart(canvas, data, options = {}) {
    const ctx = canvas.getContext('2d');
    const { type = 'bar', colors = [], labels = [] } = options;

    if (type === 'doughnut') {
        drawDoughnutChart(ctx, canvas, data, colors, labels);
    } else if (type === 'bar') {
        drawBarChart(ctx, canvas, data, colors, labels);
    } else if (type === 'line') {
        drawLineChart(ctx, canvas, data, colors, labels);
    }
}

function drawDoughnutChart(ctx, canvas, data, colors, labels) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.6;

    const total = data.reduce((sum, val) => sum + val, 0);
    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();

        ctx.fillStyle = colors[index] || `hsl(${index * 360 / data.length}, 70%, 60%)`;
        ctx.fill();

        currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
    ctx.fill();
}

function drawBarChart(ctx, canvas, data, colors, labels) {
    const padding = 40;
    const barWidth = (canvas.width - padding * 2) / data.length - 10;
    const maxValue = Math.max(...data);
    const scale = (canvas.height - padding * 2) / maxValue;

    data.forEach((value, index) => {
        const barHeight = value * scale;
        const x = padding + index * (barWidth + 10);
        const y = canvas.height - padding - barHeight;

        ctx.fillStyle = colors[index] || `hsl(${index * 360 / data.length}, 70%, 60%)`;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw label
        if (labels[index]) {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + barWidth / 2, canvas.height - 10);
        }
    });
}

function drawLineChart(ctx, canvas, data, colors, labels) {
    const padding = 40;
    const points = data.length;
    const xStep = (canvas.width - padding * 2) / (points - 1);
    const maxValue = Math.max(...data);
    const scale = (canvas.height - padding * 2) / maxValue;

    ctx.beginPath();
    ctx.strokeStyle = colors[0] || 'hsl(243, 75%, 59%)';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    data.forEach((value, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (value * scale);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    data.forEach((value, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (value * scale);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = colors[0] || 'hsl(243, 75%, 59%)';
        ctx.fill();
    });
}

window.createChart = createChart;
