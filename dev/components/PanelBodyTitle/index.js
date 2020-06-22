const {
	Fragment,
} = wp.element;
import Icons from '../icons';

const PanelBodyTitleWrapper = ( props ) => {
	return (
		<Fragment>
			{ props.title }
			{ props.logo === true && (
				<span className="gutengeek-ext-badge">
					{ Icons.shortLogoGradient }
				</span>
			) }

			{ props.icon !== undefined && props.icon }

			{ props.children !== undefined && props.children}
		</Fragment>
	);
};

export default PanelBodyTitleWrapper;
