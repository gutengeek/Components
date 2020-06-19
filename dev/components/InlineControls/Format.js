const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element
const { toggleFormat, applyFormat, getActiveFormat, removeFormat, __experimentalRichText } = wp.richText;
const { RichTextToolbarButton } = wp.blockEditor;
const { registerFormatType } = wp.richText;
const { Toolbar, Button, Dashicon, Tooltip, Popover } = wp.components;
const { createRef } = wp.element;
import { InspectorModal, InsepectorPanel } from '../Modal';
import Color from '../Color';

import classnames from 'classnames';
import Controls from './Controls';
import Icons from '../icons';
import './editor.scss';

// check is contains
export const containsNode = ( parent, child ) => {
	if (parent === child) {
		return true
	}
	child = child.parentNode;
	while (child) {
		if (child === parent) {
			return true;
		}
		child = child.parentNode;
	}
	return false;
}

export default class InlineFormat extends Component {

	constructor(props) {
		super(props);
		// ref
		this.menuRef = createRef('menu');
	}

	// get selection range
	getRange() {
		const { clientId } = this.props;

		let selection = window.getSelection();
		let range = selection.rangeCount && selection.getRangeAt(0);
		range = range || document.createRange();

		let block = document.getElementById(`block-${clientId}`);

		//range.commonAncestorContainer
		if ( block && ! containsNode(block, range.commonAncestorContainer) ) {
			range.selectNodeContents(block);
			range.collapse(false);
		}

		return range;
	}

	/**
	 * compute menu position and add event listen on resize
	 */
	componentDidMount() {
		this.computePosition();
		window.addEventListener( 'load', this.computePosition.bind(this) );
		window.addEventListener( 'resize', this.computePosition.bind(this) );
		const layoutContent = document.getElementsByClassName('edit-post-editor-regions__content');
		if (layoutContent && layoutContent !== undefined && layoutContent.length > 0) {
			layoutContent[0].addEventListener( 'scroll', this.computePosition.bind(this) );
		}
	}

	/**
	 * remove event list
	 */
	componentWillUnmount() {
		window.removeEventListener( 'load', this.computePosition.bind(this) );
		window.removeEventListener( 'resize', this.computePosition.bind(this) );
		const layoutContent = document.getElementsByClassName('edit-post-editor-regions__content');
		if (layoutContent && layoutContent !== undefined && layoutContent.length > 0) {
			layoutContent[0].removeEventListener( 'scroll', this.computePosition.bind(this) );
		}
	}

	// compute menu position on update
	componentDidUpdate(prevProps, prevState) {
		this.computePosition();
	}

	// compute menu position
	computePosition() {
		const range = this.getRange();
		const _menu = this.menuRef.current;

		const offset = range.getBoundingClientRect()
			, menuPadding = 10
			, top = offset.top - menuPadding
			, left = offset.left + (offset.width / 2)
			, menu = _menu
			, menuOffset = {x: 0, y: 0};

		if (! menu) {
			return;
		}

		// return if not show or not content
		if (offset.width === 0 && offset.height === 0) {
			return;
		}

		setTimeout(() => {
			// display it to caculate its width & height
			menu.style.display = 'flex';

			menuOffset.x = left - (menu.clientWidth / 2);
			menuOffset.y = top - menu.clientHeight;

			// if menu hided on top
			let toolbarFixed = document.getElementsByClassName('edit-post-header');
			let toolbarHeight = toolbarFixed ? toolbarFixed[0].getBoundingClientRect().height : 0;
			if (menuOffset.y < toolbarHeight) {
				menuOffset.y = offset.top + offset.height + menuPadding;
			}

			menu.style.top = menuOffset.y + 'px';
			menu.style.left = menuOffset.x + 'px';
			menu.style.opacity = 1;
		}, 10)
	}

	render() {
		const { selectionStart, selectionEnd } = this.props;

		return (
			<div className="gutengeek-richtext-inline-formater gutengeek-inline-popover" ref={this.menuRef}>
				<Controls.Slot/>
			</div>
		)
	}

}

// Bold
const GUTENGEEK_RICH_TEXT_BOLD = 'gutengeek/rich-text-bold';
registerFormatType( GUTENGEEK_RICH_TEXT_BOLD, {
    name: GUTENGEEK_RICH_TEXT_BOLD,
    title: __( 'Bold' ),
    tagName: 'span',
    className: 'gutengeek-rich-text-bold',
    attributes: {
        style: 'style'
    },
    edit({ isActive, value, onChange }) {
    	const onToggle = () => onChange(toggleFormat(value, {
            type: GUTENGEEK_RICH_TEXT_BOLD,
            attributes: {
                style: 'font-weight: bold; white-space: pre-wrap;',
            }
        }));
    	return (
    		<Controls>
    			<Tooltip text={__( 'Bold' )}>
    				<Button className={classnames('gutengeek-inline-action', isActive ? 'active' : '')} onClick={() => onToggle()}><Dashicon icon="editor-bold" /></Button>
    			</Tooltip>
    		</Controls>
		)
    },
});
// End Bold

