import classnames from 'classnames';
import RangeSlider from '../RangeSlider';
import SizeTypeUnit from '../SizeTypeUnit';
import Devices from '../Devices';
import Icons from '../icons';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const { ButtonGroup, Button } = wp.components;

class Margin extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultUnit: 'px',
			defaultType: 'global',
		};
	}

	updateMargin( type, newValue ) {
		const { onChange, value, unit, responsive, device } = this.props;
		const { defaultUnit, defaultType } = this.state;
		let newMargin = { ...value };

		if (type === 'global') {
			responsive ? typeof newMargin.global === 'object' ? newMargin.global[device] = newValue : newMargin.global = { [device]: newValue }
				:
				newMargin.global = newValue;
		} else {
			responsive ? newMargin.custom ? newMargin.custom[device] ? newMargin.custom[device][type] = newValue : newMargin.custom[device] = { [type]: newValue } : newMargin.custom = { [device]: { [type]: newValue } }
				:
				newMargin.custom[type] = newValue;
		}

		newMargin.unit = value.unit ? value.unit : unit ? unit : defaultUnit;
		newMargin.marginType = value.marginType ? value.marginType : defaultType;
		newMargin.openMargin = 1;
		newMargin.responsive = responsive;
		if ( newMargin.openPadding ) {
			delete newMargin.openPadding;
		}
		onChange( newMargin );
	}

	updateSetting( type, newValue ) {
		const { onChange, value, responsive, device } = this.props;

		let marginType = value.marginType ? value.marginType : 'global';
		let customDefaultValues = responsive ? {
				[marginType]: value[marginType] ? value[marginType] : { [device]: 1 },
				unit: value.unit ? value.unit : 'px',
				marginType: marginType,
			}
			: {
				[marginType]: value[marginType] ? value[[marginType]] : 1,
				unit: value.unit ? value.unit : 'px',
				marginType: marginType,
			};
		const changeValues = Object.assign(
			{},
			value,
			{ openMargin: ( type === 'type' && newValue === '' ) ? 0 : 1 },
			{ [type]: newValue },
			type === 'type' ? customDefaultValues : type === 'type' ? { openMargin: !value[newValue] ? 0 : value.openMargin } : {},
		);
		return onChange ? onChange( changeValues ) : null;
	}

	render() {
		const { value, units, label, min, max, responsive, device, onChangeDevice, className } = this.props;
		const { defaultUnit } = this.state;
		const defaultCustom = { top: '', left: '', right: '', bottom: '' };
		const values = responsive && value !== undefined ? ( value.custom !== undefined && value.custom[device] !== undefined ? value.custom[device] : defaultCustom ) : ( value !== undefined && value.custom !== undefined ? value.custom : defaultCustom );
		const global = responsive && value !== undefined ? ( value.global !== undefined && value.global[device] !== '' ? value.global[device] : '' ) : ( value !== undefined && value !== '' && value.global ? value.global : '' );
		return (
			<Fragment>
				<div className={ classnames( 'gutengeek-field-dimension-container', 'gutengeek-field', className || '' ) }>
					<Fragment>

						{ units &&
						<SizeTypeUnit units={ units } value={ value.unit ? value.unit : defaultUnit }
									  onClick={ ( value ) => this.updateSetting( 'unit', value ) }/> }
						<div className="gutengeek-field-dimension-inner gutengeek-align-center gutengeek-mb-10">
							{ responsive ?
								<Devices label={ label ? label : __( 'Margin' ) }
												value={ device }
												onClick={ ( value ) => onChangeDevice( value ) }/>
								: ( <label>{ label ? label : __( 'Border Radius' ) }</label> )
							}

							<ButtonGroup className={ classnames(
								'gutengeek-field-button-list', 'gutengeek-ml-auto', 'gutengeek-no-border'
							) }>
								{
									['global', 'custom'].map( ( data, index ) => {
										return (
											<Button
												className={ classnames(
													'gutengeek-button-field',
													value.marginType === data || ( value.marginType === undefined && data === 'global' ) ? 'active' : '',
												) }
												key={ index }
												isSmall
												isPrimary={ value.marginType === data || ( value.marginType === undefined && data === 'global' ) }
												onClick={ () => this.updateSetting( 'marginType', data ) }>
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

						{ ( !value.marginType || value.marginType === 'global' ) ?
							<div
								className="gutengeek-align-center gutengeek-field-dimension-global">
								<RangeSlider
									value={ global }
									onChange={ ( value ) => this.updateMargin( 'global', value ) }
									min={ min || 0 }
									max={ max || 10 }
									allowReset
								/>
							</div>
							:
							<Fragment>
								{
									Object.keys( defaultCustom ).map( ( item, index ) => {
										return (
											<div
												className="gutengeek-align-center gutengeek-field-dimension-advanced">
												<label>{ Icons.border[item] }</label>
												<RangeSlider
													value={ values[item] !== '' ? values[item] : '' }
													onChange={ val => this.updateMargin( item, val ) }
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

Margin.defaultProps = {
	value: {
		openMargin: false,
		marginType: 'global',
		unit: 'px',
		global: { desktop: '', tablet: '', mobile: '' },
		custom: {
			desktop: {
				top: '',
				right: '',
				bottom: '',
				left: '',
			},
			tablet: {
				top: '',
				right: '',
				bottom: '',
				left: '',
			},
			mobile: {
				top: '',
				right: '',
				bottom: '',
				left: '',
			},
		},
	},
	units: [
		'px',
		'em',
		'%'
	],
	responsive: true,
	onChangeDevice: ( value ) => {
		return false;
	},
	onChange: () => {

	},
	min: 0,
	max: 50,
};

export default Margin;
