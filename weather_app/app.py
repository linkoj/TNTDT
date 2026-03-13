from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'  # Replace with your actual API key
def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        weather = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'].title(),
            'icon': data['weather'][0]['icon']
        }
        return weather
    else:
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    error = None
    if request.method == 'POST':
        city = request.form.get('city')
        weather = get_weather(city)
        if not weather:
            error = 'City not found or API error.'
    return render_template('index.html', weather=weather, error=error)

if __name__ == '__main__':
    app.run(debug=True)
