import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

function AddDiary({GET_DIARY}) {

    const [diary, setDiary] = useState({})
    const onChangeHandler = (e) => {
        setDiary({...diary, [e.target.name]: e.target.value})
    }

    const CREATE_DIARY = gql `
        mutation CreateDiary ( $title: String!, $description: String! ) {
            createDiary( diary: {
                title: $title,
                description: $description
            }) {
                title
                description
            }
        }
    `

    const [createDiary, {data, loading, error}] = useMutation( CREATE_DIARY , {
        refetchQueries: [
            {query: GET_DIARY}
        ]
    })

    const onSubmitHandler = e => {
        e.preventDefault()
        createDiary({
            variables: diary
        })
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label> Title </label>
                <input type="text" name="title" onChange={onChangeHandler} />
            </div>
            <div>
                <label> Description </label>
                <input type="text" name="description" onChange={onChangeHandler} />
            </div>
            <button> Submit </button>
        </form>
    )
}

export default AddDiary