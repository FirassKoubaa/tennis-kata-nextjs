"use client";

import React, { useState } from 'react';

const API_URL = 'http://localhost:8080/api/tennis/score'; // À adapter selon votre backend

export default function TennisGameComponent() {
  const [sequence, setSequence] = useState<string>('');
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (player: 'A' | 'B') => {
    setSequence(seq => seq + player);
  };

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResult([]);
    try {
      const response = await fetch(`${API_URL}/${sequence}`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Erreur API');
      const data = await response.json();
      setResult(Array.isArray(data) ? data : [String(data)]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSequence('');
    setResult([]);
    setError(null);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4 mx-auto" style={{maxWidth: 500}}>
        <h2 className="mb-4 text-center">Tennis Kata Testeur</h2>
        <div className="mb-3 d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={() => handleAdd('A')}>A</button>
          <button className="btn btn-success" onClick={() => handleAdd('B')}>B</button>
          <button className="btn btn-outline-secondary" onClick={handleReset}>Reset</button>
        </div>
        <div className="mb-3 text-center">Séquence : <b>{sequence || '-'}</b></div>
        <div className="d-grid mb-2">
          <button className="btn btn-dark" onClick={handleSend} disabled={!sequence || loading}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {result.length > 0 && (
          <div className="mt-4">
            <h4>Résultat :</h4>
            <ul className="list-group">
              {result.map((line, idx) => (
                <li className="list-group-item" key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
