export { containsNode, Controls } from './Format';
import InlineFormat from './Format';
import './editor.scss';

const { useState, useEffect, Fragment } = wp.element;
// react partials
const { SlotFillProvider } = wp.components;
const { createHigherOrderComponent } = wp.compose;

const RichTextInlineFormater = (FilteredRichText) => {

	return (props) => {
		const { selectionStart, selectionEnd, isSelected } = props;

		const [isShow, setShow] = useState( false )

		useEffect(() => {
			// related
			let shouldShow = (selectionStart !== undefined && selectionEnd !== undefined && selectionStart !== selectionEnd);
			setShow(shouldShow)
		}, [selectionStart, selectionEnd]);

		return (
			<Fragment>
				{isShow && <InlineFormat {...props} />}
				<FilteredRichText {...props} />
			</Fragment>
		)
	}

}

// RichText hook
wp.hooks.addFilter(
	'experimentalRichText',
	'gutengeek/richtext-inline',
	RichTextInlineFormater
);

// wrap component inside BlockEdit
const RichTextEditWrap = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => <Fragment>
		<Fragment>
			<BlockEdit { ...props }/>
			<RichTextInlineFormater { ...props }/>
		</Fragment>
	</Fragment>;

}, 'RichTextEditWrap' );

// BlockEdit hook
wp.hooks.addFilter(
	'editor.BlockEdit',
	'gutengeek/richtext-edit-wrap',
	RichTextEditWrap,
);
