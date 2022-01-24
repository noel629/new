import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import EditDiary from "./forms/EditDiary"

function ShowDiary({diary, GET_DIARY}) {
    
    // console.log(diary)
    
    const DELETE_DIARY = gql`
        mutation deleteDiary($id: ID) {
            deleteDiary(id: $id) {
                title
            }
        }
    `

    const [deleteDiary, {data, loading, error}] = useMutation(DELETE_DIARY, {
        refetchQueries: [
            {query: GET_DIARY}
        ]
    })

    const deleteHandler = id => {
        if(window.confirm(`Are you sure you want to delete this diary?`  )) {
            deleteDiary({
                variables: {id}
            })
            
        }
    }

    const [editing, setEditing] = useState(false)
    
    let style = {
        border: '2px solid black',
        padding: 20,
        margin: "10px 15px",
        borderRadius: 5
    }

    return (
        <div style={style}>

        {
            editing? 
            <div>
                <h5> Edit Form </h5>
                <EditDiary GET_DIARY={GET_DIARY} diary={diary} />
            </div>
            :
            <div>
                <a href={`/${diary.id}`}>
                    <h2> {diary.title} </h2>
                    <p> {diary.description} </p>
                </a>
            </div>
        }
  
            <div>
                <button onClick={ () => setEditing(!editing) }> { editing ? "Cancel" : "Edit" } </button>
                <button onClick={ () => deleteHandler(diary.id) }> Delete </button>
            </div>
        </div>
    )
}

export default ShowDiary