const { __ } = wp.i18n;
const { Tooltip, Button, ButtonGroup } = wp.components;
import './editor.scss';
import classnames from 'classnames';

/**
 * <ButtonGroupControl className={classnames(
							'gutengeek-flex',
							'gutengeek-align-center',
							'gutengeek-ml-auto'
						)} label={ __( 'Stack' ) } value={ stack } options={ [
							{ value: 'desktop', label: <Dashicon icon="desktop"/>, text: __( 'Desktop' ) },
							{ value: 'tablet', label: <Dashicon icon="tablet"/>, text: __( 'Tablet' ) },
							{ value: 'mobile', label: <Dashicon icon="smartphone"/>, text: __( 'Mobile' ) },
						] } toggle={ true } onClick={ ( val ) => setAttributes( { stack: val } ) }/>

 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonGroupWrap = ( props ) => {
	const { label, value, options, className, onClick, toggle } = props;
	return (
		<div className={ classnames(
			'gutengeek-field',
			'gutengeek-button-group-field',
			className,
		) }>
			{ label && <div className="components-base-control__label">{ label }</div> }
			<div className={ classnames( 'gutengeek-flex gutengeek-field-alignments gutengeek-align-center', className ) }>
				<ButtonGroup className={ classnames( 'gutengeek-field-button-list', 'gutengeek-w-100', 'gutengeek-no-border' ) }>
					{ options && options.map( ( button ) => {
						return <Tooltip text={ button.text || button.label }>
							<Button
								className={ classnames( 'gutengeek-button-field', button.value === value ? 'active' : '' ) }
								onClick={ () => onClick( toggle && button.value === value ? '' : button.value ) }
								aria-label={ button.label }
								isPrimary={ value === button.value }
								aria-pressed={ value === button.value }
								isSmall
							>{ button.label }</Button>
						</Tooltip>;
					} ) }
				</ButtonGroup>
			</div>
		</div>
	);
};

ButtonGroupWrap.defaultProps = {
	value: '',
	label: '',
	options: [
		// { value: 'desktop', label: <Dashicon icon="desktop"/>, text: __( 'Desktop' ) }
	],
	toggle: true,
};
export default ButtonGroupWrap;
