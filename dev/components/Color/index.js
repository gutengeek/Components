import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Dropdown, ColorPicker, Tooltip, Dashicon, Button } = wp.components;
const { applyFilters } = wp.hooks;

const colorPresets = (props) => {
	const defaultColorPresets = applyFilters( 'wpOpalColorPresets', window.gutengeek_blocks_plugin.color_presets, props );
	const settingColors = wp.data.select( 'core/block-editor' ).getSettings().colors || [];
	return [...settingColors, ...defaultColorPresets];
};

class Color extends Component {

	getDefaultColorPresets() {
		const defaultColorPresets = applyFilters( 'wpOpalColorPresets', window.gutengeek_blocks_plugin.color_presets, this.props );
		const settingColors = wp.data.select( 'core/block-editor' ).getSettings().colors || {};
		return { ...settingColors, ...defaultColorPresets };
		// return Object.keys( defaultColorPresets ).map( ( color ) => defaultColorPresets[k] );
	}

	render() {
		const { label, className, value, presets, alpha, clear, onChange } = this.props;

		return (
			<div className={ classnames(
				'gutengeek-field',
				'gutengeek-field-color',
				'gutengeek-align-center',
				className ? className : '',
			) }>
				{ label && <label>{ label }</label> }
				<Dropdown
					position="center center"
					contentClassName="gutengeek-color-popover__content"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Fragment>
                            <span className="gutengeek-color-picker-container">
                                <span className="gutengeek-color-picker" style={ { backgroundColor: value || '' } }
									  onClick={ onToggle } aria-expanded={ isOpen }/>
                            </span>
						</Fragment>
					) }
					renderContent={ () => (
						<Fragment>
							<ColorPicker className="gutengeek-color-picker-inner" color={ value || '' } disableAlpha={ ! alpha }
							 	onChangeComplete={ (color) => {
								 	if (color.rgb) {
									 	onChange( parseInt( color.rgb.a ) !== 1 ? 'rgba(' + color.rgb.r + ',' + color.rgb.g + ',' + color.rgb.b + ',' + color.rgb.a + ')' : color.hex );
								 	}
							 	} }/>

							{ presets &&
							<div className="gutengeek-rgba-palette">
								{ colorPresets().map( preset => <button style={ { color: preset.color } }
																		onClick={ () => onChange( preset.color ) }/> ) }
							</div>
							}
						</Fragment>
					) }
				/>
				{ ( value && clear ) &&
				<Fragment>
					<Tooltip text={ __( 'Clear' ) }>
						<span className="gutengeek-button-clear" onClick={ () => onChange( '' ) } role="button">
							<Dashicon icon="image-rotate" width={ 10 } height={ 10 }/>
						</span>
					</Tooltip>
				</Fragment>
				}
			</div>
		);
	}
}

Color.defaultProps = {
	label: '',
	value: '',
	presets: true,
	clear: true,
	alpha: true,
	onChange: (color) => { console.log( `${color}` ) }
}

export default Color;
