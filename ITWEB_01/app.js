const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('./views/index.ejs'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))