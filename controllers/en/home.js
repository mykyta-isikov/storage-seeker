module.exports = async (req, res) => {
    let userStatus = req.user ? req.user.status : 0;
    let userFirstName = req.user ? req.user.first_name : null;

    res.render('pages/en/home', {
        userStatus: userStatus,
        userFirstName: userFirstName,
    });
};
