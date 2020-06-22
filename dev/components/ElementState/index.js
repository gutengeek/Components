import classnames from 'classnames';
import './editor.scss';
const { __ } = wp.i18n;
const { useState, useLayoutEffect, Fragment, Children, cloneElement } = wp.element;

const { createHigherOrderComponent } = wp.compose;
// slot - fill
const { SlotFillProvider, createSlotFill, PanelBody } = wp.components;
const { Fill, Slot } = createSlotFill( 'state-tab' );
const FillTab = createHigherOrderComponent( ( FillComponent ) => {
	return ( { children, name, ...props } ) => {
		return (
			<FillComponent { ...props } name={name}>
				{ children }
			</FillComponent>
		);
	};
}, 'state-tab' );

// inspector control wrap PanelBody ...
const StateTabControls = FillTab( Fill );
StateTabControls.Slot = Slot;
export {
	StateTabControls
};

export const StateTab = props => {
	const { visible, tab, children } = props;
	return (
		<div className={classnames('gutengeek-inspector-tab', `gutengeek-inspector-tab-${tab}`, visible ? '' : 'hide-if-js' )}>
			{Array.isArray(children) ? children.map(item => item) : children}
			<StateTabControls.Slot name={tab} />
		</div>
	)
}

const TABS_DEFAULT = [ 'layout', 'style', 'advanced'];

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

	useLayoutEffect( () => {
		const tabContainer = document.querySelector('.gutengeek-inspector-tabs-container');
		const tabs = document.querySelector('.gutengeek-inspector-tabs');
		if (tabContainer) {
			// check in view screen and toggle is-fixed class
			const observer = new IntersectionObserver( ([e]) => {
				e.target.classList.toggle('is-fixed', e.intersectionRatio < 1);
			}, {threshold: [1]} );
        	observer.observe(tabContainer);
		}
	}, [currentTab]);

	return <Fragment>
		<div className="gutengeek-inspector-container">
			<div className="gutengeek-inspector-tabs-container">
				<div className="gutengeek-inspector-tabs" data-tab-active={currentTab}>
					{ tabs.length > 1 && tabs.map(tab => {
						if ( typeof tab === 'object' ) {
							return (
								<div className={classnames('gutengeek-inspector-tab', currentTab === tab.name ? 'active' : '' )} onClick={() => setTab(tab.name)}>
									{ tab.icon ? tab.icon : null }
									<span className="tab-name">{tab.label}</span>
								</div>
							)
						} else if ( typeof tab === 'string' && TABS_DEFAULT.indexOf( tab ) !== -1 ) {
							return (
								<div className={classnames('gutengeek-inspector-tab', tab === currentTab ? 'active' : '' )} onClick={() => setTab(tab)}>
									<span className="tab-name">{tab}</span>
								</div>
							)
						}
					} ) }
				</div>
			</div>
			{
				Array.isArray(children) ? Children.map(children, (child, index) => {
					if ( child.type.name === 'StateTab' ) {

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
