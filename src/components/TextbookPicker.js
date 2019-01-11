import React from "react";
import SubjectTitle from "./SubjectTitle";
import Textbook from "./Textbook";
import TextbookWrapper from "./TextbookWrapper";
import "./TextbookPicker.css";

export default class TextbookPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextbookSelected = this.handleTextbookSelected.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleSelectAllWraps = this.handleSelectAllWraps.bind(this);
    }

    handleTextbookSelected(item, e) {
        this.props.onTextbookSelected(item, e);
    }

    handleSelectAll(e) {
        this.props.onSelectAll(e.target.checked);
    }

    handleSelectAllWraps(e) {
        this.props.onSelectAllWraps(e.target.checked);
    }

    isTextbookSelected = (textbook) => {
        return this.props.selectedTextbooks.filter(t => (
            t.id === textbook.id
        )).length !== 0;
    }

    render() {
        const visible = this.props.items !== null && this.props.items.length > 0;
        if(visible) {
            const totalPrice = this.props.selectedTextbooks.reduce((total, current) => {
                return total + Number(current.price);
            }, 0);

            const art = this.props.items.filter(a => a.subject == 'LIKOVNA KULTURA');

            const rows = this.props.items.filter(a => a.subject !== 'LIKOVNA KULTURA').map(item => (
                <React.Fragment key={item.subject}>
                    <SubjectTitle title={item.subject} />
                    {item.textbooks.map(textbook => (
                        textbook.isWrapper ? 
                        <TextbookWrapper selected={this.isTextbookSelected(textbook)} textbook={textbook} onTextbookSelected={this.handleTextbookSelected} />
                        :
                        <Textbook selected={this.isTextbookSelected(textbook)} textbook={textbook} onTextbookSelected={this.handleTextbookSelected} />
                    ))}
                </React.Fragment>
            ));

            const artRows = art.map(item => (
                <React.Fragment key={item.subject}>
                    <SubjectTitle title={item.subject} />
                    {item.textbooks.map(textbook => (
                        <Textbook selected={this.isTextbookSelected(textbook)} textbook={textbook} onTextbookSelected={this.handleTextbookSelected} />
                    ))}
                </React.Fragment>
            ));

            return (
                <React.Fragment>
                
                <table className="u-max-full-width">
                    <thead>
                        <tr>
                            <th className="textbooks-title" colSpan="2">
                                <h5>Popis udžbenika</h5>
                            </th>
                            <th colSpan="2"></th>
                            <th align='right' colSpan="3" className="nowrap selections">
                                <label>
                                    <input type='checkbox' checked={this.props.checkAllSelected} onChange={this.handleSelectAll} /> <small>Označi sve udžbenike</small>
                                </label>
                                <label>
                                    <input type='checkbox' checked={this.props.checkAllWrapsSelected} onChange={this.handleSelectAllWraps} /> <small>Označi sve omote</small>
                                </label>
                            </th>
                        </tr>
                        <tr>
                            <th align='center'>Šifra</th>
                            <th align='left'>Naziv</th>
                            <th align='left'>Vrsta izdanja</th>
                            <th align='left'>Nakladnik</th>
                            <th align='left'>Autori</th>
                            <th align='right'>Cijena</th>
                            <th align='center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                        {artRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className='align-right' colSpan="4"></th>
                            <th className='align-right' colSpan="3">Cijena: <span className="price">{totalPrice.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} kn</span></th>
                        </tr>
                    </tfoot>
                </table>
                </React.Fragment>
            );
        }
        else {
            return (null);
        }
    }
}
  


