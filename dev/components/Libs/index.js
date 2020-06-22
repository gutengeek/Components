import DashSeparator from '../DashSeparator';
import classnames from 'classnames';
import './editor.scss';
const { Fragment, Component } = wp.element;
const { Spinner, PanelBody } = wp.components;
const { __ } = wp.i18n;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

class Libs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			processing: false
		}
	}

	changeLib( item ) {
		const { name, setItemData, getItem, gutengeek_dirty_status } = this.props;
		const params = {
			data: {
				_nonce: window.gutenGeekAdmin ? window.gutenGeekAdmin.getConfig('ajax_nonce') : '',
				id: item.id
			},
		}

		this.setState( { processing: item.id } );
		var item = getItem( item.id );
		if ( item && item.data ) {
			const { attributes, innerBlocks } = item.data;
			// update attributes and inner blocks
			this.props.updateBlocks( attributes, innerBlocks, gutengeek_dirty_status );
			this.setState( { processing: false } );
		} else {
			wp.ajax.send('gutengeek-import-template', params)
				.then( async (res) => {
					this.setState( { processing: false } );
					let blocks = wp.blocks.parse( res.data );
					if ( blocks.length === 0 ) {
						return;
					}
					var block = blocks[ 0 ];
					const { attributes, innerBlocks } = block;
					setItemData( item.id, block )

					if ( block.name !== name ) {
						return;
					}

					// store item block data to state
					// update attributes and inner blocks
					this.props.updateBlocks( attributes, innerBlocks, gutengeek_dirty_status );
				}).fail(( error ) => {
					this.setState( { processing: false } );
					console.log(error)
					if ( error.message ) {
						// set notice error
					}
				})
		}
	}

	static getDerivedStateFromProps( props, state ) {
		if ( props.gutengeekLibItems !== state.items ) {
			return {
				items: [...props.gutengeekLibItems]
			}
		}
	}

	render() {
		const { items, processing } = this.state;
		if ( items && items.length === 0 ) {
			return null;
		}

		return (
			<Fragment>
				<DashSeparator />
				<PanelBody title={ __( 'Designs Library' ) } initialOpen={ true }>
					<p>{ __( 'Use library with your content' ) }</p>
					<div className="gutengeek-block-lib gutengeek-block-lib-items">
						{ items.map(item => {
							return (
								<div className={ classnames( 'gutengeek-block-lib-item', 'card', processing ? (processing == item.id ? 'processing' : 'disabled') : '' ) } onClick={() => this.changeLib(item)}>
									<div className="card-image">
										<img src={item.image} />
										{ processing && processing == item.id && <Spinner /> }
										{ item.isPro && <span className="pro-feature">{ __( 'Pro' ) }</span> }
									</div>
									<div className="card-footer"><label>{item.name}</label></div>
								</div>
							)
						})}
					</div>
				</PanelBody>
				<DashSeparator />
			</Fragment>
		)
	}

}

export default compose([
	withSelect( ( select, props ) => {
		const { name } = props;
		const gutengeekLib = select( 'gutengeek/libs' );
		const { getItems, getLibs, isLoading, getItem } = gutengeekLib;
		const items = getItems();
		return {
			gutengeekLibItems: getLibs( name ),
			isLoading: isLoading(),
			getItem
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const { setItemData } = dispatch( 'gutengeek/libs' );
		const {
			name,
			clientId,
			templateInsertUpdatesSelection = true,
			attributes,
			setAttributes,
			gutengeek_dirty_status
		} = props;
		const { getBlock } = wp.data.select( 'core/block-editor' );
		const { createBlock } = wp.blocks;
		const { replaceInnerBlocks, updateBlockAttributes } = dispatch( 'core/block-editor' );
		// const block = getBlock( clientId );

		const getAttributesReplacement = ( name, attributes ) => {
			const blockType = wp.blocks.getBlockType( name );
			const settings = blockType.attributes;

			var values = Object.values( { ...attributes } );
			var names = Object.keys( { ...attributes } );
			var attsNames = names.filter(( attrName, index ) => {
				return values[index] && settings[attrName] !== undefined && settings[attrName].style !== undefined;
			});
			return attsNames.reduce(( attrs, attName ) => {
				attrs[attName] = attributes[attName];
				return attrs;
			}, {});
		}
		return {
			updateBlocks( attrs, blocks, dirty ) {
				const block = wp.data.select( 'core/block-editor' ).getBlock( clientId );
				const { innerBlocks } = block;
				// update current block
				var sanitizeAttrs = getAttributesReplacement(block.name, attrs);
				setAttributes( sanitizeAttrs );

				// update inner blocks
				if ( innerBlocks && innerBlocks.length >= blocks.length ) {
					var tmpInnerBlocks = [ ...innerBlocks ].filter(( block, index ) => {
						let { name, clientId, attributes } = block;
						if ( blocks[index] !== undefined && name && name === blocks[index].name ) {
							attributes = getAttributesReplacement( blocks[index].name, blocks[index].attributes );
							block.attributes = { ...block.attributes, ...attributes }
						}
						return block;
					});
				} else {
					var tmpInnerBlocks = [ ...blocks ].filter(( block, index ) => {
						let { name, clientId, attributes } = block;

						if ( innerBlocks[index] !== undefined && name && name === innerBlocks[index].name ) {
							attributes = getAttributesReplacement( innerBlocks[index].name, attributes );
							block.attributes = { ...innerBlocks[index].attributes, ...attributes }
						}
						return block;
					});
				}

				replaceInnerBlocks(
					clientId,
					tmpInnerBlocks,
					block && block.innerBlocks.length === 0 &&
						templateInsertUpdatesSelection &&
						tmpInnerBlocks.length !== 0
				);
			},
			setItemData
		};
	} ),
])(Libs);
