import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [code, setCode] = useState(`#include <stdio.h>

int main() {
    printf("NNH C Compiler");
    return 0;
}`);

  const [output, setOutput] = useState("");

  const runCode = async () => {
    setOutput("Compiling...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div style={{ background: "#0d1117", color: "#00ff99", height: "100vh" }}>

      <div style={{ textAlign: "center", padding: 10, borderBottom: "1px solid #00ff99" }}>
        ⚡ NNH-C-COMPILER (VS CODE EDITION)
      </div>

      <div style={{ padding: 10 }}>

        <Editor
          height="65vh"
          defaultLanguage="c"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
        />

        <button
          onClick={runCode}
          style={{
            marginTop: 10,
            padding: 10,
            background: "#00ff99",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ▶ RUN CODE
        </button>

        <div style={{
          marginTop: 15,
          padding: 10,
          border: "1px solid #00ff99",
          background: "#000",
          minHeight: 150
        }}>
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>

      </div>
    </div>
  );
    }
