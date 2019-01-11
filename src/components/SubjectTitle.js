import React from 'react';

const SubjectTitle = (props) => {
    return (
        <tr className="subject">
            <td colSpan="7">{props.title}</td>
        </tr>
    );
}

export default SubjectTitle;