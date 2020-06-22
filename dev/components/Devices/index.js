import classnames from 'classnames';
import './editor.scss';

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

const {
	Dashicon,
	ButtonGroup,
	Button,
	Tooltip
} = wp.components;

/**
 * <Devices value={ this.props.attributes.wpOpalDeviceMode } onClick={ ( value ) => this.props.onChangeDevice(value) }/>
 */
class Devices extends Component {

	render() {
		let { label, value, className } = this.props;
		if (value === undefined) {
			value = 'desktop';
		}

		const tabs = (
			<ButtonGroup className={ classnames(
				'gutengeek-device-tabs',
				'gutengeek-no-border',
				className && !label ? className : '',
			) }>
				<Tooltip text={__( 'Desktop' )} key="desktop">
					<Button className={ classnames(
						'gutengeek-desktop-tab',
						'gutengeek-responsive-tabs',
						value === 'desktop' ? 'active-tab' : '',
					) } name="desktop" onClick={ () => this.props.onClick( 'desktop' ) }>
						<Dashicon icon="desktop"/>
					</Button>
				</Tooltip>
				<Tooltip text={__( 'Tablet' )} key="tablet">
					<Button className={ classnames(
						'gutengeek-tablet-tab',
						'gutengeek-responsive-tabs',
						value === 'tablet' ? 'active-tab' : '',
					) } name="tablet" onClick={ () => this.props.onClick( 'tablet' ) }>
						<Dashicon icon="tablet"/>
					</Button>
				</Tooltip>
				<Tooltip text={__( 'Mobile' )} key="mobile">
					<Button className={ classnames(
						'gutengeek-mobile-tab',
						'gutengeek-responsive-tabs',
						value === 'mobile' ? 'active-tab' : '',
					) } onClick={ () => this.props.onClick( 'mobile' ) }>
						<Dashicon icon="smartphone" name="mobile"/>
					</Button>
				</Tooltip>
			</ButtonGroup>
		);

		return (
			<Fragment>
				{ label ? <Fragment>
					<div className={ classnames(
						'gutengeek-device-tabs-wrap',
						className ? className : '',
					) }>
						<div className="components-base-control__field">
							<label className="components-base-control__label">{ label }</label>
							{ tabs }
						</div>
						{ this.props.children && this.props.children( value ) }
					</div>
				</Fragment> : tabs
				}
			</Fragment>
		);
	}

}

export default Devices;
