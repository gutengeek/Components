import classnames from 'classnames';
import './editor.scss';

const {
	Component,
} = wp.element;
const { Tooltip, ButtonGroup, Button } = wp.components;

/**
 * <RadioToggleControl value={value1} options={[{label: 'label1', value: 'option1'}, {label: 'label2', value: 'option2'}]} label='Do it together' onChange={(value) => setAttributes({value: value})} />
 */
class RadioToggle extends Component {

	render() {
		const { value, label, onChange, options, className } = this.props;

		let toggleOptions = options;
		if (options === undefined) {
			toggleOptions = this.state.options;
		}

		return (
			<div className={ classnames(
				'gutengeek-field',
				'gutengeek-field-radio-toggle',
				className ? className : '',
				label ? '' : 'no-label',
			) }>
				{ label && <label>{ label }</label> }
				<ButtonGroup className="gutengeek-field-button-list gutengeek-no-border">
					{ toggleOptions.map( ( data, index ) => {
						return (
							<Tooltip text={ data.label }>
								<Button key={ index }
										className={ classnames( 'gutengeek-button-field', data.value == value ? 'active' : '' ) }
										isPrimary={ value == data.value }
										isSmall
										onClick={ () => onChange( data.value ) }>
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

export default RadioToggle;
