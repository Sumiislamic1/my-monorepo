import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const BACKEND = 'http://localhost:5001';

function App() {
  const [tab, setTab] = useState('checker');
  const [input, setInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceOnline, setServiceOnline] = useState(null);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('symptom_history') || '[]'); }
    catch { return []; }
  });
  const inputRef = useRef(null);

  useEffect(() => {
    fetch(`${BACKEND}/health`)
      .then(r => r.ok ? setServiceOnline(true) : setServiceOnline(false))
      .catch(() => setServiceOnline(false));

    fetch(`${BACKEND}/diseases`)
      .then(r => r.json())
      .then(data => setAllSymptoms(data.all_symptoms || []))
      .catch(() => {});
  }, []);

  const addSymptom = (symptom) => {
    const s = symptom.trim().toLowerCase();
    if (s && !selectedSymptoms.includes(s)) {
      setSelectedSymptoms(prev => [...prev, s]);
    }
    setInput('');
    inputRef.current?.focus();
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addSymptom(input);
    }
    if (e.key === 'Backspace' && !input && selectedSymptoms.length > 0) {
      removeSymptom(selectedSymptoms[selectedSymptoms.length - 1]);
    }
  };

  const handleClear = () => {
    setSelectedSymptoms([]);
    setInput('');
    setResults(null);
    setError('');
    inputRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalList = input.trim()
      ? [...new Set([...selectedSymptoms, input.trim().toLowerCase()])]
      : selectedSymptoms;

    if (finalList.length === 0) {
      setError('Please enter at least one symptom.');
      return;
    }

    setError('');
    setResults(null);
    setLoading(true);
    setSelectedSymptoms(finalList);
    setInput('');

    try {
      const res = await fetch(`${BACKEND}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: finalList })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults(data);

      const entry = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        symptoms: finalList,
        results: data.results || []
      };
      const updated = [entry, ...history].slice(0, 10);
      setHistory(updated);
      localStorage.setItem('symptom_history', JSON.stringify(updated));
    } catch (err) {
      setError(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('symptom_history');
  };

  const rerunCheck = (entry) => {
    setSelectedSymptoms(entry.symptoms);
    setResults(null);
    setTab('checker');
  };

  const getConfidenceColor = (c) => c >= 70 ? '#e53e3e' : c >= 40 ? '#dd6b20' : '#38a169';
  const getSeverityLabel = (c) => c >= 70 ? 'High Match' : c >= 40 ? 'Moderate Match' : 'Low Match';

  const suggestions = input.trim()
    ? allSymptoms.filter(s => s.includes(input.toLowerCase()) && !selectedSymptoms.includes(s))
    : [];

  return (
    <div className="app">
      <div className="container">

        <div className="header">
          <h1>🩺 AI Symptom Checker</h1>
          <p>Select or type your symptoms to get possible disease predictions.</p>
          <div className={`status-dot ${serviceOnline === null ? 'status-checking' : serviceOnline ? 'status-online' : 'status-offline'}`}>
            {serviceOnline === null ? 'Connecting...' : serviceOnline ? 'Service Online' : 'Service Offline'}
          </div>
        </div>

        <div className="tabs">
          <button className={tab === 'checker' ? 'tab-active' : ''} onClick={() => setTab('checker')}>Checker</button>
          <button className={tab === 'history' ? 'tab-active' : ''} onClick={() => setTab('history')}>
            History {history.length > 0 && <span className="tab-badge">{history.length}</span>}
          </button>
        </div>

        {tab === 'checker' && (
          <>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-wrapper">
                <div className="chips-input" onClick={() => inputRef.current?.focus()}>
                  {selectedSymptoms.map(s => (
                    <span key={s} className="chip">
                      {s}
                      <button type="button" onClick={() => removeSymptom(s)}>×</button>
                    </span>
                  ))}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={selectedSymptoms.length === 0 ? 'Type a symptom and press Enter...' : 'Add more...'}
                  />
                </div>
                {suggestions.length > 0 && (
                  <ul className="suggestions">
                    {suggestions.slice(0, 6).map(s => (
                      <li key={s} onClick={() => addSymptom(s)}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-check" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Check'}
                </button>
                {(selectedSymptoms.length > 0 || results) && (
                  <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
                )}
              </div>
            </form>

            {allSymptoms.length > 0 && (
              <div className="symptom-tags">
                <span className="tags-label">Quick select:</span>
                {allSymptoms.map(s => (
                  <button
                    key={s}
                    type="button"
                    className={`tag ${selectedSymptoms.includes(s) ? 'tag-active' : ''}`}
                    onClick={() => selectedSymptoms.includes(s) ? removeSymptom(s) : addSymptom(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {error && <div className="error">⚠ {error}</div>}

            {results && (
              <div className="results">
                {results.results && results.results.length > 0 ? (
                  <>
                    <h2>
                      Results
                      <span className="results-count">{results.results.length} condition{results.results.length > 1 ? 's' : ''}</span>
                    </h2>
                    {results.results.map((r, i) => (
                      <div key={i} className="result-card">
                        <div className="result-header">
                          <h3>{r.disease}</h3>
                          <span className="severity-badge" style={{ backgroundColor: getConfidenceColor(r.confidence) }}>
                            {getSeverityLabel(r.confidence)}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${r.confidence}%`, backgroundColor: getConfidenceColor(r.confidence) }} />
                        </div>
                        <div className="result-meta">
                          <span className="confidence-text">{r.confidence}% confidence</span>
                          <span className="match-text">{r.matched_symptoms.length} of {r.total_symptoms} symptoms matched</span>
                        </div>
                        <div className="matched-symptoms">
                          {r.matched_symptoms.map(s => <span key={s} className="matched-chip">{s}</span>)}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="no-results">
                    <p>No matching conditions found.</p>
                    <p>Try adding more symptoms for better results.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {tab === 'history' && (
          <div className="history">
            {history.length === 0 ? (
              <div className="no-results">
                <p>No history yet.</p>
                <p>Run a symptom check to see results here.</p>
              </div>
            ) : (
              <>
                <div className="history-header">
                  <span>{history.length} past check{history.length > 1 ? 's' : ''}</span>
                  <button className="btn-clear" onClick={clearHistory}>Clear History</button>
                </div>
                {history.map(entry => (
                  <div key={entry.id} className="history-card">
                    <div className="history-meta">
                      <span className="history-date">{entry.date}</span>
                      <button className="btn-rerun" onClick={() => rerunCheck(entry)}>Re-run</button>
                    </div>
                    <div className="history-symptoms">
                      {entry.symptoms.map(s => <span key={s} className="chip">{s}</span>)}
                    </div>
                    {entry.results.length > 0 ? (
                      <div className="history-results">
                        {entry.results.slice(0, 3).map((r, i) => (
                          <div key={i} className="history-result-row">
                            <span>{r.disease}</span>
                            <div className="history-bar-wrap">
                              <div className="history-bar" style={{ width: `${r.confidence}%`, backgroundColor: getConfidenceColor(r.confidence) }} />
                            </div>
                            <span className="history-confidence">{r.confidence}%</span>
                          </div>
                        ))}
                        {entry.results.length > 3 && (
                          <span className="history-more">+{entry.results.length - 3} more</span>
                        )}
                      </div>
                    ) : (
                      <p className="history-none">No matches found</p>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        <div className="disclaimer">
          ⚠️ For informational purposes only. Not a substitute for professional medical advice.
        </div>
      </div>
    </div>
  );
}

export default App;
