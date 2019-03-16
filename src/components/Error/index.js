import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: "" };
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true, error: error });
	}

	render() {
		if (!this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div>
					<h1>Error</h1>
					<p>{this.state.error}</p>
				</div>
			);
		}
		return this.props.children;
	}
}
export default ErrorBoundary;
