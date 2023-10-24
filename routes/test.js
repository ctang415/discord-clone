const index = require('./index')
const user = require('./users')
const chat = require ('./chats')
const friend = require('./friends')
const message = require('./messages')
const request = require("supertest");
const express = require("express");
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);
app.use('/users', user)
app.use('/users/:id/friends', friend)
app.use('/users/:id/friends/:friend/chats', chat)
app.use('/users/:id/friends/:friend/chats/messages', message)
const agent = request.agent('http://localhost:3000');

let credentials = {  email: 'test@test.com',
password: 'test'
}

describe('index route works', () => {
    test("Responds with the user's information on login", done => {
        agent
        .post('/')
        .send((credentials))
        .expect(response => {
            expect(response.body.data.email).toBe('test@test.com')
            expect(response.body.data.username).toBe('test')
        })
        .expect(200, done)
    })
    test('responds with error on bad login', done => {
        agent
        .post('/')
        .send({email: 'test@test.com', password: 'tests'})
        .expect(response => {
            expect(response.body.error.message).toBe('Password does not match')
        })
        .expect(400, done)
    })
})
  
describe('user route works', () => {
    test('create an account with an email that already exists', done => {
        agent
        .post('/users')
        .send({email: 'test@test.com', username: 'tests', password: 'test'})
        .expect( response => {
            expect(response.body.errors[0].msg).toBe('Email already exists')        
        })
        .expect(400, done)
    });
    test('create an account with a username that already exists', done => {
        agent
        .post('/users')
        .send({email: 'testss@test.com', username: 'test', password: 'test'})
        .expect( response => {
            expect(response.body.errors[0].msg).toBe('User already exists')
        })
        .expect(400, done)
    })

    let id;
    beforeEach( done => {
        agent
        .post('/')
        .send(credentials)
        .expect( response => {
            id = response.body.data._id
        })
        .expect(200, done)
    })

    test('retrieve user data', done => {
        agent
            .get(`/users/${id}`)
            .expect( response => {
                expect(response.body.user_detail.username).toBe('test')
        })
        .expect(200, done)
    })
    test('update user with username that already exists', done => {
        agent
        .post(`/users/${id}/update`)
        .send({username: 'test', password: 'test', id: `${id}`})
        .expect( response => {
            expect(response.body.errors[0].msg).toBe('Username already exists. Please choose another one.')
        })
        .expect(400, done)
    })
  })

  describe('friends route works', () => {
    let id;
    beforeEach( done => {
        agent
        .post('/')
        .send(credentials)
        .expect(response => {
            id = response.body.data._id
        })
        .expect(200, done)
    })
    test('add friend failure', done => {
        agent
        .post(`/users/${id}/friends`)
        .send({username: 'test', friendUsername: 'test'})
        .expect(response => {
            expect(response.body.errors[0].msg).toBe('You cannot add yourself.')
        })
        .expect(400, done)
    })
  })

describe('chats route works', () => {
    let id;
    let friendid;
    beforeEach( done => {
        agent
        .post('/')
        .send(credentials)
        .expect(response => {
            id = response.body.data._id
            friendid = response.body.data.friendsList[0].recipient._id
        })
        .expect(200, done)
    })
    
    test('retrieve chat', done => {
        agent
        .get(`/users/${id}/friends/${friendid}/chats`)
        .expect( response => {
            expect(response.body.chat.users).toEqual([id, friendid])
        })
        .expect(200, done)
    })
})

describe('message route works', () => {
    let id;
    let friendid;
    beforeEach( done => {
        agent
        .post('/')
        .send(credentials)
        .expect(response => {
            id = response.body.data._id
            friendid = response.body.data.friendsList[0].recipient._id
        })
        .expect(200, done)
    })
    test('creates a message that fails', done => {
        agent
        .post(`/users/${id}/friends/${friendid}/chats/messages`)
        .send({friend: friendid, sender: id, message: ''})
        .expect(response => {
            expect(response.body.success).toBe(false)
            expect(response.body.errors[0].msg).toBe('Message must not be blank')
        })
        .expect(400, done)
    })
})