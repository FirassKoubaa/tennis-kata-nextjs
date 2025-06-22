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
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Tennis Kata Testeur</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => handleAdd('A')}>A</button>
        <button onClick={() => handleAdd('B')} style={{ marginLeft: 8 }}>B</button>
        <button onClick={handleReset} style={{ marginLeft: 16 }}>Reset</button>
      </div>
      <div>Séquence : <b>{sequence || '-'}</b></div>
      <button onClick={handleSend} disabled={!sequence || loading} style={{ marginTop: 16 }}>
        {loading ? 'Envoi...' : 'Send'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {result.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h4>Résultat :</h4>
          <pre style={{ background: '#f7f7f7', padding: 12 }}>
            {result.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </pre>
        </div>
      )}
      {/* Affichage debug de la réponse brute */}
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
    </div>
  );
}
