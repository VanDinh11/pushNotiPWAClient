import React from 'react';
import './Profile.scss';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    return(
        <div className='WRAP_PROFILE'>
            <div className="container">
                <p>Hello World!</p>
                <NavLink to='/'>Back to Home</NavLink>
            </div>
        </div>
    )
}

export default Profile;