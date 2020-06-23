// import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { useLayoutEffect, useState, Component, Fragment } = wp.element;
const { Dashicon, Button, Dropdown, SelectControl } = wp.components;

export const parseSVG = ( svg ) => {
	svg = svg.replace( 'far ', '' );
	svg = svg.replace( 'fas ', '' );
	svg = svg.replace( 'fab ', '' );
	svg = svg.replace( 'fa-', '' );
	svg = svg.replace( 'fa ', '' );

	return svg;
};

export const renderSVG = ( svg, options = {}, effect = '' ) => {
	if ( typeof svg === 'undefined' || ! gutengeek_blocks_plugin ) {
		return null;
	}

	var svgHTML = null;
	if ( ( typeof svg === 'string' ) || ( typeof svg === 'object' && svg.lib === 'fontawesome' ) ) {
		if ( typeof svg === 'object' ) {
			svg = svg.value;
		}

		options = Object.assign( {}, {
			color: false,
			type: null,
			width: false,
			height: false
		}, options );
		const Icons = window.c.fontawesome_icons || {};

		if ( ! svg ) {
			return null;
		}
		svg = parseSVG( svg );
		const { type } = options;

		const fontAwesome = Icons[ svg ];

		if ( 'undefined' !== typeof fontAwesome ) {
			const viewboxArray = ( fontAwesome.svg.hasOwnProperty( 'brands' ) )
				? fontAwesome.svg.brands.viewBox
				: fontAwesome.svg.solid.viewBox;
			let path = fontAwesome.svg.solid ? fontAwesome.svg.solid.path : '';

			if ( type && fontAwesome.svg[ type ] !== undefined ) {
				path = fontAwesome.svg[ type ].path;
			} else if ( fontAwesome.svg.hasOwnProperty( 'brands' ) ) {
				path = fontAwesome.svg.brands.path;
			}
			const viewBox = viewboxArray.join( ' ' );
			const color = options.color || '';
			const { width, height } = options;
			let svgAtrrs = { ...options };
			delete svgAtrrs.type;
			svgHTML = (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox={ viewBox } { ...svgAtrrs }>
					<path d={ path } fill={ color }/>
				</svg>
			);
		}
	} else {
		const customIcons = gutengeek_blocks_plugin.custom_icons;
		const svg_id = svg.value;
		if ( customIcons[ svg.lib ] === undefined || customIcons[ svg.lib ].icons === undefined ||
			customIcons[ svg.lib ].icons[ svg_id ] === undefined ) {
			return null;
		}
		const svg_image = customIcons[ svg.lib ].icons[ svg_id ].svg;
		svgHTML = <span dangerouslySetInnerHTML={ { __html: svg_image } }/>;
	}
	if ( svgHTML ) {
		return svgHTML;
	}
};

