import { useState } from 'react';
import {
  Lightbulb, Trophy, DollarSign, Calendar, Users,
  Clock, ChevronRight, ExternalLink, Search, Tag,
  Bookmark, Award, Rocket, FileText, ArrowUpRight,
  CheckCircle2, AlertCircle, X
} from 'lucide-react';
import { mockHackathons } from '@/data/mockData';
import toast from 'react-hot-toast';

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700 badge', dot: 'bg-green-500' },
  upcoming: { label: 'Upcoming', color: 'badge-blue', dot: 'bg-blue-500' },
  completed: { label: 'Completed', color: 'badge-gray', dot: 'bg-gray-400' },
};

const grants = [
  {
    id: 'g1', title: 'National Research Grant for Land Governance Innovation',
    amount: '₹50 Lakhs', deadline: '2024-11-30', org: 'ICSSR', status: 'open',
    areas: ['Land Records', 'Policy Analysis', 'GIS'],
    desc: 'Supporting original research on digital transformation in land administration. Open to university faculty and research institutions.',
  },
  {
    id: 'g2', title: 'Climate-Smart Land Use Research Fellowship',
    amount: '₹25 Lakhs', deadline: '2024-10-31', org: 'DST India', status: 'closing_soon',
    areas: ['Climate', 'Remote Sensing', 'Agriculture'],
    desc: 'Fellowship for 2-year research on climate vulnerability of agricultural and forest land in India.',
  },
  {
    id: 'g3', title: 'Tribal Land Rights Documentation Technology Grant',
    amount: '₹15 Lakhs', deadline: '2024-12-31', org: 'MoTA', status: 'open',
    areas: ['Tribal Rights', 'Mobile Technology', 'Vernacular'],
    desc: 'Development of technology solutions for documenting and protecting tribal community land rights under FRA 2006.',
  },
];

const competitions = [
  { id: 'c1', title: 'National Essay Competition: Land Governance in India 2047', prize: '₹2 Lakhs', type: 'Essay', deadline: '2024-11-15', participants: 342 },
  { id: 'c2', title: 'Land Data Visualization Challenge', prize: '₹5 Lakhs', type: 'Data Viz', deadline: '2024-10-25', participants: 189 },
  { id: 'c3', title: 'Policy Innovation Pitch: Urban Land 2030', prize: '₹3 Lakhs', type: 'Policy Pitch', deadline: '2024-12-01', participants: 78 },
];

const leaderboard = [
  { rank: 1, name: 'Team Bhulekh AI', org: 'IIT Delhi', score: 9840, badge: '🥇' },
  { rank: 2, name: 'GeoPolicy Lab', org: 'IISC Bangalore', score: 9625, badge: '🥈' },
  { rank: 3, name: 'RuralTech Innovators', org: 'NIT Warangal', score: 9410, badge: '🥉' },
  { rank: 4, name: 'LandSmart Solutions', org: 'IIT Bombay', score: 8980, badge: '' },
  { rank: 5, name: 'AgriGovern', org: 'TISS Mumbai', score: 8750, badge: '' },
];

