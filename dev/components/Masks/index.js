import classnames from 'classnames';
import './editor.scss';
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
	SelectControl,
	Dropdown,
	Dashicon,
	Button,
	ToggleControl
} = wp.components;

const MaskControl = ( props ) => {
	const { label, className, value, onChange } = props;
	const maskPresets = wp.gutengeek.helper.getMaskImages();

	const saveValue = (slug) => {
		var mask = maskPresets.find((mask) => mask.slug == slug);
		const newValue = { ...props.value };
		newValue.value = slug;
		if (slug) {
			let image;
		    image = new Image();
		    image.crossOrigin = 'Anonymous';
		    image.addEventListener('load', function() {
		        let canvas = document.createElement('canvas');
		        let context = canvas.getContext('2d');
		        canvas.width = image.width;
		        canvas.height = image.height;
		        context.drawImage(image, 0, 0);
		        newValue.maskString = canvas.toDataURL('image/svg');
		        onChange(newValue)
		    });
		    image.src = mask.url;
		} else {
			newValue.maskString = '';
			onChange(newValue)
		}
	}

	const toggleMask = (val) => {
		const newValue = { ...value };
		newValue.openMask = val;
		onChange(newValue)
	}
	const selected = value && value.value ? value.value : '';
	const maskSelected = maskPresets.find((mask) => mask.slug == selected);
	return (
		<div className={ classnames(
						'gutengeek-mask-control',
						'gutengeek-subpanel-control',
						'gutengeek-mt-15',
						'gutengeek-mb-15',
						className ? className : '',
					) }>
			<ToggleControl className="gutengeek-toggle-control-field"
										   label={ label }
										   checked={ value && value.openMask !== undefined ? value.openMask : false }
										   onChange={ ( value ) => toggleMask( value ) }/>
			{ value && value.openMask && <Fragment>
				{ label && <div className="gutengeek-mt-15 gutengeek-mb-15"><div className="components-base-control__field">
					<label className="components-base-control__label">{ __( 'Select Shape' ) }</label>
				</div></div> }
				{ maskPresets && <Fragment>
					<Dropdown
						className="gutengeek-flex"
						position="center"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Fragment>
								<div className="gutengeek-flex gutengeek-w-100 gutengeek-mb-15 gutengeek-mask-wrap gutengeek-align-center">
									{ ! selected && <span className={ classnames( 'gutengeek-w-100', 'gutengeek-mb-15' ) } onClick={ onToggle }
										  style={ { height: '10px', borderRadius: '4px' } }>{ !selected && <div className="gutengeek-fake-input">{ __( 'Select Preset' ) }</div> }
									  </span> }
									{ maskSelected && maskSelected.url && <Fragment>
										<div className="image-mask-selected"><img onClick={() => onToggle()} src={maskSelected.url ? maskSelected.url : ''} /></div>
										<Button className="gutengeek-button-clear gutengeek-button-field gutengeek-ml-10 gutengeek-no-border gutengeek-no-padding"
											isSmall
											onClick={ () => saveValue( '' ) } role="button">
											<Dashicon icon="image-rotate" width={ 15 } height={ 15 }/>
										</Button>
									</Fragment> }
								</div>
							</Fragment>
						) }
						renderContent={ () => (
							<ul style={ {
								margin: '0 5px',
							} }>
								{ maskPresets && maskPresets.map( ( mask, index ) => {
									return (
										<li onClick={ () => saveValue( mask.slug ) }
											className={ classnames(
												'gutengeek-preset-mask-preview',
												'gutengeek-w-50',
												'gutengeek-mt-5',
											) }>
											<img src={mask.url} />
											<span>{mask.name}</span>
										</li>
									);
								} ) }
							</ul>
						) }
					/>
				</Fragment> }
			</Fragment> }
		</div>
	)
}

MaskControl.PropTypes = {
	openMask: 1,
	label: '',
	value: {
		value: '',
		maskString: ''
	},
	onChange: () => {}
}

export default MaskControl;
