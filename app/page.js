"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH-C-Compiler is Ready!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('// Output yahan show hoga...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");
    try {
      const res = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', 
      { source_code: code, language_id: 50 }, 
      { headers: { 
          'x-rapidapi-key': 'APNI_RAPIDAPI_KEY_YAHAN_DALO', 
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com' 
      }});
      setOutput(res.data.stdout || res.data.stderr || res.data.compile_output || "No output");
    } catch (err) {
      setOutput("Error: API Key missing or limit reached.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-vscode-bg text-white font-sans">
      {/* Top Bar */}
      <div className="h-10 bg-vscode-header flex justify-between items-center px-4 border-b border-vscode-border">
        <span className="text-sm text-gray-400 font-mono italic">nnh-c-compiler v1.0</span>
        <button onClick={runCode} disabled={loading} className="bg-vscode-blue hover:opacity-90 px-4 py-1 rounded text-sm font-bold">
          {loading ? "..." : "RUN"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="c"
            value={code}
            onChange={(v) => setCode(v)}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>

        {/* Terminal Area */}
        <div className="w-1/3 bg-[#121212] border-l border-vscode-border p-4">
          <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Terminal</div>
          <pre className="text-green-500 font-mono text-sm leading-relaxed">{output}</pre>
        </div>
      </div>
    </div>
  );
    }
          
