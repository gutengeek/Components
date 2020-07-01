// other packages
import MediaControl from '../Media';
import RangeSlider from '../RangeSlider';
import Color from '../Color';

const { __ } = wp.i18n;
const { Fragment, useEffect, useState } = wp.element;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

const defaultItem = {
	image: {},
	width: {openRange: 1, value: 500, unit: 'px'},
	height: {openRange: 1, value: 200, unit: 'px'},
	positionX: {openRange: 1, value: 50, unit: '%'},
	positionY: {openRange: 1, value: 20, unit: '%'},
	hoverSpeedX: 200,
	hoverSpeedY: 80,
	zIndex: '',
	rate: 0.0008,

	scale: 1.2,
	scrollMoveX: 150,
	scrollMoveY: 50,
	rotation: 45
}

const ParallaxItem = props => {
	const {
		index,
		event,

		duration,
		image,
		positionX,
		positionY,
		width,
		height,
		hoverSpeedX,
		hoverSpeedY,
		zIndex,
		rate,

		scale,
		scrollMoveX,
		scrollMoveY,
		rotation,

		onChange
	} = props;

	return <Fragment>
		<PanelBody className="gutengeek-inspector-panel-body sub" title={ __( 'Item #' ) + ( parseInt(index) + 1 ) } initialOpen={false}>
			<MediaControl
				label={ __( 'Select Image' ) } multiple={ false }
				type={ [ 'image' ] }
				value={ image } panel={ true }
				onChange={ media => onChange( { image: media } ) }
			/>
			<RangeSlider label={ __( 'Width' ) } value={ width } min={ 1 } max={ width && width.unit === '%' ? 100 : 2000 } units={['px', 'em', '%']} onChange={ ( value ) => onChange( { width: value } ) } allowReset />
			<RangeSlider label={ __( 'Height' ) } value={ height } min={ 1 } max={ height && height.unit === '%' ? 100 : 2000 } units={['px', 'em', '%']} onChange={ ( value ) => onChange( { height: value } ) } allowReset />
			<RangeSlider label={ __( 'Position X' ) } value={ positionX } units={['px', 'em', '%']} min={ 1 } max={ positionX && positionX.unit === '%' ? 100 : 2000 } onChange={ ( value ) => onChange( { positionX: value } ) } allowReset />
			<RangeSlider label={ __( 'Position Y' ) } value={ positionY } units={['px', 'em', '%']} min={ 1 } max={ positionY && positionY.unit === '%' ? 100 : 2000 } onChange={ ( value ) => onChange( { positionY: value } ) } allowReset />

			{ event === 'hover' && <Fragment>
				<RangeSlider label={ __( 'Speed X' ) } value={ hoverSpeedX } min={ 1 } max={ 2000 } onChange={ ( value ) => onChange( { hoverSpeedX: value } ) } allowReset />
				<RangeSlider label={ __( 'Speed Y' ) } value={ hoverSpeedY } min={ 1 } max={ 2000 } onChange={ ( value ) => onChange( { hoverSpeedY: value } ) } allowReset />
				<RangeSlider label={ __( 'Rate' ) } value={ rate } step={1} min={ 1 } max={ 100 } initialPosition={0} onChange={ ( value ) => onChange( { rate: value } ) } allowReset />
				<RangeSlider label={ __( 'Duration(seconds)' ) } value={ duration } min={ 0 } max={ 50 } onChange={ ( value ) => onChange( { duration: value } ) } allowReset />
			</Fragment> }
			{ event === 'scroll' && <Fragment>
				<RangeSlider label={ __( 'Scale' ) } value={ scale } step={1} min={ 1 } max={ 100 } initialPosition={0} onChange={ ( value ) => onChange( { scale: value } ) } allowReset />
				<RangeSlider label={ __( 'Move X' ) } value={ scrollMoveX } min={ 1 } max={ 1000 } onChange={ ( value ) => onChange( { scrollMoveX: value } ) } allowReset />
				<RangeSlider label={ __( 'Move Y' ) } value={ scrollMoveY } min={ 1 } max={ 1000 } onChange={ ( value ) => onChange( { scrollMoveY: value } ) } allowReset />
				<RangeSlider label={ __( 'Rotate' ) } value={ rotation } min={ -360 } max={ 360 } initialPosition={0} onChange={ ( value ) => onChange( { rotation: value } ) } allowReset />
			</Fragment> }
			<RangeSlider label={ __( 'z-Index' ) } value={ zIndex } min={ 1 } max={ 100 } initialPosition={0} onChange={ ( value ) => onChange( { zIndex: value } ) } allowReset />
		</PanelBody>
	</Fragment>
}

const Parallax = props => {
	const {
		parallax,
		onChange,
	} = props;

	const {
		enable,
		items,
		event
	} = parallax || {}

	const [ parallaxItems, setParallaxItems ] = useState( [] );
	const [ enableStatus, setStatus ] = useState( false );
	const [ eventType, setEvent ] = useState( false );

	useEffect(() => {
		if ( items && lodash.differenceWith( items, parallaxItems, lodash.isEqual ).length > 0 ) {
			setParallaxItems( items );
		}
	}, [items]);

	useEffect(() => {
		if ( enable !== undefined && enable !== enableStatus ) {
			setStatus( enable )
		}
	}, [enable])

	useEffect(() => {
		if ( eventType !== undefined && eventType !== event ) {
			setEvent( event )
		}
	}, [event])

	const updateParallax = (value) => {
		let newParallax = { ...parallax, ...value };
		onChange( newParallax );
	}

	// set item callback
	const setItems = (index, item) => {
		let newItems = parallaxItems ? [ ...parallaxItems ] : [];
		var newItem = { ...newItems[index], ...item };
		newItems[index] = { ...newItem };
		updateParallax( { items: newItems } );
	}

	// add new item callback
	const addNewItem = () => {
		let newItems = items ? [ ...items ] : [];
		newItems.push(defaultItem);
		updateParallax( { items: newItems } );
	}

	return (
		<Fragment>
			<PanelBody title={ __( 'Parallax' ) } initialOpen={false}>
				<ToggleControl
					className="gutengeek-toggle-control-field"
					label={ __( 'Enable' ) }
					checked={ enableStatus }
					onChange={ value => onChange( { enable: value }) }
				/>

				{ enableStatus && <Fragment>
					<SelectControl className="gutengeek-select-control__input"
						   	label={ __( 'Event Type' ) }
						   	options={ [{ label: 'Hover', value: 'hover' }, { label: 'Scroll', value: 'scroll' }] }
						   	value={ eventType }
						   	onChange={ ( value ) => onChange( { event: value } ) }
					/>
					{ parallaxItems.length > 0 && parallaxItems.map((item, index) => {
						return <ParallaxItem key={index} index={index} event={eventType} {...item} onChange={(value) => setItems( index, value )}/>
					}) }
					<button className="components-button is-primary gutengeek-flex gutengeek-mt-15" onClick={() => addNewItem()}>{ __( 'Add New' ) }</button>
				</Fragment> }
			</PanelBody>
		</Fragment>
	)

}

export default Parallax;
