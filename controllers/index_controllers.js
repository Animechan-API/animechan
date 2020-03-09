module.exports.index = (req, res) => {
    res.json('quality anime quotes coming soon 🚀');
}

module.exports.notFound = (req, res) => {
    res.json({
        message: `sorry can't find it 😀`,
        error: true
    })
}