import React, { Component } from 'react';
import Switch from 'react-switch';

class ToggleSwitch extends Component {

  handleChange = (checked) => {
  	this.props.handleChange()
  }
	render() {
		
		return (
			<label htmlFor="toggle-switch">
				<Switch
					onChange={this.handleChange}
					checked={this.props.bool}
					id='toggle-switch'
					checkedIcon={false}
					uncheckedIcon={false}
					offColor='#333'
					onColor='#333'
				/>
			</label>
		)
	}
}

export default ToggleSwitch