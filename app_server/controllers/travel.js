/* Get travel view */
const travel = async function (req, res, next) {
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = { travel };