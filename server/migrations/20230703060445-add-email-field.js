module.exports = {
	async up(db, client) {
		// Fetch all documents in the user collection
		const users = await db.collection('users').find({}).toArray();

		// For each user, add an email field with a distinct placeholder value
		for (let user of users) {
			await db
				.collection('users')
				.updateOne(
					{ _id: user._id },
					{ $set: { email: `placeholder+${user._id}@example.com` } }
				);
		}

		// Create a unique index on the email field
		await db.collection('users').createIndex({ email: 1 }, { unique: true });
	},

	async down(db, client) {
		// Remove the unique index from the email field
		await db.collection('users').dropIndex('email_1');

		// Remove email field from all documents in the user collection
		await db.collection('users').updateMany(
			{},
			{
				$unset: {
					email: '',
				},
			}
		);
	},
};
