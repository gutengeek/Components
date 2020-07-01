import './editor.scss';
import classnames from 'classnames';
import Responsive from '../Responsive';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const { Tooltip, Dashicon, TextControl } = wp.components;

class Dimension extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultUnit: 'px',
		};
	}

	updateSetting( type, val ) {
		const { value } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		this.save( newValue );
	}

	updateDimension( type, val ) {
		const { value, device } = this.props;
		const newValue = Object.assign(
			{
				[device]: {
					top: '', left: '', right: '', bottom: ''
				}
			},
			{ ...value }
		);
		if (!newValue.sync) {
			newValue[device][type] = val !== '' ? parseFloat(val) : '';
		} else {
			for (let pos of ['top', 'left', 'right', 'bottom']) {
				newValue[device][pos] = val !== '' ? parseFloat(val) : '';
			}
		}
		this.save( newValue );
	}

	save( newValue ) {
		const { onChange } = this.props;
		newValue.openDimension = true;
		newValue.unit = newValue.unit ? newValue.unit : this.state.defaultUnit;
		onChange( newValue );
	}

	render() {
		const { value, label, min, max, device, onChangeDevice } = this.props;
		const defaultCustom = [
			{ label: __( 'Top' ), value: 'top' },
			{ label: __( 'Right' ), value: 'right' },
			{ label: __( 'Bottom' ), value: 'bottom' },
			{ label: __( 'Left' ), value: 'left' },
		];
		let resValue = value !== undefined && value[device] !== undefined ? value[device] : {};
		return (
			<Fragment>
				<div className="gutengeek-dimension-container">
					<div className="gutengeek-field gutengeek-dimension gutengeek-mb-0">
						<Responsive label={ label }
									device={ device }
									units={ [
										'px',
										'em',
									] }
									unit={ value.unit }
									onChangeSizeType={ ( value ) => this.updateSetting( 'unit', value ) }
									onChangeDevice={ ( value ) => onChangeDevice( value ) }>
							{
								( deviceMode ) => {
									return (
										<Fragment>
											<div className="gutengeek-dimenstion-input-group">
												<button className={ classnames( 'gutengeek-button-field' ) }
														onClick={ () => this.updateSetting( 'sync', !value.sync ) }>
													<Tooltip text={ __( 'Sync' ) }>
														<Dashicon icon={ value.sync ? 'lock' : 'unlock' }/>
													</Tooltip>
												</button>
												{
													defaultCustom.map( ( pos, index ) => {
														return (
															<TextControl className="gutengeek-dimension-number gutengeek-mb-0"
																		 label={ pos.label } type="number"
																		 value={ resValue[pos.value] !== undefined ? resValue[pos.value] : '' }
																		 min={ min || -2000 }
																		 max={ max || 2000 }
																		 onChange={ ( value ) => this.updateDimension( pos.value, value ) }/>
														);
													} )
												}
											</div>
										</Fragment>
									);
								}
							}
						</Responsive>
					</div>

				</div>
			</Fragment>
		);
	}

}

Dimension.defaultProps = {
	value: {
		openDimension: false,
		unit: 'px',
		sync: false,
		desktop: { top: '', left: '', right: '', bottom: '' },
		tablet: { top: '', left: '', right: '', bottom: '' },
		mobile: { top: '', left: '', right: '', bottom: '' },
	},
	onChangeDevice: ( value ) => {
		return false;
	},
	onChange: ( value ) => {
		return false;
	},
	min: -2000,
	max: 2000,
	device: 'desktop'
};

export default Dimension;
