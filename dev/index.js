// styles
import './components/editor.scss';

// components
import AlignmentsControl from './components/Alignments';
import HeadingControl from './components/Heading';
import PanelBodyTitleWrapper from './components/PanelBodyTitle';
import SizeTypeUnit from './components/SizeTypeUnit';
import Dimension from './components/Dimension';
import Typography from './components/Typo';
import Color from './components/Color';
import DevicesControl from './components/Devices';
import ResponsiveControl from './components/Responsive';
import RadioToggleControl from './components/RadioToggle';
import BorderControl from './components/Border';
import BorderRadiusControl from './components/BorderRadius';
import MediaControl, { MediaEditorControl, MediaEmpty, ImageComponent } from './components/Media';
import SelectionControl from './components/Select';
import RangeSlider from './components/RangeSlider';
import GradientControl from './components/Gradient';
import BackgroundControl from './components/Background';
import BoxShadowControl from './components/BoxShadow';
import ToolbarControl from './components/Toolbar';
import ShapeControl from './components/Shape';
import ButtonGroupControl from './components/ButtonGroup';
import IconPickerControl from './components/IconPicker';
import StylesControl from './components/Styles';
import PaddingControl from './components/Padding';
import MarginControl from './components/Margin';
import MasksControl from './components/Masks';
import TransformControl from './components/Transform';
import TransitionControl from './components/Transition';
import * as InlineControls from './components/InlineControls';
import { InspectorModal, InsepectorPanel } from './components/Modal';
import InspectorTabs, { InspectorTab, InspectorTabControls } from './components/InspectorTabs';
import GroupControls from './components/GroupControls';
import LibsControl from './components/Libs';
import DashSeparator from './components/DashSeparator';
import ParallaxControls from './components/Parallax';

const AdvancedComponents = {
	AlignmentsControl,
	HeadingControl,
	PanelBodyTitleWrapper,
	SizeTypeUnit,
	Dimension,
	Typography,
	Color,
	DevicesControl,
	ResponsiveControl,
	RadioToggleControl,
	BorderControl,
	MediaControl,
	SelectionControl,
	RangeSlider,
	MediaEditorControl,
	MediaEmpty,
	ImageComponent,
	BorderRadiusControl,
	GradientControl,
	BackgroundControl,
	BoxShadowControl,
	ToolbarControl,
	ShapeControl,
	ButtonGroupControl,
	IconPickerControl,
	StylesControl,
	PaddingControl,
	MarginControl,
	GroupControls,
	LibsControl,
	DashSeparator,
	MasksControl,
	TransformControl,
	TransitionControl,
	// inspector tabs
	InspectorTabs,
	InspectorTab,
	InspectorTabControls,

	// inline controls
	InlineControls,
	ParallaxControls,

	// modal
	InlineModal: {
		InspectorModal,
		InsepectorPanel
	}
}

// add filter to extends wp.gutengeek.components
if ( wp && wp.hooks ) {
	wp.hooks.addFilter( 'gutengeek.components', 'gutengeek-advanced/components', (components) => {
		return { ...components, ...AdvancedComponents }
	} );
}

wp.gutengeekInspectorComponents = AdvancedComponents;

export default AdvancedComponents;
