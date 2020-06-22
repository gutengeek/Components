import './editor.scss';
import classnames from 'classnames';
import MasksControl from '../Masks';

const { Component, Fragment } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { __ } = wp.i18n;
const { Tooltip, Dashicon, Button, ButtonGroup } = wp.components;

const NoImage = props => {
	return (
		<svg viewBox="0 0 512 512">
			<path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" />
		</svg>
	)
}

/**
 *
 <MediaControl
 label={ __( 'Background Image' ) } multiple={ false }
 type={ ['image'] }
 value={ backgroundImage } action={ true }
 onChange={ media => this.onSelectImage( media ) } mask={false}/>
 */
class Media extends Component {

	onSelect( media ) {
		const { multiple, onChange, value } = this.props;
		if (multiple) {
			let medias = [];
			media.forEach( single => {
				if (single && single.url) {
					let { id, url, title } = single;
					medias.push( { id, url, title, sizes } );
				}
			} );
			onChange( value ? [...value, ...medias] : medias );
		} else {
			if (media && media.url) {
				let { id, url, title, sizes } = media;
				onChange( { ...value, ...{ id, url, title, sizes } } );
			}
		}
	}

	onRemoveImage( id ) {
		const { multiple, onChange } = this.props;
		if (multiple) {
			let value = ( this.props.value ).slice();
			value.splice( id, 1 );
			onChange( value );
		} else {
			let newValue = {...this.props.value};
			for ( let key of ['id', 'url', 'sizes'] ) {
				if (newValue[key] !== undefined) {
					delete newValue[key];
				}
			}
			onChange( newValue );
		}
	}

	getUrl( url ) {
		const exts = ['wbm', 'jpg', 'jpeg', 'gif', 'png', 'svg'];
		if (exts.indexOf( url.split( '.' ).pop().toLowerCase() ) !== -1) {
			return url;
		} else if ( window.gutenGeekAdmin ) {
			// video thumbnail in this case
			return window.gutenGeekAdmin.getConfig( 'url' ) + 'assets/images/no_image.jpg';
		}
	}

	onSelectMask( val ) {
		const { onChange, value } = this.props;
		var newValue = {...value};
		newValue.mask = val;
		newValue.openImageMask = !!val;
		onChange(newValue);
	}

	render() {
		const { type, multiple, value, action, mask, className } = this.props;
		return (
			<div className={ classnames('gutengeek-media-field', className) }>
				{ this.props.label && <label>{ this.props.label }</label> }
				<MediaUpload
					onSelect={ val => this.onSelect( val ) }
					allowedTypes={ type || ['image'] }
					multiple={ multiple || false }
					value={ value }
					render={ ( { open } ) => (
						<div className="gutengeek-single-img">
							<div>
								{ multiple ?
									<div>
										{ ( value.length > 0 ) &&
										value.map( ( v, index ) => {
											return (
												<div className="gutengeek-media-image-parent">
													{this.getUrl( v.url ) ? <img src={ this.getUrl( v.url ) } alt={ __( 'image' ) }/> : <NoImage />}

													{ action &&
													<ButtonGroup
														className="gutengeek-media-actions gutengeek-field-button-list">
														<Tooltip text={ __( 'Edit' ) }>
															<Button className="gutengeek-button"
																	aria-label={ __( 'Edit' ) } onClick={ open }
																	role="button">
																<Dashicon icon="edit"/>
															</Button>
														</Tooltip>
														<Tooltip text={ __( 'Remove' ) }>
															<Button className="gutengeek-button"
																	aria-label={ __( 'Remove' ) }
																	onClick={ () => this.onRemoveImage( index ) }
																	role="button">
																<Dashicon icon="trash"/>
															</Button>
														</Tooltip>
													</ButtonGroup>
													}
												</div>
											);
										} )
										}
										<div onClick={ open } className={ 'gutengeek-placeholder-image' }>
											<Dashicon icon="insert"/>
											<span>{ __( 'Insert' ) }</span>
										</div>
									</div>
									:
									( ( value && value.url ) ?
											<div className="gutengeek-media-image-parent">
												{this.getUrl( value.url ) ? <img src={ this.getUrl( value.url ) } alt={ __( 'image' ) }/> : <NoImage />}
												{ action &&
												<ButtonGroup className="gutengeek-media-actions gutengeek-field-button-list gutengeek-no-border">
													<Tooltip text={ __( 'Edit' ) }>
														<Button className="gutengeek-button-field"
																aria-label={ __( 'Edit' ) }
																onClick={ open } role="button" isDefault={ true }>
															<Dashicon icon="edit"/>
														</Button>
													</Tooltip>
													<Tooltip text={ __( 'Remove' ) }>
														<Button className="gutengeek-button-field"
																aria-label={ __( 'Remove' ) }
																onClick={ () => this.onRemoveImage( value.id ) }
																role="button" isDefault={ true }>
															<Dashicon icon="trash"/>
														</Button>
													</Tooltip>
												</ButtonGroup>
												}
											</div>
											:
											<div onClick={ open } className={ 'gutengeek-placeholder-image' }>
												<Dashicon icon="insert"/>
												<span>{ __( 'Insert' ) }</span>
											</div>
									)
								}
							</div>
						</div>
					) }
				/>
				{ mask && ! multiple && <Fragment>
					<MasksControl label={__( 'Mask' )} value={value.mask} onChange={(value) => this.onSelectMask(value)} />
				</Fragment> }
			</div>
		);
	}
}

Media.defaultProps = {
	label: '',
	type: ['image'],
	mask: false,
	value: {},
	action: true,
	showImg: true
};

/**
 * media inside editor
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const MediaEditorControl = ( props ) => {
	const { url, alt, multiple, value, type, onChange, className, showImg, mask } = props;
	var imageClass = classnames( className || '', 'gutengeek-media-editor-control', 'gutengeek-image', url && url !== '' ? '' : 'no-image' );
	return (
		<Fragment>
			<MediaUpload
				onSelect={ val => onChange( val ) }
				allowedTypes={ type || ['image'] }
				multiple={ multiple || false }
				value={ value }
				render={ ( { open } ) => (
					<div className="gutengeek-image-control" onClick={ () => open() }>
						<Button><Dashicon icon="trash" onClick={ () => onChange( '' ) }/></Button>
						{ url ? <Fragment>
							{ (showImg === undefined || showImg) ? <img src={url} className={ imageClass, mask ? 'gutengeek-image-mask' : '' } alt={alt} /> : '' }
						</Fragment> : <div className={classnames('image-placholder', mask ? 'gutengeek-image-mask' : '')}><NoImage /></div> }
					</div>
				) }
			/>
		</Fragment>
	);
};

export const MediaEmpty = props => {
	const { mask } = props;
	return <div className={classnames('gutengeek-image-placholder', mask ? 'gutengeek-image-mask' : '')}><NoImage /></div>
}

export const ImageComponent = props => {
	const { url, className, alt, mask } = props;
	if ( url ) {
		return <img src={url} className={ classnames( 'gutengeek-image', className, mask ? 'gutengeek-image-mask' : '' ) } alt={alt} />
	} else {
		return <MediaEmpty {...props} />
	}
}

export default Media;
