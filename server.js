
import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './Controllers/register.js';
import handleSignin from './Controllers/signin.js';
import handleProfile from './Controllers/profile.js';
import {handleImage, handleApiCall} from './Controllers/image.js';

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'Ollie$0819',
		database: 'smart_brain'
	}
});

db.select('*').from('users').then(data => {
	console.log(data);
});


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());




const database = {
	users: [
		{
			id: '123',
			name: 'John',
			password: 'cookies',
			email: 'John@gmail.com',			
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sylvia',
			password: 'icecream',
			email: 'Sylvia@gmail.com',			
			entries: 0,
			joined: new Date()
		}
	]
	// login: [
	// 	{
	// 		id: '987',
	// 		hash: '',
	// 		email: 'john@gmail.com'
	// 	}
	// ]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt)}) 

app.get('/profile/:id', (req, res) => { handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageUrl', (req, res) => { handleApiCall(req, res)})

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