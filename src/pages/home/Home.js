import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { IconUser } from './../../utilities/SVG';

const mapStateToProps = state => {
    return {
        infoProfile: state.infoProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (info) => dispatch({
            type: 'INIT_PROFILE_DATA',
            payload: info
        })
    };
}

const Home = (props) => {
    return(
        <div>
            <p>Hello, This is Home!</p>
            <NavLink to='/profile'>Go to Profile</NavLink>
            <IconUser width={30} height={30} color={'#757575'} />
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);