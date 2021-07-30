import React, { useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import { filterOrderByStatus } from '../../../stores/admin/admin.actions';
import "../AdminCategories/addCategories.css"
const FilterOrder = ({ t, categories, filterOrderByStatus }) => {
    const customStyles = {
        control: (base, state) => ({
            ...base,
            color: "white",
            margin: "12px",
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
    const [orderStatus, setOrderStatus] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        filterOrderByStatus(orderStatus.value);
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
    {
        value: "cart",
        label: "Cart"
    },
    ]
    return (

        <form
            onSubmit={(e) => { handleSubmit(e) }}>


            return (
            <Select
                name="selectStatus"
                options={optionStatus}
                onChange={setOrderStatus}
                styles={customStyles}
            />
            <button
                className="--submitbuton"
            >filter
            </button>
                    )



        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        STORE_PRODUCTS: state.productsReducers,
        filter_PRODUCTS: state.productsReducers.productFilter,
        categories: state.adminReducers.categories
    };
};



export default connect(mapStateToProps, { filterOrderByStatus })(withTranslation()(FilterOrder));
