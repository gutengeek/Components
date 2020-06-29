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
const InspectorTabControls = FillTab( Fill );
InspectorTabControls.Slot = Slot;
export {
	InspectorTabControls
};

export const InspectorTab = props => {
	const { visible, tab, children } = props;
	return (
		<div className={classnames('gutengeek-inspector-tab', `gutengeek-inspector-tab-${tab}`, visible ? '' : 'hide-if-js' )}>
			{Array.isArray(children) ? children.map(item => item) : children}
			<InspectorTabControls.Slot name={tab} />
		</div>
	)
}

const ICONS = {
	layout: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" role="img" aria-hidden="true" focusable="false"><path d="M2 2h5v11H2V2zm6 0h5v5H8V2zm6 0h4v16h-4V2zM8 8h5v5H8V8zm-6 6h11v4H2v-4z"></path></svg>,
	style: <svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="dashicon dashicons-admin-appearance"><path d="M14.48 11.06L7.41 3.99l1.5-1.5c.5-.56 2.3-.47 3.51.32 1.21.8 1.43 1.28 2.91 2.1 1.18.64 2.45 1.26 4.45.85zm-.71.71L6.7 4.7 4.93 6.47c-.39.39-.39 1.02 0 1.41l1.06 1.06c.39.39.39 1.03 0 1.42-.6.6-1.43 1.11-2.21 1.69-.35.26-.7.53-1.01.84C1.43 14.23.4 16.08 1.4 17.07c.99 1 2.84-.03 4.18-1.36.31-.31.58-.66.85-1.02.57-.78 1.08-1.61 1.69-2.21.39-.39 1.02-.39 1.41 0l1.06 1.06c.39.39 1.02.39 1.41 0z"></path></svg>,
	advanced: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M18.4 12c0-.5 0-.9-.1-1.3l1.4-1.3-1.5-2.8-1.8.6c-.6-.6-1.4-1-2.2-1.3L13.8 4h-3l-.4 1.9c-.8.3-1.5.8-2.1 1.3l-1.8-.6L5 9.4l1.4 1.3c-.1.4-.1.9-.1 1.3s0 .9.1 1.3L5 14.6l1.5 2.8 1.8-.6c.6.6 1.4 1 2.2 1.3l.4 1.9h3l.4-1.9c.8-.3 1.5-.7 2.2-1.3l1.8.6 1.5-2.8-1.4-1.3c-.1-.4 0-.8 0-1.3zm-6.1 3.2c-1.7 0-3-1.4-3-3.2 0-1.8 1.4-3.2 3-3.2 1.7 0 3 1.4 3 3.2.1 1.8-1.3 3.2-3 3.2z"></path></svg>
}

const TABS_DEFAULT = [ 'layout', 'style', 'advanced'];

export default props => {
	const {
		tabs,
		active,
		children
	} = props;

	useEffect(() => {
		var blockInspector = document.querySelector( '.edit-post-sidebar .components-panel' );
		if (! blockInspector.classList.contains('gutengeek-inspector')) {
			blockInspector.classList.add( 'gutengeek-inspector' );
		}

		return () => {
			if (blockInspector.classList.contains('gutengeek-inspector')) {
				blockInspector.classList.remove( 'gutengeek-inspector' );
			}
		}
	})

	var activeTab = active;
	if ( ! activeTab && tabs && tabs.length > 0 ) {
		const firstTab = tabs[0];
		activeTab = typeof firstTab === 'string' ? firstTab : firstTab.name
	}
	const [ currentTab, setTab ] = useState( activeTab );

	// check in view screen and toggle is-fixed class
	const observer = new IntersectionObserver( ([e]) => {
		e.target.classList.toggle('is-fixed', e.intersectionRatio < 1);
	}, {threshold: [1]} );
	useEffect( () => {
		const tabContainer = document.querySelector('.gutengeek-inspector-tabs-container');
		const tabs = document.querySelector('.gutengeek-inspector-tabs');
		if (tabContainer) {
        	observer.observe(tabContainer);
		}
	}, []);

	return <Fragment>
		<div className="gutengeek-inspector-container">
			<div className="gutengeek-inspector-tabs-container">
				<div className={classnames('gutengeek-inspector-tabs', `tabs-${tabs.length}`)} data-tab-active={currentTab}>
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
									{ ICONS[tab] }
									<span className="tab-name">{tab}</span>
								</div>
							)
						}
					} ) }
				</div>
			</div>
			{
				Array.isArray(children) ? Children.map(children, (child, index) => {
					if ( child.type && child.type.name === 'InspectorTab' ) {

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
