// styles
import './components/editor.scss';

// components
import AlignmentsControl from './components/Alignments';
import HeadingControl from './components/Heading';
import PanelBodyTitleWrapper from './components/PanelBodyTitle';
import SizeTypeUnit from './components/SizeTypeUnit';
import Dimension from './components/Dimension';
import Typography, { fonts as google_fonts } from './components/Typo';
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
import Tabs, { Tab } from './components/Tabs';
import URL from './components/Url';

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
	},

	Tabs,
	Tab,
	URL
}

// add filter to extends wp.gutengeek.components
if ( wp ) {
	wp.gutengeekInspectorComponents = AdvancedComponents;
	if ( wp.hooks ) {
		wp.hooks.addFilter( 'gutengeek.components', 'gutengeek-advanced/components', (components) => {
			return { ...components, ...AdvancedComponents }
		} );

		wp.hooks.addFilter( 'gutengeek.helper', 'gutengeek-advanced/helper', (helper) => {
			return { ...helper, ...{ google_fonts } }
		} );
	}
}

export default AdvancedComponents;

export { google_fonts }