// Underline
const GUTENGEEK_RICH_TEXT_UNDERLINE = 'gutengeek/rich-text-underline';
registerFormatType( GUTENGEEK_RICH_TEXT_UNDERLINE, {
    name: GUTENGEEK_RICH_TEXT_UNDERLINE,
    title: __( 'Underline' ),
    tagName: 'u',
    className: 'gutengeek-rich-text-underline',
    attributes: {
        style: 'style'
    },
    edit({ isActive, value, onChange }) {
    	const onToggle = () => onChange(toggleFormat(value, {
            type: GUTENGEEK_RICH_TEXT_UNDERLINE,
            attributes: {
                style: 'text-decoration: underline; white-space: pre-wrap;',
            }
        }));

    	return (
    		<Controls>
    			<Tooltip text={__( 'Underline' )}>
    				<Button className={classnames('gutengeek-inline-action', isActive ? 'active' : '')} onClick={() => onToggle()}><Dashicon icon="editor-underline" /></Button>
    			</Tooltip>
    		</Controls>
		)
    },
});
// End Underline

// Italic
const GUTENGEEK_RICH_TEXT_ITALIC = 'gutengeek/rich-text-italic';
registerFormatType( GUTENGEEK_RICH_TEXT_ITALIC, {
    name: GUTENGEEK_RICH_TEXT_ITALIC,
    title: __( 'Italic' ),
    tagName: 'i',
    className: 'gutengeek-rich-text-italic',
    attributes: {
        style: 'style'
    },
    edit({ isActive, value, onChange }) {
    	const onToggle = () => onChange(toggleFormat(value, {
            type: GUTENGEEK_RICH_TEXT_ITALIC,
            attributes: {
                style: 'font-style: italic; white-space: pre-wrap;',
            }
        }));
    	return (
			<Controls>
    			<Tooltip text={__( 'Italic' )}>
    				<Button className={classnames('gutengeek-inline-action', isActive ? 'active' : '')} onClick={() => onToggle()}><Dashicon icon="editor-italic" /></Button>
    			</Tooltip>
    		</Controls>
		)
    },
});
// End Italic

// Inline Color
const GUTENGEEK_RICH_TEXT_COLOR = 'gutengeek/rich-text-color';
class InlineColor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		if ( this.props.value !== nextProps.value ) {
			this.setState({ isOpen: false })
		}
	}

	render() {
		const { isOpen } = this.state;
		const { isActive, value, onChange } = this.props;
		let color = '';
		let formatActive = getActiveFormat( value, GUTENGEEK_RICH_TEXT_COLOR );
		if (formatActive && formatActive.attributes.data ) {
			color = formatActive.attributes.data;
		}
		const onToggle = (val) => onChange(applyFormat(value, {
            type: GUTENGEEK_RICH_TEXT_COLOR,
            attributes: {
                style: `color: ${val};`,
                data: `${val}`
            },
	        startIndex: value.start,
	        endIndex: value.end
        }));

    	return (
    		<Fragment>
				<Controls>
	    			<Tooltip text={__( 'Color' )}>
	    				<Button className={classnames('gutengeek-inline-action', isActive && color ? 'active' : '')} onClick={() => this.setState({isOpen: ! isOpen})} style={{color: color}}><Dashicon icon="admin-customizer" /></Button>
	    			</Tooltip>
	    		</Controls>

    			{ isOpen && <Fragment>
    				{/*<InsepectorPanel>
    					<Color label={__( 'Color' )} value={color} onChange={(value) => onToggle(value)} />
    				</InsepectorPanel>*/}
    				<Popover className="gutengeek-popover" onClose={() => this.setState({isOpen: false})}>
    					<Color label={__( 'Color' )} value={color} onChange={(value) => onToggle(value)} />
    				</Popover>
				</Fragment> }
    		</Fragment>
		)
	}

}

registerFormatType( GUTENGEEK_RICH_TEXT_COLOR, {
	name: GUTENGEEK_RICH_TEXT_COLOR,
	title: __( 'Color' ),
	tagName: 'span',
	className: 'gutengeek-rich-text-color',
	attributes: {
		style: 'style',
		data: 'data'
	},
    edit: compose([
		withSelect((select, props) => {
			const block = select( 'core/block-editor' ).getSelectedBlock();
			if (! block) {
				return {};
			}
			const {
				clientId,
				gutengeek_selected,
				attributes: {

				}
			} = block
			return {
				clientId,
				gutengeek_selected,
			}
		}),
		withDispatch((dispath, props) => {
			const block = wp.data.select( 'core/block-editor' ).getSelectedBlock();
			const {
				updateBlockAttributes
			} = dispath( 'core/block-editor' );
			return {
				setAttributes( newAttributes ) {
					const { clientId } = block;
					updateBlockAttributes( clientId, newAttributes );
				},
			}
		})
	])(InlineColor),
});
// End Inline Color

