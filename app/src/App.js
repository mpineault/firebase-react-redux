// Imports
import React, { useState } from 'react';
import './App.css';

// Function
const App = () => {
  /**
   * Used for handling the load state
   *
   * @var
   */
  const [loading, setLoading] = useState(false);

  /**
   * Used for handling input field state
   *
   * @var
   */
  const [input, setInput] = useState('');

  /**
   * Used for handling code result state from the http request
   *
   * @var
   */
  const [result, setResult] = useState(null);

  /**
   * Handles input changes for two-way data binding
   *
   * @param {Event} e
   */
  const handleChange = e => {
    setInput(e.currentTarget.value);
  };

  /**
   * Handles form submit
   *
   * @param {Event} e
   */
  const handleSubmit = e => {
    if (input && input.length > 0) {
      setLoading(true);

      fetch(`${window.API_URL}/api/posts`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: input
        })
      })
        .then(response => {
          const json = response.json();

          if (!response.ok) {
            return Promise.reject(json);
          }

          return Promise.resolve(json);
        })
        .then(json => {
          setResult(json.data && JSON.stringify(json.data));
          setLoading(false);
          setInput('');
        })
        .catch(e => {
          console.log('ERROR');
          console.log(e);
          setLoading(false);
        });
    }

    e.preventDefault();
  };

  // Main return
  return (
    <div className="App">
      <header className="App-header">
        <p>Submit new comment</p>
        <form onSubmit={handleSubmit}>
          <input
            disabled={loading}
            onChange={handleChange}
            type="text"
            name="comment"
            placeholder="New Comment"
            value={input}
          />
          <button disabled={loading} type="submit">
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>

        {result && (
          <div>
            <p>
              <small>Result</small>
            </p>
            <code>{result}</code>
          </div>
        )}
      </header>
    </div>
  );
};

// Export
export default App;
