import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    try {
        const body = await request.json();
        
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
            language: "c",
            version: "10.2.0",
            files: [{ content: body.code }],
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: "Compilation Server Error" }, { status: 500 });
    }
}
