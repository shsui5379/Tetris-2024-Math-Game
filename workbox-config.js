module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,webmanifest,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};