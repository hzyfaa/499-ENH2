/* Get homepage */
const home = (req, res) => {
    res.render('home', { title: 'Travlr Getaways' });
};

module.exports = { home };