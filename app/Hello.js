import React from 'react';
import 'whatwg-fetch';

// Parent Component
class Hello extends React.Component {
	

	render() {
		return (
			<ul>
				<Guy name="John" />
				<Guy name="Smith" />
				<Guy name="Anna" />
			</ul>
		);
	}
}

// Child Component
class Guy extends React.Component {
	render() {
		return (
			<li>
				Hello, {this.props.name} !
			</li>
		);
	}
}

export default Hello;