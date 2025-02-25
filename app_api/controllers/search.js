const trie = require('../../utils/airportdata');

const searchResult = async (req, res) => {
    const query = req.query.q;
    return res.json([]);
}

module.exports = { searchResult };