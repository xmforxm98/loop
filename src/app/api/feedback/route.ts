import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: Request) {
    try {
        const { body } = await request.json();
        let apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key Missing' }, { status: 500 });
        }

        apiKey = apiKey.trim();

        // fetch 대신 Node.js 기본 https 모듈을 사용하여 SSL 인증서 검증을 무시하도록 설정합니다.
        const postData = JSON.stringify({
            from: 'onboarding@resend.dev',
            to: 'xmforxm98@gmail.com',
            subject: 'New Feedback from Loop',
            text: body,
        });

        const options = {
            hostname: 'api.resend.com',
            path: '/emails',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
            // SSL 인증서 문제를 해결하기 위해 검증을 건너뜁니다.
            rejectUnauthorized: false
        };

        const result = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                            resolve({ success: true, data: parsed });
                        } else {
                            resolve({ success: false, status: res.statusCode, details: parsed });
                        }
                    } catch (e) {
                        resolve({ success: false, status: res.statusCode, details: data });
                    }
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(postData);
            req.end();
        });

        const typedResult = result as any;
        if (!typedResult.success) {
            return NextResponse.json({ error: 'Resend API Error', details: typedResult.details }, { status: typedResult.status || 500 });
        }

        return NextResponse.json(typedResult);
    } catch (error) {
        console.error('Feedback Flow Error:', error);
        return NextResponse.json({
            error: 'Feedback Flow Error',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
