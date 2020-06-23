import classnames from 'classnames';
import MediaControl from '../Media';
import Color from '../Color';
import { ColorIcon, GradientIcon } from './icon';
import Gradient from '../Gradient';
import Devices from '../Devices';
import RadioToggleControl from '../RadioToggle';
import RangeControl from '../RangeSlider';
import './editor.scss';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Dashicon, Button, ButtonGroup, Tooltip, Dropdown, SelectControl } = wp.components;
const { URLInput } = wp.blockEditor;

const BackgroundImage = ( props ) => {
	const { value, device, onChange, onChangeDevice, mask } = props;
	const changeResponsiveValue = ( type, val ) => {
		const { device } = props;
		let media = value && typeof value[device] === 'object' ? value[device] : {};
		media[type] = val;

		// change value each device
		changeValue( device, media );
	};

	const changeValue = ( type, val ) => {
		let newValue = { ...props.value };
		newValue[type] = val;
		saveSetting( newValue );
	};

	const saveSetting = ( value ) => {
		onChange( value );
	};

	const allowAdvanced = () => {
		let devices = ['desktop', 'mobile', 'tablet'];
		for (let device of devices) {
			if (value && value[device] !== undefined && value[device].media !== undefined && Object.keys( value[device].media ).length > 0) {
				return true;
			}
		}
	};

	let media = value && typeof value[device] === 'object' ? value[device] : {};
	return (
		<Fragment>
			<Devices className="gutengeek-mb-10" label={ props.label ? props.label : __( 'Background Image' ) }
							value={ device }
							onClick={ ( value ) => onChangeDevice( value ) }>
				{
					( deviceMode ) => {
						return (
							<MediaControl className="gutengeek-mt-10" multiple={ false }
										  type={ ['image'] }
										  value={ media.media } panel={ true }
										  onChange={ media => changeResponsiveValue( 'media', media ) } mask={mask}/>
						);
					}
				}
			</Devices>
			{ allowAdvanced() && <div className="gutengeek-flex">
				<label>{ __( 'Advanced' ) }</label>
				<Dropdown label={ __( 'Advanced' ) }
						  className="gutengeek-ml-auto"
						  position="center"
						  renderToggle={ ( { isOpen, onToggle } ) => (
							  <Button
								  className="gutengeek-button-field"
								  isSmall
								  onClick={ onToggle }
								  aria-expanded={ isOpen }
							  ><Dashicon icon="admin-generic"/></Button>
						  ) }
						  renderContent={ () => (
							  <Fragment>
								  <div className="gutengeek-popover_content">
									  <SelectControl className="gutengeek-select-control__input"
										  	label={ __( 'Attachment' ) }
										  	value={ value.attachment }
										  	onChange={ ( value ) => changeValue( 'attachment', value ) }
										  	options={ [
											  	{ label: __( 'Default' ), value: '' },
											  	{ label: __( 'Fixed' ), value: 'fixed' },
											  	{ label: __( 'Scroll' ), value: 'scroll' },
										  	] }
									  />
									  { value.attachment === 'fixed' &&
									  <p className="gutengeek-help-text components-base-control__help">{ __( 'Note: Attachment Fixed works only on desktop.' ) }</p> }
									  <Devices label={ __( 'Position' ) }
													  value={ device }
													  onClick={ ( value ) => onChangeDevice( value ) }>
										  {
											  ( deviceMode ) => {
												  return (
													  <Fragment>
														  	<SelectControl className="gutengeek-select-control__input"
															  	value={ media.position || '' }
															  	onChange={ ( value ) => changeResponsiveValue( 'position', value ) }
															  	options={ [
																  	{ value: '', label: __( 'Default' ) },
																  	{ value: 'left', label: __( 'Left' ) },
																	{ value: 'right', label: __( 'Right' ) },
																	{ value: 'center', label: __( 'Center' ) },
																	{ value: 'center left', label: __( 'Center Left' ) },
																	{ value: 'center right', label: __( 'Center Right' ) },
																	{ value: 'top', label: __( 'Top' ) },
																	{ value: 'top left', label: __( 'Top Left' ) },
																  	{ value: 'top right', label: __( 'Top Right' ) },
																  	{ value: 'bottom', label: __( 'Bottom' ) },
																	{ value: 'bottom left', label: __( 'Bottom Left' ) },
																	{ value: 'bottom right', label: __( 'Bottom Right' ) },
																  	{ value: 'custom', label: __( 'Custom' ) },
															  	] }
														  	/>
														  	{ media.position === 'custom' && <Fragment>
															  	<RangeControl
																	label={ __( 'Position X' ) }
																	value={ media.positionX || {} }
																	onChange={ ( value ) => changeResponsiveValue( 'positionX', value ) }
																	min={ -1000 }
																	max={ 1000 }
																	units={[
																		'px',
																		'em',
																		'%',
																		'vw',
																	]}
																/>
																<RangeControl
																	label={ __( 'Position Y' ) }
																	value={ media.positionY || {} }
																	onChange={ ( value ) => changeResponsiveValue( 'positionY', value ) }
																	min={ -1000 }
																	max={ 1000 }
																	units={[
																		'px',
																		'em',
																		'%',
																		'vh',
																	]}
																/>
														  	</Fragment> }
													  </Fragment>
												  );
											  }
										  }
									  </Devices>

									  <Devices label={ __( 'Repeat' ) }
													  value={ device }
													  onClick={ ( value ) => onChangeDevice( value ) }>
										  {
											  ( deviceMode ) => {
												  return (
													  <Fragment>
														  <SelectControl className="gutengeek-select-control__input"
															  value={ media.repeat || '' }
															  onChange={ ( value ) => changeResponsiveValue( 'repeat', value ) }
															  options={ [
																  	{ value: '', label: __( 'Default' ) },
																  	{ value: 'no-repeat', label: __( 'No-repeat' ) },
																  	{ value: 'repeat', label: __( 'Repeat' ) },
																  	{ value: 'repeat-x', label: __( 'Repeat X' ) },
																  	{ value: 'repeat-y', label: __( 'Repeat Y' ) },
															  ] }
														  />
													  </Fragment>
												  );
											  }
										  }
									  </Devices>

									  <Devices label={ __( 'Size' ) }
													  value={ device }
													  onClick={ ( value ) => onChangeDevice( value ) }>
										  {
											  ( deviceMode ) => {
												  return (
													  <Fragment>
														  <SelectControl className="gutengeek-select-control__input"
															  value={ media.size || '' }
															  onChange={ ( value ) => changeResponsiveValue( 'size', value ) }
															  options={ [
																  	{ value: '', label: __( 'Default' ) },
																  	{ value: 'auto', label: __( 'Auto' ) },
																  	{ value: 'cover', label: __( 'Cover' ) },
																  	{ value: 'contain', label: __( 'Contain' ) },
															  ] }
														  />
													  </Fragment>
												  );
											  }
										  }
									  </Devices>
								  </div>
							  </Fragment>
						  ) }
				/>
			</div> }
		</Fragment>
	);
};

