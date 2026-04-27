"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH-C-Compiler is Live!\\n");\n    return 0;\n}');
  const [output, setOutput] = useState('Terminal ready...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");
    try {
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: "c",
        version: "10.2.0",
        files: [{ content: code }],
      });
      const { run } = response.data;
      setOutput(run.stderr || run.stdout || "Execution finished.");
    } catch (err) {
      setOutput("Error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d] text-[#e0e0e0] overflow-hidden">
      {/* Header */}
      <div className="h-12 bg-[#1a1a1a] flex justify-between items-center px-6 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full"></div>
          </div>
          <h1 className="font-mono text-xs font-bold text-gray-400 border-l border-gray-700 pl-4">
            NNH-C-COMPILER / MAIN.C
          </h1>
        </div>
        <button 
          onClick={runCode} 
          disabled={loading}
          className="bg-[#2ea44f] hover:bg-[#2c974b] text-white px-6 py-1 rounded text-xs font-bold disabled:opacity-50"
        >
          {loading ? "RUNNING..." : "RUN CODE"}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
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

        {/* Terminal */}
        <div className="w-1/3 bg-[#0a0a0a] flex flex-col">
          <div className="p-2 bg-[#111] text-[10px] text-gray-600 font-bold border-b border-[#222]">
            TERMINAL
          </div>
          <pre className="p-5 font-mono text-sm text-[#00ff00] overflow-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="h-6 bg-[#007acc] flex items-center px-4 text-[10px]">
        <span>● GCC 10.2.0</span>
      </div>
    </div>
  );
              }
