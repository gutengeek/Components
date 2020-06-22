const { createSlotFill } = wp.components;
const { Fill, Slot } = createSlotFill( 'ModalPanel' );
const { createHigherOrderComponent } = wp.compose;

const ModalPanelWrap = createHigherOrderComponent( ( FillComponent ) => {
	return ( { children, ...props } ) => {
		return (
			<FillComponent { ...props }>{ children }</FillComponent>
		);
	};
}, 'ModalPanelWrap' );

const ModalPanel = ModalPanelWrap( Fill );

ModalPanel.Slot = Slot;

export default ModalPanel;
