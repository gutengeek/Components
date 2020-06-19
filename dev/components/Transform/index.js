import classnames from 'classnames';
import RangeSlider from '../RangeSlider';

const { Fragment, useState, useEffect } = wp.element;
const { __ } = wp.i18n;
const { PanelBody, ToggleControl, Dashicon } = wp.components;

const Translate = props => {
	const {
		value,
		onChange,
		device,
		onChangeDevice,
	} = props;

	const saveValue = (name, val) => {
		const newValue = { ...value };
		newValue[name] = val;
		onChange(newValue);
	}

	const {
		openTranslate,
		horizontal,
		vertical,
	} = value || {};

	return <div className="gutengeek-subpanel-control gutengeek-mt-15 gutengeek-mb-15">
		<ToggleControl
			className="gutengeek-toggle-control-field"
			label={ __( 'Enable Translate' ) }
			checked={ openTranslate }
			onChange={ value => saveValue( 'openTranslate', value ) }
		/>

		{ openTranslate && <Fragment>
			<RangeSlider
				className="gutengeek-mt-15"
				label={ <Dashicon className="gutengeek-rotate-90" icon="leftright" width="20" height="20"/> }
				value={ vertical }
				onChange={ ( value ) => saveValue( 'vertical', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ -500 }
				max={ 500 }
				units={ [ 'px', 'em', '%' ] }
				step={0.1}
				allowReset
			/>
			<RangeSlider
				label={ <Dashicon icon="leftright" width="20" height="20"/> }
				value={ horizontal }
				onChange={ ( value ) => saveValue( 'horizontal', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ -500 }
				max={ 500 }
				units={ [ 'px', 'em', '%' ] }
				step={0.1}
				allowReset
			/>
		</Fragment> }
	</div>
}

const Scale = props => {
	const {
		value,
		onChange,
		device,
		onChangeDevice,
	} = props;

	const saveValue = (name, val) => {
		const newValue = { ...value };
		newValue[name] = val;
		onChange(newValue);
	}

	const {
		openScale,
		width,
		height,
	} = value || {};

	return <div className="gutengeek-subpanel-control gutengeek-mt-15 gutengeek-mb-15">
		<ToggleControl
			className="gutengeek-toggle-control-field"
			label={ __( 'Enable Scale' ) }
			checked={ openScale }
			onChange={ value => saveValue( 'openScale', value ) }
		/>

		{ openScale && <Fragment>
			<RangeSlider
				className="gutengeek-mt-15"
				label={ __( 'Width' ) }
				value={ width }
				onChange={ ( value ) => saveValue( 'width', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ 0 }
				max={ 10 }
				step={0.1}
				allowReset
			/>
			<RangeSlider
				label={ __( 'Height' ) }
				value={ height }
				onChange={ ( value ) => saveValue( 'height', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ 0 }
				max={ 10 }
				step={0.1}
				allowReset
			/>
		</Fragment> }
	</div>
}

const Rotate = props => {
	const {
		value,
		onChange,
		device,
		onChangeDevice,
	} = props;

	const saveValue = (name, val) => {
		const newValue = { ...value };
		newValue[name] = val;
		onChange(newValue);
	}

	const {
		openRotate
	} = value || {};

	return <div className="gutengeek-subpanel-control gutengeek-mt-15 gutengeek-mb-15">
		<ToggleControl
			className="gutengeek-toggle-control-field"
			label={ __( 'Enable Rotate' ) }
			checked={ openRotate }
			onChange={ value => saveValue( 'openRotate', value ) }
		/>

		{ openRotate && <Fragment>
			<RangeSlider
				className="gutengeek-mt-15"
				label={ __( 'Rotate' ) }
				value={ value.value || {} }
				onChange={ ( value ) => saveValue( 'value', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ -1000 }
				max={ 1000 }
				units={ [ 'deg', 'turn' ] }
				step={0.1}
				allowReset
			/>
		</Fragment> }
	</div>
}

const Knew = props => {
	const {
		value,
		onChange,
		device,
		onChangeDevice,
	} = props;

	const saveValue = (name, val) => {
		const newValue = { ...value };
		newValue[name] = val;
		onChange(newValue);
	}

	const {
		openSkew,
		horizontal,
		vertical,
	} = value || {};

	return <div className="gutengeek-subpanel-control gutengeek-mt-15 gutengeek-mb-15">
		<ToggleControl
			className="gutengeek-toggle-control-field"
			label={ __( 'Enable Knew' ) }
			checked={ openSkew }
			onChange={ value => saveValue( 'openSkew', value ) }
		/>

		{ openSkew && <Fragment>
			<RangeSlider
				className="gutengeek-mt-15"
				label={ <Dashicon className="gutengeek-rotate-90" icon="leftright" width="20" height="20"/> }
				value={ vertical }
				onChange={ ( value ) => saveValue( 'vertical', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ 0 }
				max={ 100 }
				units={ [ 'deg' ] }
				allowReset
			/>
			<RangeSlider
				label={ <Dashicon icon="leftright" width="20" height="20"/> }
				value={ horizontal }
				onChange={ ( value ) => saveValue( 'horizontal', value ) }
				responsive={ true }
				device={ device }
				onChangeDevice={ ( device ) => onChangeDevice( device ) }
				min={ 0 }
				max={ 100 }
				units={ [ 'deg' ] }
				allowReset
			/>
		</Fragment> }
	</div>
}

const Transform = ( props ) => {
	const { className, label, value, onChange, device, onChangeDevice } = props;

	const saveValue = (name, val) => {
		const newValue = {...value};
		newValue[name] = val;
		onChange(newValue);
	}

	const {
		openTransform,
		translate,
		scale,
		rotate,
		skew
	} = value || {};
	return <PanelBody initialOpen={true} className="gutengeek-inspector-panel-body">
		<div className={ classnames(
			'gutengeek-field',
			'gutengeek-transform-control',
			className || '',
			'gutengeek-mb-0'
		) }>
		<div className="gutengeek-transform-container">
			<ToggleControl
				className="gutengeek-toggle-control-field gutengeek-mb-0"
				label={ __( 'Enable Transform' ) }
				checked={ openTransform }
				onChange={ value => saveValue( 'openTransform', value ) }
			/>

			{ openTransform && <Fragment>
				<Translate value={translate} onChange={(value) => saveValue('translate', value)} device={device} onChangeDevice={onChangeDevice}/>
				<Scale value={scale} onChange={(value) => saveValue('scale', value)} device={device} onChangeDevice={onChangeDevice}/>
				<Rotate value={rotate} onChange={(value) => saveValue('rotate', value)} device={device} onChangeDevice={onChangeDevice}/>
				<Knew  value={skew} onChange={(value) => saveValue('skew', value)} device={device} onChangeDevice={onChangeDevice}/>
			</Fragment> }
		</div>
	</div>
	</PanelBody>
}

Transform.PropTypes = {
	label: {},
	value: {
		openTransform: false,
		translate: {
			openTranslate: true,
			horizontal: {
				unit: 'px',
				desktop: 0
			},
			vertical: {
				unit: 'px',
				desktop: 0
			},
		},

		scale: {
			openScale: false,
			desktop: {
				width: 1,
				height: 1
			}
		},

		rotate: {
			openRotate: false,
			value: {
				unit: 'deg'
			}
		},

		skew: {
			openSkew: false,
			vertical: {
				unit: 'deg'
			},
			horizontal: {
				unit: 'deg'
			}
		}
	},
	device: 'desktop',
	onChange: () => {},
	onChangeDevice: () => {}
}

export default Transform;
