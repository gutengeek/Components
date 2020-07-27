import classnames from 'classnames';
import './editor.scss';

const { __ } = wp.i18n;
const { useState, useEffect, Fragment } = wp.element;
const { Dashicon, Tooltip, CheckboxControl } = wp.components;

const URL = props => {
	const [isToggle, setIsToggle] = useState(false);
	const { value, label, placeholder, onChange } = props;
	const updateCallback = ( type, val ) => {
		let newValue = { ...value };
		newValue[type] = val;
		onChange( newValue )
	}

	return (
		<Fragment>
			<div className="gutengeek-field-url gutengeek-mb-10">
				{label && <label className="gutengeek-mb-10">{label}</label>}
					<div className="gutengeek-url-input-group">
						<input
							className="gutengeek-input-url"
							placeholder={ placeholder ? placeholder : 'https://' }
							type="url"
							value={value.url || ''}
							onChange={ e => updateCallback( 'url', e.target.value ) }/>
							<Tooltip text={ __( 'Advance Url' ) }>
								<button
									className={classnames(`gutengeek-button-url-advanced`,`${isToggle ? 'active' : ''}`)}
									onClick={() => setIsToggle(	!isToggle )}>
									<Dashicon icon="admin-generic" width="15" height="15" />
								</button>
							</Tooltip>
					</div>
					{isToggle && (
						<div className="gutengeek-url-advanced-options">
							<CheckboxControl
								className="gutengeek-checked"
								label={__( 'Open in new window' )}
								checked={ value.target }
								onChange={val => updateCallback( 'target', val )}
							/>
							<CheckboxControl
								label={ __( 'Add Nofollow' ) }
								checked={ value.nofollow }
								onChange={val => updateCallback( 'nofollow', val )}
							/>
						</div>
					)}
				</div>
		</Fragment>
	);
};

URL.defaultProps = {
	value: {
		target: false,
		url: '',
		nofollow: false
	},
	label: '',
	onChange: () => {}
}

export default URL;
