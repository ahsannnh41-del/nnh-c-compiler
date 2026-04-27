"use client";
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

export default function NNHCompiler() {
  const [code, setCode] = useState('#include <stdio.h>\n\nint main() {\n    printf("NNH-C-Compiler is Live!\\n");\n    int a = 10, b = 20;\n    printf("Sum of %d and %d is: %d\\n", a, b, a + b);\n    return 0;\n}');
  const [output, setOutput] = useState('Terminal ready for execution...');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Compiling...");

    try {
      const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        language: "c",
        version: "10.2.0", // GCC version
        files: [{ content: code }],
      });

      const { run } = response.data;
      
      if (run.stderr) {
        setOutput(`Error:\n${run.stderr}`);
      } else {
        setOutput(run.stdout || "Execution finished with no output.");
      }
    } catch (err) {
      setOutput("Error: Unable to connect to the compilation server.");
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
          <h1 className="font-mono text-xs font-bold tracking-widest text-gray-400 border-l border-gray-700 pl-4 uppercase">
            nnh-c-compiler / main.c
          </h1>
        </div>
        
        <button 
          onClick={runCode} 
          disabled={loading}
          className="bg-[#2ea44f] hover:bg-[#2c974b] text-white px-6 py-1 rounded text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
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
            onChange={(v) => setCode(v)}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              padding: { top: 20 },
              fontFamily: "'Fira Code', monospace",
              cursorBlinking: "smooth",
            }}
          />
        </div>

        {/* Console / Terminal Output */}
        <div className="w-1/3 bg-[#0a0a0a] flex flex-col">
          <div className="p-2 bg-[#111] text-[10px] text-gray-600 font-bold uppercase border-b border-[#222] tracking-tighter">
            Debug Console
          </div>
          <div className="p-5 font-mono text-sm overflow-auto h-full">
            <span className="text-blue-500 font-bold"> nnh@compiler:~$</span>
            <pre className="mt-2 text-[#00ff00] whitespace-pre-wrap leading-relaxed">
              {output}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="h-6 bg-[#007acc] flex items-center px-4 justify-between text-[10px] font-medium">
        <div className="flex gap-4">
          <span>{loading ? "● Busy" : "● Ready"}</span>
          <span>GCC 10.2.0</span>
        </div>
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>C (GCC)</span>
        </div>
      </div>
    </div>
  );
}

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
          
