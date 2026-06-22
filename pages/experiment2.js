import { useState } from 'react';
import Link from 'next/link';

export default function Experiment2() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const result = await res.json();
      if (result.data) {
        setAnalysis(result.data);
      }
    } catch (err) {
      alert("Error contacting internal classification backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '600', display: 'inline-block', marginBottom: '1.5rem' }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Experiment 2: Sentiment Classification</h1>
        
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '0.75rem' }}>Type Statement for Sentiment Analysis:</label>
          <textarea 
            rows="4" 
            style={{ width: '100%', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} 
            placeholder="Type or paste text here..." 
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />
          <button 
            onClick={handleAnalyze} 
            disabled={loading} 
            style={{ marginTop: '1.25rem', backgroundColor: loading ? '#93c5fd' : '#4f46e5', color: '#ffffff', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Analyzing Content...' : 'Run Analysis'}
          </button>
        </div>

        {analysis && (
          <div style={{ marginTop: '2rem', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.25rem' }}>Metrics Vector Breakdown:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {analysis.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#334155', fontSize: '1.1rem' }}>{item.label}</span>
                  <span style={{ fontFamily: 'monospace', color: '#4f46e5', fontWeight: '800', fontSize: '1.1rem' }}>{(item.score * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}