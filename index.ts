import * as express from 'express'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import routes from './src/routes/crmRoutes'
import messenger from './src/controllers/createMessage'
import { Settings } from './settings'

const app = express()

let messages = new messenger(Settings.PORT)

const dataConnection = (user: string, pass: string) : string => {
    return `mongodb://${user}:${pass}@ds143451.mlab.com:43451/pssocial`
}

const database = dataConnection(Settings.mlabUser, Settings.mlabPass)

// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
})

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

interface Name {
    firstName: string,
    lastName: string
}

//function with interface
const nameCreator = (name: Name): string => {
    return `Hello, ${name.firstName} ${name.lastName}`
}

let myName = {firstName: 'Shamiullah', lastName:'Mustafa'}

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) =>
    res.send(messages.messagePrint())
)

app.listen(Settings.PORT, () =>
    console.log(nameCreator(myName), messages.messagePrint())
)