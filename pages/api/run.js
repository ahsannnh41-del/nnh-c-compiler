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

    const output =
      data.run?.output ||
      data.compile?.output ||
      "No Output / Error";

    res.status(200).json({ output });

  } catch (err) {
    res.status(200).json({
      output: "Server Error: " + err.message,
    });
  }
}
