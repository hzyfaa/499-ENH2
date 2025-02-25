/* Get user auth page */
const user = (req, res) => {
    res.render('user', { title: 'Account' });
};


module.exports = { user };