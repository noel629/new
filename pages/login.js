import Navbar from '../components/Navbar'
import styles from "../styles/Login.module.css"
import { useState, useEffect } from "react"
import { ApolloProvider, gql, useMutation } from "@apollo/client"
import jwt_decoded from 'jwt-decode'
import {useRouter} from 'next/router'


function Login() {
    const [ token, setToken ]= useState([])
    const [ user, setUser] = useState({})
    const [ userData, setUserData ] = useState([])
    const Router = useRouter()


    const LOGIN = gql`
        mutation login($email :String, $password : String){
            login(user: {email : $email, password : $password}) {
            token
            }
        }
    `

    const [login, {data, loading, error}] = useMutation(LOGIN)

    const loginHandler = (data2) => {
        console.log(data2)
        let decoded = jwt_decoded(data2)
        setToken(data2)
        setUserData(decoded)

        localStorage.setItem('userData', JSON.stringify(decoded))
        localStorage.setItem('token', data2)
        Router.push('/ ')

    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        login({
            variables: user
        })
        
    }
    
    useEffect(() => {
        console.log(data, loading, error)
        if(data){
            console.log(data.login)
            loginHandler(data.login.token)
        }
    }, [data, loading, error])

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    

    return(
        <>
            <Navbar />
            <div class="container">
                <div class="row">
                    <div class="col-md">
                        <div className={styles.b}>
                            <h1 class="d-flex justify-content-center">Login!</h1>
                            <form class="col-md-4" onSubmit={onSubmitHandler}>
                                <div class="form-row">
                                    <div class="col">
                                        <input type="email" name='email' class="form-control" placeholder="Email" onChange={onChangeHandler}/>
                                    </div>
                                    <div class="col">
                                        <input type="password" name='password' class="form-control" placeholder="Password" onChange={onChangeHandler}/>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-outline-secondary">Login</button>
                            </form>
                            <p>Don't have an account yet? <a href='start'>Register Here.</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
    
}

export default Login