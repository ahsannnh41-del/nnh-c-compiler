import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: "c",
                version: "10.2.0",
                files: [{ content: body.code }],
            }),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Backend Error:", error);
        return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
    }
}
