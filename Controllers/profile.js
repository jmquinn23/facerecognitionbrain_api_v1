

const handleProfile = (req, res, db) => {		
	const { id } = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		res.json(user[0])
	})	
	.catch(err => res.status(400).json('not found'))
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	} 
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

export default handleProfile;