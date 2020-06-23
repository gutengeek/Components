const { createSlotFill } = wp.components;
const { Fill, Slot } = createSlotFill( 'Control' );
const { createHigherOrderComponent } = wp.compose;

const ControlWrap = createHigherOrderComponent( ( FillComponent ) => {
	return ( { children, ...props } ) => {
		return (
			<FillComponent { ...props }>
				{ children }
			</FillComponent>
		);
	};
}, 'ControlWrap' );

const Control = ControlWrap( Fill );

Control.Slot = Slot;

export default Control;
