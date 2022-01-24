import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

function EditDiary({GET_DIARY, diary}) {

    const [updatedDiary, setUpdatedDiary] = useState({
        id: diary.id,
        title: diary.title,
        description: diary.description
    })
    
    const onChangeHandler = e => {
        setUpdatedDiary({...updatedDiary, [e.target.name]: e.target.value})
    }
    // console.log(updatedPost)

    const UPDATE_DIARY = gql`
        mutation updateDiary ($id: ID, $title: String!, $description: String!) {
            updateDiary (id: $id, diary: {
                title: $title,
                description: $description
            }) {
                title
                description
            }
        }
    `

    const [updateDiary, {data, loading, error}] = useMutation ( UPDATE_DIARY , {
        refetchQueries: [
            {query: GET_DIARY}
        ]
    })

    const onSubmitHandler = _ => {
        updateDiary({
            variables: updatedDiary
        })
    }
    
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label> Title </label>
                <input type="text" name="title" onChange={onChangeHandler} value={updatedDiary.title} />
            </div>
            <div>
                <label> Description </label>
                <input type="text" name="description" onChange={onChangeHandler} value={updatedDiary.description} />
            </div>
            <button> Submit </button>
        </form>
    )
}

export default EditDiary