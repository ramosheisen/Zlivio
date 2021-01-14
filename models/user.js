exports = module.exports = function(app, mongoose) {

	const userSchema = new mongoose.Schema({
		nombre:     { type: String },
		apellido: 	{ type: String },
		email:  	{ type: String }
	});

	mongoose.model('User', userSchema);

};
