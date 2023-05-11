import React from 'react';
import './App.css';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import InputZone from './InputZone';
import APIService from './services/APIService';

const CommunicationZone = () => {
  const [state, setState] = React.useState({
    value: '',
    disposable: '',
    history: ['How can I help?'],
  });
  const stateRef = React.useRef(state);

  function handleChange(event) {
    setState({
      ...state,
      value: event.target.value,
    });
  }

  async function handleSubmit(event) {
    if (event.key === 'Enter' && state.value.length) {
      const question = state.value;

      const newState = {
        ...state,
        value: '',
        disposable: event.target.value,
        history: [...state.history, event.target.value],
      };

      setState(newState);
      stateRef.current = newState;
      await dialogueEngine(question);
    }
    cleanHistory();
  }

  async function dialogueEngine(question) {
    const response = await APIService.getAnswer(question);
    setState({
      ...stateRef.current,
      history: [...stateRef.current.history, response.answer],
    });
  }

  function cleanHistory() {
    const tempHistory = state.history;
    let newHistory = [];
    if (state.history.length > 12) {
      tempHistory.shift();
      tempHistory.shift();
      newHistory = tempHistory;
      setState({
        ...state,
        history: newHistory,
      });
    }
  }

  return (
    <div className="chatHost innerShadow">
      <ContactWindow />
      <ChatZone chatItem={state.history} />
      <InputZone
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={state.value}
      />
    </div>
  );
};

export default CommunicationZone;
