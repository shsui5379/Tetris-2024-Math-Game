module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,webmanifest,css,png}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};