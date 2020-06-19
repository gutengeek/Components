```# Gutengeek - Components Reference```

The package is a library that provides all components to create control power and UI beauty block inspector easily.

## Installation

### Install the composer package

```bash
cd path/to/your-[plugin|theme]
composer require gutengeek/components
```

Make sure `autoload.php` had included
```php
// require autoload into your plugin or theme
require_once 'path/to/project/vendor/autoload.php';
```

Make sure `autoload.php` had included
```php
// require autoload into your plugin or theme
require_once 'path/to/project/vendor/autoload.php';
```

### Install the npm package
```bash
cd path/to/your-folder
npm i @gutengeek/components
```

## Usage

Within [GutenGeek Plugin](https://gutengeek.com) plugin, these components can be accessed by importing from the `wp.gutengeek.components` root directory:

```jsx
// use with gtg-advanced-blocks wordpress plugin
const {
	BorderControl
} = wp.gutengeek.components

// import via npm
import { BorderControl } from '@gutengeek/components';
```

```jsx
/**
 * GutenBerg dependencies
 */
const {
	InspectorControls
} = wp.blockEditor;

const { __ } = wp.i18n;

const {
	PanelBody,
} = wp.components;


/**
 * GutenGeek dependencies
 */
const {
	BorderControl
} = wp.gutengeek.components

export default function MyComponent() {
	const [ device, setDevice ] = useState( 'desktop' ); // desktop, tablet, mobile
	const [ value, setValue ] = useState( {} ); // border control value default is an object

	return <InspectorControls>
		<PanelBody title={ __('My Panel Body') }>
			<BorderControl
				className="your-extra-class"
				title={ __( 'Border' ) }
				value={ value }
				onChangeDevice={ ( device ) => setDevice(device) }
				device={ device }
				onChange={ value => setValue( value ) }
				units={ [ 'px', 'em', '%' ] }
			/>
		</PanelBody>
	</InspectorControls>
}
```

## Gutengeek Toolbar Components Available:

`ShapeControl`

`SizeTypeUnits`

`GradientControl`

`IconPickerControl`

`PaddingControl`

`MarginControl`

`HeadingControl`

`RangeSlider`

`BackgroundControl`

`Typography`

`AlignmentsControl`

`BorderControl`

`BorderRadiusControl`

`BoxShadowControl`

`TransformControl`

`ButtonGroupControl`

`Dimension`

`ParallaxControls`

`Color`

`MediaControl`

`TransitionControl`

`ResponsiveControl`

`InspectorTabs`

`InspectorTab`

------
## Development Guideline


### ShapeControl

By using Gutengeek, you can easily control all shape dividers which separate  the section of page. Able to choose shape top & shape bottom.

```jsx
export default function MyComponent( props ) {
	const {
		attributes: {
			shape
		},
		setAttributes
	} = props
	const [ device, setDevice ] = useState( 'desktop' );

	return <InspectorControls>
		<PanelBody title={ __('My Panel Body') }>
			<ShapeControl value={ shape }
				device={ device }
			  	onChangeDevice={ ( device ) => setDevice( device ) }
			  	onChange={ ( value ) => setAttributes( { shape: value } ) }
		  	/>
		</PanelBody>
	</InspectorControls>
}
```

### SizeTypeUnits

Gutengeek offers options for units to measure size, type as px, em, rem, % in CSS.

```jsx
export default function MyComponent() {
	const [ value, setValue ] = useState( 'em' ); // default value maybe em, px, %, vh, vw, whatever you want

	return <InspectorControls>
		<PanelBody title={ __('My Panel Body') }>
			<SizeTypeUnit units={ ['px', 'em', '%'] } value={ value } onClick={ ( value ) => setValue( value ) }/>
		</PanelBody>
	</InspectorControls>
}
```

### GradientControl

Support CSS Gradients to let show off a smooth color between at least 2 or more colors.

```jsx
<GradientControl value={ value } onChange={ ( value ) => setAttributes({value: value}) } presetAllowed={true}/>
```

### IconPickerControl

Support to show/display all icons from font awesome to let you choose icon for button, list bullets, social network icon in order to impress customers at the first sight.

```jsx
<IconPickerControl icons={['fa fa-gear', 'fa fa-times', 'fa fa-calculator']} renderIcon={(icon) => {
		// render your icon here
		return (
			<i className="{icon}" />
		)
	} }
	label={ __( 'Icon' ) }
	value={ value }
	onChange={ value => setAttributes( { value: value } ) }
/>
```

### PaddingControl

Set space for around element's contents,. There are settings for padding ( top, right, bottom, left)

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<PaddingControl
	value={ padding }
	label={__( 'Padding' )}
	onChange={ ( value ) => setAttributes({ padding: value } )}
	device={ device}
	onChangeDevice={ (value) => setDevice(value) } units={ [ 'px', 'em', '%' ] }
/>
```

### MarginControl

Setting the margin for each side of an element with border (top, right, bottom, and left).

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<MarginControl
	value={ margin }
	label={__( 'Margin' )}
	onChange={ ( value ) => setAttributes({ margin: value } )}
	device={ device}
	onChangeDevice={ (value) => setDevice(value) } units={ [ 'px', 'em', '%' ] }
/>
```

### HeadingControl

Allows to choose heading tag: h1, h2, h3, h4, h5, h6

```jsx
<HeadingControl
	label={ __( 'Heading Tag' ) }
	value={ headingTag }
	onChange={ ( value ) => setAttributes( { headingTag: value } ) }
/>
```

### RangeSlider

Drag and drop number, support on the different devices.

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<RangeSlider
	label={ __( 'Column Gap' ) }
	value={ marginBottom } min={ 1 }
	max={ 33 }
	onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
	units={['px', 'em', '%']}
	min={0}
	max={100}
	device={device}
	onChangeDevice={ ( device ) => setDevice( device ) }
	allowReset
/>
```

### BackgroundControl

Choose Normal & Hover. Possible to set background: Color, Gradient, Video &  Images

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<BackgroundControl
	className="your-extra-class"
	label={ __( 'Background' ) }
	value={ background }
	allows={ [ 'color', 'gradient', 'image' ] }
	device={ gutengeek_device_mode }
	onChange={ value => setAttributes( { background: value } ) }
	onChangeDevice={ ( device ) => setDevice( device )
	}
/>
```

### Typography

Font size, font family, variants, font style, font weight, text transform controls

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<Typography
	label={ __( 'Typography' ) }
	value={ headingTypo }
	onChange={ value => setAttributes( { headingTypo: value } ) }
	device={ gutengeek_device_mode }
	onChangeDevice={ value => setDevice(value) }
/>
```

### AlignmentsControl

Possible to set text-align in CSS with Align center, wide width, full width

```jsx
<AlignmentsControl
	className="your-prefix"
	label={ __( 'Text Alignment' ) }
	device={ device }
	onChangeDevice={ ( device ) => setDevice( device ) }
	value={ value }
	onChange={ ( value ) => setAttributes( { value: value } ) }
	toggle={true}
	options={[
		{ label: __('Left'), value: 'left', text: __( 'Left' ) },
		{ label: __('Center'), value: 'center', text: __( 'Center' ) },
		{ label: text: __( 'Right' ), value: 'right', text: __( 'Right' ) },
	]}
/>
```

### BorderControl

Enable/disable border in css, set position, width (px, em, %), border shape.

```jsx
<BorderControl
	className="your-extra-class"
	title={ __( 'Border' ) }
	value={ value }
	onChangeDevice={ ( device ) => setDevice(device) }
	device={ device }
	onChange={ value => setValue( value ) }
	units={ [ 'px', 'em', '%' ] }
/>
```

### BorderRadius

Defines the radius in CSS of the element's corners

```jsx
<BorderRadiusControl
	className="your-extra-classs"
	label={ __( 'Border Radius' ) }
	units={ [ 'px', 'em', '%' ] }
	value={ value }
	responsive={ true }
	device={ device }
	onChangeDevice={ ( device ) => setDevice( device ) }
	min={ 0 }
	max={ 100 }
	onChange={ value => setAttributes( { value: value } ) }
/>
```

### BoxShadowControl

Choose box shadow in CSS

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```

```jsx
<BoxShadowControl
	value={ boxShadow } device={ device }
	unit='px'
	onChangeDevice={ ( device ) => setDevice( device ) }
	onChange={ value => setAttributes( { boxShadow: value } ) }
/>
```

### TransformControl

All attribute transform in CSS

```jsx
const [ device, setDevice ] = useState( 'desktop' );
```
```jsx
<TransformControl
	label={ __( 'Transform' ) }
	value={ transform }
	onChange={(value) => setAttributes( { transform: value } )}
	device={ device} onChangeDevice={ ( device ) => setDevice( device ) }
/>
```

### ButtonGroupControl

Enable/disable buttons, type, size, enable/disable typography, Text, link (Open new window, same window), margin & icon. Only hover ( enable/disable), Icon Position, Icon Spacing,

```jsx
<ButtonGroupControl
	className="your-extra-class"
	label={ __( 'Button Position' ) }
	value={ position }
	options={ [
		{ value: 'left', label: <Dashicon icon="arrow-left"/>, text: __( 'Left' ) },
		{ value: 'right', label: <Dashicon icon="arrow-right"/>, text: __( 'Right' ) },
	] }
	toggle={ true }
	onClick={ ( value ) => setAttributes( { position: value } ) }
/>
```

### Dimension

Set padding & margin with Top, Right, Bottom & Left with options px, em, rem, % in CSS.

```jsx
<Dimension
	label={ __( 'Card Padding' ) }
	value={ cardPadding }
	device={ gutengeek_device_mode }
	min={ 0 }
	max={ 500 }
	onChangeDevice={ ( device ) => this.props.setDevice(device) }
	onChange={ value => setAttributes( { panelSpacing: value } ) }
/>
```


### ParallaxControls

Enable/disable parallax control, event type, items #1 (select image, width, height, position, Speed, Duration, Index)

```jsx
<ParallaxControls parallax={parallax} onChange={(value) => setAttributes({ parallax: { ...parallax, ...value } })}/>
```

### Color

Pick a suitable color from pallet

```jsx
<Color className="your-extra-class" label={ __( 'Color' ) } value={ color } onChange={ ( value ) => setAttributes( { color: value } ) }/>
```

### Media

Upload media to library or import media url.

```jsx
<MediaControl
	label={ __( 'Select Image' ) } multiple={ false }
	type={ [ 'image', 'color', 'gradient', 'video' ] }
	value={ iconImg } panel={ true }
	onChange={ media => setAttributes( { iconImg: media } ) }
/>
```

### TransitionControl

Attributes transition effects controls in CSS

```jsx
<TransitionControl value={ transition } onChange={(value) => setAttributes({ transition: value } )}/>
```

### ResponsiveControl

Options for Hide/enable on devices as desktop, tablet, mobile

```jsx
const [ device, setDevice ] = useState( 'desktop' );
const [ unit, setUnit ] = useState( 'px' );
```

```jsx
<ResponsiveControl label={ label }
		device={ device }
		units={ [ 'px', 'em' ] }
		unit={ unit }
		onChangeSizeType={ ( value ) => setUnit( value ) }
		onChangeDevice={ ( value ) => setDevice( value ) }>
{
	( deviceMode ) => {
		return (
			// return your children component
		);
	}
}
```


### InspectorTabs & InspectorTab

Split tab layout, style, advanced

```jsx
<InspectorControls>
	<InspectorTabs tabs={[ 'layout', 'style', 'advanced' ]} active="advanced">
		<InspectorTab key="layout">
			// do something
		</InspectorTab>
		<InspectorTab key="style">
			// do something
		</InspectorTab>
		<InspectorTab key="advanced">
			// do something
		</InspectorTab>
	</InspectorTabs>
</InspectorControls>
```
