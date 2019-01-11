import React from "react";

export default class ClassPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e);
        this.props.onClassChange(e.target.value);
    }

    render() {
        return this.props.classes != null && this.props.classes.length > 0 ? (
            <React.Fragment>
                <label>Odaberite razred/smjer</label>
                <select className="u-full-width" onChange={this.handleChange}>
                    {this.props.classes.map(item => (
                        <option key={item.name} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </React.Fragment>
        ) : null;
    }
}
  


