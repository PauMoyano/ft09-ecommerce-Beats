import React from "react";
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { putCategoryById } from "../../../stores/admin/admin.actions";
import Select from "react-select";
import axios from "axios";
import AdminNav from '../../../pages/Admin/AdminNav/AdminNav';
import { serverUrl } from '../../../auxiliar/variables';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';


function EditOrders({ orders }) {
    const [orderStatus, setOrderStatus] = React.useState([])
    const { id } = useParams();
    const history = useHistory();

    const customStyles = {
        control: (base, state) => ({
            ...base,
            color: "white",
            marginBottom: "12px",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "blue" : "purple",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            background: "black",
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "red" : "blue",
                background: "purple"
            }
        }),
        menu: (base, state) => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,

            // kill the gap
            marginTop: 0,
            background: state.isFocused ? "yellow" : "green",
            "&:hover": {
                // Overwrittes the different states of border
                background: "blue"
            }
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            color: "black",
            padding: 0,
            background: "white",
            "&:hover": {
                // Overwrittes the different states of border
                background: "grey"
            }

        }),
        menuPortal: base => ({
            background: "red",

            "&:hover": {
                // Overwrittes the different states of border
                background: "blue"
            }
        }),
        singleValue: base => ({


            padding: "5px",
            borderRadius: "5px",
            outline: "none",
        }),


        group: base => ({
            background: "yellow",
            color: "black"
        })
    };
    const optionStatus = [{
        value: "process",
        label: "Process"
    }, {
        value: "create",
        label: "Create"
    }, {
        value: "cancel",
        label: "Cancel"
    }, {
        value: "complete",
        label: "Complete"
    },
    ]
    let order = orders.find(order => order.id === parseInt(id))
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            let data = {
                name: order.userName,
                email: order.userEmail,
                status: orderStatus.value,
                id: order.id
            }
            await axios.put(`${serverUrl}/order/${id}`, { orderStatus: orderStatus.value })
            if (order.userEmail) {

                emailjs.send('service_wh6ybz2', 'template_adk9g6f', data, 'user_TgPSia94H5R5iet7h197p')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                swal({
                    title: "Order " + id + " set to " + orderStatus.value + " an email was sent to user acount",
                    icon: "success",
                    //buttons: true,
                })
            } else {

                swal({
                    title: "Order N° " + id + " set to " + orderStatus.value,
                    icon: "success",
                    //buttons: true,
                })
            }

            history.push(`/admin/listorders`);

        } catch (error) {

        }

    }
    return (
        <>
            <AdminNav></AdminNav>
            <div>
                {orders && orders.length > 0 ? (
                    <form className="catAdd" onSubmit={(e) => handleSubmit(e)}>

                        <h1> Order id: {order.id}</h1>
                        {order.userName ? (
                            <div>
                                <h1>username: {order.userName}</h1>
                            </div>
                        ) : (

                            <div></div>
                        )
                        }
                        <h1> User id: {order.userId}</h1>
                        <h1> Total: ${order.total}</h1>
                        <h1> Order status: {order.orderStatus}</h1>
                        <label>Set order status to:</label>
                        <Select
                            name="selectStatus"
                            options={optionStatus}
                            onChange={setOrderStatus}
                            styles={customStyles}
                        />

                        <button className="--submitbuton" type="submit">
                            Submit
                </button>
                    </form>

                ) : (<div>no anda</div>)}
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.adminReducers.orders,
    }
}




export default connect(mapStateToProps, { putCategoryById })(EditOrders);

