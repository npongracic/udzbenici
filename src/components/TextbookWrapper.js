import React from "react";

export default class TextbookWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextbookSelected = this.handleTextbookSelected.bind(this);
    }

    handleTextbookSelected(item, e) {
        this.props.onTextbookSelected(item, e);
    }

    boldTextbookTitle(title) {
        if(title === undefined || title === null) {
            return '';
        }

        const i = title.indexOf(':');
        if(i !== -1) {
            const sub = title.substring(0, i);
            return (
                <React.Fragment>
                <strong>{sub}</strong>{title.split(sub)}</React.Fragment>
            ) 
        }
        else {
            const j = title.indexOf(',');
            if(j !== -1) {
                const subs = title.substring(0, j);
                return (
                    <React.Fragment>
                    <strong>{subs}</strong>{title.split(subs)}</React.Fragment>
                )
            }
        }

        return title;
    }

    render() {
        const {textbook, selected} = this.props;

        return (
            <tr key={textbook.id} className="wrapper">
                <td align='center'></td>
                <td align='left'>{textbook.title}</td>
                <td align='center'>{textbook.textbookType}</td>
                <td className="align-right nowrap" colSpan="3">{Number(textbook.price).toLocaleString("hr-HR", { minimumFractionDigits: 2 })} kn</td>
                <td align='center'><input type='checkbox' checked={selected} onChange={(e) => this.handleTextbookSelected(textbook, e)} /></td>
            </tr>
        );
    }
}
  