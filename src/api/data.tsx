// --- TIPE FILM (TETAP ADA) ---
export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  image?: string;
  movie_banner?: string;
};

// --- FUNGSI FILM (TETAP ADA) ---
export async function getFilms(): Promise<Film[]> {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}

export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch film');
  return res.json();
}


// --- (TAMBAHAN BARU UNTUK LAGU) ---

// Tipe data berdasarkan API OpenWhyd
export type Song = {
  _id: string;
  name: string;
  uId: string;  // User ID
  uNm: string;  // User Name (Artist)
  img: string;  // Image URL
  eId: string;  // External ID (e.g., /yt/VIDEO_ID)
  pl?: {        // Playlist info (opsional)
    id: number;
    name: string;
    nbTracks?: number;
  };
  sc?: {        // Score info (opsional)
    score: number;
    nbVotes: number;
  };
};

// Fungsi baru untuk fetch lagu
export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`https://openwhyd.org/hot/electro?format=json`);
  if (!res.ok) throw new Error('Failed to fetch songs');
  const data = await res.json();
  // API-nya ngembaliin { tracks: [...] }
  return data.tracks || []; 
}