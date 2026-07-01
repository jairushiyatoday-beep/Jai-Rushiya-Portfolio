'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/constants';

const GITHUB_USERNAME = 'jairushiyatoday-beep';

interface GitHubProfile {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
};

function ContributionGraph() {
  return (
    <div>
      <div className="flex pl-8 mb-1 gap-0">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
          <span key={month} className="text-[10px] text-gray-500 font-mono flex-1">{month}</span>
        ))}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-[3px] justify-between py-[2px] mr-1 min-w-[28px]">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
            <span key={i} className="text-[9px] text-gray-500 font-mono h-[11px] md:h-[13px] flex items-center">{day}</span>
          ))}
        </div>
        <div className="flex gap-[3px] flex-1 overflow-x-auto pb-1">
          {Array.from({ length: 26 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, row) => {
                const seed = (col * 7 + row) * 2654435761;
                const rand = ((seed >>> 0) % 1000) / 1000;
                const isWeekend = row === 0 || row === 6;
                let level = 0;
                if (rand > 0.85) level = 3;
                else if (rand > 0.6) level = 2;
                else if (rand > (isWeekend ? 0.7 : 0.35)) level = 1;
                const colors = [
                  'bg-white/[0.04] border border-white/[0.06]',
                  'bg-[#0e4429] border border-[#0e4429]/50',
                  'bg-[#006d32] border border-[#006d32]/50 shadow-[0_0_3px_rgba(0,240,255,0.1)]',
                  'bg-[--neon-cyan] border border-[--neon-cyan]/50 shadow-[0_0_6px_rgba(0,240,255,0.35)]',
                ];
                return (
                  <motion.div
                    key={`${col}-${row}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (col * 7 + row) * 0.003, duration: 0.2 }}
                    className={`w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[2px] ${colors[level]} hover:ring-1 hover:ring-[--neon-cyan] transition-all cursor-default`}
                    title={`${level} contribution${level !== 1 ? 's' : ''}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-500 font-mono">Last 26 weeks</span>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.04] border border-white/[0.06]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[--neon-cyan]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 },
          } as RequestInit),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
            next: { revalidate: 3600 },
          } as RequestInit),
        ]);
        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch {
        // Silently fail — fallback UI shown
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  const statItems = [
    { label: 'Repositories', value: profile?.public_repos ?? '—', icon: '📁' },
    { label: 'Followers', value: profile?.followers ?? '—', icon: '👥' },
    { label: 'Following', value: profile?.following ?? '—', icon: '🔗' },
  ];

  return (
    <section id="github" className="py-32 bg-gradient-to-b from-[#030014] to-[#0a0520] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">GitHub</h2>
          <p className="text-gray-400 text-lg">Open source contributions &amp; development activity</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[--neon-cyan] to-[--neon-purple] mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {loading ? (
              <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse shrink-0" />
            ) : profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={`${GITHUB_USERNAME}'s GitHub avatar`} className="w-16 h-16 rounded-full border-2 border-[--neon-cyan]/30 shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[--neon-cyan] to-[--neon-purple] flex items-center justify-center shrink-0">
                <GitHubIcon className="w-8 h-8 text-white" />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">
                {loading ? <span className="inline-block w-32 h-6 bg-white/10 rounded animate-pulse" /> : (profile?.name || GITHUB_USERNAME)}
              </h3>
              <p className="text-gray-400 mt-1 text-sm">
                {loading ? <span className="inline-block w-48 h-4 bg-white/10 rounded animate-pulse mt-1" /> : (profile?.bio || 'AI Engineer · Full Stack Developer')}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-4">
                {statItems.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold text-[--neon-cyan]">
                      {loading ? <span className="inline-block w-8 h-5 bg-white/10 rounded animate-pulse" /> : stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 text-white border border-white/10 hover:border-[--neon-cyan]/40 hover:text-[--neon-cyan] hover:bg-[--neon-cyan]/5 transition-all duration-300"
              aria-label="Visit GitHub profile"
            >
              <GitHubIcon className="w-4 h-4" />
              Visit GitHub
            </a>
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[--neon-cyan]/15 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <GitHubIcon className="w-5 h-5 text-[--neon-cyan]" />
              <span className="text-white font-semibold">Contribution Activity</span>
            </div>
            <ContributionGraph />
          </motion.div>

          {/* Repos Grid */}
          {(loading || repos.length > 0) && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 px-1">Recent Repositories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="glass-strong p-5 rounded-xl border border-white/5 animate-pulse h-28" />
                    ))
                  : repos.slice(0, 6).map((repo, i) => (
                      <motion.a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        className="group glass-strong p-5 rounded-xl border border-white/5 hover:border-[--neon-cyan]/25 transition-all duration-300 flex flex-col gap-3"
                        aria-label={`Repository: ${repo.name}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-white group-hover:text-[--neon-cyan] transition-colors truncate">{repo.name}</span>
                          <svg className="w-4 h-4 text-gray-500 group-hover:text-[--neon-cyan] shrink-0 -mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        {repo.description && (
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: LANG_COLORS[repo.language] ?? '#8b949e' }} />
                              {repo.language}
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.873 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" /></svg>
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                              {repo.forks_count}
                            </span>
                          )}
                        </div>
                      </motion.a>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
