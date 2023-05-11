import React from 'react';
import './App.css';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import InputZone from './InputZone';
import APIService from './services/APIService';

const CommunicationZone = () => {
  const [state, setState] = React.useState({
    history: ['How can I help?'],
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const questionInput = event.target[0];
    const question = event.target[0].value;

    if (question.length) {
      setState((state) => ({
        ...state,
        history: [...state.history, question],
      }));

      questionInput.value = '';
      await dialogueEngine(question);
    }

    cleanHistory();
  }

  async function dialogueEngine(question) {
    const response = await APIService.getAnswer(question);

    setState((state) => ({
      ...state,
      history: [...state.history, response.answer],
    }));
  }

  function cleanHistory() {
    if (state.history.length < 12) {
      return;
    }

    setState((state) => ({
      ...state,
      history: [...state.history].slice(2),
    }));
  }

  return (
    <div className="chatHost innerShadow">
      <ContactWindow />
      <ChatZone chatItem={state.history} />
      <InputZone handleSubmit={handleSubmit} />
    </div>
  );
};

export default CommunicationZone;
