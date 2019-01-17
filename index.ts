import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import routes from './src/routes/crmRoutes'
import messenger from './src/controllers/createMessage'

const app = express()
const PORT: number = 3000
const mlabUser: string = 'psuser'
const mlabPass: string = 'psus3r'

let messages = new messenger(PORT)

const dataConnection = (user: string, pass: string) : string => {
    return `mongodb://${user}:${pass}@ds143451.mlab.com:43451/pssocial`
}

const database = dataConnection(mlabUser, mlabPass)

// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
})

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.send(messages.messagePrint())
)

app.listen(PORT, () =>
    console.log(messages.messagePrint())
)