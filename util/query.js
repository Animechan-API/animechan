const schema = require('../model/schema');

const formatModal = {
    quote: "$quote",
    character: "$char.char_text",
    anime: "$anime.anime_text",
    _id: 0
};

module.exports = {
    defaultFetch: async function () {
        try {
            const db = await schema.aggregate([
                { $project: formatModal }
            ]).limit(10);
            return db;
        } catch (error) {
            console.error(error)
        }

    },

    matchAnime: async function (anime_slug) {
        try {
            const db = await schema.aggregate([
                { $match: { "anime.anime_slug": anime_slug } },
                { $project: formatModal }
            ]).limit(10);
            return db;
        } catch (error) {
            console.error(error)
        }

    },

    matchChar: async function (char_slug) {
        const db = await schema.aggregate([
            { $match: { "char.char_slug": char_slug } },
            { $project: formatModal }
        ]).limit(10);
        return db;
    },

    pagination: async function (page) {
        try {
            const db = await schema.aggregate([
                { $project: formatModal }
            ]).skip(10 * (page - 1)).limit(10);
            return db;
        } catch (error) {
            console.error(error)
        }

    },

    radomQuery: async function () {
        try {
            const db = await schema.aggregate([
                { $sample: { size: 1 } },
                { $project: formatModal }
            ]);
            return db;
        } catch (error) {
            console.error(error)
        }

    }
}

