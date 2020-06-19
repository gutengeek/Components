const { __ } = wp.i18n;
const { Component } = wp.element;
const { ButtonGroup, Button, Tooltip } = wp.components;
import icons from './icons';
import classnames from 'classnames';
import './editor.scss';

class Heading extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			options: [
				{ label: icons.h1, value: 'h1' },
				{ label: icons.h2, value: 'h2' },
				{ label: icons.h3, value: 'h3' },
				{ label: icons.h4, value: 'h4' },
				{ label: icons.h5, value: 'h5' },
				{ label: icons.h6, value: 'h6' },
			],
		};
	}

	render() {
		const { className, value, label, onChange, options } = this.props;

		let selectionOptions = options;
		if (options === undefined) {
			selectionOptions = this.state.options;
		}

		return (
			<div className={classnames(
					'gutengeek-field',
					'gutengeek-field-headings',
					className
				)}>
				{ label && <label className="gutengeek-mb-10">{ label }</label> }
				<ButtonGroup className="gutengeek-field-button-list gutengeek-no-border">
					{ selectionOptions.map( ( data, index ) => {
						return (
							<Button key={index}
								className={ classnames( 'gutengeek-button-field', data.value === value ? 'active' : '' ) }
								onClick={ () => onChange( data.value ) } isSmall isPrimary={ value === data.value }>
								<Tooltip text={ data.value }>
									{ data.label }
								</Tooltip>
							</Button>
						);
					} ) }
				</ButtonGroup>
			</div>
		);
	}

}

export default Heading;
