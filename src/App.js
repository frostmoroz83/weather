import React from 'react';
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

// import logo from './logo.svg';
import './App.css';

const API_KEY = "52c1fb308de2e32ad044f3f77fc32a45";
// const API_KEY = "667b3baf-1eec-4615-8555-ab334fddd54a";



class App extends React.Component {

	state = {
		temp: undefined,
		city: undefined,
		country: undefined,
		pressure: undefined,
		sunset: undefined,
		error: undefined
	};

	gettingWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;

		if (city) {
            const api_url = await	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await api_url.json();
            console.log(data);
            if (data.cod == 200) {

                let sunset = data.sys.sunset;
                let date = new Date();
                date.setTime(sunset);
                let my_hours = date.getHours() + 16;
                let sunset_date = my_hours  + ":" + date.getMinutes() + ":" + date.getSeconds();

                let temp_c = Math.floor(data.main.temp -  273.15);
                this.setState({
                    temp: temp_c,
                    city: data.name,
                    country: data.sys.country,
                    pressure: data.main.pressure,
                    sunset: sunset_date,
                    error: undefined
                });
            } else {
                this.setState ({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    pressure: undefined,
                    sunset: undefined,
                    error: `Возможно  ${city} города нет, или ошибка в названии`
                });
            }

        } else {
            this.setState ({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Введите название города. Например - Ульяновск"
            });
        }

	};



	render() {
		return (
			<div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-12 info">
                                <Info/>
                            </div>
                            <div className="col-lg-7 col-md-12 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />

                            </div>
                        </div>
                    </div>
                </div>


			</div>
		)
	}
}


export default App;
