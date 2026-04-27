export default async function handler(req, res) {
  const { code } = req.body;

  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "c",
        version: "10.2.0",
        files: [{ content: code }],
      }),
    });

    const data = await response.json();

    console.log(data); // debug (Vercel logs me help karega)

    let output = "";

    if (data.run && data.run.output) {
      output = data.run.output;
    } else if (data.compile && data.compile.output) {
      output = data.compile.output;
    } else if (data.message) {
      output = data.message;
    } else {
      output = "❌ No output (check code or API response)";
    }

    res.status(200).json({ output });

  } catch (err) {
    res.status(200).json({
      output: "Server Error: " + err.message,
    });
  }
}
