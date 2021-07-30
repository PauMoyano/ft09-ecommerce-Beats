import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./adminListUser.css";
import { serverUrl } from '../../../auxiliar/variables';

const UserCard = ({ user, action, admin }) => {

    //USER IDENTIFICATION FOR REDUCER #############################################
    let userStore =
    admin.user && admin.user.data && admin.user.data.user
            ? admin.user.data.user
            : null;
    let userAdmin = {
        userStatus: userStore ? true : false,
        id: userStore && userStore.id ? userStore.id : 0,
        name: userStore && userStore.name ? userStore.name : 0,
        email: userStore && userStore.email ? userStore.email : 0,
        orderId: admin.cartDetaills.id ? admin.cartDetaills.id : 0,
    };
    //#############################################################################

    const [userResponse, setUserResponse] = useState(false);
    // const [userEdit, setUserEdit] = useState(false);
    const [userDelete, setUserDelete] = useState(false);

    useEffect(() => {
        setUserResponse(user.rol)
    }, [])

    const handleClickAdmin = async (e, id, rol) => {
        e.preventDefault();

        const options = {
            method: 'PUT',
            url: `${serverUrl}/promote/`,
            headers: {
                ContentType: "application/json",
                token: localStorage.getItem("token")
            },
            data: {
                id: id,
                rol: rol
            }
        };

        return await axios.request(options).then((response) => {
            if (response.data === "User Upgrade") {
                action()
                if (rol === "admin") {
                    return setUserResponse("admin")
                } else {
                    return setUserResponse("client")
                }

            }
        });

    };

    // const handleClickEdit = ()=>{
    //    userEdit ?  setUserEdit(false) :  setUserEdit(true)
    // }

    const handleClickDelete = async () => {

        userDelete ? (
            await axios.delete(`http://localhost:3001/users/${user.id}`, {
                headers: {
                    "token": localStorage.getItem("token")
                }
            })
                .then(user => action())
                .catch(err => console.log(err))
        ) : setUserDelete(true)
    }

    const handleClickCancele = () => {
        setUserDelete(false)
    }

    return (
        <div className="usercard-main">
            <div className="usercard-col-1">
                <>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                </>
                {/* {userEdit
                    ?(
                        <>
                        <input type="email"></input>
                        <input type="email"></input>
                        </>
                    ):(
                        <>
                            <h2>{user.name}</h2>
                            <h3>{user.email}</h3>
                        </>
                    )
                } */}
            </div>
            <div className="usercard-col-3">
                {user.rol === "admin" && userResponse === "admin"
                    ? (
                        <div className="btn-menu">
                            <span class="material-icons">
                                supervisor_account
                            </span>
                            <span>
                                User Administrator
                            </span>
                            <button
                                className="btn-privilege"
                                onClick={(e) => handleClickAdmin(e, user.id, "client")}>
                                Revoque Privilege
                            </button>
                        </div>
                    ) : (
                        <div className="btn-menu">
                            <span className="material-icons">
                                perm_identity
                        </span>
                            <span>
                                User Client
                        </span>
                            <button
                                className="btn-privilege"
                                onClick={(e) => handleClickAdmin(e, user.id, "admin")}>
                                Upgrade Privilege
                        </button>
                        </div>

                    )
                }
                {/* {userEdit
                    ?(
                    <button 
                        onClick={handleClickEdit}
                        className="btn-edit">{userEdit ? "Save Update" : "Edit User" }</button>
                    ):(
                        <span 
                        onClick={handleClickEdit}
                        className="material-icons icons-users">
                            create
                        </span>
                    )
                } */}
                {
                    userAdmin.id === user.id ? (<></>) : (
                        userDelete ? (<>
                            <button
                                onClick={handleClickDelete}
                                className="btn-delete"> ¿ Delete ? </button>
                            <button
                                onClick={handleClickCancele}
                                className="btn-delete"> Cancel </button>
                        </>
                        ) : (
                            <span
                                onClick={handleClickDelete}
                                className="material-icons icons-users-delete">
                                delete
                            </span>
                        ))
                }



            </div>
        </div>
    )
}

export default UserCard