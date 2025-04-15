import React, { useState } from 'react';
import '../Css/App.css';
import '../Css/FAQ.css';

const FAQ_ITEMS = [
  {
    q: 'What is Movies Monkey?',
    a: 'Movies Monkey is a movie and TV show discovery app that fetches data from third‑party APIs and displays titles, ratings, and details.',
  },
  {
    q: 'How do I search for a movie?',
    a: 'Open the Find Movies page, type a title (for example “Harry Potter”), and press search.',
  },
  {
    q: 'Why am I not seeing posters for some movies?',
    a: 'Some titles do not have poster images available from the data provider. Those results are hidden to keep the layout clean.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Search and lists are fetched from TMDB, and detailed info comes from OMDb (via IMDb ID).',
  },
  {
    q: 'The site is loading forever / shows no results. What should I do?',
    a: 'Check your internet connection. If the API key is missing or invalid, requests will fail and you may see empty results.',
  },
  {
    q: 'How can I contact you?',
    a: 'Use the Contact page to send a message.',
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="faq-item border">
      <button className="faq-question" onClick={onToggle} type="button">
        <span>{item.q}</span>
        <span className={isOpen ? 'faq-icon open' : 'faq-icon'}>+</span>
      </button>
      {isOpen && <div className="faq-answer">{item.a}</div>}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <div className="behind-nav"></div>
      <section className="faq">
        <div className="content">
          <div className="container">
            <h2 className="heading">FAQ</h2>
            <p className="faq-subtitle">Frequently asked questions about Movies Monkey.</p>

            <div className="faq-list">
              {FAQ_ITEMS.map((item, idx) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
