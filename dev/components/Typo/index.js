const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;
const { Dashicon, ToggleControl, Button, ButtonGroup, Dropdown, Tooltip, PanelRow, SelectControl } = wp.components;
import './editor.scss';
import RangeSlider from '../RangeSlider';
import Select from '../Select';
import Devices from '../Devices';
import classnames from 'classnames';

/**
 * TypographyControl wrap fontSize, lineHeight, textTransform, fontFamily, fontWeight attributes
 */
class TypographyControl extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			font_loaded: false,
			fonts: [],
			weights: []
		};
	}

	componentDidMount() {
		this.setState( {
			fonts: this.getFontFamiliesForSelection(),
			weights: this.getFontWeightsForSelection()
		} );
	}

	componentWillReceiveProps( nextProps, nextState) {
		const { value } = nextProps;
		this.setState({
			weights: this.getFontWeightsForSelection( value.typography )
		})
	}

	/**
	 * toggle open advanced typo
	 */
	toggleOpen() {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue.openTypography = !newValue.openTypography;
		onChange( newValue );
	}

	/**
	 * save transform select
	 * @param val
	 */
	saveTextTransform( val ) {
		const { value, device } = this.props;
		let newValue = { ...value };
		if (typeof newValue.textTransform !== 'object') {
			newValue.textTransform = {};
		}
		newValue.textTransform[device] = val;
		newValue.textTransform.openTransform = true;
		this.saveSettings( 'textTransform', newValue.textTransform );
	}

	saveSettings( type, val ) {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		newValue.openTypography = true;
		onChange( newValue );
	}

	/**
	 * get fonts for selection
	 *
	 * @returns {{label: string, value: string}[]}
	 */
	getFontFamiliesForSelection() {
		// let defaults = [{ value: '', label: __( 'Default' ) }];
		let defaults = { value: '', label: __( 'Default' ) };
		let fonts = gutenGeekAdmin.getConfig( 'google_fonts' ).map((item) => {
			return { value: item.family, label: item.family }
		});
		let customFonts = window.gutengeek_blocks_plugin.fonts;
		// return [...defaults, ...fonts];
		var options = [
			defaults
		];
		if ( customFonts.length > 0 ) {
			var customItem = { label: __( 'Custom Fonts' ), value: [] };
			for ( let i = 0; i < customFonts.length; i++) {
				customItem.value.push({
					label: customFonts[i].font_name,
					value: customFonts[i].font_name,
				})
			}
			options.push(customItem);

		}

		options.push({ label: __( 'Google' ), value: fonts })
		return options
	}

	/**
	 * get fontWeight of fontFamily for selections
	 */
	getFontWeightsForSelection( typography ) {
		if ( ! typography ) {
			var { typography } =  this.props.value;
		}
		// const { typography } = this.props.value;
		var data = [
			{ value: 100, label: 100 },
			{ value: 200, label: 200 },
			{ value: 400, label: 400 },
			{ value: 500, label: 500 },
			{ value: 600, label: 600 },
			{ value: 700, label: 700 },
			{ value: 800, label: 800 },
			{ value: 900, label: 900 },
		];
		let fontFamily = typography !== undefined && typography.fontFamily ? typography.fontFamily : '';
		if (fontFamily) {
			var fontOptions = gutenGeekAdmin.getConfig( 'google_fonts' ).find((item) => item.family === fontFamily);
			if (fontOptions) {
				data = [...fontOptions.variants];
				if (fontOptions.variants !== undefined && fontOptions.variants.length > 0) {
					data = fontOptions.variants.map( ( k ) => {
						return { value: k, label: k };
					} );
				}
			} else if (! fontOptions) {
				var selectedFont = window.gutengeek_blocks_plugin.fonts.find((font) => font.font_name == fontFamily );
				data = selectedFont ? selectedFont.items.map((item) => {
					return { value: item.font_item_weight, label: item.font_item_weight }
				}): [];
			}
		}

		return [...[{ label: __( 'None' ), value: '' }], ...data];
	}

	/**
	 * save typography
	 *
	 * @param type
	 * @param val
	 */
	saveTypography( type, val ) {
		const { value } = this.props;
		let { typography } = value;
		let newTypo = { ...typography };
		if (typeof newTypo[type] !== 'object') {
			newTypo[type] = val.value;
		} else {
			newTypo = { [type]: val.value };
		}

		if ( type === 'fontFamily' ) {
			newTypo.fontWeight = '';
		}

		this.saveSettings( 'typography', newTypo );
	}

	componentDidUpdate( prevProps ) {
		if (this.props.autoloadFont === false) {
			return;
		}

		if (this.state.font_loaded === false && this.props.value !== prevProps.value) {
			const { typography } = prevProps.value;
			let configs = {
				google: {
					families: [typography.fontFamily + ( typography.fontWeight ? ':' + typography.fontWeight : '' )],
				},
			};
			WebFont.load( configs );
			this.setState( { font_loaded: true } );
		}
	}

	render() {
		const { value, label, device, onChangeDevice, className } = this.props;
		const { fonts, weights } = this.state;
		const {
			openTypography,
			typography,
			fontSize,
			fontStyle,
			lineHeight,
			letterSpacing,
			textTransform
		} = value
		let fontFamily = typography && typography.fontFamily ? typography.fontFamily : '';
		let fontWeight = typography && typography.fontWeight ? typography.fontWeight : '';
		return (
			<Fragment>
				<div className={ classnames(
					'gutengeek-field',
					'gutengeek-typography-control',
					'gutengeek-subpanel-control',
					className || '',
					'gutengeek-mb-15'
				) } ref={`typo`}>
					<ToggleControl className="gutengeek-toggle-control-field" label={ label ? label : __( 'Advanced Typography' ) } checked={ openTypography } onChange={ ( value ) => this.toggleOpen() } />
					{ openTypography && <Fragment>
						<RangeSlider className="gutengeek-mt-15" label={ __( 'Font Size' ) } value={ fontSize }
							responsive={ true }
							device={ device }
							onChangeDevice={ ( device ) => onChangeDevice( device ) }
							allowReset
							onChange={ ( value ) => this.saveSettings( 'fontSize', value ) }
							units={ [ 'px', 'em', 'rem' ] }
							step={0.11}
							min={0}
							max={250}
						/>
						<div className="gutengeek-flex gutengeek-typo-wrap">
							<Select className='font-select gutengeek-mb-0' options={fonts} label={ __( 'Font Family' ) } value={ fontFamily } onSelect={ ( value ) => this.saveTypography( 'fontFamily', value ) }/>
							<Select className='font-weight-select gutengeek-mb-0' options={ weights } label={ __( 'Variants' ) } value={ fontWeight } onSelect={ ( value ) => this.saveTypography( 'fontWeight', value ) }/>

							<Dropdown label={ __( 'Typography Advanced' ) }
							  	position="center"
							  	className="gutengeek-flex gutengeek-align-center gutengeek-typo-advanced-button"
							  	renderToggle={ ( { isOpen, onToggle } ) => (
								  	<Button className="gutengeek-size-btn gutengeek-typography-control-btn gutengeek-button"
										  isSmall={true}
										  isDefault={false}
										  onClick={ onToggle }
										  aria-expanded={ isOpen }
								  	><Dashicon icon="admin-generic"/></Button>
							  	) }
							  	renderContent={ () => (
									  <Fragment>
										  <div className="gutengeek-popover_content">
									  		<SelectControl className="gutengeek-select-control__input"
											   label={ __( 'Font Style' ) }
											   value={ fontStyle }
											   onChange={ ( value ) => this.saveSettings( 'fontStyle', value ) }
											   options={ [
											   		{ value: '', label: __( 'Default' ) },
												   	{ value: 'inherit', label: __( 'Inherit' ) },
												   	{ value: 'italic', label: __( 'Italic' ) },
												   	{ value: 'normal', label: __( 'Normal' ) },
												   	{ value: 'oblique', label: __( 'Oblique' ) },
												   	{ value: 'unset', label: __( 'Unset' ) },
											   ] } />
										  	<RangeSlider label={ __( 'Line Height' ) } value={ lineHeight } responsive={ true } device={ device } onChangeDevice={ ( device ) => onChangeDevice( device ) } onChange={ ( value ) => this.saveSettings( 'lineHeight', value ) } units={ [ 'px', 'em', 'rem' ] } step={0.1} max={100} allowReset/>
										   	<RangeSlider label={ __( 'Letter Spacing' ) } value={ letterSpacing } responsive={ true } device={ device } onChangeDevice={ ( device ) => onChangeDevice( device ) } onChange={ ( value ) => this.saveSettings( 'letterSpacing', value ) } units={ [ 'px', 'em', 'rem' ] } step={0.1} min={-50} max={100} allowReset/>
										  	<Devices className="gutengeek-typo-text-transform gutengeek-mb-10" label={ __( 'Text Transform' ) } value={ device } onClick={ ( value ) => onChangeDevice( value ) }>
											  	{
												  	( deviceMode ) => {
												  		return (
														  	<ButtonGroup className="gutengeek-field-button-list gutengeek-ml-auto gutengeek-mt-10">
															  	<Tooltip text={ __( 'None' ) }>
																  	<Button className="gutengeek-button-field is-button"
																			  isPrimary={ textTransform && textTransform[deviceMode] === 'unset' }
																			  onClick={ () => this.saveTextTransform( 'unset' ) }>
																	  <Dashicon icon="dismiss" width={ 16 } height={ 16 }/></Button>
															  	</Tooltip>
															  	<Tooltip text={ __( 'Lowercase' ) }>
																	  <Button
																		  className="gutengeek-button-field is-button"
																		  isPrimary={ textTransform && textTransform[deviceMode] === 'lowercase' }
																		  onClick={ () => this.saveTextTransform( 'lowercase' ) }>
																		  { __( 'ab' ) }
																	  </Button>
															  	</Tooltip>
															  	<Tooltip text={ __( 'Capitalize' ) }>
																  	<Button
																		  className="gutengeek-button-field is-button"
																		  isPrimary={ textTransform && textTransform[deviceMode] === 'capitalize' }
																		  onClick={ () => this.saveTextTransform( 'capitalize' ) }>
																		  { __( 'Ab' ) }
																  	</Button>
															  	</Tooltip>
															  	<Tooltip text={ __( 'Uppercase' ) }>
																  	<Button
																		  className="gutengeek-button-field is-button"
																		  isPrimary={ textTransform && textTransform[deviceMode] === 'uppercase' }
																		  onClick={ () => this.saveTextTransform( 'uppercase' ) }>
																		  { __( 'AB' ) }
																  	</Button>
															  	</Tooltip>
														  	</ButtonGroup>
													  	);
												  	}
											  	}
										  	</Devices>
									  	</div>
								  	</Fragment>
							  	) }
							/>
						</div>
					</Fragment> }
				</div>
			</Fragment>
		);
	}
}

TypographyControl.defaultProps = {
	label: '',
	autoloadFont: false,
	device: 'desktop',
	value: {
		openTypography: false,
		fontStyle: 'inherit',
		fontSize: {
			desktop: '',
			mobile: '',
			tablet: '',
			unit: 'px',
		},
		lineHeight: {
			unit: 'px',
		},
		textTransform: {
			openTransform: false,
			desktop: '',
			mobile: '',
			tablet: '',
		},
		letterSpacing: {},
		typography: {
			fontFamily: '',
			fontWeight: '',
		},
	},
	onChangeDevice: () => {
	},
	onChange: () => {
	},
};

export default TypographyControl;
