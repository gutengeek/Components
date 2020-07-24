import classnames from 'classnames';
import './editor.scss';
const { __ } = wp.i18n;
const { useState, useEffect, Fragment, Children, cloneElement } = wp.element;

const { createHigherOrderComponent } = wp.compose;
// slot - fill
const { SlotFillProvider, createSlotFill, PanelBody, Dashicon } = wp.components;
const { Fill, Slot } = createSlotFill( 'inspector-controls-tab' );
const FillTab = createHigherOrderComponent( ( FillComponent ) => {
	return ( { children, name, ...props } ) => {
		return (
			<FillComponent { ...props } name={name}>
				{ children }
			</FillComponent>
		);
	};
}, 'inspector-controls-tab' );

// inspector control wrap PanelBody ...
const TabControls = FillTab( Fill );
TabControls.Slot = Slot;
export {
	TabControls
};

export const Tab = props => {
	const { visible, tab, children } = props;
	return (
		<div className={classnames('gutengeek-tab-content', `gutengeek-inspector-tab-${tab}`, visible ? '' : 'hide-if-js' )}>
			{Array.isArray(children) ? children.map(item => item) : children}
			<TabControls.Slot name={tab} />
		</div>
	)
}

export default props => {
	const {
		tabs,
		active,
		children
	} = props;

	var activeTab = active;
	if ( ! activeTab && tabs && tabs.length > 0 ) {
		const firstTab = tabs[0];
		activeTab = typeof firstTab === 'string' ? firstTab : firstTab.name
	}
	const [ currentTab, setTab ] = useState( activeTab );

	return <Fragment>
		<div className="gutengeek-tabs-controls">
			<div className="gutengeek-tabs">
				{ tabs.length > 1 && tabs.map(tab => {
					return (
						<div className={classnames('gutengeek-tab', currentTab === tab.name ? 'active' : '' )} onClick={() => setTab(tab.name)}>
							{ tab.icon ? tab.icon : null }
							<span className="tab-name">{tab.label}</span>
						</div>
					)
				} ) }
			</div>
			{
				Array.isArray(children) ? Children.map(children, (child, index) => {
					if ( child.type && child.type.name === 'Tab' ) {

						return cloneElement(child, {
							tab: child.key,
							visible: child.key == currentTab
						})
					}
				}) : children.key === currentTab ? cloneElement(children, {
					tab: children.key,
					visible: true
				}) : null
			}
		</div>
	</Fragment>
}
