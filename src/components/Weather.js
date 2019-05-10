import React from "react";

class Weather extends React.Component {
	render() {
		return (
			<div>
                { this.props.city &&
                    <div>
                        <p>Город: {this.props.city}, страна: {this.props.country}</p>
                        <p>Темепература: {this.props.temp}</p>
                        <p>Давление: {this.props.pressure}</p>
                        <p>Заход солнца: {this.props.sunset}</p>
                    </div>
                }

			</div>
		);
	}
}
export default Weather;