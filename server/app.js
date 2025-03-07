const express = require('express')
const router = require('./routes/routes')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/api', router)

app.listen(8081, () => {
    console.log('server listening to the port 8081')
})