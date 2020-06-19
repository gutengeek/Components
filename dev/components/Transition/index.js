import classnames from 'classnames';
import RangeSlider from '../RangeSlider';
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

const Transition = props => {
	const { className, value, onChange } = props;
	const {
		openTransition,
		duration,
		timing,
		delay
	} = value || {};

	const saveValue = (name, val) => {
		const newValue = { ...value };
		newValue[name] = val;
		onChange(newValue)
	}

	return <Fragment>
		<PanelBody initialOpen={true} className="gutengeek-inspector-panel-body">
			<div className={ classnames(
				'gutengeek-field',
				'gutengeek-transition-control',
				className || '',
				'gutengeek-mb-0'
			) }>
				<div className="gutengeek-transition-container">
					<ToggleControl
						className="gutengeek-toggle-control-field gutengeek-mb-0"
						label={ __( 'Enable Transition' ) }
						checked={ openTransition }
						onChange={ value => saveValue( 'openTransition', value ) }
					/>

					{ openTransition && <Fragment>
						<RangeSlider className="gutengeek-mt-15" label={ __( 'Duration' ) } units={['ms', 's']} value={duration} onChange={(value) => saveValue( 'duration', value ) } allowReset/>
						<SelectControl className="gutengeek-select-control__input"
							   	label={ __( 'Timing Function' ) }
							   	options={[
							   		{ value: 'linear', label: __( 'Linear' ) },
							   		{ value: 'ease', label: __( 'Ease' ) },
							   		{ value: 'ease-in', label: __( 'Ease In' ) },
							   		{ value: 'ease-out', label: __( 'Ease Out' ) },
							   		{ value: 'ease-in-out', label: __( 'Ease In Out' ) },
							   		{ value: 'step-start', label: __( 'Step Start' ) },
							   		{ value: 'step-end', label: __( 'Step End' ) },
							   		{ value: 'initial', label: __( 'Initial' ) },
							   		{ value: 'inherit', label: __( 'Inherit' ) },
						   		]}
							   	value={ timing }
							   	onChange={ ( value ) => saveValue( 'timing', value ) }
						/>
						<RangeSlider label={ __( 'Delay' ) } units={['ms', 's']} value={delay} onChange={(value) => saveValue( 'delay', value )} allowReset/>
					</Fragment> }
				</div>
			</div>
		</PanelBody>
	</Fragment>
}

Transition.propTypes = {
	label: '',
	value: {
		openTransition: false,
		duration: {},
		timing: 'inherit',
		delay: {}
	},
	onChange: () => {}
}

export default Transition;
