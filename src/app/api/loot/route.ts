import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execAsync = util.promisify(exec);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity') || 'apc-crate';

  const allowedEntities = ['apc-crate', 'elite-tier-crate', 'military-crate', 'green-keycard', 'blue-keycard', 'red-keycard'];
  if (!allowedEntities.includes(entity)) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
  }

  try {
    const scriptPath = path.join(process.cwd(), 'src/app/api/loot/scraper.js');
    console.log(`[API/Loot] Running scraper for ${entity}...`);
    
    const { stdout, stderr } = await execAsync(`node "${scriptPath}" ${entity}`, { timeout: 45000 });
    
    // The scraper logs JSON to stdout (or error JSON to stderr if we catch it, but here we just parse stdout lines)
    const lines = stdout.split('\n');
    let dataObj = null;
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.success !== undefined) {
          dataObj = parsed;
          break;
        }
      } catch (e) {
        // ignore non-json lines
      }
    }

    if (dataObj && dataObj.success) {
      return NextResponse.json({ 
          success: true, 
          entity, 
          source: `https://wiki.rustclash.com/entity/${entity}`,
          data: dataObj.data 
      });
    } else {
      throw new Error(dataObj?.error || 'Scraper failed silently');
    }
  } catch (error: any) {
    console.error(`[API/Loot] Failed to scrape ${entity}:`, error.message);
    return NextResponse.json({ 
        success: false, 
        error: 'Failed to extract data, possibly blocked by Cloudflare.',
        details: error.message 
    }, { status: 500 });
  }
}
