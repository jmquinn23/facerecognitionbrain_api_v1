


const handleRegister = (req, res, db, bcrypt) => {
	const {name, email, password} = req.body;	
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	// console.log(name, email, password);
	// database.users.push({
	// 		id: '125',
	// 		name: name,
	// 		// password: password,
	// 		email: email,			
	// 		entries: 0,
	// 		joined: new Date()
	// })
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0].email,
					name: name,
					joined: new Date()
				})
				.then(user => {
					if (user.length) {
						res.json(user[0])
					} else {
						res.status(400).json('Not found')
					}			
				})
			})
		.then(trx.commit)
		.catch(trx.rollback)
		})

		.catch(err => res.status(400).json('error getting user'))
}

export default handleRegister;