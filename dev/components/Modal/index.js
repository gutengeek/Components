// import Draggable from 'react-draggable';
import InsepectorPanel from './Panel';
import './editor.scss';

const { _x, sprintf } = wp.i18n;
const { Dashicon, SlotFillProvider } = wp.components;
const { Component, Fragment, createRef, Platform } = wp.element;
const { withState, createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

class ModalComponent extends Component {

	constructor( props ) {
		super( props );

		this.dragRef = createRef();
		this.modalRef = createRef();

		this.state = {
			collased: false
		}
	}

	/**
	 * set modal position on update component
	 */
	componentDidUpdate(prevProps, prevState) {
		if (prevState.collased !== this.state.collased) {
			return;
		}
		this.computePosition();
	}

	/**
	 * set modal position on element mounted
	 */
	componentDidMount() {
		this.computePosition();
		window.addEventListener('load', this.computePosition.bind(this));
		window.addEventListener('resize', this.computePosition.bind(this));
		const layoutContent = document.getElementsByClassName('edit-post-editor-regions__content');
		if (layoutContent && layoutContent !== undefined && layoutContent.length > 0) {
			document.getElementsByClassName('edit-post-editor-regions__content')[0].addEventListener( 'scroll', this.computePosition.bind(this) );
		}
	}

	/**
	 * remove event listener
	 */
	componentWillUnmount() {
		window.removeEventListener('load', this.computePosition.bind(this));
		window.removeEventListener('resize', this.computePosition.bind(this));
		const layoutContent = document.getElementsByClassName('edit-post-editor-regions__content');
		if (layoutContent && layoutContent !== undefined && layoutContent.length > 0) {
			layoutContent[0].removeEventListener( 'scroll', this.computePosition.bind(this) );
		}
	}

	computePosition() {
		const { clientId } = this.props;
		const blockEditContainer = document.getElementsByClassName('editor-styles-wrapper');
		const block = document.getElementById(`block-${clientId}`);
		const _modal = this.modalRef.current;

		if (! block || ! _modal) {
			return;
		}

		const blockOffset = block.getBoundingClientRect();
		const offset = blockEditContainer ? blockEditContainer[0].getBoundingClientRect() : false;
		if (! offset) {
			return;
		}
		const menuPadding = 10
		const top = offset.height / 2
		const left = offset.width + offset.left
		const menu = _modal
		const modalOffset = {x: 0, y: 0};

		if (! menu) {
			return;
		}

		// return if not show or not content
		if (menu.width === 0 && menu.height === 0) {
			return;
		}
		let toolbarFixed = document.getElementsByClassName('edit-post-header');
		let toolbarHeight = toolbarFixed ? toolbarFixed[0].getBoundingClientRect().height : 0;
		let notices = document.getElementsByClassName('components-notice-list');
		let noticesHeight = 0;
		[...notices].forEach((notice, index) => noticesHeight += (notice.getBoundingClientRect().height));

		let timeout = setTimeout(() => {
			const menuOffset = menu ? menu.getBoundingClientRect() : false;
			// display it to caculate its width & height
			menu.style.display = 'flex';

			const TopSpace = toolbarHeight + noticesHeight;
			modalOffset.x = (left - menu.clientWidth) - (menu.clientWidth / 2) - menuPadding;
			modalOffset.y = blockOffset.top + blockOffset.height - (menuOffset.height / 2) + menuPadding + TopSpace;

			if ( modalOffset.y <= (menuPadding + TopSpace) ) {
				modalOffset.y = menuPadding + TopSpace;
			}

			menu.style.top = modalOffset.y + 'px';
			menu.style.left = modalOffset.x + 'px';
			menu.style.opacity = 1;

			clearTimeout(timeout)
		}, 40)
	}

	// setDraggablePosition() {
	// 	const { clientId } = this.props;
	// 	const _modal = this.modalRef.current;

	// 	const cloneElement = document.getElementById(`clone-gutengeek-draggagle-${clientId}`);
	// 	const cloneWrap = cloneElement.parentNode
	// 	const cloneElementRect = cloneWrap.getBoundingClientRect();

	// 	_modal.style.top = cloneElementRect.top
	// 	_modal.style.left = cloneElementRect.left
	// 	// console.log(_modal.style)
	// }

	render() {
		const { collased } = this.state;
		const { clientId, gutengeek_selected } = this.props;
		const visualEditor = document.getElementsByClassName( 'edit-post-visual-editor' );
		const contenDimension = document.getElementsByClassName('block-editor-writing-flow');

		if (visualEditor && gutengeek_selected) {
			const contenDimensionBound = contenDimension[0].getBoundingClientRect();
			const visualRect = visualEditor[0].getBoundingClientRect();
			const options = { width: 280, height: contenDimensionBound.height - 20 };
			const clientX = parseInt( ( visualRect.width - visualRect.x ) ) - options.width - 20;
			const clientY = parseInt( parseInt( visualRect.height ) - parseInt( visualRect.y ) ) + parseInt( options.height ) + 10;

			const defaultPosition = {
				x: clientX,
				y: clientY,
			};
			const styles = {
				width: options.width + 'px',
				maxHeight: options.height + 'px',
				height: 'auto',
				minHeight: '40px',
			};

			const name = this.props.name;
			const blockType = wp.blocks.getBlockType( name );
			let blockTitle = blockType.title;

			return (
				<Fragment>
					<div className="gutengeek-modal-container gutengeek-draggable">
						<div id={ `gutengeek-draggagle-${ this.props.clientId }` } className="gutengeek-modal-panel" style={ styles } ref={this.modalRef}>
							<div className="gutengeek-modal-header handle">
								<span onClick={ () => this.setState( { collased: !collased } ) }><Dashicon icon={ ! collased ? 'arrow-up' : 'arrow-down' }/></span>
								{/*<Draggable elementId={ `gutengeek-draggagle-${ this.props.clientId }` } transferData={ { } }
									onDragStart={ () => this.setDraggablePosition() }
	                    			onDragEnd={ () => {} }
								>
				                    {
				                        ( { onDraggableStart, onDraggableEnd } ) => (
				                        	<span className="gutengeek-modal-header-title"
												onDragStart={ onDraggableStart }
			                                    onDragEnd={ onDraggableEnd }
											>
												{ sprintf( _x( 'Edit %s', 'edit block title modal' ), blockTitle ) }
											</span>
				                        )
				                    }
				                </Draggable>*/}
				                <span className="gutengeek-modal-header-title">
									{ sprintf( _x( 'Edit %s', 'edit block title modal' ), blockTitle ) }
								</span>
								<span onClick={ () => {
									this.props.setState( { gutengeek_selected: false } );
									this.setState({ collased: false })
								} }><Dashicon icon="no"/></span>
							</div>
							{! collased && <div className="gutengeek-modal-body">
								<InsepectorPanel.Slot />
							</div>}
						</div>
					</div>
				</Fragment>
			);
		}

		return null;
	}
}

// wrap component inside BlockEdit
const InspectorModal = createHigherOrderComponent( ( BlockEdit ) => {
	const BlockEditWrap = ( props ) => <Fragment>
		<Fragment>
			<BlockEdit { ...props } />
			<InspectorControls>
				{ Platform && Platform.OS === 'web' && props.isSelected ? <ModalComponent { ...props }/> : '' }
			</InspectorControls>
		</Fragment>
	</Fragment>;

	return compose([
		withSelect((select, props) => {
			// console.log(props);
		}),
		withState( {
			gutengeek_selected: false,
		} )
	])(BlockEditWrap)
}, 'InspectorModal' );

// wp.hooks.addFilter(
// 	'editor.BlockEdit',
// 	'gutengeek/edit-modal',
// 	InspectorModal,
// );

export {
	InspectorModal,
	InsepectorPanel,
};
