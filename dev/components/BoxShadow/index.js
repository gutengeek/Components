import classnames from 'classnames';
import Color from '../Color';
import RadioToggleControl from '../RadioToggle';
import ResponsiveControl from '../Responsive';
import './editor.scss';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { ToggleControl, TextControl } = wp.components;

/**
 * <BoxShadowControl label={ __( 'Box Shadow' ) } value={boxShadow} device={ gutengeek_device_mode } unit='px'
 onChangeDevice={ ( device ) => this.props.onChangeDevice(device) }
 onChange={ ( value ) => this.props.setAttributes( { boxShadow: value } ) }/>
 */
class BoxShadow extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			defaultUnits: [
				'px',
				'em',
				'rem',
			]
		}
	}

	toggleOpen() {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue.openBoxShadow = !newValue.openBoxShadow;
		onChange( newValue );
	}

	saveValue( type, val ) {
		const { value, device } = this.props;
		let newValue = value ? { ...value } : {};
		let boxShadow = newValue && newValue.boxShadow !== undefined && device ? newValue.boxShadow[device] !== undefined  ? newValue.boxShadow[device] : {} : newValue.boxShadow ? newValue.boxShadow : {};
		boxShadow[type] = val;
		// newValue.boxShadow = newValue.boxShadow || {};
		if ( device ) {
			newValue.boxShadow = newValue.boxShadow ? newValue.boxShadow : {};
			newValue.boxShadow[device] = boxShadow;
		} else {
			newValue.boxShadow = boxShadow;
		}
		this.save( newValue );
	}

	saveSetting( type, val ) {
		const { value } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		this.save( newValue );
	}

	save( value ) {
		const { onChange } = this.props;
		value.openBoxShadow = true;
		onChange( value );
	}

	render() {
		const { value, device, label, onChangeDevice, units, className } = this.props;
		const { defaultUnits } = this.state;
		let boxShadow = value.boxShadow !== undefined && value.boxShadow[device] !== undefined ? value.boxShadow[device] : ( value.boxShadow ? value.boxShadow : {} );
		return (
			<Fragment>
				<div className={ classnames( 'gutengeek-field-box-shadow-container', 'gutengeek-subpanel-control', 'gutengeek-mt-15', 'gutengeek-mb-15', className ) }>
					<ToggleControl
						className="gutengeek-toggle-control-field"
						label={ label ? __( 'Enable' ) + ' ' + label : __( 'Enable Box Shadow' ) }
						checked={ value.openBoxShadow }
						onChange={ ( value ) => this.toggleOpen() }
					/>

					{ value.openBoxShadow && <Fragment>
						<ResponsiveControl className="gutengeek-mt-15" label={ __( 'Size' ) } units={ units && units.length > 0 ? units : defaultUnits } unit={ value.unit }
										   device={ device }
										   onChangeSizeType={ ( value ) => this.saveSetting( 'unit', value ) }
										   onChangeDevice={ ( value ) => onChangeDevice( value ) }>
							{
								( deviceMode ) => {
									return (
										<div className="gutengeek-flex gutengeek-box-shadow-control-wrap">
											<Color
												value={ boxShadow.color || '' }
												onChange={ ( value ) => this.saveValue( 'color', value ) }/>
											<TextControl
												type="number"
												value={ boxShadow.horizontal || '' }
												onChange={ ( value ) => this.saveValue( 'horizontal', value ) }
												min={ -100 }
												max={ 100 }
												allowReset
											/>
											<TextControl
												type="number"
												value={ boxShadow.vertical || '' }
												onChange={ ( value ) => this.saveValue( 'vertical', value ) }
												min={ -100 }
												max={ 100 }
												allowReset
											/>
											<TextControl
												type="number"
												value={ boxShadow.blur || '' }
												onChange={ ( value ) => this.saveValue( 'blur', value ) }
												min={ -100 }
												max={ 100 }
												allowReset
											/>
											<TextControl
												type="number"
												value={ boxShadow.spread || '' }
												onChange={ ( value ) => this.saveValue( 'spread', value ) }
												min={ -100 }
												max={ 100 }
												allowReset
											/>
										</div>
									);
								}
							}
						</ResponsiveControl>

						<RadioToggleControl
							label={ __( 'Position' ) }
							value={ value.boxShadowType || '' }
							options={ [ { value: '', label: __( 'Outline' ) }, { value: 'inset', label: __( 'Inset' ) } ] }
							onChange={ ( value ) => this.saveSetting( 'boxShadowType', value ) }/>
					</Fragment> }
				</div>
			</Fragment>
		);
	}

}

BoxShadow.defaultProps = {
	label: '',
	value: {
		openBoxShadow: false,
		boxShadow: {
			desktop: {},
			mobile: {},
			tablet: {},
		},
		unit: 'px',
		boxShadowType: '',
	},
	// device: 'desktop',
	units: [],
	min: -100,
	max: 100,
};

export default BoxShadow;
