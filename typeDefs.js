const { gql } = require('apollo-server')

const typeDefs = gql`

    scalar Date

    type Query {
        getTodos: [Todo],
        getDiary: [Diary]
    }

    type Token {
        token: String
    }

    type User {
        username: String,
        email: String
    }

    type Event {
        id: ID,
        title: String,
        startDate: String,
        endDate: String
    }

    type Todo {
        id: ID,
        date: String
        title: String,
        description: String,
        isComplete: Boolean
    }

    type Timer {
        days: Int,
        hours: Int,
        minutes: Int,
        seconds: Int
    }

    type Diary {
        id: ID,
        title: String,
        description: String,
        date: String,
        time: String,
        lastEdited: String
    }

    input RegisterInput {
        username: String,
        email: String,
        password: String,
        confirmPassword: String
    }

    input LoginInput {
        email: String,
        password: String
    }

    input EventInput {
        title: String,
        startDate: String,
        endDate: String
    }

    input TodoInput {
        title: String
        description: String
        isComplete: Boolean
    }

    input TimerInput {
        days: Int,
        hours: Int,
        minutes: Int,
        seconds: Int
    }

    input DiaryInput {
        title: String,
        description: String,
        date: String,
        time: String,
        lastEdited: String
    }

    type Mutation {
        register( user: RegisterInput ) : User
        login( user: LoginInput ) : Token

        createEvent( event: EventInput ) : Event
        updateEvent( id: ID, event: EventInput ) : Event
        deleteEvent( id: ID ) : Event

        createTodo( todo: TodoInput ) : Todo
        updateTodo( id: ID , todo: TodoInput ) : Todo
        deleteTodo( id: ID ) : Todo

        createDiary( diary: DiaryInput ) : Diary
        updateDiary( id: ID, diary: DiaryInput ) : Diary
        deleteDiary( id: ID ) : Diary
        
        timer( time: TimerInput ) : Timer
    }
`
module.exports = typeDefs
//add