import classnames from 'classnames';
import Typography from '../Typo';
import Color from '../Color';
import RangeSlider from '../RangeSlider';
import BackgroundControl from '../Background';
import BoxShadowControl from '../BoxShadow';
import PaddingControl from '../Padding';
import Margin from '../Margin';
import RadioToggleControl from '../RadioToggle';
import BorderControl from '../Border';
import BorderRadiusControl from '../BorderRadius';

const { __ } = wp.i18n
const { PanelBody } = wp.components;
const { Fragment } = wp.element;

const GroupControls = (props) => {
	const {
		title,
		value,
		onChange,
		onChangeDevice,
		onChangeState,
		state,
		device,
		transition,
	} = props;

	const {
		typography,
		color,
		hoverColor,
		bg,
		bgHover,
		boxShadow,
		boxShadowHover,
		border,
		borderHover,
		borderRadius,
		borderRadiusHover,
	} = value || {};

	const onChangeValue = (type, val) => {
		const cloneValue = { ...value };
		cloneValue[type] = val;
		cloneValue.openGroupControl = true;
		onChange( cloneValue );
	};
	return (
		<PanelBody className="gutengeek-inspector-panel-body" title={title} initialOpen={false}>
			<Typography className={ classnames( 'gutengeek-mt-15', 'gutengeek-mb-15' ) } label={ __( 'Typography' ) } value={ typography || {} } onChange={ val => onChangeValue( 'typography', val ) } device={ device } onChangeDevice={ device => onChangeDevice(device) }/>
			<RadioToggleControl
					value={ state }
					options={ [ { value: 'normal', label: __( 'Normal' ) }, { value: 'hover', label: __( 'Hover' ) } ] }
					onChange={ ( value ) => onChangeState( value ) }
				/>

			{ state === 'normal' && <Fragment>
				<Color className="gutengeek-mb-15" label={ __( 'Color' ) } value={ color || '' }
							   onChange={ ( value ) => onChangeValue( 'color', value ) }/>

			   <BackgroundControl
					className="gutengeek-mb-15" label={ __( 'Background' ) }
					value={ bg || {} }
					allows={ [ 'color', 'gradient', 'image' ] }
					device={ device }
					onChange={ value => onChangeValue( 'bg', value ) }
					onChangeDevice={ device => onChangeDevice(device) }
				/>
				<BoxShadowControl
						value={ boxShadow || {} } device={ device }
						unit='px'
						onChangeDevice={ ( device ) => onChangeDevice(device) }
						onChange={ value => onChangeValue( 'boxShadow', value ) }
					/>

				<BorderControl className="gutengeek-mb-20" title={ __( 'Border' ) } value={ border || {} }
								responsive={ true }
								onChangeDevice={ ( device ) => onChangeDevice(device) }
								device={ device }
								onChange={ value => onChangeValue( 'border', value ) }
								units={ [ 'px', 'em', '%' ] }
							/>
				<BorderRadiusControl
						className="gutengeek-mb-20"
						label={ __( 'Border Radius' ) }
						units={ [ 'px', 'em', '%' ] }
						value={ borderRadius || {} }
						responsive={ true }
						onChangeDevice={ ( device ) => onChangeDevice( device ) }
						device={ device }
						min={ 0 }
						max={ 100 }
						onChange={ value => onChangeValue( 'borderRadius', value ) }
					/>
			</Fragment> }
			{ state === 'hover' && <Fragment>
				<Color className="gutengeek-mb-15" label={ __( 'Hover Color' ) } value={ hoverColor || '' }
							   onChange={ ( value ) => onChangeValue( 'hoverColor', value ) }/>

			   <BackgroundControl
					className="gutengeek-mb-15" label={ __( 'Background' ) }
					value={ bgHover || {} }
					allows={ [ 'color', 'gradient', 'image' ] }
					device={ device }
					onChange={ value => onChangeValue( 'bgHover', value ) }
					onChangeDevice={ device => onChangeDevice(device) }
				/>
				<BoxShadowControl
						value={ boxShadowHover || {} } device={ device }
						unit='px'
						onChangeDevice={ ( device ) => onChangeDevice(device) }
						onChange={ value => onChangeValue( 'boxShadowHover', value ) }
					/>

				<BorderControl className="gutengeek-mb-20" title={ __( 'Border' ) } value={ borderHover || {} }
								responsive={ true }
								onChangeDevice={ ( device ) => onChangeDevice(device) }
								device={ device }
								onChange={ value => onChangeValue( 'borderHover', value ) }
								units={ [ 'px', 'em', '%' ] }
							/>
				<BorderRadiusControl
						className="gutengeek-mb-20"
						label={ __( 'Border Radius' ) }
						units={ [ 'px', 'em', '%' ] }
						value={ borderRadiusHover || {} }
						responsive={ true }
						onChangeDevice={ ( device ) => onChangeDevice( device ) }
						device={ device }
						min={ 0 }
						max={ 100 }
						onChange={ value => onChangeValue( 'borderRadiusHover', value ) }
					/>
			</Fragment> }
		</PanelBody>
	);
}

export default GroupControls;
