const el = wp.element.createElement;

const Icons = {
	shortLogoGradient: el( 'svg', { width: 24, height: 24 },
		el( 'defs', {},
			el( 'linearGradient', {
				id: 'gradient',
				x1: '0%',
				y2: '0%',
				x2: '50%',
				y2: '100%'
			},
				el( 'stop', { offset: '0%', style: { stopColor: '#f9ec31', stopOpacity: '0.5' } } ),
				el( 'stop', { offset: '60%', style: { stopColor: '#ff9133' } } ),
				el( 'stop', { offset: '100%', style: { stopColor: '#ff0015' } } )
			)
		),
		el( 'g', { fill: 'url(#gradient)' },
			el( 'path', {
				d: 'm21.916722,5.473895l-10.559607,4.415564l2.015925,4.415564l5.08781,-2.115791c0,2.115791 -1.151957,3.679637 -3.551868,4.691537c-1.919928,0.827918 -3.551868,0.919909 -5.08781,0.275973c-1.535943,-0.643936 -2.6879,-1.747828 -3.359875,-3.311673c-0.767971,-1.563846 -0.767971,-3.127691 -0.191993,-4.599546c0.575979,-1.471855 1.727936,-2.575746 3.359875,-3.219682c1.055961,-0.459955 2.015925,-0.643936 2.975889,-0.551946c0.959964,0 1.823932,0.275973 2.495907,0.735927l3.359875,-4.415564c-1.535943,-1.0119 -3.359875,-1.563846 -5.3758,-1.747828c-2.015925,-0.183982 -3.935853,0.183982 -5.951778,1.0119c-3.071886,1.287873 -5.183807,3.403664 -6.335764,6.347374c-1.151957,2.94371 -1.055961,5.795428 0.287989,8.739138c1.34395,2.94371 3.551868,4.96751 6.527757,6.071401c2.975889,1.103891 6.143771,1.0119 9.407649,-0.367964c3.071886,-1.287873 5.08781,-3.219682 6.239767,-5.887419c1.055961,-2.667737 0.959964,-5.427465 -0.383986,-8.371174l-0.959964,-2.115791z',
			} )
		),
	),
	border: {
		global: el( 'svg', { width: 16, height: 16, viewBox: '0 0 16 16' },
			el( 'path', {
				d: 'M15.971 15.059v.941h-16v-16h16v15.058zm-1.882-.941v-12.235h-12.235v12.235h12.235z',
			} ),
		),
		advanced: el( 'svg', { width: 16, height: 16, viewBox: '0 0 16 16' },
			el( 'path', {
				d: 'M2.794 0h10.353v1.882h-10.353z',
			} ),
			el( 'path', {
				d: 'M15.97 2.824v10.353h-1.882v-10.353z',
			} ),
			el( 'path', {
				d: 'M1.853 2.823v10.353h-1.882v-10.353z',
			} ),
			el( 'path', {
				d: 'M2.794 14.118h10.353v1.882h-10.353z',
			} ),
		),
		top: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', { d: 'M0 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M20 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 0h16v2h-16z', fill: '#228bf0' } ),
				el( 'path', { d: 'M3 20h16v2h-16z', fill: '#dfdfdf' } ),
			),
		),
		right: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', { d: 'M0 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M20 3h2v16h-2z', fill: '#228bf0' } ),
				el( 'path', { d: 'M3 0h16v2h-16z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 20h16v2h-16z', fill: '#dfdfdf' } ),
			),
		),
		bottom: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', { d: 'M0 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M20 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 0h16v2h-16z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 20h16v2h-16z', fill: '#228bf0' } ),
			),
		),
		left: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', { d: 'M0 3h2v16h-2z', fill: '#228bf0' } ),
				el( 'path', { d: 'M20 3h2v16h-2z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 0h16v2h-16z', fill: '#dfdfdf' } ),
				el( 'path', { d: 'M3 20h16v2h-16z', fill: '#dfdfdf' } ),
			),
		),
		top_left: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', {
					d: 'M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71z',
					fill: '#228bf0',
				} ),
				el( 'path', {
					d: 'M13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71zM1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77zM13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z',
					fill: '#dfdfdf',
				} ),
			),
		),
		top_right: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', {
					d: 'M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71z',
					fill: '#dfdfdf',
				} ),
				el( 'path', {
					d: 'M13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71z',
					fill: '#228bf0',
				} ),
				el( 'path', {
					d: 'M1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77zM13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z',
					fill: '#dfdfdf',
				} ),
			),
		),
		bottom_right: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22' },
			el( 'g', {},
				el( 'path', {
					d: 'M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71zM13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71zM1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77z',
					fill: '#dfdfdf',
				} ),
				el( 'path', {
					d: 'M13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z',
					fill: '#228bf0',
				} ),
			),
		),
		bottom_left: el( 'svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'currentColor', },
			el( 'g', {},
				el( 'path', {
					d: 'M1.88 0c-1.038 0-1.88.842-1.88 1.88v6.71h1.88v-5.77c0-.519.421-.94.94-.94h5.77v-1.88h-6.71zM13.41 0v1.88h5.77c.519 0 .94.421.94.94v5.77h1.88v-6.71c0-1.038-.842-1.88-1.88-1.88h-6.71z',
					fill: '#dfdfdf',
				} ),
				el( 'path', {
					d: 'M1.88 13.41h-1.88v6.71c0 1.038.842 1.88 1.88 1.88h6.71v-1.88h-5.77c-.519 0-.94-.421-.94-.94v-5.77z',
					fill: '#228bf0',
				} ),
				el( 'path', {
					d: 'M13.41 20.12v1.88h6.71c1.038 0 1.88-.842 1.88-1.88v-6.71h-1.88v5.77c0 .519-.421.94-.94.94h-5.77z',
					fill: '#dfdfdf',
				} ),
			),
		),
	},
	vertical: el( 'svg', {
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			preserveAspectRatio: 'xMidYMid meet',
			className: 'dashicon',
			fill: 'currentColor',
			transform: 'translate(-2, -2)',
		},
		el( 'path', {
			d: 'M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z',
		} ),
	),
	horizontal: el( 'svg', {
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			preserveAspectRatio: 'xMidYMid meet',
			className: 'dashicon',
			fill: 'currentColor',
			transform: 'rotate(90)',
		},
		el( 'path', {
			d: 'M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z',
		} ),
	),
	arrow_up: el( 'svg', { width: 18, height: 18, viewBox: '0 0 1792 1792' },
		el( 'path', {
			d: 'M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z',
		} ),
	),
	arrow_down: el( 'svg', { width: 18, height: 18, viewBox: '0 0 1792 1792' },
		el( 'path', {
			d: 'M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z',
		} ),
	),
	close: el(
		'svg', { width: 20, height: 20 },
		el( 'path', {
			d: 'M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z',
		} ),
	),
	no_image: el(
		'svg', { viewBox: '0 0 512 512' },
		el( 'path', {
			d: 'M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z',
		} ),
	),
	rotate: el(
		'svg', { viewBox: '0 0 512 512' },
		el( 'path', {
			d: 'M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z',
		} ),
	),
	download: el(
		'svg', { viewBox: '0 0 512 512' },
		el( 'path', {
			d: 'M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z',
		} ),

	),
	arrow_alt: el(
		'svg', { viewBox: '0 0 512 512' },
		el( 'path', {
			d: 'M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z',
		} ),

	),
	arrow_up_alt: el(
		'svg', { viewBox: '0 0 448 512' },
		el( 'path', {
			d: 'M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z',
		} ),

	),
	arrow_down_alt: el(
		'svg', { viewBox: '0 0 448 512' },
		el( 'path', {
			d: 'M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z',
		} ),

	),

	arrow_to_left: el(
		'svg', { viewBox: '0 0 448 512' },
		el( 'path', {
			d: 'M0 424V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24v336c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm280.5-66.4L214.9 292H424c13.3 0 24-10.7 24-24v-24c0-13.3-10.7-24-24-24H214.9l65.6-65.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L94.1 239c-9.4 9.4-9.4 24.6 0 33.9l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.3 9.4-24.5 0-33.8z',
		} ),

	),

	arrow_to_center: el(
		'svg', { viewBox: '0 0 448 512' },
		el( 'path', {
			d: 'M105.815 288h300.371l-46.208 43.728c-9.815 9.289-10.03 24.846-.474 34.402l10.84 10.84c9.373 9.373 24.569 9.373 33.941 0l98.343-98.343c12.497-12.497 12.497-32.758 0-45.255l-98.343-98.343c-9.373-9.373-24.569-9.373-33.941 0l-10.84 10.84c-9.556 9.556-9.341 25.113.474 34.402L406.186 224H105.815l46.208-43.728c9.815-9.289 10.03-24.846.474-34.402l-10.84-10.84c-9.373-9.373-24.569-9.373-33.941 0L9.373 233.372c-12.497 12.497-12.497 32.758 0 45.255l98.343 98.343c9.373 9.373 24.569 9.373 33.941 0l10.84-10.84c9.556-9.556 9.341-25.113-.474-34.402L105.815 288z',
		} ),

	),
	arrow_to_right: el(
		'svg', { viewBox: '0 0 448 512' },
		el( 'path', {
			d: 'M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zm-280.5 66.4l65.6 65.6H24c-13.3 0-24 10.7-24 24v24c0 13.3 10.7 24 24 24h209.1l-65.6 65.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L353.9 273c9.4-9.4 9.4-24.6 0-33.9L218.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9z',
		} ),

	),
	left: el(
		'svg', { viewBox: '0 0 28 28' },
		el( 'g', {},
			el('path', { d: "M5 13h2v2H5zM5 21h2v2H5zM5 17h2v2H5zM5 9h2v2H5zM5 5h2v2H5z" }),
			el('path', { d: "M7.339 13.25a1 1 0 0 0 0 1.501l4.642 4.09a.6.6 0 0 0 1.007-.442V16h9a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-9V9.602a.601.601 0 0 0-1.002-.446L7.339 13.25z" })
		),

	),
	center: el(
		'svg', { viewBox: '0 0 28 28' },
		el( 'g', {},
			el('path', { d: "M5 13h2v2H5zM5 9h2v2H5zM5 17h2v2H5zM5 5h2v2H5zM5 21h2v2H5zM21 9h2v2h-2zM21 5h2v2h-2zM21 13h2v2h-2zM15 8h-2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zM21 17h2v2h-2zM21 21h2v2h-2z" })
		),

	),
	right: el(
		'svg', { viewBox: '0 0 28 28' },
		el( 'g', {},
			el('path', { d: "M21 21h2v2h-2zM21 17h2v2h-2zM21 9h2v2h-2zM21 5h2v2h-2zM21 13h2v2h-2z" }),
			el('path', { d: "M20.649 13.249l-4.642-4.09A.6.6 0 0 0 15 9.602V12H6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9v2.398a.601.601 0 0 0 1.002.446l4.647-4.094a1 1 0 0 0 0-1.501z" })
		),

	),

	vertical_top: el(
		'svg', { viewBox: '0 0 24 24' },
		el('path', { d: "M9 20h6V9H9v11zM4 4v1.5h16V4H4z" }),
	),

	vertical_center: el(
		'svg', { viewBox: '0 0 24 24' },
		el('path', { d: "M20 11h-5V4H9v7H4v1.5h5V20h6v-7.5h5z" }),
	),

	vertical_bottom: el(
		'svg', { viewBox: '0 0 24 24' },
		el('path', { d: "M15 4H9v11h6V4zM4 18.5V20h16v-1.5H4z" }),
	),

	arrows: el(
		'svg', { viewBox: '0 0 512 512' },
		el( 'g', {},
			el('path', { fill: '#649cf7', d: "M440 256l-34.68 32H288v117.34L256 440l-32-34.68V288H106.66L72 256l34.68-32H224V106.66L256 72l32 34.67V224h117.34z" }),
			el('path', { fill: '#0060f2', d: "M128.57 170.71l-.46-.47-10.83-10.84a24 24 0 0 0-33.93 0l-74 74a32 32 0 0 0 0 45.24l74 74a24 24 0 0 0 33.93 0l10.83-10.84.46-.47a24 24 0 0 0-.93-33.92L72 256l55.66-51.37a24 24 0 0 0 .91-33.92zm374.05 62.67l-74-74a24 24 0 0 0-33.93 0l-10.83 10.84-.46.47a24 24 0 0 0 .93 33.92L440 256l-55.66 51.37a24 24 0 0 0-.93 33.92l.46.47 10.83 10.84a24 24 0 0 0 33.93 0l74-74a32 32 0 0 0 0-45.24zM341.76 383.89l-.47-.46a24 24 0 0 0-33.92.93L256 440l-51.37-55.66a24 24 0 0 0-33.92-.93l-.47.46-10.84 10.85a24 24 0 0 0 0 33.93l74 74a32 32 0 0 0 45.24 0l74-74a24 24 0 0 0 0-33.93zM278.62 9.38a32 32 0 0 0-45.24 0l-74 74a24 24 0 0 0 0 33.93l10.84 10.83.47.46a24 24 0 0 0 33.92-.93L256 72l51.37 55.66a24 24 0 0 0 33.92.93l.47-.46 10.84-10.83a24 24 0 0 0 0-33.93z" }),
		),
	),

	arrow_vertical: el(
		'svg', { viewBox: '0 0 512 512' },
		el('path', { d: "M105.815 288h300.371l-46.208 43.728c-9.815 9.289-10.03 24.846-.474 34.402l10.84 10.84c9.373 9.373 24.569 9.373 33.941 0l98.343-98.343c12.497-12.497 12.497-32.758 0-45.255l-98.343-98.343c-9.373-9.373-24.569-9.373-33.941 0l-10.84 10.84c-9.556 9.556-9.341 25.113.474 34.402L406.186 224H105.815l46.208-43.728c9.815-9.289 10.03-24.846.474-34.402l-10.84-10.84c-9.373-9.373-24.569-9.373-33.941 0L9.373 233.372c-12.497 12.497-12.497 32.758 0 45.255l98.343 98.343c9.373 9.373 24.569 9.373 33.941 0l10.84-10.84c9.556-9.556 9.341-25.113-.474-34.402L105.815 288z" }),
	),

	arrow_horizontal: el(
		'svg', { viewBox: '0 0 512 512' },
		el('path', { d: "M347.404 142.86c-4.753 4.753-4.675 12.484.173 17.14l73.203 70H91.22l73.203-70c4.849-4.656 4.927-12.387.173-17.14l-19.626-19.626c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L128 388.766c4.686 4.686 12.284 4.686 16.971 0l19.626-19.626c4.753-4.753 4.675-12.484-.173-17.14L91.22 282h329.56l-73.203 70c-4.849 4.656-4.927 12.387-.173 17.14l19.626 19.626c4.686 4.686 12.284 4.686 16.971 0l124.485-124.281c4.686-4.686 4.686-12.284 0-16.971L384 123.234c-4.686-4.686-12.284-4.686-16.971 0l-19.625 19.626z" }),
	),
};

export default Icons;
