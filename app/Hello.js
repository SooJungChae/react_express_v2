import React from 'react';
import Grid from './Grid';
import 'whatwg-fetch';

// Parent Component
class Hello extends React.Component {
	constructor(){
		super(...arguments);
		this.state = {
			mans:[],
            members: [],
            searchText: ""
		};

		this.onSearch = this.onSearch.bind(this);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
	}

	componentDidMount(){
        fetch('/users')
            .then(res => {
                return res.text()
            })
            .then(members => {
                this.setState({
                    members: JSON.parse(members)
                })
            })
	}

	onChangeSearchText(e) {
	    console.log('change'+ e.target.value);
        this.setState({
            "searchText": e.currentTarget.value

        })
    }

	onSearch(e) {
        e.preventDefault();
        console.log("search!");

        fetch('/user/' + this.state.searchText)
            .then(res => {
                return res.text()
            })
            .then(members => {
                this.setState({
                    members: JSON.parse(members)
                })
            })

        // console.log(this.state.searchText);
    }

	render() {
		let mans = this.state.mans.map( (man) => {
			return <Guy
					name={man.name}
					age={man.age}
					createDateTime={man.create_datetime}
					{...man}/>
		});

		return (
			<div>
				<h1>CalyFactory Developers</h1>
                <label>{this.state.searchText}</label>
                <input id="searchText"
                       onChange={this.onChangeSearchText}
                       value={this.state.searchText}
                />
                <button type="button"
                        onClick={this.onSearch}
                >검색</button>
                <Grid members={this.state.members}/>
				<ul>
				{mans}
				</ul>
			</div>
		);
	}
}

// Child Component
class Guy extends React.Component {
	render() {
		return (
			<li>
				{this.props.name}, age is {this.props.age}. create time : {this.props.createDateTime}
			</li>
		);
	}
}
export default Hello;