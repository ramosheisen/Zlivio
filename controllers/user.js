let mongoose = require('mongoose');
let User  = mongoose.model('User');

exports.userFindById = function(req, res) {
    let termino = req.params.userName;
    let regex = new RegExp(termino, "i");

	User.find({ nombre: regex }, function(err, user) {
        if (err) return res.status(500).send(err);

        if (JSON.stringify(user) === '[]') return res.status(500).send({ 
            result: 'No se encontraron coincidencias'
        });

        res.json({
            result: user.length,
            list: user
        });
    }).select('-_id -__v');
};

exports.addUser = function(req, res) {
    const even = (element) => element === '';
    let flag = Object.values(req.body).some(even);

    if (flag) {
        return res.status(500).json({
            error: "Faltan datos"
        });
    }

	let user = new User({
		nombre:   req.body.nombre,
		apellido: req.body.apellido,
		email:    req.body.email
	});

	user.save(function(err, user) {
		if (err) return res.status(500).send(err);
    	res.status(200).jsonp(user);
	});
};
