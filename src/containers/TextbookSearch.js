import React from "react";
import { TextbookApi }  from "../api/textbookApi";
import ClassPicker from "../components/ClassPicker";
import TextbookPicker from "../components/TextbookPicker";
import Autosuggest from 'react-autosuggest';
import Modal from 'react-responsive-modal';
import OrderForm from "../components/OrderForm";
import "../components/Modal.css";
import "./TextbookSearch.css";
import Spinner from "../components/Spinner";

const getSuggestionValue = suggestion => suggestion.name + ", " + suggestion.city;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name + ", " + suggestion.city}
  </div>
);

export default class TextbookSearch extends React.Component {

  constructor() {
    super();
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleTextbookSelected = this.handleTextbookSelected.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSelectAllWraps = this.handleSelectAllWraps.bind(this);
    this.handleOrderFormSubmit = this.handleOrderFormSubmit.bind(this);

    this.state = {
      value: '',
      suggestions: [],
      loading: false,
      selectedSchool: null,
      classes: [],
      subjects: [],
      selectedTextbooks: [],
      checkAllSelected: true,
      checkAllWrapsSelected: true,
      showOrderForm: false
    };
  }

  fetchSubjectsForClass(classId) {
    if(classId === undefined || classId === 0) {
      return;
    }

    this.setState({
      loading: true,
    });

    const api = new TextbookApi();
    api.getTextbooks(classId).then((response) => {
      let data = response !== undefined ? response : [];

      let selected = [];
      for(let i = 0; i < data.length; i++) {
        selected = [...selected, ...data[i].textbooks];
      };

      this.setState({
        subjects:  data,
        selectedTextbooks: selected,
        loading: false,
        checkAllSelected: true,
        checkAllWrapsSelected: true
      });
    }).catch(error => {
      this.setState({
        loading: false,
      });
      alert(error);
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      classes: [],
      subjects: [],
      selectedTextbooks: [],
      checkAllSelected: true,
      checkAllWrapsSelected: true
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const api = new TextbookApi();

    api.getClasses(suggestion.id).then((response) => {

      this.setState({
        selectedSchool: suggestion,
        classes: response !== undefined ? response : []
      });

      if(this.state.classes.length > 0) {
        this.fetchSubjectsForClass(this.state.classes[0].id);
      }

    }).catch(alert);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const api = new TextbookApi();
    api.getSchools(value).then((response) => {
      this.setState({
        suggestions:  value === undefined || value.length === 0 ? [] : response
      });

    }).catch(alert);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleClassChange(classId) {
    this.fetchSubjectsForClass(classId);
  }

  handleSelectAll(checked) {
      let selected = this.state.selectedTextbooks;
    
      if(checked) {
        for(let i = 0; i < this.state.subjects.length; i++) {
          const setAllTextbooks = new Set(this.state.subjects[i].textbooks.filter(x => x.textbookType !== "Omot"));
          const setSelected = new Set(selected);

          const diff = [...setAllTextbooks].filter(x => !setSelected.has(x));
          selected = [...selected, ...diff];
        }
      }
      else {
          selected = this.state.selectedTextbooks.filter(x => x.textbookType === "Omot");
      }
  
      this.setState({
        selectedTextbooks: selected,
        checkAllSelected: checked
      });
  }

  handleSelectAllWraps(checked) {
    let selected = this.state.selectedTextbooks;
    if(checked) {
      for(let i = 0; i < this.state.subjects.length; i++) {
        const setAllWrappers = new Set(this.state.subjects[i].textbooks.filter(x => x.textbookType === "Omot"));
        const setSelected = new Set(selected);

        const diff = [...setAllWrappers].filter(x => !setSelected.has(x));
        selected = [...selected, ...diff];

        //selected = [...selected, ...this.state.subjects[i].textbooks.filter(x => x.textbookType === "Omot")];
      }
    }
    else {
      selected = this.state.selectedTextbooks.filter(x => x.textbookType !== "Omot");
    }

    this.setState({
      selectedTextbooks: selected,
      checkAllWrapsSelected: checked
    });

  }

  handleTextbookSelected(item, e) {
    let selected = this.state.selectedTextbooks;

    selected = selected.filter(x => (
      x.id !== item.id
    ));

    if(e.target.checked) {
      selected.push(item);
    }

    const isTextbook = item.textbookType !== "Omot";
    const isWrap = !isTextbook;

    this.setState({
      selectedTextbooks: selected,
      checkAllSelected: isTextbook ? false : this.state.checkAllSelected,
      checkAllWrapsSelected: isWrap ? false : this.state.checkAllWrapsSelected
    });
  }

  handleOrderFormSubmit(values, actions) {
    const api = new TextbookApi();
    let totalPrice = this.state.selectedTextbooks.reduce((total, current) => {
      return total + Number(current.price);
    }, 0);

    const order = {
      user: values,
      total: totalPrice,
      textbooks: this.state.selectedTextbooks,
      deliveryPrice: Number(values.delivery)
    };

    this.setState({
      loading: true,
    });

    api.orderTextbooks(order).then((response) => {
      actions.setSubmitting(false);
      this.setState({
        loading: false,
        showOrderForm: false
      });

      alert('Vaša narudžba je zaprimljena. Provjerite svoj e-mail kako biste nastavili s narudžbom!');
    }).catch(error => {
      this.setState({
        loading: false,
      });
      alert(error);
    });
  }
  
  render() {
    const { value, suggestions, selectedSchool, classes, subjects, selectedTextbooks, checkAllSelected, showOrderForm, loading, checkAllWrapsSelected } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Upišite ime škole ili grada/općine',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <React.Fragment>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
        />
        <ClassPicker classes={classes} onClassChange={this.handleClassChange} />
        <TextbookPicker 
          items={subjects} 
          onTextbookSelected={this.handleTextbookSelected} 
          onSelectAll={this.handleSelectAll}
          onSelectAllWraps={this.handleSelectAllWraps}
          checkAllSelected={checkAllSelected}
          checkAllWrapsSelected={checkAllWrapsSelected}
          selectedTextbooks={selectedTextbooks}
        />
        {subjects != null && subjects.length > 0 ? (
            <React.Fragment>
              <button className="button-primary u-pull-right order-textbooks" onClick={() => this.setState({showOrderForm: !showOrderForm})}>Naruči</button>
              <Modal open={showOrderForm} onClose={() => this.setState({ showOrderForm: false })} classNames={{ modal: 'custom-modal' }}>
                <OrderForm onSubmit={this.handleOrderFormSubmit} />
              </Modal>
            </React.Fragment>
          ) : null}
        <Modal open={loading} center showCloseIcon={false} onClose={() => { }} classNames={{ modal: 'loading-modal' }}>
          <Spinner />
        </Modal>
      </React.Fragment>
    );

  }
}
