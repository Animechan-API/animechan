module.exports = {
	modelFormat: {
		quote: '$quote',
		character: '$char.char_text',
		anime: '$anime.anime_text',
		_id: 0
	},

	slugGen(input) {
		return input
			.toLowerCase()
			.replace(/[\W_| ]/g, ' ')
			.replace(/\s+/g, '_');
	},

	shuffleArray(array) {
		if (array.length > 10) {
			return array.sort(() => 0.5 - Math.random()).slice(0, 10);
		}

		return array;
	}
};

