import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const steamid = searchParams.get('steamid');

    if (!steamid) {
        return NextResponse.json({ error: 'Missing steamid' }, { status: 400 });
    }

    try {
        // Fetch XML profile from Steam
        const response = await fetch(`https://steamcommunity.com/profiles/${steamid}?xml=1`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch from Steam');
        }

        const xmlText = await response.text();
        
        // Simple regex parsing to avoid bringing in a full XML parser dependency
        const extract = (tag: string) => {
            const regex = new RegExp(`<${tag}><!\\[CDATA\\[(.*?)\\]\\]></${tag}>|<${tag}>(.*?)</${tag}>`);
            const match = xmlText.match(regex);
            return match ? (match[1] || match[2] || '') : '';
        };

        const steamID64 = extract('steamID64');
        if (!steamID64) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        const data = {
            steamID64,
            username: extract('steamID'),
            avatar: extract('avatarFull'),
            vacBanned: extract('vacBanned') === '1',
            tradeBanState: extract('tradeBanState'),
            isLimitedAccount: extract('isLimitedAccount') === '1',
            memberSince: extract('memberSince'),
            location: extract('location'),
            summary: extract('summary'),
            privacyState: extract('privacyState') // friendOnly, private, public
        };

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
