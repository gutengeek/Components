import './editor.scss';
import SizeTypeUnit from '../SizeTypeUnit';
import Devices from '../Devices';
import Color from '../Color';
import classnames from 'classnames';
import Icons from '../icons';
import RangeSlider from '../RangeSlider';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const { Tooltip, ButtonGroup, Button, Dashicon } = wp.components;

class Border extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultUnit: 'px',
			defaultDevice: 'desktop',
			defaultWidthType: 'global',
		};
	}

	updateBorder( type, newValue ) {
		const { onChange, value, unit, responsive, device } = this.props;
		const { defaultUnit, defaultWidthType } = this.state;
		let newBorder = { ...value };

		if (type === 'global') {
			device ? typeof newBorder.global === 'object' ? newBorder.global[device] = newValue : newBorder.global = { [device]: newValue }
				:
				newBorder.global = newValue;
		} else {
			device ? newBorder.custom ? newBorder.custom[device] ? newBorder.custom[device][type] = newValue : newBorder.custom[device] = { [type]: newValue } : newBorder.custom = { [device]: { [type]: newValue } }
				:
				newBorder.custom[type] = newValue;
		}

		newBorder.unit = value.unit ? value.unit : unit ? unit : defaultUnit;
		newBorder.widthType = value.widthType ? value.widthType : defaultWidthType;
		newBorder.openBorder = 1;
		newBorder.responsive = responsive;
		onChange( newBorder );
	}

	updateSetting( type, newValue ) {
		const { onChange, value, responsive, device } = this.props;

		let widthType = value.widthType ? value.widthType : 'global';
		let customDefaultValues = responsive ? {
				[widthType]: value[widthType] ? value[widthType] : { [device]: 1 },
				unit: value.unit ? value.unit : 'px',
				widthType: widthType,
			}
			: {
				[widthType]: value[widthType] ? value[[widthType]] : 1,
				unit: value.unit ? value.unit : 'px',
				widthType: widthType,
			};
		const changeValues = Object.assign(
			{},
			value,
			{ openBorder: ( type === 'type' && newValue === '' ) ? 0 : 1 },
			{ [type]: newValue },
			type === 'type' ? customDefaultValues : type === 'widthType' ? { openBorder: !value[newValue] ? 0 : value.openBorder } : {},
		);
		return onChange ? onChange( changeValues ) : null;
	}

	render() {
		const { value, units, label, min, max, step, responsive, device, onChangeDevice, className } = this.props;
		const { defaultUnit } = this.state;
		const defaultCustom = { top: '', right: '', bottom: '', left: '' };
		const values = device ? ( value.custom && value.custom[device] ? value.custom[device] : defaultCustom ) : ( value.custom ? value.custom : defaultCustom );
		const global = device && value !== undefined ? ( value.global && value.global[device] !== undefined && value.global[device] !== '' ? value.global[device] : '' ) : ( value.global !== undefined && value.global !== '' ? value.global : '' );
		let iterator = ['top', 'right', 'bottom', 'left'];
		const borderTypes = [
			{
				value: 'solid',
				label: __( 'Solid' ),
			},
			{
				value: 'dotted',
				label: __( 'Dotted' ),
			},
			{
				value: 'dashed',
				label: __( 'Dashed' ),
			},
			{
				value: 'double',
				label: __( 'Double' ),
			}
		];
		return (
			<Fragment>
				<div className={ classnames( 'gutengeek-field-border-container', className || '', 'gutengeek-subpanel-control' ) }>
					<div className="gutengeek-field-border gutengeek-field-wrap gutengeek-flex gutengeek-align-center gutengeek-mb-0">
						<div>
							{ label ? label : __( 'Border' ) }
						</div>
						<ButtonGroup className="gutengeek-field-button-list gutengeek-no-border gutengeek-ml-auto gutengeek-mt-0">
							{
								borderTypes.map( ( data, index ) => {
									return (
										<Button
											className={ classnames(
												value.type == data.value ? 'active' : '',
												'gutengeek-button-field',
											) }
											onClick={ () => this.updateSetting( 'type', data.value ) } isSmall
											isPrimary={ value.type == data.value }>
											<Tooltip text={ data.label } key={ index }>
											<span
												className={ `gutengeek-field-border-type gutengeek-field-border-type-${ data.value }` }/>
											</Tooltip>
										</Button>
									);
								} )
							}
							<Button
								className={ classnames(
									value.type == 'none' ? 'active' : '',
									'gutengeek-button-field',
									'none'
								) }
								onClick={ () => this.updateSetting( 'type', 'none' ) } isSmall
								isPrimary={ value.type == 'none' }>
								<Tooltip text={ __( 'None' ) }>
									<Dashicon icon="dismiss" width={ 16 } height={ 16 }/>
								</Tooltip>
							</Button>

						</ButtonGroup>
						{ ( value.type ) &&
						<Tooltip text={ __( 'Clear' ) }>
							<span className="gutengeek-button-clear"
								  onClick={ () => this.updateSetting( 'type', '' ) }
								  role="button"><Dashicon icon="image-rotate" width={ 10 } height={ 10 }/>
									</span>
						</Tooltip>
						}
					</div>

					{ value.type && <Fragment>
						<Color
							className="gutengeek-mt-15"
							label={ label ? label + __( ' Color' ) : __( 'Border Color' ) }
							value={ value.color }
							onChange={ val => this.updateSetting( 'color', val ) }
						/>

						{ units && <SizeTypeUnit units={ units } value={ value.unit ? value.unit : defaultUnit }
														 onClick={ ( value ) => this.updateSetting( 'unit', value ) }/> }
						<div className="gutengeek-field-border-inner gutengeek-flex gutengeek-align-center gutengeek-mb-10">
							{ device ?
								<Devices label={ label ? label + __( ' Width' ) : __( 'Border Width' ) }
												value={ device }
												onClick={ ( value ) => onChangeDevice( value ) }/>
								: ( <label>{ label ? label + __( ' Width' ) : __( 'Border Width' ) }</label> )
							}

							<ButtonGroup className={ classnames(
								'gutengeek-field-button-list', 'gutengeek-ml-auto', 'gutengeek-mt-0', 'gutengeek-no-border'
							) }>
								{
									['global', 'custom'].map( ( data, index ) => {
										return (
											<Button
												className={ classnames(
													value.widthType === data || ( value.widthType === undefined && data === 'global' ) ? 'active' : '',
													'gutengeek-button-field',
												) }
												key={ index } onClick={ () => this.updateSetting( 'widthType', data ) }
												isSmall
												isPrimary={ value.widthType === data || ( value.widthType === undefined && data === 'global' ) }>
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
						{ ( !value.widthType || value.widthType === 'global' ) ?
							<div
								className="gutengeek-align-center gutengeek-field-border-global gutengeek-field-border">
								<RangeSlider
									value={ global }
									onChange={ ( value ) => this.updateBorder( 'global', value ) }
									min={ min || 0 }
									max={ max || 10 }
									allowReset
									initialPosition={1}
								/>
							</div>
							:
							<Fragment>
								{
									iterator.map( ( item, index ) => {
										return (
											<div className="gutengeek-flex gutengeek-align-center gutengeek-field-border-advanced">
												<label>{ Icons.border[item] }</label>
												<RangeSlider
													className="gutengeek-ml-10 gutengeek-mb-0"
													value={ values[item] !== '' ? values[item] : '' }
													onChange={ val => this.updateBorder( item, val ) }
													min={ min || 0 }
													max={ max || 10 }
													step={ step || 0.5 }
													allowReset
													initialPosition={1}
												/>
											</div>
										);
									} )
								}
							</Fragment>
						}

					</Fragment>
					}
				</div>
			</Fragment>
		);
	}

}

Border.defaultProps = {
	value: {
		type: '',
		unit: 'px',
		widthType: 'global',
		openBorder: 0,
		color: '',
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
	onChangeDevice: ( value ) => {
		return false;
	},
	min: 0,
	max: 50,
	step: 1,
	responsive: false,
	device: 'desktop',
	units: [
		'px',
		'em',
		'%'
	],
};

export default Border;
