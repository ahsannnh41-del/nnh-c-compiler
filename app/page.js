"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH-C-Compiler is Ready!\\n");\n    int a = 5, b = 10;\n    printf("Result: %d + %d = %d\\n", a, b, a + b);\n    return 0;\n}');
  const [output, setOutput] = useState('Terminal ready...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");
    try {
      // Apne local API route ko hit kar rahe hain taake CORS error na aaye
      const response = await axios.post('/api/run', { code: code });
      
      const { run } = response.data;
      if (run.stderr) {
        setOutput("❌ Error:\n" + run.stderr);
      } else {
        setOutput("✅ Output:\n" + (run.stdout || "Execution finished."));
      }
    } catch (err) {
      setOutput("❌ Error: Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0d] text-[#e0e0e0] overflow-hidden">
      {/* VS Code Style Header */}
      <div className="h-12 bg-[#1a1a1a] flex justify-between items-center px-6 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full"></div>
          </div>
          <h1 className="font-mono text-[10px] font-bold text-gray-500 border-l border-gray-700 pl-4 tracking-widest uppercase">
            nnh-c-compiler / main.c
          </h1>
        </div>
        <button 
          onClick={runCode} 
          disabled={loading}
          className={`px-6 py-1 rounded text-xs font-bold transition-all ${loading ? 'bg-gray-700' : 'bg-[#2ea44f] hover:bg-[#2c974b] active:scale-95'}`}
        >
          {loading ? "RUNNING..." : "RUN CODE"}
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
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              fontFamily: "'Fira Code', monospace",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              padding: { top: 20 }
            }}
          />
        </div>

        {/* Terminal Section */}
        <div className="w-1/3 bg-[#0a0a0a] flex flex-col">
          <div className="p-2 bg-[#111] text-[10px] text-gray-600 font-bold border-b border-[#222] tracking-widest uppercase">
            Debug Console
          </div>
          <pre className="p-6 font-mono text-sm text-[#4ade80] overflow-auto h-full leading-relaxed">
            {output}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="h-6 bg-[#007acc] flex items-center px-4 justify-between text-[10px] font-medium text-white">
        <div className="flex gap-4 italic">
          <span>● Status: {loading ? 'Compiling' : 'Ready'}</span>
          <span>GCC 10.2.0</span>
        </div>
        <span>UTF-8 | C Language</span>
      </div>
    </div>
  );
}
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
