import React, { Component } from "react";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Student from "./components/Student";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Route path="/" exact component={Auth} />
						<Route path="/home" component={Home} />
						<Route path="/home/students" exact component={Student} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
