const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Todo = require('./models/Todo')
const Timer = require('./models/Timer')
const Event = require('./models/Event')
const moment = require('moment')
const Diary = require('./models/Diary')

const resolvers = {
        Query: {
                getTodos: async(_, args) => await Todo.find({}),
                // getTodosId: async (_, args) => await Todo.findById({_id: args.id})
        },

        Mutation: {
                // User //
                register: async (_, args) => {
                        const { username, email, password, confirmPassword } = args.user

                        const user = await User.findOne({ email })

                        if (user) {
                                throw new UserInputError (' User exist! ')
                        } else {
                                let newUser = new User()

                                newUser.username = username
                                newUser.email = email
                                
                                if( password === confirmPassword && password.length >= 3) {
                                        let salt = bcrypt.genSaltSync(10)
                                        let hash = bcrypt.hashSync(password, salt)

                                        newUser.password = hash
                                        newUser.confirmPassword = hash
                                } else {
                                        throw new UserInputError (' Password doesnt match! ')
                                }

                                await newUser.save()

                                return newUser
                        }
                },
                login: async (_, args) => {
                        const { email, password } = args.user

                        const foundUser = await User.findOne({email})

                        if (!foundUser) {
                                throw new UserInputError ( " No user found! " )
                        } else {
                                let isMatch = bcrypt.compareSync(password, foundUser.password)

                                if( !isMatch ) return { error: " Invalid Credentials" }

                                let payload = { foundUser }

                                let token = jwt.sign( payload, "key", {expiresIn: "3h"} )

                                return {token}
                        }
                },
                // Calendar //
                createEvent: async (_, args) => {
                        const { title, startDate, endDate } = args.event

                        if(!title) {
                                throw new UserInputError ( "Fail to create event" )    
                        } else if ( !startDate ) {
                                throw new UserInputError ( " Please select a starting date!" )
                        } else {
                                const event = new Event()

                                event.title = title
                                event.startDate = startDate
                                event.endDate = endDate

                                await event.save()
                                return event
                        }
                },
                updateEvent: async (_, args) => {
                        const eventId = args.id
                        const event = await Event.findByIdAndUpdate(eventId)

                        event.title = args.event.title
                        event.startDate = args.event.startDate
                        event.endDate = args.event.endDate

                        await event.save()
                        return event
                },
                deleteEvent: async (_, args) => {
                        const eventId = args.id

                        const event = await Event.findByIdAndRemove(eventId)

                        return event
                },
                // Todo //
                createTodo: async (_, args) => {

                        const { title, description } = args.todo

                        if ( !title ) {
                                throw new UserInputError ( "Title cant be empty!" )
                        } else {
                                const todo = new Todo()
                                
                                todo.date = moment(moment.now()).format("DD-MM-YYYY")
                                todo.title = title
                                todo.description = description
        
                                await todo.save()
                                return todo
                        }
                },
                updateTodo: async (_, args) => {
                        const todoId = args.id
                        const todo = await Todo.findByIdAndUpdate(todoId, {
                                title: args.todo.title,
                                description: args.todo.description,
                                isComplete: args.todo.isComplete
                        }, {new: true})

                        // console.log(todo)

                        // todo.title = args.todo.title
                        // todo.description = args.todo.description
                        // todo.isComplete = args.todo.isComplete

                        // await todo.save()
                        return todo
                },
                deleteTodo: async (_, args) => {
                        const todoId = args.id

                        const todo = await Todo.findByIdAndDelete(todoId)

                        return todo
                },
                // Clock - Timer //
                timer: async (_, args) => {
                        // console.log(args)
                        const { days, hours, minutes, seconds } = args.time

                        const timer = new Timer()

                        timer.days = days
                        timer.hours = hours
                        timer.minutes = minutes
                        timer.seconds = seconds

                        await timer.save()
                        return timer
                },
                // Diary //
                createDiary: async (_, args) => {
                        const { title, description } = args.diary

                        if ( !title ) {
                                throw new UserInputError ( " Fail to create diary, title can't be empty! " )
                        } else if ( !description ) {
                                throw new UserInputError ( " Fail to create diary, content can't be empty! ")
                        } else {
                                const diary = new Diary
        
                                diary.title = title
                                diary.description = description
                                diary.date = moment(moment.now()).format("DD-MM-YYYY")
                                diary.time = moment(moment.now()).format('h:mm:ss a')
                                diary.lastEdited = null
        
                                await diary.save()
                                return diary
                        }
                },
                updateDiary: async (_, args) => {
                        const diaryId = args.id

                        const diary = await Diary.findByIdAndUpdate(diaryId)

                        diary.title = args.diary.title
                        diary.description = args.diary.description
                        diary.lastEdited = moment(moment.now()).format('h:mm:ss a')

                        await diary.save()
                        return diary
                },
                deleteDiary: async (_, args) => {
                        const diaryId = args.id

                        const diary = await Diary.findByIdAndDelete(diaryId)

                        return diary
                }

        }
}

module.exports = resolvers

