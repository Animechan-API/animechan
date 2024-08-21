module.exports = {
	apps: [
		{
			name: "animechan",
			script: "pnpm",
			args: "start",
			watch: ["server/dist", "client/.next"],
			autorestart: true,
			max_memory_restart: "500M",
			out_file: "logs/output.log",
			error_file: "logs/error.log",
			log_file: "logs/combined.log",
		},
	],
};
