document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    fetchData(); // Fetch data from backend API and update the dashboard
    setInterval(fetchData, 60000); // Refresh data every minute (adjust as needed)
});

function updateDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', options);
}

function fetchData() {
    // Replace with your backend API endpoint
    const apiUrl = 'https://your-backend-api-url'; // Replace with your actual backend API URL

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateDashboard(data);
            sendImageForPrediction(); // Call function to send image for prediction
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function sendImageForPrediction() {
    const imageUrl = 'https://example.com/image.jpg'; // Replace with your image URL

    fetch('http://192.168.100.5:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_url: imageUrl
        })
    })
    .then(response => response.json())
    .then(prediction => {
        console.log('Prediction result:', prediction);
        // Update UI with prediction result if needed
    })
    .catch(error => {
        console.error('Error sending image for prediction:', error);
    });
}

function updateDashboard(data) {
    // Update summary data
    document.getElementById('eatenCalories').textContent = data.eatenCalories;
    document.getElementById('remainingCalories').textContent = data.remainingCalories;
    document.getElementById('burnedCalories').textContent = data.burnedCalories;

    // Update meal data
    document.getElementById('breakfastCalories').textContent = data.meals.breakfast.calories;
    document.getElementById('breakfastMass').textContent = data.meals.breakfast.mass;
    document.getElementById('breakfastFat').textContent = data.meals.breakfast.fat;
    document.getElementById('breakfastCarbs').textContent = data.meals.breakfast.carbs;
    document.getElementById('breakfastProtein').textContent = data.meals.breakfast.protein;

    document.getElementById('snackCalories').textContent = data.meals.snack.calories;
    document.getElementById('snackMass').textContent = data.meals.snack.mass;
    document.getElementById('snackFat').textContent = data.meals.snack.fat;
    document.getElementById('snackCarbs').textContent = data.meals.snack.carbs;
    document.getElementById('snackProtein').textContent = data.meals.snack.protein;

    document.getElementById('lunchCalories').textContent = data.meals.lunch.calories;
    document.getElementById('lunchMass').textContent = data.meals.lunch.mass;
    document.getElementById('lunchFat').textContent = data.meals.lunch.fat;
    document.getElementById('lunchCarbs').textContent = data.meals.lunch.carbs;
    document.getElementById('lunchProtein').textContent = data.meals.lunch.protein;

    document.getElementById('dinnerCalories').textContent = data.meals.dinner.calories;
    document.getElementById('dinnerMass').textContent = data.meals.dinner.mass;
    document.getElementById('dinnerFat').textContent = data.meals.dinner.fat;
    document.getElementById('dinnerCarbs').textContent = data.meals.dinner.carbs;
    document.getElementById('dinnerProtein').textContent = data.meals.dinner.protein;
}