export default function Innovation() {
  const [activeTab, setActiveTab] = useState<'hackathons' | 'grants' | 'competitions' | 'leaderboard'>('hackathons');
  const [search, setSearch] = useState('');
  const [applyModalItem, setApplyModalItem] = useState<{ title: string; type: 'hackathon' | 'grant' | 'proposal' } | null>(null);
  const [formData, setFormData] = useState({
    teamName: '',
    leadEmail: '',
    institution: '',
    proposalAbstract: '',
    githubUrl: ''
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teamName.trim() || !formData.leadEmail.trim()) {
      toast.error('Please enter team/applicant name and official email.');
      return;
    }
    const appId = `LG-${Math.floor(1000 + Math.random() * 9000)}`;
    toast.success(`Application submitted! Registration ID: #${appId}`);
    setApplyModalItem(null);
    setFormData({ teamName: '', leadEmail: '', institution: '', proposalAbstract: '', githubUrl: '' });
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-screen-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Innovation Portal</h1>
          <p className="section-subtitle">Hackathons, research grants, competitions, and knowledge sharing</p>
        </div>
        <button 
          onClick={() => setApplyModalItem({ title: 'National Land Governance Innovation Proposal', type: 'proposal' })} 
          className="btn-primary text-sm"
        >
          <Rocket size={15} /> Submit Proposal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Challenges', value: '12', icon: Trophy, color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Prize Pool', value: '₹2.1 Cr', icon: DollarSign, color: 'bg-green-50 text-green-700' },
          { label: 'Registered Teams', value: '3,847', icon: Users, color: 'bg-primary-50 text-primary-600' },
          { label: 'Grants Awarded', value: '₹8.4 Cr', icon: Award, color: 'bg-purple-50 text-purple-600' },
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-gov-text">{s.value}</p>
              <p className="text-xs text-gov-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit flex-wrap">
        {(['hackathons', 'grants', 'competitions', 'leaderboard'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-700 shadow-card' : 'text-gov-muted hover:text-gov-text'}`}
          >
            {tab === 'hackathons' ? '🏆 Hackathons' : tab === 'grants' ? '💰 Grants' : tab === 'competitions' ? '🎯 Competitions' : '📊 Leaderboard'}
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab !== 'leaderboard' && (
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-muted" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}…`}
            className="input pl-9 text-sm"
          />
        </div>
      )}

      {/* Hackathons */}
      {activeTab === 'hackathons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {mockHackathons.map((h) => {
            const sc = statusConfig[h.status];
            return (
              <div key={h.id} className="card flex flex-col overflow-hidden group">
                {h.coverImage && (
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={h.coverImage} 
                      alt={h.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span className={sc.color}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot} inline-block mr-1.5`} />{sc.label}</span>
                    </div>
                    <div className="absolute bottom-2 right-3 text-[#F9E79F] text-xs font-bold bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded">
                      Prize: {h.prizePool}
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1">
                  {!h.coverImage && (
                    <div className="flex items-center justify-between mb-3">
                      <span className={sc.color}><span className={`w-1.5 h-1.5 rounded-full ${sc.dot} inline-block mr-1.5`} />{sc.label}</span>
                      <button onClick={() => toast.success('Saved to bookmarks')} className="p-1 rounded-lg hover:bg-gray-100 text-gov-muted">
                        <Bookmark size={14} />
                      </button>
                    </div>
                  )}

                  <h3 className="font-bold text-gov-text leading-snug mb-2 text-base group-hover:text-primary-600 transition-colors">{h.title}</h3>
                  <p className="text-xs text-gov-muted mb-3 line-clamp-2 leading-relaxed">{h.description}</p>

                  <div className="space-y-2 text-xs text-gov-muted">
                    <div className="flex items-center gap-2">
                      <Lightbulb size={12} className="text-accent-500" />
                      <span><strong className="text-gov-text">Theme:</strong> {h.theme}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-primary-500" />
                      <span><strong className="text-gov-text">Participants:</strong> {h.participants.toLocaleString()} innovators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-gov-muted" />
                      <span>{h.startDate} → {h.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink size={12} className="text-gov-muted" />
                      <span className="text-xs text-primary-700 font-medium">{h.organizer}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {h.tags.map((tag) => <span key={tag} className="badge-gray text-xs"><Tag size={9} className="inline mr-0.5" />{tag}</span>)}
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-gov-border bg-gray-50/50">
                  <button
                    onClick={() => {
                      if (h.status === 'completed') {
                        toast.success('Viewing winning solutions archive');
                      } else {
                        setApplyModalItem({ title: h.title, type: 'hackathon' });
                      }
                    }}
                    className={`w-full text-sm py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${h.status === 'completed' ? 'bg-gray-100 text-gov-muted' : 'btn-primary'}`}
                  >
                    {h.status === 'active' ? <><ChevronRight size={14} /> Apply for Hackathon</> :
                      h.status === 'upcoming' ? <><Clock size={14} /> Register Interest</> :
                        <><CheckCircle2 size={14} /> View Winning Solutions</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grants */}
      {activeTab === 'grants' && (
        <div className="space-y-5">
          {/* Featured Research Fellowship Banner */}
          <div className="bg-gradient-to-r from-amber-50 via-white to-blue-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden shadow-md border border-amber-200 flex-shrink-0">
              <img 
                src="/assets/images/research_grant_award.jpg" 
                alt="National Land Governance Research Grant Award" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-[#F39C12] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Flagship Fellowship
                </span>
                <span className="text-xs text-gray-500 font-medium">Department of Science &amp; Technology · MoRD</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                National Research Grant for Land Governance Excellence 2024–25
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Awarded annually to distinguished research fellows, universities, and consortia addressing cadastral modernization, AI land tenure adjudication, and climate resilience planning. Grants up to <strong>₹50 Lakhs</strong> with access to ISRO-NRSC high-resolution satellite imagery.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <span className="text-base font-extrabold text-[#1E8449]">Total Allocation: ₹8.4 Crores</span>
                <span className="text-xs text-gray-500">· 24 Research Chairs Supported</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {grants.map((g) => (
              <div key={g.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={g.status === 'closing_soon' ? 'bg-red-100 text-red-700 badge' : 'badge-green'}>
                        {g.status === 'closing_soon' ? <AlertCircle size={10} className="inline mr-1" /> : <CheckCircle2 size={10} className="inline mr-1" />}
                        {g.status === 'closing_soon' ? 'Closing Soon' : 'Open'}
                      </span>
                      <span className="badge-gray text-xs">{g.org}</span>
                    </div>
                    <h3 className="font-bold text-gov-text mb-1">{g.title}</h3>
                    <p className="text-sm text-gov-muted mb-3">{g.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.areas.map((a) => <span key={a} className="badge-blue text-xs">{a}</span>)}
                    </div>
                  </div>
                  <div className="sm:text-right space-y-2 flex-shrink-0">
                    <p className="text-2xl font-bold text-success-500">{g.amount}</p>
                    <div className="flex items-center gap-1.5 sm:justify-end text-xs text-gov-muted">
                      <Calendar size={12} />
                      <span>Deadline: <strong>{g.deadline}</strong></span>
                    </div>
                    <button
                      onClick={() => setApplyModalItem({ title: g.title, type: 'grant' })}
                      className="btn-primary text-sm w-full sm:w-auto justify-center"
                    >
                      Apply <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitions */}
      {activeTab === 'competitions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {competitions.map((c) => (
            <div key={c.id} className="card-hover p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="badge-blue text-xs">{c.type}</span>
                <span className="text-lg font-bold text-success-500">{c.prize}</span>
              </div>
              <h3 className="font-bold text-gov-text text-sm leading-snug mb-2">{c.title}</h3>
              <div className="space-y-1.5 text-xs text-gov-muted mt-3">
                <div className="flex items-center gap-2"><Calendar size={12} />Deadline: <strong className="text-gov-text">{c.deadline}</strong></div>
                <div className="flex items-center gap-2"><Users size={12} />{c.participants} registered</div>
              </div>
              <button
                onClick={() => setApplyModalItem({ title: c.title, type: 'proposal' })}
                className="btn-primary w-full text-sm mt-4 justify-center"
              >
                Register <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="card overflow-hidden max-w-2xl">
          <div className="p-5 border-b border-gov-border">
            <h3 className="font-bold text-gov-text flex items-center gap-2">
              <Trophy size={16} className="text-accent-500" /> LandTech Challenge 2024 — Leaderboard
            </h3>
            <p className="text-xs text-gov-muted mt-0.5">Updated daily · {mockHackathons[0].participants.toLocaleString()} teams</p>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Organization</th>
                <th>Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((l) => (
                <tr key={l.rank} className={l.rank <= 3 ? 'bg-amber-50/50' : ''}>
                  <td>
                    <span className="font-bold text-gov-text">
                      {l.badge || `#${l.rank}`}
                    </span>
                  </td>
                  <td className="font-semibold text-gov-text">{l.name}</td>
                  <td className="text-sm text-gov-muted">{l.org}</td>
                  <td>
                    <span className="font-bold text-primary-600">{l.score.toLocaleString()}</span>
                  </td>
                  <td>
                    <button 
                      onClick={() => toast.success(`Viewing solution profile for ${l.name}`)}
                      className="text-xs text-primary-600 hover:underline flex items-center gap-1"
                    >
                      View <ExternalLink size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Interactive Application Modal */}
      {applyModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-gov-border w-full max-w-lg overflow-hidden flex flex-col">
            <div className="bg-[#1A5276] p-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F39C12] text-slate-900 px-2 py-0.5 rounded">
                  {applyModalItem.type === 'hackathon' ? 'Hackathon Registration' : applyModalItem.type === 'grant' ? 'Research Grant Application' : 'Innovation Pitch Submission'}
                </span>
                <h3 className="font-bold text-base mt-1 line-clamp-1">{applyModalItem.title}</h3>
              </div>
              <button 
                onClick={() => setApplyModalItem(null)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleApplicationSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Team / Applicant Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., GeoSvamitva AI / Prof. R. Sharma" 
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="input text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gov-text mb-1 block">Official Email *</label>
                  <input 
                    type="email"
                    required
                    placeholder="lead@institution.ac.in" 
                    value={formData.leadEmail}
                    onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                    className="input text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gov-text mb-1 block">Affiliated Institution</label>
                  <input 
                    type="text"
                    placeholder="IIT Delhi / State Revenue Dept" 
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Solution Abstract / Methodology</label>
                <textarea 
                  rows={3}
                  placeholder="Describe your algorithm, geospatial dataset usage, or policy intervention..." 
                  value={formData.proposalAbstract}
                  onChange={(e) => setFormData({ ...formData, proposalAbstract: e.target.value })}
                  className="input text-sm resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Project Repository or Demo Link (Optional)</label>
                <input 
                  type="url"
                  placeholder="https://github.com/..." 
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="input text-sm"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-gov-border">
                <button 
                  type="submit"
                  className="btn-primary flex-1 text-sm justify-center py-2"
                >
                  Confirm &amp; Submit Application
                </button>
                <button 
                  type="button"
                  onClick={() => setApplyModalItem(null)}
                  className="btn-secondary text-sm px-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
