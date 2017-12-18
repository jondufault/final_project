const express = require("express")
const api = express.Router()

const store = require('./data/store')

api.post('/user', (req, res) => {
    const user = req.body
    const users = store.getUsers()
// there are three cases
// 1. completely new user (no id, no match with existing user)
// 2. update of existing user (including id in user request)
// 3. potential update of existing user (no id, but matches existing user)

// the way this homework is setup, we don't need to worry about 3.


// completely new user:

if (user.id === ""){
    let userId = 1

//    if (users.length > 0) {
  //      userId = users[users.length - 1].id + 1
   // }


for (i=0; i<users.length; i++){
console.log(users[i].id)
if (userId <= parseInt(users[i].id)){userId = parseInt(users[i].id)+1}}
user.id = userId


    const newUser = {
        ...user
    }

    users.push(newUser)
}
else
{
users[user.id - 1] = user
}
    store.saveUsers(users)

    res.json(users)
})

api.get('/user', (req, res) => {
    const users = store.getUsers()
    res.json(users)
})

module.exports = api
