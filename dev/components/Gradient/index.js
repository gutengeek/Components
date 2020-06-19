import classnames from 'classnames';
import './editor.scss';
import Color from '../Color';
import RadioToggleControl from '../RadioToggle';
import RangeSlider from '../RangeSlider';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const {
	SelectControl,
	Dropdown,
	Dashicon,
	Button,
} = wp.components;

/**
 * <GradientControl value={ this.props.attributes.wpOpalDeviceMode } onClick={ ( value ) => this.props.onChangeDevice(value) }/>
 */
class GradientControl extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			defaultType: 'preset',
		};
	}

	setValue( type, val ) {
		const { value, onChange, presetAllowed } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		newValue.openGradient = true;
		newValue.type = newValue.type || this.state.defaultType;
		if ( type !== 'type' && !presetAllowed ) {
			newValue.type = 'custom';
		}
		onChange( newValue );
	}

	render() {
		let { label, value, presetAllowed, className } = this.props;
		const presetSlug = value.presetSlug;
		const settings = wp.data.select( 'core/block-editor' ).getSettings();
		const { gradients } = settings;
		let gradient = gradients ? gradients.find( g => g.slug === presetSlug ) : '';
		let gradientStyle = gradient ? gradient.gradient : '';
		return (
			<Fragment>
				<Fragment>
					<div className={ classnames(
						'gutengeek-gradient-control',
						'gutengeek-mb-20',
						className ? className : '',
					) }>
						{ label && <div className="components-base-control__field">
							<label className="components-base-control__label">{ label }</label>
						</div> }
						{presetAllowed && gradients && <RadioToggleControl className="gutengeek-field-wrap"
											value={ value.type || this.state.defaultType } options={ [
							{ value: 'preset', label: __( 'Preset' ) },
							{ value: 'custom', label: __( 'Custom' ) },
						] } onChange={ ( value ) => this.setValue( 'type', value ) }/>}

						{ presetAllowed && gradients && ( value.type === 'preset' || value.type === undefined ) ? <Fragment>
							<Dropdown
								className="gutengeek-flex"
								position="center"
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Fragment>
										<div
											className="gutengeek-flex gutengeek-w-100 gutengeek-gradient-wrap gutengeek-align-baseline">
											<span className={ classnames(
												'gutengeek-preset-gradient-preview',
												'gutengeek-w-100',
											) } onClick={ onToggle }
												  style={ {
													  backgroundImage: gradientStyle,
													  height: '10px',
													  borderRadius: '4px',
												  } }>{ !presetSlug &&
											<div className="gutengeek-fake-input">{ __( 'Select Preset' ) }</div> }</span>
											{ presetSlug &&
											<Button
												className="gutengeek-button-clear gutengeek-button-field gutengeek-ml-10 gutengeek-no-border gutengeek-no-padding"
												isSmall
												onClick={ () => this.setValue( 'presetSlug', '' ) } role="button">
												<Dashicon icon="image-rotate" width={ 15 } height={ 15 }/>
											</Button> }
										</div>
									</Fragment>
								) }
								renderContent={ () => (
									<ul style={ {
										margin: '0 5px',
									} }>
										{ gradients && gradients.map( ( option, index ) => {
											return (
												<li onClick={ () => this.setValue( 'presetSlug', option.slug ) }
													className={ classnames(
														'gutengeek-preset-gradient-preview',
														'gutengeek-w-100',
														'gutengeek-mt-5',
													) }
													style={ {
														backgroundImage: option.gradient,
														height: '10px',
														borderRadius: '4px',
														marginTop: 0,
													} }/>
											);
										} ) }
									</ul>
								) }
							/>
						</Fragment> : <Fragment>
							<Color label={ __( 'First Color' ) } value={ value.firstColor }
								   onChange={ ( value ) => this.setValue( 'firstColor', value ) }/>
							<RangeSlider
								className="gutengeek-field-wrap"
								label={ __( 'Location' ) }
								value={ value.startLocation }
								onChange={ ( value ) => this.setValue( 'startLocation', value ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>

							<Color className="gutengeek-field-wrap" label={ __( 'Second Color' ) }
								   value={ value.secondColor }
								   onChange={ ( value ) => this.setValue( 'secondColor', value ) }/>
							<RangeSlider
								className="gutengeek-field-wrap"
								label={ __( 'Location' ) }
								value={ value.endLocation }
								onChange={ ( value ) => this.setValue( 'endLocation', value ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>

							<RadioToggleControl className="gutengeek-field-wrap" label={ __( 'Gradient Type' ) }
												value={ value.gradientType } options={ [
								{ value: 'linear', label: __( 'Linear' ) },
								{ value: 'radial', label: __( 'Radial' ) },
							] } onChange={ ( value ) => this.setValue( 'gradientType', value ) }/>

							{ value.gradientType === 'linear' ? <Fragment>
								<RangeSlider label={ __( 'Angle' ) }
											 value={ value.angle }
											 onChange={ ( value ) => this.setValue( 'angle', value ) }
											 min={ 0 }
											 max={ 100 }
											 allowReset/>
							</Fragment> : <Fragment>
								<RadioToggleControl className="gutengeek-field-wrap" label={ __( 'Shape' ) }
													value={ value.radialShape ? value.radialShape : 'circle' }
													options={ [
														{ value: 'circle', label: __( 'Circle' ) },
														{ value: 'ellipse', label: __( 'Ellipse' ) },
													] }
													onChange={ ( value ) => this.setValue( 'radialShape', value ) }/>
								<SelectControl className="gutengeek-select-control__input"
									className="gutengeek-mb-20"
									label={ __( 'Position' ) }
									value={ value.radialPosition }
									options={ [
										{ value: 'center', label: __( 'Center' ) },
										{ value: 'top', label: __( 'Top' ) },
										{ value: 'left', label: __( 'Left' ) },
										{ value: 'right', label: __( 'Right' ) },
										{ value: 'center', label: __( 'Center' ) },
										{ value: 'top left', label: __( 'Top Left' ) },
										{ value: 'top right', label: __( 'Top Right' ) },
										{ value: 'bottom', label: __( 'Bottom' ) },
										{ value: 'bottom right', label: __( 'Bottom Right' ) },
										{ value: 'bottom left', label: __( 'Bottom Left' ) },
									] }
									onChange={ ( value ) => this.setValue( 'radialPosition', value ) }
								/>
							</Fragment> }
						</Fragment> }
					</div>
				</Fragment>
			</Fragment>
		);
	}

}

GradientControl.defaultProps = {
	label: '',
	value: {
		openGradient: false,
		type: 'preset',
		presetSlug: 'blush-light-purple',
		gradientType: 'linear',
		firstColor: '#0ed902',
		secondColor: '#00ffa2',
		startLocation: 25,
		endLocation: 90,
		angle: 90,
		radialShape: 'circle',
		radialPosition: 'center',
	},
	presetAllowed: true
};

export default GradientControl;

