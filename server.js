import express from "express"

const app = express()

const users = new Map()

app.get("/", (req, res) => {
    return res.status(200).send(`
    <div>
        <p>Different rate limits tests:</p>
        <ul>
            <li><a href="/tokens">Limit access using tokens</a></li>
        </ul>
    </div>
    `)
})

app.get("/tokens", (req, res) => {
    const ip = req.socket.remoteAddress
    if(!users.has(ip)) {
        users.set(ip, 5)
        return res.status(200).send("As a new user now you have 5 tokens")
    } else {
        users.get(ip) > 0 ? users.set(ip, Number(users.get(ip)) - 1) : null
        if(users.get(ip) === 0) return res.status(200).send("You don't have tokens left")
        return res.status(200).send(`You have ${users.get(ip)} tokens left`)
    }
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})