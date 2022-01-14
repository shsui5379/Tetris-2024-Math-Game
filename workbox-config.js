module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,webmanifest,json,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};