// Inline Background Color
const GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR = 'gutengeek/rich-text-background-color';
class InlineBackgroundColor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	componentWillReceiveProps(nextProps, nextState) {
		if ( this.props.value !== nextProps.value ) {
			this.setState({ isOpen: false })
		}
	}

	render() {
		const { isOpen } = this.state;
		const { isActive, value, onChange } = this.props;
		let color = '';
		let formatActive = getActiveFormat( value, GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR );
		if (formatActive && formatActive.attributes.data ) {
			color = formatActive.attributes.data;
		}
		const onToggle = (val) => onChange(applyFormat(value, {
            type: GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR,
            attributes: {
                style: `background-color: ${val};`,
                data: `${val}`
            },
	        startIndex: value.start,
	        endIndex: value.end
        }));

    	return (
    		<Fragment>
				<Controls>
	    			<Tooltip text={__( 'Color' )}>
	    				<Button className={classnames('gutengeek-inline-action', isActive && color ? 'active' : '')} onClick={() => this.setState({isOpen: ! isOpen})} style={{color: color}}><Dashicon icon="admin-appearance" /></Button>
	    			</Tooltip>
	    		</Controls>

    			{ isOpen && <Fragment>
    				{/*<InsepectorPanel>
    					<Color label={__( 'Color' )} value={color} onChange={(value) => onToggle(value)} />
    				</InsepectorPanel>*/}
    				<Popover className="gutengeek-popover" onClose={() => this.setState({isOpen: false})}>
    					<Color label={__( 'Background Color' )} value={color} onChange={(value) => onToggle(value)} />
    				</Popover>
				</Fragment> }
    		</Fragment>
		)
	}

}
// End Inline Background Color

registerFormatType( GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR, {
	name: GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR,
	title: __( 'Background Color' ),
	tagName: 'span',
	className: 'gutengeek-rich-text-background-color',
	attributes: {
		style: 'style',
		data: 'data'
	},
    edit: compose([
		withSelect((select, props) => {
			const block = select( 'core/block-editor' ).getSelectedBlock();
			if (! block) {
				return {};
			}
			const {
				clientId,
				gutengeek_selected,
				attributes: {

				}
			} = block
			return {
				clientId,
				gutengeek_selected,
			}
		}),
		withDispatch((dispath, props) => {
			const block = wp.data.select( 'core/block-editor' ).getSelectedBlock();
			const {
				updateBlockAttributes
			} = dispath( 'core/block-editor' );
			return {
				setAttributes( newAttributes ) {
					const { clientId } = block;
					updateBlockAttributes( clientId, newAttributes );
				},
			}
		})
	])(InlineBackgroundColor),
});

// Remove Format
const GUTENGEEK_RICH_TEXT_CLEAR_FORAMT = 'gutengeek/rich-text-remove-format';
registerFormatType( GUTENGEEK_RICH_TEXT_CLEAR_FORAMT, {
	name: GUTENGEEK_RICH_TEXT_CLEAR_FORAMT,
	title: __( 'Clear Format' ),
	tagName: 'span',
	className: 'gutengeek-rich-text-none-format',
	attributes: {},
    edit: class ClearFormat extends Component {
    	render() {
    		const { isActive, value, onChange } = this.props;
			const { activeFormats } = value;

			if ( activeFormats && activeFormats.length === 0 ) {
				return null;
			}
    		const onToggle = () => {
				const { activeFormats } = value;
				if (! activeFormats || activeFormats.length === 0) return;
    			onChange({ ...value, formats: Array(value.formats.length) })
    			// activeFormats.map((format) => {
    			// 	onChange(removeFormat(value, format.type, value.start, value.end))
    			// });
    			// onChange(toggleFormat(value, activeFormats));
    		};
	    	return (
				<Controls>
	    			<Tooltip text={__( 'Remove' )}>
	    				<Button className={classnames('gutengeek-inline-action', isActive ? 'active' : '')} onClick={() => onToggle()}><Dashicon icon="editor-removeformatting" /></Button>
	    			</Tooltip>
	    		</Controls>
			)
    	}

    },
});
// End Remove Format

export {
	Controls,

	GUTENGEEK_RICH_TEXT_COLOR,
	GUTENGEEK_RICH_TEXT_BACKGROUND_COLOR,
	GUTENGEEK_RICH_TEXT_BOLD,
	GUTENGEEK_RICH_TEXT_ITALIC,
	GUTENGEEK_RICH_TEXT_UNDERLINE,
	GUTENGEEK_RICH_TEXT_CLEAR_FORAMT
}