const IconPicker = ( props ) => {
	const { onChange, value, label, icons, search, showLibs, renderIcon } = props;
	const [ lib, setLib ] = useState( value.lib );
	const customIcons = gutengeek_blocks_plugin && gutengeek_blocks_plugin.custom_icons ? gutengeek_blocks_plugin.custom_icons : [];

	const isCustomIcons = () => {
		return ( lib !== undefined && lib !== 'fontawesome' );
	};

	let customIconList = '';
	let libOptions = [
		{ label: __( 'FontAwesome' ), value: 'fontawesome' },
	];

	if ( customIcons && customIcons.length > 0 ) {
		Object.keys( customIcons ).map( ( key ) => {
			libOptions.push( { label: customIcons[ key ].icon_set_name, value: key } );
		} );

		if ( isCustomIcons() ) {
			customIconList = customIcons[ lib ].icons;
		}
	}

	let iconsAvailable = '';
	if ( icons && Object.keys( icons ).length > 0 ) {
		iconsAvailable = icons;
	} else {
		if ( isCustomIcons() ) {
			iconsAvailable = customIconList;
		} else {
			iconsAvailable = gutengeek_blocks_plugin.fontawesome_icons;
		}
	}

	useLayoutEffect( () => {
		setLib( value.lib );
	}, [ value ] );

	let finalData = [];
	let keys = Object.keys( iconsAvailable );
	Object.values( iconsAvailable ).map( ( item, index ) => {
		finalData.push( { ...item, ...{ icon: keys[ index ] } } );
	} );

	const [ filterText, setFilterText ] = useState( '' );
	const [ iconsList, setIconsList ] = useState( finalData );

	useLayoutEffect( () => {
		if ( filterText && filterText !== '' && filterText.length > 0 ) {
			let filterLower = filterText.toLowerCase();
			let filtered = '';
			if ( !isCustomIcons() ) {
				filtered = finalData.filter( ( item ) => {
					return ( item.label && item.label.toLowerCase().search( filterLower ) !== -1 )
						||
						( item.search && item.search.terms !== undefined && item.search.terms.indexOf( filterLower ) !==
							-1 );
				} );
			} else {
				filtered = finalData.filter( ( item ) => {
					return ( item.name && item.name.toLowerCase().search( filterLower ) !== -1 );
				} );
			}

			setIconsList( filtered );
		} else {
			setIconsList( finalData );
		}
	}, [ filterText, lib ] );

	let cloneIconList = [ ...iconsList ];

	const allowAdvanced = () => {
		if ( !showLibs || !customIcons || customIcons.length === 0 ) {
			return false;
		}

		return true;
	};

	const onChangeLib = ( val ) => {
		setLib( val );
	};

	const onChangeIcon = ( val ) => {
		var newValue = {};
		if ( typeof val === 'string' ) {
			newValue = {
				value: val,
				lib: lib ? lib : 'fontawesome'
			};
		} else {
			newValue = {
				value: val.id,
				lib: lib ? lib : 'fontawesome'
			};
		}
		onChange( newValue );
	};

	return (
		<div className="gutengeek-font-icon-picker">
			{ label && <label className="gutengeek-mb-10">{ label }</label> }
			<div className="gutengeek-font-picker-inner gutengeek-mb-20">
				{ search && <Fragment>
					<div className="gutengeek-flex">
						<input type="text" value={ filterText } placeholder={ __( 'Search...' ) } autoComplete="off"
						   onChange={ ( v ) => setFilterText( v.target.value ) } className="gutengeek-icon-picker-search"/>
						{ allowAdvanced() &&
							<Dropdown
								label={ __( 'Advanced' ) }
								className="gutengeek-font-picker-advanced-dropdown"
								position="center"
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Button
										className="gutengeek-button-field"
										isSmall
										onClick={ onToggle }
										aria-expanded={ isOpen }
									>
										<Dashicon icon="admin-generic"/>
									</Button>
								) }
								renderContent={ ( { onClose } ) => (
									<Fragment>
										<div className="gutengeek-popover_content">
											<SelectControl
												className="gutengeek-select-control__input"
												label={ __( 'Library' ) }
												value={ lib }
												onChange={ ( value ) => {
													onChangeLib( value );
													onClose();
												} }
												options={ libOptions }
											/>
										</div>
									</Fragment>
								) }
							/>
						}
						<button className="components-button gutengeek-button-field is-small clear" onClick={() => onChangeIcon( '' )}><Dashicon icon="dismiss" /></button>
					</div>
				</Fragment>}
				{ !isCustomIcons() ? <Fragment>
						{ cloneIconList.length > 0 && <div className="gutengeek-icon-picker-area">
							{ cloneIconList.splice( 0, 100 ).map( ( data, index ) => {
								return (
									<span
										className={ classnames(
											'gutengeek-icon-picker',
											( typeof value === 'string' && value === data.icon ) ||
											( typeof value === 'object' && value.value === data.icon ) ? 'active' : '' )
										}
										onClick={ () => onChangeIcon( data.icon ) }
										key={ index }>
										<span>{ renderIcon ? renderIcon(data.icon) : renderSVG( data.icon ) }</span>
									</span>
								);
							} ) }
						</div>
						}
					</Fragment>
					:
					<Fragment>
						{ cloneIconList.length > 0 && <div className="gutengeek-icon-picker-area">
							{ cloneIconList.splice( 0, 100 ).map( ( data, index ) => {
								return (
									<span
										className={ classnames( 'gutengeek-icon-picker',
											value.value === data.id ? 'active' : '' ) }
										onClick={ () => onChangeIcon( data ) }
										key={ index }>
										<span>{ renderIcon ? renderIcon(data.icon) : renderSVG( { value: data.id, lib: lib } ) }</span>
									</span>
								);
							} ) }
						</div>
						}
					</Fragment>
				}
			</div>
		</div>
	);
};

IconPicker.defaultProps = {
	icons: {},
	value: {
		value: '',
		lib: 'fontawesome'
	},
	search: true,
	showLibs: true
};

export default IconPicker;

const SVGComponent = ( props ) => {

};

class IconComponent extends Component {

}
