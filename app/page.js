"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH Compiler Working!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('Terminal ready...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");
    try {
      const response = await axios.post('/api/run', { code: code });
      const { run } = response.data;
      setOutput(run.stderr || run.stdout || "Execution finished.");
    } catch (err) {
      setOutput("Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d] text-white overflow-hidden">
      <div className="h-12 bg-[#1a1a1a] flex justify-between items-center px-6 border-b border-[#333]">
        <h1 className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">
          nnh-c-compiler
        </h1>
        <button 
          onClick={runCode} 
          disabled={loading}
          className="bg-[#2ea44f] hover:bg-[#2c974b] px-6 py-1 rounded text-xs font-bold disabled:opacity-50"
        >
          {loading ? "RUNNING..." : "RUN CODE"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 border-r border-[#222]">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="c"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>
        <div className="w-1/3 bg-[#0a0a0a] flex flex-col">
          <div className="p-2 bg-[#111] text-[10px] text-gray-600 font-bold border-b border-[#222]">TERMINAL</div>
          <pre className="p-6 font-mono text-sm text-[#4ade80] overflow-auto h-full">{output}</pre>
        </div>
      </div>

      <div className="h-6 bg-[#007acc] flex items-center px-4 text-[10px] font-medium">
        <span>● GCC 10.2.0 | Status: {loading ? 'Compiling' : 'Ready'}</span>
      </div>
    </div>
  );
}
