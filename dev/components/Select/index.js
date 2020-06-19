import classnames from 'classnames';
import Icons from '../icons';
import './editor.scss';

const { __ } = wp.i18n;
const { Component, Fragment, createRef } = wp.element;
const { RichText } = wp.blockEditor;

/**
 *
 * options example [
 {
				value: '',
				label: __( 'Default' ),
				weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
				google: false,
			},
 {
				value: 'Arial',
				label: 'Arial',
				weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
				google: false,
			}
 ]
 * <SelectionControl options={ fontOptions } label={ __( 'Font Family' ) } value={ headFontFamily }
 onSelect={ ( value ) => setAttributes( { headFontFamily: value.value } ) }/>
 */
class Select extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			filterText: '',
			isOpen: false,
			placeholderInput: '',
			options: [],
		};

		this.ref = createRef( new Date().getTime() );
	}

	componentDidMount() {
		this.setState({
			options: this.props.options
		});
		document.addEventListener( 'mousedown', this.handleClickOutside.bind( this ) );
	}

	findOptions() {
		var { options, value, placeholder } = this.props;
		var { filterText } = this.state;
		if (filterText && filterText.length > 1) {
			let cloneOptions = lodash.cloneDeep(options);
			options = cloneOptions.filter( (item, index) => {
				if ( typeof item.value === 'string') {
					return item.value && item.label.toLowerCase().search( filterText.toLowerCase() ) !== -1;
				} else if (item.value.items === undefined) {
					item.value = [...item.value].filter((it) => {
						var clIt = { ...it };
						return clIt.label.toLowerCase().search( filterText.toLowerCase() ) !== -1
					});
					return item.value && item.value.length > 0;
				} else {
					return item.value.items.filter((it) => {
						var clIt = { ...it };
						return it.label.toLowerCase().search( filterText.toLowerCase() ) !== -1
					})
				}

				return false;
			});
		}

		return [...options];
	}

	componentWillUnmount() {
		document.removeEventListener( 'mousedown', this.handleClickOutside.bind( this ) );
	}

	componentDidUpdate() {
		if (!this.state.isOpen) {
			document.removeEventListener( 'mousedown', this.handleClickOutside.bind( this ) );
		}
	}

	handleClickOutside( event ) {
		const { isOpen } = this.state;
		const selectionRoot = this.ref.current;
		if (selectionRoot && !selectionRoot.contains( event.target )) {
			if (isOpen) {
				this.setState( { isOpen: false } );
			}
		}
	}

	render() {
		const { label, onSelect, className, placeholder, value } = this.props;
		const { filterText, isOpen, placeholderInput } = this.state;
		const options = this.findOptions();
		return (
			<Fragment>
				<div className={ classnames(
					'gutengeek-field',
					'gutengeek-select-fields',
					className ? className : ''
				) } ref={ this.ref }>
					{ label && <label>{ label }</label> }
					<div className="gutengeek-selection-picker" onClick={ (e) => {
						e.preventDefault();
						this.setState( { isOpen: !isOpen } );
						return false;
					} }>
						<span className="gutengeek-selection-search-wrapper">
							<RichText
								tagName="span"
								className={ classnames( 'gutengeek-selection-search', !isOpen ? 'selected' : '' ) }
								placeholder={ value || placeholderInput || __( 'Select' ) }
								value={ value || filterText }
								keepPlaceholderOnFocus
								onChange={ value => this.setState( { filterText: value } ) }
							/>
							<span className="gutengeek-selection-icon">{ isOpen ? Icons.arrow_up : Icons.arrow_down }</span>
						</span>
					</div>
					{ isOpen && <div className="gutengeek-options-wrapper">
						<div className="gutengeek-options-content">
							<Fragment>
								{ options.length > 0 ?
									options.map( ( option, index ) => {
										return (
											<Fragment>
												{ typeof option.value !== 'object' ? <div
													className={ classnames(
														'gutengeek-selection-option-value',
														option.value == value ? 'selected' : '',
													) }
													id={ `gutengeek-option-value-${ index }` }
													onClick={ () => {
														this.setState( { isOpen: false, filterText: '' }, () => {
															onSelect( option );
														} );
														// onSelect( option );
													} }
												>
													{ option.label }
												</div> : <Fragment>
													<div
														className={ classnames(
															'gutengeek-selection-option-value',
															option.value == value ? 'selected' : '',
														) }
														id={ `gutengeek-option-value-${ index }` }
													>
														{ option.label }
													</div>
													{ option.value.map((opt, i) => {
														return (
															<div className={ classnames(
																	'gutengeek-selection-option-value',
																	'gutengeek-selection-sub-value',
																	opt.value == value ? 'selected' : '',
																) } onClick={ () => {
																	this.setState( { isOpen: false, filterText: '' }, () => {
																		onSelect( opt );
																	} );
																	// onSelect( opt );
																} }>
																- { opt.label }
															</div>
														)
													}) }
												</Fragment>}

											</Fragment>
										);
									} )
									:
									<div className={ classnames(
										'gutengeek-selection-option-value',
										'no-match',
									) }
										 onClick={ () => this.setState( {
											 isOpen: false,
											 filterText: '',
										 } ) }> { __( 'No matched' ) } </div>
								}
							</Fragment>
						</div>
					</div> }
				</div>
			</Fragment>
		);
	}

}

export default Select;
