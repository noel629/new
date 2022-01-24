import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import AddDiary from "./Forms/AddDiary"
import ShowDiary from "./ShowDiary"

function diary() {

    const GET_DIARY = gql`
    query getDiary {
        getDiary {
            id,
            title,
            description,
            date,
            time,
            lastEdited
        }
    }
    `

    const { loading, error, data } = useQuery(GET_DIARY)
    const [diaries, setDiary] = useState([])
    useEffect(() => {
        if(!loading) setDiary(data.getDiary)
    }, [diaries, data])

    let showDiary = loading ? <h1> Loading . . . </h1> :
    diaries.map(diary =>
        {
        return (
        // console.log(diary.title)
        <ShowDiary key={diary.id} diary={diary} GET_DIARY={GET_DIARY} />
        // <h1> {diary.title} </h1>
        )
    })
    
    return (
        <div>
            {showDiary}
            <AddDiary GET_DIARY={GET_DIARY}/>
        </div>
    );
}

export default diary;