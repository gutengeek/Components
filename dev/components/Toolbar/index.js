import './editor.scss';

const { __ } = wp.i18n
const { Fragment, useState } = wp.element;
const { Tooltip, Dropdown } = wp.components;

const Toolbar = props => {
	const {
		icon,
		text,
		children,
	} = props;

	return (
		<Dropdown
			className="gutengeek-toolbar-field"
			position="top right"
			renderToggle={({ isOpen, onToggle }) => (
				<Tooltip text={text}>
					<button onClick={onToggle} aria-expanded={isOpen}>
						{icon}
					</button>
				</Tooltip>
			)}
			renderContent={() =>
				<div className="gutengeek-toolbar-popup">
					<div className="gutengeek-toolbar-popup-inner">
						{children}
					</div>
				</div>
			}
		>
		</Dropdown>
	);
}


export default Toolbar;
