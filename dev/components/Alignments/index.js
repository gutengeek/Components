import Devices from '../Devices';
import classnames from 'classnames';
import './editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { ButtonGroup, Button, Tooltip } = wp.components;

const {
	Dashicon,
} = wp.components;

const Left = props => {
	return (
		<svg viewBox="0 0 28 28">
			<g>
				<path d="M5 13h2v2H5zM5 21h2v2H5zM5 17h2v2H5zM5 9h2v2H5zM5 5h2v2H5z" />
				<path d="M7.339 13.25a1 1 0 0 0 0 1.501l4.642 4.09a.6.6 0 0 0 1.007-.442V16h9a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-9V9.602a.601.601 0 0 0-1.002-.446L7.339 13.25z" />
			</g>
		</svg>
	)
}

const Right = props => {
	return (
		<svg viewBox="0 0 28 28">
			<g>
				<path d="M21 21h2v2h-2zM21 17h2v2h-2zM21 9h2v2h-2zM21 5h2v2h-2zM21 13h2v2h-2z" />
				<path d="M20.649 13.249l-4.642-4.09A.6.6 0 0 0 15 9.602V12H6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9v2.398a.601.601 0 0 0 1.002.446l4.647-4.094a1 1 0 0 0 0-1.501z" />
			</g>
		</svg>
	)
}

const Center = props => {
	return (
		<svg viewBox="0 0 28 28">
			<g>
				<path d="M5 13h2v2H5zM5 9h2v2H5zM5 17h2v2H5zM5 5h2v2H5zM5 21h2v2H5zM21 9h2v2h-2zM21 5h2v2h-2zM21 13h2v2h-2zM15 8h-2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zM21 17h2v2h-2zM21 21h2v2h-2z" />
			</g>
		</svg>
	)
}

class Alignment extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			options: [
				{ label: <Left />, value: 'left', text: __( 'Left' ) },
				{ label: <Center />, value: 'center', text: __( 'Center' ) },
				{ label: <Right />, value: 'right', text: __( 'Right' ) },
			],
		};
	}

	changeValue( val ) {
		const { value, device, onChange } = this.props;
		let newValue = { ...value };
		newValue[device] = val;
		onChange( newValue );
	}

	render() {
		const { value, label, options, device, onChangeDevice, className, toggle } = this.props;

		let selectionOptions = options;
		if (options === undefined) {
			selectionOptions = this.state.options;
		}

		const alignment = value !== undefined && value[device] !== undefined ? value[device] : '';
		return (
			<Devices label={ label } className={ classnames( 'gutengeek-mb-10', 'gutengeek-alignment-control', 'gutengeek-w-100', className || '' ) }
							value={ device }
							onClick={ ( value ) => onChangeDevice( value ) }>
				{
					( deviceMode ) => {
						return (
							<div className="gutengeek-field gutengeek-flex gutengeek-field-alignments gutengeek-align-center gutengeek-mt-10">
								<ButtonGroup className={ classnames( 'gutengeek-field-button-list', 'gutengeek-no-border', 'gutengeek-w-100' ) }>
									{ selectionOptions.map( ( data, index ) => {
										return (
											<Tooltip text={ data.text } key={index}>
												<Button
													className={ classnames( 'gutengeek-button-field', data.value === alignment ? 'active' : '' ) }
													onClick={ () => this.changeValue( toggle && data.value === alignment ? '' : data.value ) }
													isSmall
													isPrimary={ data.value === alignment }>
													{ data.label }
												</Button>
											</Tooltip>
										);
									} ) }
								</ButtonGroup>
							</div>
						);
					}
				}
			</Devices>
		);
	}

}

Alignment.defaultProps = {
	label: '',
	value: {
		desktop: '',
		tablet: '',
		mobile: '',
	},
	onChangeDevice: () => {
		console.log( __( 'Alignment device was changed' ) );
	},
	onChange: () => {
		console.log( __( 'Alignment value was changed' ) );
	},
	device: 'desktop',
	toggle: true,
};

export default Alignment;
