const { Fragment, useLayoutEffect, useState } = wp.element;
import classnames from 'classnames';
import './editor.scss';

const Styles = ( props ) => {
	const { styles, value, className, onChange, columns } = props;
	const [styleSelect, setStyleSelect] = useState( value );

	useLayoutEffect( () => {
		if ( styleSelect !== undefined && styleSelect !== value ) {
			onChange( styleSelect );
		}
	}, [ styleSelect ] );

	return (
		<Fragment>
			<div className={ classnames(
				'gutengeek-block-styles',
				`col-${columns ? columns : 2}`,
				className,
			) }>
				<div className={ classnames(
					'gutengeek-flex',
					'gutengeek-flex-wrap',
					className,
				) }>
					{ styles.map( ( style ) => {
						return (
							<button className={ classnames(
								'gutengeek-style-button',
								'gutengeek-align-center',
								style.name === value ? 'active' : '',
							) }
									onClick={ () => setStyleSelect( style.name ) }
							>
								<div className="image-preview">
									<img src={ `${ style.svg }` } alt={ style.label }/>
								</div>
								<span className="gutengeek-style-label">{ style.label }</span>
							</button>
						);
					} ) }
				</div>
			</div>
		</Fragment>
	);
};

Styles.defaultProps = {
	styles: [
		{ name: '', svg: '', label: '' },
	],
	onChange: () => {
		console.log( 'Style was changed' );
	},
	value: '',
	className: '',
};
export default Styles;
