import React, { useState } from 'react';
import { Film, Sparkles, Sliders, Star } from 'lucide-react';

interface SeedMovie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  director: string;
  rating: number;
}

interface RecommendedMovie {
  title: string;
  year: number;
  genres: string[];
  similarityScore: number;
  rating: number;
  vectorMatchReason: string;
}

const SEED_MOVIES: SeedMovie[] = [
  { id: 'inception', title: 'Inception', year: 2010, genres: ['Sci-Fi', 'Action', 'Thriller'], director: 'Christopher Nolan', rating: 8.8 },
  { id: 'interstellar', title: 'Interstellar', year: 2014, genres: ['Sci-Fi', 'Drama', 'Adventure'], director: 'Christopher Nolan', rating: 8.7 },
  { id: 'dark_knight', title: 'The Dark Knight', year: 2008, genres: ['Action', 'Crime', 'Drama'], director: 'Christopher Nolan', rating: 9.0 },
  { id: 'matrix', title: 'The Matrix', year: 1999, genres: ['Sci-Fi', 'Action'], director: 'Wachowskis', rating: 8.7 },
  { id: 'pulp_fiction', title: 'Pulp Fiction', year: 1994, genres: ['Crime', 'Drama'], director: 'Quentin Tarantino', rating: 8.9 },
  { id: 'spirited_away', title: 'Spirited Away', year: 2001, genres: ['Animation', 'Adventure', 'Fantasy'], director: 'Hayao Miyazaki', rating: 8.6 }
];

const RECOMMENDATIONS_DB: Record<string, RecommendedMovie[]> = {
  inception: [
    { title: 'Shutter Island', year: 2010, genres: ['Mystery', 'Thriller'], similarityScore: 94.8, rating: 8.2, vectorMatchReason: 'High latent embedding similarity in psychological reality distortion and neo-noir cinematography.' },
    { title: 'The Prestige', year: 2006, genres: ['Drama', 'Mystery', 'Sci-Fi'], similarityScore: 92.5, rating: 8.5, vectorMatchReason: 'Overlapping director feature vector and non-linear narrative structural pacing.' },
    { title: 'Memento', year: 2000, genres: ['Mystery', 'Thriller'], similarityScore: 89.2, rating: 8.4, vectorMatchReason: 'Shared cognitive puzzle mechanics and high user co-rating clustering in MovieLens.' },
    { title: 'Tenet', year: 2020, genres: ['Action', 'Sci-Fi'], similarityScore: 86.7, rating: 7.3, vectorMatchReason: 'Direct entropy manipulation themes and dense conceptual physics exposition.' }
  ],
  interstellar: [
    { title: '2001: A Space Odyssey', year: 1968, genres: ['Sci-Fi', 'Adventure'], similarityScore: 93.4, rating: 8.3, vectorMatchReason: 'Deep cosine similarity on cosmological scope, existential survival, and organ-score pacing.' },
    { title: 'Contact', year: 1997, genres: ['Drama', 'Sci-Fi'], similarityScore: 91.0, rating: 7.5, vectorMatchReason: 'High overlap in theoretical physics, father-daughter emotional vectors, and wormholes.' },
    { title: 'Arrival', year: 2016, genres: ['Drama', 'Sci-Fi'], similarityScore: 90.2, rating: 7.9, vectorMatchReason: 'Non-linear temporal perception with acoustic sensory sound design similarity.' },
    { title: 'The Martian', year: 2015, genres: ['Adventure', 'Drama', 'Sci-Fi'], similarityScore: 85.6, rating: 8.0, vectorMatchReason: 'Extraterrestrial scientific problem-solving user co-ratings correlation.' }
  ],
  dark_knight: [
    { title: 'Batman Begins', year: 2005, genres: ['Action', 'Crime'], similarityScore: 95.2, rating: 8.2, vectorMatchReason: 'Franchise character matrix vector and gritty urban crime tone.' },
    { title: 'The Dark Knight Rises', year: 2012, genres: ['Action', 'Thriller'], similarityScore: 94.0, rating: 8.4, vectorMatchReason: 'Continuation of Gotham ideological conflict vectors and Hans Zimmer score.' },
    { title: 'Joker', year: 2019, genres: ['Crime', 'Drama', 'Thriller'], similarityScore: 88.5, rating: 8.4, vectorMatchReason: 'Strong character psychological study and high user collaborative similarity score.' },
    { title: 'Heat', year: 1995, genres: ['Action', 'Crime', 'Drama'], similarityScore: 86.1, rating: 8.3, vectorMatchReason: 'Urban heist dynamic and dual protagonist-antagonist ethical tension.' }
  ],
  matrix: [
    { title: 'Dark City', year: 1998, genres: ['Mystery', 'Sci-Fi'], similarityScore: 93.1, rating: 7.6, vectorMatchReason: 'Simulated urban reality vector and philosophical inquiry into perceived consciousness.' },
    { title: 'Blade Runner 2049', year: 2017, genres: ['Action', 'Drama', 'Sci-Fi'], similarityScore: 91.4, rating: 8.0, vectorMatchReason: 'Cyberpunk dystopia aesthetic with existential AI entity questions.' },
    { title: 'Ghost in the Shell', year: 1995, genres: ['Animation', 'Action', 'Sci-Fi'], similarityScore: 89.8, rating: 7.9, vectorMatchReason: 'Direct conceptual predecessor with cybernetic transcendence themes.' },
    { title: 'Equilibrium', year: 2002, genres: ['Action', 'Sci-Fi'], similarityScore: 84.5, rating: 7.3, vectorMatchReason: 'Dystopian martial arts stylistic choreography and rebellion against systemic control.' }
  ],
  pulp_fiction: [
    { title: 'Reservoir Dogs', year: 1992, genres: ['Crime', 'Thriller'], similarityScore: 96.0, rating: 8.3, vectorMatchReason: 'Identical auteur dialogue pacing and disjointed non-linear timeline structure.' },
    { title: 'Inglourious Basterds', year: 2009, genres: ['Adventure', 'Drama', 'War'], similarityScore: 91.2, rating: 8.4, vectorMatchReason: 'High collaborative user rating overlap across Tarantino filmography.' },
    { title: 'Fargo', year: 1996, genres: ['Crime', 'Drama', 'Thriller'], similarityScore: 87.8, rating: 8.1, vectorMatchReason: 'Darkly comedic accidental crime escalation vectors.' },
    { title: 'Snatch', year: 2000, genres: ['Comedy', 'Crime'], similarityScore: 86.4, rating: 8.2, vectorMatchReason: 'Multi-threaded underworld ensemble narrative with rapid-cut editing style.' }
  ],
  spirited_away: [
    { title: "Howl's Moving Castle", year: 2004, genres: ['Animation', 'Adventure', 'Family'], similarityScore: 95.5, rating: 8.2, vectorMatchReason: 'Studio Ghibli aesthetic vector, Joe Hisaishi composition, and fantastical world-building.' },
    { title: 'Princess Mononoke', year: 1997, genres: ['Animation', 'Action', 'Adventure'], similarityScore: 93.2, rating: 8.4, vectorMatchReason: 'Environmental folklore allegory and rich hand-drawn character design.' },
    { title: 'My Neighbor Totoro', year: 1988, genres: ['Animation', 'Comedy', 'Family'], similarityScore: 89.4, rating: 8.1, vectorMatchReason: 'High collaborative cluster in Miyazaki family adventure taxonomy.' },
    { title: 'Your Name', year: 2016, genres: ['Animation', 'Drama', 'Fantasy'], similarityScore: 87.9, rating: 8.4, vectorMatchReason: 'Metaphysical identity exchange and transcendent romantic themes.' }
  ]
};

