export function createChart(canvasId, label, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    time: {
                        unit: 'second'
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
