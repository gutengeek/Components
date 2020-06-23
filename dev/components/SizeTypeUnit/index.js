import classnames from 'classnames'
const { ButtonGroup, Button } = wp.components;
const { __ } = wp.i18n;

/**
 * Eg:
 *
 * <SizeTypeUnit value={ props.type.value } units={ units }
 * onClick={ ( value ) =>  props.setAttributes( { [props.typeLabel]: value } ) }/>
 *
 * @param props
 * @returns {*}
 */
import './editor.scss';

export default ( props ) => {
	const {
		label,
		value,
		onClick,
		className
	} = props;

	// set default for units
	var units = props.units;
	if ('units' in props) {
		units = props.units;
	} else {
		units = [
			'px',
			'em',
		];
	}

	if (units.length > 0) {
		return (
			<ButtonGroup className={ classnames( 'gutengeek-size-type-field', 'gutengeek-no-border', className ) } aria-label={ label }>
				{ units.map( ( size ) => {
					return (
						<Button
							key={ size }
							className="gutengeek-size-btn"
							isSmall
							isPrimary={ value === size }
							aria-pressed={ value === size }
							onClick={ () => onClick( size ) }
						>
							{ size }
						</Button>
					);
				} ) }
			</ButtonGroup>
		);
	} else {
		return null;
	}
}
