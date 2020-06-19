import SizeTypeUnit from '../SizeTypeUnit';
import Devices from '../Devices';
import classnames from 'classnames';
import Icons from '../icons';
import RangeSlider from '../RangeSlider';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { ButtonGroup, Button } = wp.components;

class BorderRadius extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultUnit: 'px',
			defaultRadiusType: 'global',
		};
	}

	updateBorder( type, newValue ) {
		const { onChange, value, unit, responsive, device } = this.props;
		const { defaultUnit, defaultRadiusType } = this.state;
		let newBorder = { ...value };

		if (type === 'global') {
			responsive ? typeof newBorder.global === 'object' ? newBorder.global[device] = newValue : newBorder.global = { [device]: newValue }
				:
				newBorder.global = newValue;
		} else {
			responsive ? newBorder.custom ? newBorder.custom[device] ? newBorder.custom[device][type] = newValue : newBorder.custom[device] = { [type]: newValue } : newBorder.custom = { [device]: { [type]: newValue } }
				:
				newBorder.custom[type] = newValue;
		}

		newBorder.unit = value.unit ? value.unit : unit ? unit : defaultUnit;
		newBorder.radiusType = value.radiusType ? value.radiusType : defaultRadiusType;
		newBorder.openBorderRadius = 1;
		newBorder.responsive = responsive;
		onChange( newBorder );
	}

	updateSetting( type, newValue ) {
		const { onChange, value, responsive, device } = this.props;

		let radiusType = value.radiusType ? value.radiusType : 'global';
		let customDefaultValues = responsive ? {
				[radiusType]: value[radiusType] ? value[radiusType] : { [device]: 1 },
				unit: value.unit ? value.unit : 'px',
				radiusType: radiusType,
			}
			: {
				[radiusType]: value[radiusType] ? value[[radiusType]] : 1,
				unit: value.unit ? value.unit : 'px',
				radiusType: radiusType,
			};
		const changeValues = Object.assign(
			{},
			value,
			{ openBorderRadius: ( type === 'type' && newValue === '' ) ? 0 : 1 },
			{ [type]: newValue },
			type === 'type' ? customDefaultValues : type === 'radiusType' ? { openBorderRadius: !value[newValue] ? 0 : value.openBorderRadius } : {},
		);
		return onChange ? onChange( changeValues ) : null;
	}

	render() {
		const { value, units, label, min, max, responsive, device, onChangeDevice, className } = this.props;
		const { defaultUnit } = this.state;
		const defaultCustom = { top_left: '', top_right: '', bottom_left: '', bottom_right: '' };
		const values = responsive && value !== undefined ? ( value.custom !== undefined && value.custom[device] !== undefined ? value.custom[device] : defaultCustom ) : ( value !== undefined && value.custom !== undefined ? value.custom : defaultCustom );
		const global = responsive && value !== undefined ? ( value.global !== undefined && value.global[device] !== '' ? value.global[device] : '' ) : ( value !== undefined && value !== '' && value.global ? value.global : '' );
		let iterator = ['top_left', 'top_right', 'bottom_left', 'bottom_right'];
		return (
			<Fragment>
				<div className={ classnames( 'gutengeek-field-dimension-container', 'gutengeek-field', className || '' ) }>
					<Fragment>

						{ units &&
						<SizeTypeUnit units={ units } value={ value.unit ? value.unit : defaultUnit }
									  onClick={ ( value ) => this.updateSetting( 'unit', value ) }/> }
						<div className="gutengeek-field-dimension-inner gutengeek-align-center gutengeek-mb-10">
							{ responsive ?
								<Devices label={ label ? label : __( 'Border Radius' ) }
												value={ device }
												onClick={ ( value ) => onChangeDevice( value ) }/>
								: ( <label>{ label ? label : __( 'Border Radius' ) }</label> )
							}

							<ButtonGroup className={ classnames(
								'gutengeek-field-button-list', 'gutengeek-ml-auto', 'gutengeek-mt-0', 'gutengeek-no-border'
							) }>
								{
									['global', 'custom'].map( ( data, index ) => {
										return (
											<Button
												className={ classnames(
													'gutengeek-button-field',
													value.radiusType === data || ( value.radiusType === undefined && data === 'global' ) ? 'active' : '',
												) }
												key={ index }
												isSmall
												isPrimary={ value.radiusType === data || ( value.radiusType === undefined && data === 'global' ) }
												onClick={ () => this.updateSetting( 'radiusType', data ) }>
												{ data === 'global' ?
													<svg width="16" height="16" viewBox="0 0 16 16"
														 xmlns="http://www.w3.org/2000/svg">
														<path
															d="M15.971 15.059v.941h-16v-16h16v15.058zm-1.882-.941v-12.235h-12.235v12.235h12.235z"/>
													</svg>
													:
													<svg width="16" height="16" viewBox="0 0 16 16"
														 xmlns="http://www.w3.org/2000/svg">
														<g>
															<path d="M2.794 0h10.353v1.882h-10.353z"/>
															<path d="M15.97 2.824v10.353h-1.882v-10.353z"/>
															<path d="M1.853 2.823v10.353h-1.882v-10.353z"/>
															<path d="M2.794 14.118h10.353v1.882h-10.353z"/>
														</g>
													</svg>
												}
											</Button>
										);
									} )
								}
							</ButtonGroup>
						</div>

						{ ( !value.radiusType || value.radiusType === 'global' ) ?
							<div
								className="gutengeek-align-center gutengeek-field-dimension-global gutengeek-field-border">
								<RangeSlider
									value={ global }
									onChange={ ( value ) => this.updateBorder( 'global', value ) }
									min={ min || 0 }
									max={ max || 10 }
									allowReset
								/>
							</div>
							:
							<Fragment>
								{
									iterator.map( ( item, index ) => {
										return (
											<div
												className="gutengeek-align-center gutengeek-field-dimension-advanced">
												<label>{ Icons.border[item] }</label>
												<RangeSlider
													value={ values[item] !== '' ? values[item] : '' }
													onChange={ val => this.updateBorder( item, val ) }
													min={ min || 0 }
													max={ max || 10 }
													step={ 1 }
													allowReset
												/>
											</div>
										);
									} )
								}
							</Fragment>
						}

					</Fragment>
				</div>
			</Fragment>
		);
	}

}

BorderRadius.defaultProps = {
	value: {
		radiusType: 'global',
		openBorderRadius: 0,
		global: '',
		custom: {
			desktop: {
				topLeft: '',
				topRight: '',
				bottomLeft: '',
				bottomRight: '',
			},
			mobile: {
				topLeft: '',
				topRight: '',
				bottomLeft: '',
				bottomRight: '',
			},
			tablet: {
				topLeft: '',
				topRight: '',
				bottomLeft: '',
				bottomRight: '',
			},
		},
	},
	onChangeDevice: ( value ) => {
		return false;
	},
	min: 0,
	max: 50,
	responsive: false,
	device: 'desktop',
	units: [ 'px', 'em', '%' ],
};

export default BorderRadius;