export const MovieRecommendationDemo: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>('inception');
  const [hybridWeight, setHybridWeight] = useState<number>(70); // 70% collaborative, 30% content

  const activeSeed = SEED_MOVIES.find((m) => m.id === selectedMovieId) || SEED_MOVIES[0];
  const recs = RECOMMENDATIONS_DB[selectedMovieId] || RECOMMENDATIONS_DB['inception'];

  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Selector Grid */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <label className="text-xs font-mono text-slate-400 block mb-2">
          Select Seed Reference Movie (MovieLens 100k Matrix)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {SEED_MOVIES.map((movie) => (
            <button
              key={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
              className={`p-2.5 rounded-lg text-left transition-all border ${
                selectedMovieId === movie.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-semibold block truncate text-white">{movie.title}</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {movie.year} · ★ {movie.rating}
              </span>
            </button>
          ))}
        </div>

        {/* Hybrid Weighting Slider */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-300 font-medium">Algorithmic Balance:</span>
            <span className="text-indigo-400 font-mono">
              {hybridWeight}% User Collaborative / {100 - hybridWeight}% Content Cosine
            </span>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="range"
              min={20}
              max={90}
              step={5}
              value={hybridWeight}
              onChange={(e) => setHybridWeight(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Recommendations Output Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>Top Nearest Neighbors for "{activeSeed.title}"</span>
          <span className="text-indigo-400">Cosine Metric: sim(u, v) = (u · v) / (||u|| ||v||)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recs.map((item, idx) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h5 className="text-sm font-bold text-white tracking-tight">{item.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{item.year}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-current" />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums block">
                      {item.similarityScore}% Match
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Vector Sim</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 my-2">
                  {item.genres.map((g) => (
                    <span
                      key={g}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="text-indigo-300 font-medium">Why Recommended: </span>
                  {item.vectorMatchReason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
