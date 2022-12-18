import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ab955313c8c841e8b9b8fb729a14c098'
});

const handleApiCall = (req, res) => {
	app.models
 		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 		.then(data => {
 			res.json(data);
 		})
 		.catch(err => res.status(400).json('unable to work with API'))	
}



const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('unable to get entries'))

	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++
	// 		return res.json(user.entries);
	// 	} 
	// })
	// if (!found) {
	// 	res.status(400).json('not found');
	// }
}

export {handleImage, handleApiCall};