const mongoose = require('mongoose');
const schema = require('../model/schema');

const formatModal = {
    quote: "$quote",
    character: "$char.char_text",
    anime: "$anime.anime_text",
    _id: 0
};

module.exports = {
    defaultFetch: async function () {
        const db = await schema.aggregate([
            { $project: formatModal }
        ]).limit(10);
        return db;
    },

    matchAnime: async function (anime_slug) {
        const db = await schema.aggregate([
            { $match: { "anime.anime_slug": anime_slug } },
            { $project: formatModal }
        ]).limit(10);
        return db;
    },

    matchChar: async function (char_slug) {
        const db = await schema.aggregate([
            { $match: { "char.char_slug": char_slug } },
            { $project: formatModal }
        ]).limit(10);
        return db;
    },

    pagination: async function (page) {
        const db = await schema.aggregate([
            { $project: formatModal }
        ]).skip(10 * (page - 1)).limit(10);
        return db;
    },

    radomQuery: async function () {
        const db = await schema.aggregate([
            { $sample: { size: 1 } },
            { $project: formatModal }
        ]);
        return db;
    }
}

