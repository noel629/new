import Navbar from '../components/Navbar';
import AddTodo from '../components/Forms/AddTodos';
import {useState, useEffect} from 'react';
import {gql, useQuery, useMutation} from '@apollo/client';
import styles from '../styles/Todo.module.css';
import Todo from '../components/Todo';
import {Container, Row, Col, Card, Modal, Button} from 'react-bootstrap';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function todo() {
  const GET_TODOS = gql`
    query {
      getTodos {
        id
        date
        title
        description
        isComplete
      }
    }
  `

  const UPDATE_TODO = gql`
    mutation updateTodo ($id: ID, $todo: TodoInput) {
        updateTodo(id: $id, todo: $todo) {
            id
        }
    }
  `

  const {loading, error, data} = useQuery(GET_TODOS);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [
        {query:GET_TODOS}
    ]
})

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!loading) setTodos(data.getTodos);
  }, [todos, data]);

  let showTodos = loading ? (
    <h1> Loading... </h1>
  ) : (
    todos.map((todo) => <Todo key={todo.id} todo={todo} GET_TODOS={GET_TODOS} />)
  );

//   console.log(todos);

  const onDragEnd = (result) => {
    const {source, destination, draggableId} = result;


    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const id = draggableId;
    const start = source.droppableId;
    const end = destination.droppableId;

    if(start !== end) {
        if(end === '0') {
            updateTodo({
                variables: {
                    id: id,
                    todo: {
                        isComplete: false                    },
                },
            });
        } else if (end === '1') {
            updateTodo({
                variables: {
                    id: id,
                    todo: {
                        isComplete: true
                    },
                },
            });
        } 
    }
  };

  return (
    <>
      <Navbar />

      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <h1 align="center">Todos</h1>
          <Container fluid class="contain">
            <Row className={styles.R} align="center">
              <Col md={4} class="col">
                <h1>In Progress</h1>
                <Droppable droppableId="0">
                  {(provided, snapshot) => (
                    <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                      {todos?.map((todo, index) =>
                        !todo.isComplete ? (
                          <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                key={todo.id}
                                index={index}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* <Card
                                  ref={provided.innerRef}
                                  key={todo.id}
                                  index={index}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card.body>
                                    <div className="d-flex justify-content-between">
                                      <h6 className="text-d">{todo.title}</h6>
                                      <div>
                                        <i className="bi-trash cursor mx-2">onClick={() => completeHandler(todo.id)}</i>
                                      </div>
                                    </div>
                                  </Card.body>
                                </Card> */}
                                <Todo
                                  todo={todo}
                                  key={todo.id}
                                  index={index}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                />
                              </div>
                            )}
                          </Draggable>
                        ) : null,
                      )}
                      {provided.placeholder}
                      {/* {showTodos} */}
                    </div>
                  )}
                </Droppable>
              </Col>

              <Col md={4} class="col">
                <h1>Completed</h1>
                <Droppable droppableId="1">
                  {(provided, snapshot) => (
                    <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                      {todos?.map((todo, index) =>
                        todo.isComplete ? (
                          <Draggable key={todo.id} draggableId={todo.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                key={todo.id}
                                index={index}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* <Card
                                  ref={provided.innerRef}
                                  key={todo.id}
                                  index={index}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card.body>
                                    <div className="d-flex justify-content-between">
                                      <h6 className="text-d">{todo.title}</h6>
                                      <div>
                                        <i className="bi-trash cursor mx-2">onClick={() => completeHandler(todo.id)}</i>
                                      </div>
                                    </div>
                                  </Card.body>
                                </Card> */}
                                <Todo
                                  todo={todo}
                                  key={todo.id}
                                  index={index}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                />
                              </div>
                            )}
                          </Draggable>
                        ) : null,
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
              <Col md={4} class="col">
                <h1>Enter Some Stuff</h1>
                <AddTodo GET_TODOS={GET_TODOS} />
              </Col>
            </Row>
          </Container>
        </div>
      </DragDropContext>
    </>
  );
}

export default todo;