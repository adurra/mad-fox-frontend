import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { userActions } from '../_actions';
import axios from 'axios';
import logo from '../assets/trash.png';
import exit from '../assets/exit.png';

import icon from '../assets/icon.png';


function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState("");


    useEffect(() => {
        // dispatch(userActions.getAll());
        console.log(user)
        axios.get("http://localhost:8081/madfox/user?nickname=" + user.username, {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(function (res) {
            user.authorizer = res.data.authorizations[0].authname;
            if (user.authorizer == "ROLE_ADMIN") {
                setTitle("[ADM]")
            }
        })
        updatePosts()
    }, [user]);


    const deletePost = (id) => {
        axios.delete("http://localhost:8081/madfox/post/" + id
        ).then(function (res) {
            updatePosts()
        })
    }

    const updatePosts = () => {
        axios.get("http://localhost:8081/madfox/post/all", {
            headers: {
                Authorization: 'Bearer ' + user.token //the token is a variable which holds the token
            }
        }).then(function (res) {
            console.log(res.data)
            setPosts(res.data)
        })
    }

    const handleChange = (event) => {
        setPostText(event.target.value)
    }

    const handleSubmit = (event) => {
        axios.post("http://localhost:8081/madfox/post", {
            "content": postText,
            "category": "bla",
            "user": {
                "nickname": user.username
            }
        }).then(function (res) {
            setPostText("");
            updatePosts()
        })
        event.preventDefault();
    }


    return (
        <div style={{
            width: "100%",
            minHeight: "100vh",
            position: "absolute",
            backgroundColor: "rgb(80, 79, 79)"
        }}>
            <div style={{
                width: "100%",
                height: "80px",
                position: "fixed",
                backgroundColor: "gray",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: "10px",
                    cursor: "pointer"
                }}>
                    <p style={{ color: "white", margin: 0 }}>{title}</p>
                </div>
                <div>
                    <img style={{
                        width: 100,
                        height: 100,
                        margin: 0
                    }} src={icon} />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    padding: "10px",
                    cursor: "pointer"
                }}>
                    <Link to="/login">
                        <img style={{
                            width: 30,
                            height: 30,
                            margin: 0
                        }} src={exit} />
                        <p style={{ color: "white", margin: 0 }}>Sair</p>
                    </Link>
                </div>
            </div>

            <div style={{
                width: "80%",
                margin: "auto",
                minHeight: "90vh",
                marginTop: "85px",
                borderRadius: "15px",
                backgroundColor: "gray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px"
            }}>
                <form onSubmit={handleSubmit} style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",

                }}>
                    <textarea style={{
                        padding: "20px",
                        resize: 'none',
                        width: "80%",
                        borderTopLeftRadius: "15px",
                        borderBottomLeftRadius: "15px",
                        height: "80px"
                    }} type="text" placeholder={"Escreva algum post..."} value={postText} onChange={handleChange} />
                    <input style={{
                        height: "80px",
                        borderTopRightRadius: "15px",
                        borderBottomRightRadius: "15px"
                    }} type="submit" value="Postar" />
                </form>
                <div style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px"
                }}>
                    {
                        posts.map(post => {
                            var date = new Date(post.timePost);
                            const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

                            let dataFormatada = ((date.getDate())) + " de " + meses[(date.getMonth())] + " de " + date.getFullYear() + " às " + date.getHours() + ":" + date.getMinutes();
                            console.log({ user, post })
                            return <div style={{
                                width: "80%",
                                marginTop: "10px",
                                marginBottom: "10px",
                                padding: "10px",
                                borderRadius: "15px",
                                backgroundColor: "#a3a3a3",
                                position: "relative"
                            }}
                                key={post.id}
                            >
                                {
                                    post.user.nickname == user.username || user.authorizer == "ROLE_ADMIN" ?
                                        <div style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            width: "fit-content",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            padding: "10px"

                                        }} onClick={() => deletePost(post.id)}>
                                            <img style={{
                                                width: 20,
                                                height: 20
                                            }} src={logo} />
                                        </div>
                                        :
                                        null
                                }
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"

                                }}>

                                    <div style={{ fontWeight: "bold", fontSize: "15pt", color: "white" }}>{post.user.nickname} ({post.user.username}) postou: </div>
                                    <div style={{ fontWeight: "bold", color: "white", display: "flex" }}>
                                        <span>
                                            {dataFormatada}
                                        </span>
                                    </div>

                                </div>

                                <div style={{ whiteSpace: "pre-line" }}>
                                    {post.content}
                                </div>
                            </div>
                        })
                    }
                </div>

            </div>

        </div>
    );
}

export { HomePage };