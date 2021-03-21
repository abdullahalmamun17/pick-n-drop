import React from 'react';
import notFoundBg from '../../images/notfound-bg.jpg'

const NotFound = () => {
    
    return (
        <div className="text-center">
            <img style={{height: '500px', margin: '35px 0', borderRadius: '10px'}} src={notFoundBg} alt=""/>
        </div>
    );
};

export default NotFound;