const BackgroundVideo = ( props ) => {
	const { value, onChange } = props;
	const { sourceType, media, externalURL, fallback } = value || {};

	const updateSettings = ( type, val ) => {
		let newValue = { ...value };
		newValue[type] = val;
		onChange( newValue );
	};
	return (
		<Fragment>
			<RadioToggleControl value={ sourceType || 'local' } options={ [
				{ value: 'local', label: __( 'Local' ) },
				{ value: 'external', label: __( 'External' ) },
			] } label={ __( 'Source Type' ) } onChange={ ( value ) => updateSettings( 'sourceType', value ) }/>
			{ sourceType === undefined || sourceType === 'local' && <MediaControl
																				  label={ props.label ? props.label : __( 'Background Video' ) }
																				  multiple={ false }
																				  type={ ['video'] }
																				  value={ media } panel={ true }
																				  onChange={ media => updateSettings( 'media', media ) }/> }
			{ sourceType === 'external' && <Fragment>
				<URLInput value={ externalURL || '' }
						  onChange={ ( value ) => updateSettings( 'externalURL', value ) }/>
				<p className="gutengeek-help-text components-base-control__help">{ __( 'YouTube/Vimeo link, or link to video file (mp4 is recommended).' ) }</p>
			</Fragment> }

			<MediaControl
				label={ __( 'Image Fallback' ) } multiple={ false }
				type={ ['image'] }
				value={ fallback } panel={ true }
				onChange={ media => updateSettings( 'fallback', media ) }/>
			<p className="gutengeek-help-text components-base-control__help">{ __( 'This cover image will replace the background video in case that the video could not be loaded.' ) }</p>
		</Fragment>
	);
};

/**
 * <BackgroundControl label={ __( 'Background' ) } value={ barBackground } allows={ ['color', 'image', 'gradient', 'video'] } onChange={ ( value ) => setAttributes( { barBackground: value } ) }/>
 */
class Background extends Component {

	constructor( props ) {
		super( props );
	}

	clearSource() {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue.openBackground = false;
		newValue.source = '';
		newValue.none = false;
		onChange( newValue );
	}

	updateSetting( type, val ) {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		newValue.openBackground = true;
		if ( type === 'source' ) {
			newValue.none = false;
		}
		onChange( newValue );
	}

