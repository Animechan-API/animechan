module.exports = {
	apps: [
		{
			name: 'animechan',
			script: 'pnpm',
			args: 'start:prod',
			watch: true,
			ignore_watch: [
				'**/node_modules',
				'**/pnpm-lock.yaml',
				'**/*.md',
				'.github',
				'.editorconfig',
				'.gitignore',
				'.pretteerignore',
				'.env_example',
				'client/.next',
				'LICENSE',
			],
		},
	],
};
