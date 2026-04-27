"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH Compiler is 100% Live!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('Terminal ready...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");
    try {
      // Hum direct Piston API ko hit kar rahe hain
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        body: JSON.stringify({
          language: "c",
          version: "10.2.0",
          files: [{ content: code }],
        }),
      });
      
      const data = await response.json();
      
      if (data.run) {
        setOutput(data.run.stderr || data.run.stdout || "Execution Finished.");
      } else {
        setOutput("Error: API limit reached or server busy.");
      }
    } catch (err) {
      console.error(err);
      setOutput("Error: Connection failed. Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d] text-white overflow-hidden font-sans">
      {/* Header */}
      <div className="h-12 bg-[#1a1a1a] flex justify-between items-center px-6 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <span className="text-blue-500 font-bold tracking-tighter">NNH</span>
          <div className="h-4 w-[1px] bg-gray-700"></div>
          <span className="text-[10px] text-gray-500 font-mono uppercase">main.c</span>
        </div>
        <button 
          onClick={runCode} 
          disabled={loading}
          className="bg-[#2ea44f] hover:bg-[#2c974b] text-white px-8 py-1 rounded text-xs font-bold transition-all disabled:opacity-50"
        >
          {loading ? "COMPILING..." : "RUN CODE"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Monaco Editor */}
        <div className="flex-1 border-r border-[#222]">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="c"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{ fontSize: 16, minimap: { enabled: false }, padding: { top: 20 } }}
          />
        </div>

        {/* Terminal */}
        <div className="w-1/3 bg-[#0a0a0a] flex flex-col">
          <div className="p-2 bg-[#111] text-[10px] text-gray-600 font-bold border-b border-[#222] tracking-widest">CONSOLE</div>
          <pre className="p-6 font-mono text-sm text-[#4ade80] overflow-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>

      <div className="h-6 bg-[#007acc] flex items-center px-4 text-[10px] font-medium uppercase tracking-tighter">
         ● status: {loading ? 'processing' : 'idle'} | gcc 10.2.0
      </div>
    </div>
  );
              }
