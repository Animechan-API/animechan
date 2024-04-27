module.exports = {
	apps: [
		{
			name: 'animechan',
			script: 'pnpm',
			args: 'start',
			watch: true,
			ignore_watch: [
				'**/node_modules',
				'**/*.md',
				'.github',
				'.editorconfig',
				'.gitignore',
				'.prettierignore',
				'.env_example',
				'client/.next',
				'LICENSE',
				'logs',
				'.nvmrc',
			],
			autorestart: true,
			max_memory_restart: '500M',
			out_file: 'logs/output.log',
			error_file: 'logs/error.log',
			log_file: 'logs/combined.log',
		},
	],
};
