import React from 'react';
import "./Spinner.css"; 

const Spinner = (props) => {
    return (
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
}

export default Spinner;