	render() {
		const { value, label, className, allows, device, onChangeDevice, presetAllowed, mask } = this.props;

		return (
			<Fragment>
				<div className={ classnames(
					'gutengeek-background-control',
					className ? className : '',
				) }>
					<Fragment>
						<div className="gutengeek-background-control-wrap gutengeek-flex gutengeek-mb-15 gutengeek-align-center">
							<div className="components-base-control__field">
								<label className="components-base-control__label">{ label }</label>
							</div>

							<ButtonGroup className={ classnames(
								'gutengeek-field-button-list', 'gutengeek-no-border', 'gutengeek-ml-auto', 'gutengeek-mt-0', 'gutengeek-mb-0'
							) }>
								{ allows.length > 0 && allows.map( ( source ) => {
									return (
										<Button className={ classnames(
											'gutengeek-button-field',
											value && value.source === source && ! value.none ? 'active' : '',
										) } isSmall isPrimary={value && value.source === source && ! value.none }
												onClick={ () => this.updateSetting( 'source', source ) }>

											{ source === 'color' && <Tooltip text={ __( 'Color' ) }>
												{ ColorIcon }
											</Tooltip> }
											{ source === 'image' && <Tooltip text={ __( 'Image' ) }>
												<Dashicon icon="format-image" width={ 10 } height={ 10 }/>
											</Tooltip> }
											{ source === 'gradient' && <Tooltip text={ __( 'Gradient' ) }>
												{ GradientIcon }
											</Tooltip> }
											{ source === 'video' && <Tooltip text={ __( 'Video' ) }>
												<Dashicon icon="video-alt2" width={ 10 } height={ 10 }/>
											</Tooltip> }
										</Button>
									);
								} ) }

								<Button className="gutengeek-button-field" isSmall
										onClick={ () => this.updateSetting( 'none', ! value.none ) }
										isPrimary={value && value.none }
								>
									<Tooltip text={ __( 'None' ) }>
										<Dashicon icon="dismiss" width={ 10 } height={ 10 }/>
									</Tooltip>
								</Button>
								{ value && value.source && allows.length > 0 &&
								<Button className="gutengeek-button-clear gutengeek-button-field" isSmall
										onClick={ () => this.clearSource() }
								>
									<Tooltip text={ __( 'Clear' ) }>
										<Dashicon icon="image-rotate" width={ 10 } height={ 10 }/>
									</Tooltip>
								</Button> }
							</ButtonGroup>
						</div>

						{ ! value.none && <Fragment>
							{ ((allows.length == 1 && allows.indexOf('color') !== -1) || (value && value.source === 'color')) && <Color value={ value.bgColor } label={ __( 'Fill Color' ) }
																 onChange={ ( value ) => this.updateSetting( 'bgColor', value ) }/> }

							{ ((allows.length == 1 && allows.indexOf('image') !== -1) || (value && value.source === 'image')) &&
							<BackgroundImage value={ value.bgImage || {} } label={ __( 'Select Image' ) }
											 onChange={ ( value ) => this.updateSetting( 'bgImage', value ) }
											 device={ device }
											 onChangeDevice={ ( value ) => onChangeDevice( value ) } mask={mask}/> }

							{ ((allows.length == 1 && allows.indexOf('video') !== -1) || (value && value.source === 'video')) &&
							<BackgroundVideo value={ value.bgVideo } label={ __( 'Select Video' ) }
											 onChange={ ( value ) => this.updateSetting( 'bgVideo', value ) }/> }

							{ ((allows.length == 1 && allows.indexOf('gradient') !== -1) || (value && value.source === 'gradient')) && <Gradient value={ value.bgGradient }
																	   onChange={ ( value ) => this.updateSetting( 'bgGradient', value ) } presetAllowed={presetAllowed}/> }
						</Fragment> }
					</Fragment>
				</div>
			</Fragment>
		);
	}

}

/**
 * the color background not available on this components
 *
 * @type {{allows: string[], className: string, label: string, value: {source: string}}}
 */
Background.defaultProps = {
	label: '',
	device: 'desktop',
	className: '',
	value: {
		openBackground: false,
		none: false,
		source: '',
		bgColor: '',
		bgImage: {
			desktop: {
				media: {},
				position: '',
				repeat: '',
				size: '',
				positionX: {value: '', unit: 'px'},
				positionY: {value: '', unit: 'px'},
			},
			mobile: {
				media: {},
				position: '',
				repeat: '',
				size: '',
				positionX: {value: '', unit: 'px'},
				positionY: {value: '', unit: 'px'},
			},
			tablet: {
				media: {},
				position: '',
				repeat: '',
				size: '',
				positionX: {value: '', unit: 'px'},
				positionY: {value: '', unit: 'px'},
			},
			// position: '',
		},
		bgVideo: {
			sourceType: 'local',
			media: {},
			externalURL: '',
			fallback: '',
		},
		bgGradient: {
			openGradient: true,
			gradientType: 'linear',
			firstColor: '#d95302',
			secondColor: '#871e1e',
			startLocation: 25,
			endLocation: 90,
			angle: 90,
			radialShape: 'circle',
			radialPosition: 'center',
		},
	},
	allows: ['color', 'image', 'background', 'gradient'],
	onChange: () => {
		console.log( 'Background was changed' );
	},
	onChangeDevice: () => {
		console.log( 'Device mode was changed' );
	},
	presetAllowed: true,
	mask: false
};

export default Background;
