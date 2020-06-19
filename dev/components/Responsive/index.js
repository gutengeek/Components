const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import classnames from 'classnames';
import Devices from '../Devices';
import SizeTypeUnit from '../SizeTypeUnit';
import './editor.scss';

class Responsive extends Component {

	render() {
		const { label, units, unit, device, onChangeSizeType, onChangeDevice, className } = this.props;
		return (
			<Fragment>
				<div className={ classnames(
					'gutengeek-field',
					'gutengeek-responsive-field',
					className || '',
				) }>
					{ label && <label className="components-base-control__label">{ label }</label> }
					<div className="control">
						{ device && <Devices value={ device } onClick={ ( value ) => onChangeDevice( value ) }/> }
						{units && <SizeTypeUnit value={ unit } units={ units } onClick={ ( value ) => onChangeSizeType( value ) }/>}
					</div>
				</div>
				{ this.props.children && this.props.children( this.props ) }
			</Fragment>
		);
	}

}

Responsive.defaultProps = {
	label: '',
	units: [
		'px',
		'em',
	],
	unit: 'px',
	onChangeDevice: () => {
	},
	onChange: () => {
	},
	device: 'desktop',
	className: '',
	allowCustom: false,
};

export default Responsive;
