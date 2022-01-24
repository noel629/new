import { Form,Container, Row, Col, Button} from 'react-bootstrap'
import { useState } from "react"
import { ApolloProvider, gql, useMutation } from "@apollo/client"


function AddTodo({GET_TODOS}) {
    const [todos, setTodos] = useState({})

    const TODOS = gql`
        mutation createTodo ($title: String!, $description: String!){
            createTodo(todo: {
                title: $title,
                description: $description
            } ) {
                date
                title
                description
                isComplete
            }
        }
    `

    const [createTodo, {data, loading, error}] = useMutation(TODOS, {
        refetchQueries: [
            {query: GET_TODOS}
        ]
    })

    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        createTodo({
            variables: todos
        })
        e.target.reset()
    }

    const onChangeHandler = (e) => {
        setTodos({...todos, [e.target.name]:e.target.value})
    }

    

    return(
        <div>
            <Container fluid class="contain">
                <Row align="center">
                        <Form onSubmit={onSubmitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Title" onChange={onChangeHandler}/>
                                <Form.Text className="text-muted">
                                Going Productive?
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description" placeholder="Description" onChange={onChangeHandler}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                </Row>
            </Container>
        </div>
    )
}

export default AddTodo;