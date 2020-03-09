module.exports.index = (req, res) => {
    res.json({ 
        message: 'quality anime quotes coming soon 🚀', 
        error: false, 
        data: null 
    });
}

module.exports.notFound = (req, res) => {
    res.json({
        message: `sorry can't find it 😀`,
        error: true,
        data: null
    })
}