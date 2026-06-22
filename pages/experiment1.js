import { useState } from 'react';
import Link from 'next/link';

export default function Experiment1() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setOutput(data.result || "No response received.");
    } catch (error) {
      setOutput("Error parsing your prompt logic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '600', display: 'inline-block', marginBottom: '1.5rem' }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.5rem' }}>Experiment 1: Text Generation</h1>
        
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '0.75rem' }}>Enter Prompt Context:</label>
          <textarea 
            rows="5" 
            style={{ width: '100%', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }} 
            placeholder="Type your generative prompt here..." 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading} 
            style={{ marginTop: '1.25rem', backgroundColor: loading ? '#93c5fd' : '#4f46e5', color: '#ffffff', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Running Inference...' : 'Generate Text'}
          </button>
        </div>
        
        {output && (
          <div style={{ marginTop: '2rem', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem' }}>Output Response:</h3>
            <div style={{ padding: '1.25rem', backgroundColor: '#0f172a', color: '#34d399', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.6', hospitality: 'pre-wrap', overflowX: 'auto' }}>{output}</div>
          </div>
        )}
      </div>
    </div>
  );
}