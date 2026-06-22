import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // Check paths closely here:
  const experiments = [
    { 
      id: 1, 
      title: "Experiment 1: Text Generation", 
      description: "Develop text generation applications using pre-trained foundation models via Groq Cloud.", 
      path: "/experiment1" 
    },
    { 
      id: 2, 
      title: "Experiment 2: Sentiment Analysis", 
      description: "Perform sentiment analysis and document classification using Hugging Face inference.", 
      path: "/experiment2" // <--- Make sure this is exactly /experiment2
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '3rem 2rem' }}>
      <header style={{ maxWidth: '900px', margin: '0 auto 3rem auto', borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4f46e5', margin: '0 0 0.5rem 0' }}>GenAI & LLM Laboratory</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0' }}>A working deployment repository showcasing foundation model metrics.</p>
      </header>
      
      <main style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        {experiments.map((exp) => (
          <div key={exp.id} style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>{exp.title}</h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>{exp.description}</p>
            </div>
            <Link href={exp.path} style={{ display: 'block', textAlign: 'center', backgroundColor: '#4f46e5', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: '600', textDecoration: 'none' }}>
              Launch Experiment
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}