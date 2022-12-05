
import express from 'express';
import bcrypt from 'bcryptjs';


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());




const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'John@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sylvia',
			email: 'Sylvia@gmail.com',
			password: 'icecream',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	// bcrypt.compare("apples", '' function(err, hash) {
	// 	console.log('1st guess', res);
	// });
	// bcrypt.compare("veggies", '' function(err, hash){
	// 	console.log('2nd guess - wrong password', res);
	// });
	if (req.body.email === db.users[0].email &&
		req.body.password === db.users[0].password) {
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
	res.json('signin');
})

app.post('/register', (req, res) => {
	const {name, email, password} = req.body;	
	// console.log(name, email, password);
	database.users.push({
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {	
	console.log(req.body);
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		} 
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3001, () => {
	console.log('app is running on 3001');
})


/*
TODO
/ --> res = this is working
/signin  --> POST respond with success/fail
/register --> POST = user
/profile/:userid (param) --> GET = user
/image --> PUT --> updated user info
*/