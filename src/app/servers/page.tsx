import { ServerList } from '@/components/ServerList';

export default async function Page() {
  let initialServers = [];
  try {
    const res = await fetch('https://api.battlemetrics.com/servers?filter[game]=rust&sort=-players&page[size]=100', { 
        next: { revalidate: 60 } // Cache for 60 seconds
    });
    const json = await res.json();
    if (json && json.data) {
        initialServers = json.data.map((item: any) => {
            const attrs = item.attributes;
            const details = attrs.details || {};
            return {
                id: attrs.id,
                name: attrs.name,
                ip: attrs.ip || attrs.address || '0.0.0.0',
                port: attrs.port,
                players: attrs.players,
                maxPlayers: attrs.maxPlayers,
                queued: details.rust_queued_players || 0,
                rank: attrs.rank,
                status: attrs.status,
                map: details.map || details.rust_maps?.map || 'Procedural Map',
                type: details.rust_type || 'community', // Fallback type
                headerImage: details.rust_headerimage || '',
                lastWipe: details.rust_last_wipe || '',
                nextWipe: details.rust_next_wipe || '',
                seed: details.rust_world_seed || 0,
                worldSize: details.rust_world_size || 0,
                description: details.rust_description || 'Welcome to this server!',
                ping: 30 // Server doesn't know ping
            };
        });
    }
  } catch (err) {
      console.error('Failed to fetch initial servers', err);
  }

  return <ServerList initialServers={initialServers} />;
}
