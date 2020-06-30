import './editor.scss';
import Devices from '../Devices';
import SizeTypeUnit from '../SizeTypeUnit';

import classnames from 'classnames';

const { __ } = wp.i18n;
const { RangeControl, Dashicon, Tooltip } = wp.components;
const { Fragment, Component } = wp.element;

/**
 *<RangeSlider label={ __( 'Height' ) } value={ height } responsive={ true } onChangeDevice={ ( device ) => this.props.setState( { gutengeek_devsice_mode: device } ) } units={false}/>
 *
 * @param props
 * @returns {*}
 * @constructor
 */

class RangeSlider extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultUnit: 'px',
			defaultUnits: [
				'px',
				'em',
				'%',
			]
		};
	}

	updateSetting( type, val ) {
		const { value, onChange, device } = this.props;
		let newValue = { ...value };
		// responsive ? newValue[type] = val : newValue = val;
		newValue[type] = val;
		newValue.openRange = 1;
		if (device) {
			newValue.responsive = 1;
		}
		// newValue.unit = newValue.unit || this.state.defaultUnit;
		onChange( newValue );
	}

	/**
	 * change range handler
	 *
	 * @param val
	 */
	onChangeRange( val ) {
		const { value, onChange, device, responsive, units } = this.props;
		const { defaultUnits, defaultUnit } = this.state;
		if (device || (units && units.length > 0)) {
			const unitsAllowed = units === false ? [] : units ? units : defaultUnits;
			let newValue = typeof value === 'object' ? { ...value } : {};
			if (device) {
				newValue[device] = val;
				newValue.responsive = 1;
			} else {
				newValue.value = val;
			}
			newValue.openRange = 1;
			if ( unitsAllowed && unitsAllowed.length > 0 ) {
				newValue.unit = newValue.unit ? newValue.unit : unitsAllowed[0];
			}
			onChange( newValue );
		} else {
			onChange( val );
		}
	}

	render() {
		const { label, value, beforeIcon, allowReset, min, max, step, className, responsive, onChangeDevice, device, units, disabled, help, initialPosition } = this.props;
		const { defaultUnits } = this.state;
		// let valueDisplay = responsive || (units.length > 0 || device) ? device ? value[device] !== undefined ? value[device] : value.value : '' : value;
		let valueDisplay = '';

		if ( value && (typeof value === 'object' || typeof value === 'array') ) {
			if ( (value.responsive !== undefined && value.responsive) || device ) {
				valueDisplay = device && value[device] !== undefined ? value[device] : ( value.value !== undefined ? value.value : '' );
				valueDisplay = valueDisplay !== undefined ? parseFloat(valueDisplay) : '';
			} else if (value.responsive === undefined || ! value.responsive) {
				valueDisplay = value.value !== undefined ? parseFloat(value.value) : ''
			}
		} else if ( typeof value == 'string' || typeof value === 'number' ) {
			valueDisplay = value !== undefined ? parseFloat(value) : '';
		}

		// const unitsAllowed = ! units || units.length === 0 ? units : defaultUnits;
		const unitsAllowed = units === false ? [] : units ? units : defaultUnits;
		return (
			<div className={ classnames(
				'gutengeek-field',
				'gutengeek-range-field',
				responsive ? 'responsive' : '',
				className
			) }>
				{ label && <div className="components-base-control gutengeek-mb-10">
					<div className="components-base-control__label">{ label }</div>
					{ device && <Devices className="gutengeek-ml-5" value={ device } onClick={ ( value ) => onChangeDevice( value ) }/> }
					{ unitsAllowed && unitsAllowed.length > 0 && <SizeTypeUnit className="gutengeek-ml-auto" value={ value && value.unit ? value.unit : unitsAllowed[0] } units={ unitsAllowed } onClick={ ( value ) => this.updateSetting( 'unit', value ) }/> }
				</div> }
				<div className={classnames('gutengeek-range-field-wrap-inner', disabled ? 'disabled' : '')}>
					{ beforeIcon && <div className="gutengeek-before-icon">
						{ beforeIcon }
					</div> }

					<input className="components-range-control__slider" type="range" value={valueDisplay} min={min} max={max} step={step} onChange={( e ) => this.onChangeRange( parseFloat(e.target.value) )} disabled={disabled} />

					<input className="components-range-control__number" type="number" value={valueDisplay} step={step} min={min} max={max}  onChange={( e ) => this.onChangeRange( parseFloat(e.target.value) )} disabled={disabled} />
					{ allowReset !== undefined && <Tooltip text={ __( 'Reset' ) }>
						<span className="gutengeek-button-clear" onClick={ () => this.onChangeRange( '' ) } role="button">
							<Dashicon icon="image-rotate" width={ 10 } height={ 10 }/>
						</span>
					</Tooltip> }
				</div>
				{help ? <p className="gutengeek-help-text components-base-control__help">{ help }</p> : ''}
			</div>
		);
	}
}

RangeSlider.defaultProps = {
	label: '',
	value: {
		openRange: false,
		desktop: '',
		mobile: '',
		tablet: '',
		responsive: false,
		value: '',
		unit: '',
	}, // value: ''
	beforeIcon: '',
	min: 0,
	max: 999,
	responsive: false,
	onChangeDevice: () => {},
	device: false,
	units: [
		// 'px',
		// 'em',
	],
	step: 1,
	disabled: false,
	help: ''
};

export default RangeSlider;
