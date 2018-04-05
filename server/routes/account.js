var db = require('../database/user')

function accountRender(req, res) {
    const data = {
        sessionUser: req.session.user,
        data: [],
        error: []
    }

    if (!req.session.user) {

        res.render('front/error.ejs', data)
        return
    }

    res.status(200).render('dashboard/account.ejs', data)
}

function accountChange(req, res) {
    const data = {
        sessionUser: req.session.user,
        data: [],
        error: []
    }
    res.status(200).render('dashboard/account-change.ejs', data)
}

function accountUpdate(req, res) {
    const data = {
        sessionUser: req.session.user,
        data: [],
        error: []
    }

    req.body.file = req.file

    db.update(req.body, data.sessionUser, done)

    function done(item) {
        req.session.user = item
        data.sessionUser = req.session.user
        console.log(item)
        res.status(200).render('dashboard/account.ejs', data)
    }

}

module.exports = {
    render: accountRender,
    change: accountChange,
    update: accountUpdate
}

