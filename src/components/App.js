import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

import { without } from 'lodash';

class App extends Component {

	constructor() {
		super();
		this.state = {
			myAppointments : [],
			lastIndex : 1,
			formDisplay : false
		}
		this.deleteAppointment=this.deleteAppointment.bind(this);
		this.toggleForm=this.toggleForm.bind(this);
		this.addAppointment=this.addAppointment.bind(this);
	}

	componentDidMount() {
		fetch('./data.json')
			.then(response => response.json())
			.then(result => {
				const apts = result.map(item => {
					item.aptId = this.state.lastIndex;
					this.setState({
						lastIndex : this.state.lastIndex + 1
					});
					return item;
				})
				this.setState({
					myAppointments: apts,
				});
			});
	}

	deleteAppointment(apt) {
		let tempApts = this.state.myAppointments;
		tempApts = without(tempApts, apt);
		this.setState({
			myAppointments : tempApts
		});
	}

	toggleForm() {
		this.setState({
			formDisplay : !this.state.formDisplay
		});
	}

	addAppointment(newApt) {
		let currentApts = this.state.myAppointments;
		newApt.aptId = this.state.lastIndex;
		currentApts.unshift(newApt);

		this.setState({
			lastIndex: this.state.lastIndex + 1,
			myAppointments: currentApts
		});
	}

	render() {
		return (
			<main className="page bg-white" id="petratings">
				<div className="container">
					<div className="row">
						<div className="col-md-12 bg-white">
							<div className="container">
								<AddAppointments 
									formDisplay={this.state.formDisplay}
									toggleForm={this.toggleForm}
									addAppointment={this.addAppointment}
								/>
								<SearchAppointments />
								<ListAppointments 
									appointments={this.state.myAppointments}
									deleteAppointment={this.deleteAppointment}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default App;
