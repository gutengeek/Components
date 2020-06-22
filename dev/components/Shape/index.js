import shapes from './shapes';
import Color from '../Color';
import Responsive from '../Responsive';
import Range from '../RangeSlider';
import RadioToggleControl from '../RadioToggle';
import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Dropdown, Tooltip, Dashicon, Button } = wp.components;

class Shape extends Component {

	constructor(props) {
		super(props);
		this.shapesOptions = wp.hooks.applyFilters( 'gutengeek_shapes_presets', shapes );
	}

	/**
	 * save all value
	 *
	 * @param type
	 * @param val
	 */
	saveValue( type, val ) {
		const { value, onChange } = this.props;
		let newValue = { ...value };
		newValue[type] = val;
		newValue.openShape = true;
		onChange( newValue );
	}

	renderShapeOptions() {
		const { value } = this.props;
		let shapes = Object.keys( this.shapesOptions );

		return (
			<ul className="gutengeek-shape-picker-options">
				{ shapes.map( item => <li className={ classnames(
					'gutengeek-shape-picker-option-item',
					value.shape === item ? 'gutengeek-shape-selected' : '',
				) }
										  onClick={ () => this.saveValue( 'shape', item ) }
										  dangerouslySetInnerHTML={ { __html: this.shapesOptions[item] } }
										  style={ value.shape == item ? { fill: value.color } : {} }/> ) }
			</ul>
		);
	};

	render() {
		const { label, value, units, onChangeDevice, device, min, max, className } = this.props;

		return (
			<Fragment>

				<div className={ classnames( 'gutengeek-flex', className ? className : '' ) }>
					<Dropdown
						className={ 'gutengeek-shape-picker gutengeek-w-100' }
						contentClassName="gutengeek-shape-picker-content"
						position="bottom center"
						renderToggle={ ( { isOpen, onToggle } ) =>
							<div className="gutengeek-flex gutengeek-flex-wrap">
								<div className="components-base-control__field gutengeek-w-100 gutengeek-flex gutengeek-mb-10">
									<label>{ label ? label : __( 'Shape' ) }</label>
									{
										value.shape &&
										<Tooltip text={ __( 'Clear' ) }>
											<Button
												className="gutengeek-button-clear gutengeek-button-field gutengeek-no-border gutengeek-no-padding gutengeek-ml-auto"
												isSmall
												onClick={ () => this.saveValue( 'shape', '' ) }
											>
												<Dashicon icon="image-rotate" width={ 10 } height={ 10 }/>
											</Button>
										</Tooltip>
									}
								</div>
								<span className="gutengeek-w-100" onClick={ onToggle } aria-expanded={ isOpen }>
									{
										value.shape ?
											<div className="gutengeek-field-shape-value"
												 dangerouslySetInnerHTML={ { __html: this.shapesOptions[value.shape] } }/>
											:
											<div
												className="gutengeek-fake-input gutengeek-flex gutengeek-align-center gutengeek-flex-wrap">
												<span>{ __( 'Select' ) }</span>
											</div>
									}
								</span>
							</div>
						}
						renderContent={ () => {
							const { value } = this.props;
							let shapes = Object.keys( this.shapesOptions )
							return (
								<ul className="gutengeek-shape-picker-options">
									{ shapes.map( item => <li className={ classnames(
										'gutengeek-shape-picker-option-item',
										value.shape === item ? 'gutengeek-shape-selected' : '',
									) }
															  onClick={ () => this.saveValue( 'shape', item ) }
															  dangerouslySetInnerHTML={ { __html: this.shapesOptions[item] } }
															  style={ value.shape == item ? { fill: value.color } : {} }/> ) }
								</ul>
							);
						} }
					/>
				</div>
				{ value.shape && <Fragment>

					<Color className="gutengeek-mt-24" label={ __( 'Color' ) } value={ value.color }
						   onChange={ ( value ) => this.saveValue( 'color', value ) }/>
					<Range
						label={__( 'Width' )}
						value={ value.width || {} }
						onChange={ ( value ) => this.saveValue( 'width', value ) }
						min={ min || 0 }
						max={ max || 1000 }
						device={device}
						onChangeDevice={ ( value ) => onChangeDevice( value ) }
						units={ units }
						allowReset
					/>
					<Range
						label={__( 'Height' )}
						value={ value.height || {} }
						onChange={ ( value ) => this.saveValue( 'height', value ) }
						min={ min || 0 }
						max={ max || 1000 }
						device={device}
						onChangeDevice={ ( value ) => onChangeDevice( value ) }
						units={ units }
						allowReset
					/>

					<RadioToggleControl value={ value.flip !== undefined ? value.flip : 0 } options={ [
						{ value: 1, label: __( 'Yes' ) },
						{ value: 0, label: __( 'No' ) },
					] } label={ __( 'Flip' ) }
										onChange={ ( value ) => this.saveValue( 'flip', value ) }/>
					<RadioToggleControl value={ value.bringToFront !== undefined ? value.bringToFront : 0 } options={ [
						{ value: 1, label: __( 'Yes' ) },
						{ value: 0, label: __( 'No' ) },
					] } label={ __( 'Bring To Front' ) }
										onChange={ ( value ) => this.saveValue( 'bringToFront', value ) }/>
				</Fragment> }
			</Fragment>
		);
	}

}

Shape.defaultProps = {
	value: {
		shape: '',
		width: { desktop: '', tablet: '', mobile: '', unit: '%' },
		height: { desktop: '', tablet: '', mobile: '', unit: '%' },
		color: '#fff',
		openShape: false,
		bringToFront: 0,
		flip: 0,
	},
	units: ['px', 'em', '%'],
	min: 0,
	max: 1000,
	onChange: () => {},
	onChangeDevice: () => {},
};

export default Shape;
