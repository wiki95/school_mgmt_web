import React, { Component } from "react";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Student from "./components/Student";
import Teacher from "./components/Teacher";
import AddStudent from "./components/AddStudent";
import AddTeacher from "./components/AddTeacher";
import Notice from "./components/Notice";
import SetSchedule from "./components/SetSchedule";
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
						<Route path="/home/teachers" exact component={Teacher} />
						<Route path="/home/addstudent" exact component={AddStudent} />
						<Route path="/home/addteacher" exact component={AddTeacher} />
						<Route path="/home/schedule" exact component={SetSchedule} />
						<Route path="/home/notice" exact component={Notice} />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
