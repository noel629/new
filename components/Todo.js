import {Accordion, Item,} from "react-bootstrap"
// import Head from 'next/head';
import { useState } from "react"
import { gql, useMutation } from '@apollo/client'
import Swal from "sweetalert2"
import { DragDropContext, Droppable,Draggable } from "react-beautiful-dnd"

function Todo({todo, GET_TODOS}) {
    console.log(todo);
    const [ editing, setEditing ] = useState(false) 
    const DELETE_TODO = gql`
        mutation deleteTodo ($id: ID) {
            deleteTodo (id: $id) {
                title
            }
        }
    `

    const [deleteTodo, {data, loading, error}] = useMutation(DELETE_TODO, {
        refetchQueries: [
            {query:GET_TODOS}
        ]
    })

    const deleteHandler = id => {
        try{
            deleteTodo({
                variables: {id}
            })
            Swal.fire(
                'Deleted todo!',
                'Deleted!',
                'success'
            )
        } catch(err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            })
        }
    }  
    // console.log(todo)
    return( 
            <Accordion className="m-2">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{todo.title}</Accordion.Header>
                    <Accordion.Body>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum. */}
                    <div align="right">
                        {/* <button className="btn btn-success" onClick={() => setEditing(!editing)} > { editing? "Cancel" : "Edit" } </button> */}
                        <button className="btn btn-danger" onClick={() => deleteHandler(todo.id)}> Delete </button>
                    </div>
                    <h4> {todo.description} </h4>
                    <small> {todo.date} </small>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
    )
}


export default Todo;