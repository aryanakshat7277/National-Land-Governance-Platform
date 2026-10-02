import { useState } from 'react';
import { Users, Plus, MessageSquare, FileText, Clock,
  Tag, ChevronRight, Search, Filter, ExternalLink, UserPlus } from 'lucide-react';
import { mockWorkspaces } from '@/data/mockData';
import toast from 'react-hot-toast';

const statusConfig = {
  active: { label: 'Active', color: 'badge-green' },
  completed: { label: 'Completed', color: 'badge-blue' },
  paused: { label: 'Paused', color: 'badge-amber' },
};

const avatarColors = [
  'bg-primary-100 text-primary-700',
  'bg-accent-100 text-accent-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-rose-100 text-rose-700',
];

const recentActivity = [
  { user: 'Dr. Priya Sharma', action: 'uploaded a new dataset', workspace: 'Land Dispute Analytics', time: '2h ago', dot: 'bg-primary-500' },
  { user: 'Ravi Kumar (IAS)', action: 'commented on policy brief', workspace: 'Land Dispute Analytics', time: '4h ago', dot: 'bg-accent-500' },
  { user: 'Prof. Ananya Das', action: 'shared ML model results', workspace: 'Land Dispute Analytics', time: '6h ago', dot: 'bg-success-500' },
  { user: 'Dr. Raghav Menon', action: 'added 3 research papers', workspace: 'Climate-Land Nexus', time: '1d ago', dot: 'bg-purple-500' },
  { user: 'Arvind Nair', action: 'updated GIS layers', workspace: 'Climate-Land Nexus', time: '1d ago', dot: 'bg-primary-500' },
];

const memberDirectory = [
  { name: 'Dr. Priya Sharma', org: 'IIT Bombay', role: 'Researcher', tags: ['land records', 'ML'] },
  { name: 'Ravi Kumar (IAS)', org: 'DLR, GoI', role: 'Policy Official', tags: ['policy', 'governance'] },
  { name: 'Prof. Ananya Das', org: 'ISI Kolkata', role: 'Data Scientist', tags: ['ML', 'statistics'] },
  { name: 'Dr. Raghav Menon', org: 'TERI University', role: 'Researcher', tags: ['climate', 'agriculture'] },
  { name: 'Dr. Neha Patel', org: 'CEPT University', role: 'Urban Planner', tags: ['urban', 'RERA'] },
  { name: 'Meenakshi Reddy', org: 'NRSC-ISRO', role: 'GIS Analyst', tags: ['GIS', 'satellite'] },
];

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'members' | 'activity'>('workspaces');
  const [search, setSearch] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [workspacesList, setWorkspacesList] = useState(mockWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState<typeof mockWorkspaces[0] | null>(null);
  const [newWsTitle, setNewWsTitle] = useState('');
  const [newWsDesc, setNewWsDesc] = useState('');
  const [newWsInvite, setNewWsInvite] = useState('');

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsTitle.trim()) {
      toast.error('Please enter a workspace title');
      return;
    }
    const newWs = {
      id: `ws-${Date.now()}`,
      title: newWsTitle.trim(),
      description: newWsDesc.trim() || 'Collaborative research group investigating evidence-based land governance.',
      members: [
        { id: `u-${Date.now()}`, name: 'You (Lead PI)', role: 'Lead Researcher', avatar: undefined },
        { id: `u-${Date.now() + 1}`, name: newWsInvite.trim() || 'Dr. S. K. Nair', role: 'Research Fellow', avatar: undefined },
      ],
      tags: ['research', 'collaboration', 'governance'],
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      documentsCount: 1,
      messagesCount: 0,
      coverImage: '/assets/images/smart_village_planning.jpg',
    };
    setWorkspacesList([newWs, ...workspacesList]);
    setShowNewModal(false);
    setNewWsTitle('');
    setNewWsDesc('');
    setNewWsInvite('');
    toast.success(`Workspace "${newWs.title}" created successfully!`);
  };

  const filteredWs = workspacesList.filter((w) =>
    !search || w.title.toLowerCase().includes(search.toLowerCase()) || w.tags.some((t) => t.includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-screen-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-title">Collaboration Hub</h1>
          <p className="section-subtitle">Research workspaces for multi-institutional collaboration</p>
        </div>
        <button onClick={() => setShowNewModal(true)} className="btn-primary text-sm">
          <Plus size={15} /> New Workspace
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Workspaces', value: '48', icon: Users, color: 'bg-primary-50 text-primary-600' },
          { label: 'Registered Members', value: '5,630', icon: UserPlus, color: 'bg-green-50 text-green-700' },
          { label: 'Shared Documents', value: '12,847', icon: FileText, color: 'bg-amber-50 text-amber-600' },
          { label: 'Institutions', value: '127', icon: ExternalLink, color: 'bg-purple-50 text-purple-600' },
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
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {(['workspaces', 'members', 'activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-700 shadow-card' : 'text-gov-muted hover:text-gov-text'}`}
          >
            {tab === 'workspaces' ? 'Research Workspaces' : tab === 'members' ? 'Member Directory' : 'Activity Feed'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'workspaces' ? 'Search workspaces…' : 'Search members…'}
            className="input pl-9 text-sm"
          />
        </div>
        <button className="btn-secondary text-sm"><Filter size={14} /> Filter</button>
      </div>

      {/* Workspaces */}
      {activeTab === 'workspaces' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {filteredWs.map((ws) => {
            const statusCfg = statusConfig[ws.status];
            return (
              <div key={ws.id} className="card-hover flex flex-col overflow-hidden">
                {/* Visual Workspace Cover Header */}
                {ws.coverImage && (
                  <div className="h-36 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={ws.coverImage} 
                      alt={ws.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span className={statusCfg.color}>{statusCfg.label}</span>
                    </div>
                    <div className="absolute bottom-2 right-3 text-white text-[11px] font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                      {ws.documentsCount} Research Assets
                    </div>
                  </div>
                )}

                <div className="p-5 flex-1">
                  {!ws.coverImage && (
                    <div className="flex items-start justify-between mb-3">
                      <span className={statusCfg.color}>{statusCfg.label}</span>
                      <button className="p-1 rounded-lg hover:bg-primary-50 text-gov-muted hover:text-primary-600">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  )}
                  <h3 className="font-bold text-gov-text leading-snug mb-2 text-base">{ws.title}</h3>
                  <p className="text-xs text-gov-muted line-clamp-2 leading-relaxed">{ws.description}</p>

                  {/* Members */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex -space-x-2">
                      {ws.members.slice(0, 4).map((m, i) => (
                        <div
                          key={m.id}
                          className={`w-7 h-7 rounded-full ${avatarColors[i % avatarColors.length]} border-2 border-white flex items-center justify-center text-xs font-semibold shadow-sm`}
                          title={m.name}
                        >
                          {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      ))}
                      {ws.members.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gov-muted">
                          +{ws.members.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gov-muted font-medium">{ws.members.length} Active Collaborators</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {ws.tags.map((tag) => (
                      <span key={tag} className="badge-gray text-xs flex items-center gap-1">
                        <Tag size={9} />{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-gov-border flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gov-muted">
                    <span className="flex items-center gap-1"><FileText size={11} />{ws.documentsCount}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={11} />{ws.messagesCount}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{ws.lastActivity}</span>
                  </div>
                  <button
                    onClick={() => setSelectedWorkspace(ws)}
                    className="flex items-center gap-1 text-xs text-primary-600 font-semibold hover:underline"
                  >
                    Open <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Create new workspace card */}
          <div
            onClick={() => setShowNewModal(true)}
            className="card border-dashed border-2 border-gov-border flex flex-col items-center justify-center p-8 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-primary-100 flex items-center justify-center mb-3 transition-colors">
              <Plus size={20} className="text-gov-muted group-hover:text-primary-600" />
            </div>
            <p className="font-medium text-gov-muted group-hover:text-primary-600 text-sm transition-colors">Create New Workspace</p>
            <p className="text-xs text-gray-400 mt-1 text-center">Start a collaborative research project</p>
          </div>
        </div>
      )}

      {/* Member directory */}
      {activeTab === 'members' && (
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Organization</th>
                <th>Role</th>
                <th>Expertise</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {memberDirectory
                .filter((m) => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.org.toLowerCase().includes(search.toLowerCase()))
                .map((m, i) => (
                  <tr key={m.name}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
                          {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-gov-text text-sm">{m.name}</span>
                      </div>
                    </td>
                    <td className="text-sm text-gov-muted">{m.org}</td>
                    <td><span className="badge-blue text-xs">{m.role}</span></td>
                    <td>
                      <div className="flex gap-1 flex-wrap">
                        {m.tags.map((t) => <span key={t} className="badge-gray text-xs">{t}</span>)}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => toast.success(`Invite sent to ${m.name}`)}
                        className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1"
                      >
                        <UserPlus size={12} /> Invite
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Activity feed */}
      {activeTab === 'activity' && (
        <div className="card p-5 max-w-2xl">
          <h3 className="font-semibold text-gov-text mb-4">Recent Activity</h3>
          <div className="space-y-0">
            {recentActivity.map((a, i) => (
              <div key={i} className="timeline-item">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${a.dot} ring-4 ring-opacity-20 flex-shrink-0`} />
                  {i < recentActivity.length - 1 && <div className="w-0.5 flex-1 bg-gov-border mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm text-gov-text">
                    <strong className="text-primary-700">{a.user}</strong>{' '}
                    <span className="text-gov-muted">{a.action}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge-blue text-xs">{a.workspace}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workspace Detail Modal */}
      {selectedWorkspace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-gov-border w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {selectedWorkspace.coverImage && (
              <div className="h-44 w-full relative bg-slate-900">
                <img 
                  src={selectedWorkspace.coverImage} 
                  alt={selectedWorkspace.title} 
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => setSelectedWorkspace(null)}
                    className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <Plus size={18} className="rotate-45" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded">
                    Active Multi-Institutional Workspace
                  </span>
                  <h2 className="text-xl font-bold mt-1 text-white">{selectedWorkspace.title}</h2>
                </div>
              </div>
            )}

            <div className="p-6 space-y-4 overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedWorkspace.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Workspace Collaborators</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedWorkspace.members.map((m, idx) => (
                    <div key={m.id || idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1A5276] text-white flex items-center justify-center text-xs font-bold">
                        {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{m.name}</p>
                        <p className="text-[10px] text-slate-500">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 py-2 border-y border-slate-100 text-center">
                <div>
                  <p className="text-lg font-bold text-primary-600">{selectedWorkspace.documentsCount}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Shared Papers &amp; GIS Datasets</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-600">{selectedWorkspace.messagesCount}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Working Discussions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">{selectedWorkspace.createdAt}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Inaugurated Date</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => toast.success('Launching Jupyter GIS sandbox environment...')}
                  className="btn-primary text-xs flex-1 justify-center py-2"
                >
                  Launch Interactive Geo-Notebook
                </button>
                <button
                  onClick={() => toast.success('Opening secure file deposit vault')}
                  className="btn-secondary text-xs flex-1 justify-center py-2"
                >
                  Upload Working Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Workspace Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-gov-border p-6 w-full max-w-md">
            <h3 className="font-bold text-lg text-gov-text mb-1">Create Research Workspace</h3>
            <p className="text-xs text-gov-muted mb-4">Invite cross-disciplinary researchers and collaborate on national land datasets</p>
            <form onSubmit={handleCreateWorkspace} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Workspace Title *</label>
                <input 
                  required
                  placeholder="e.g., Urban Cadastral Land Pooling Study 2025" 
                  value={newWsTitle}
                  onChange={(e) => setNewWsTitle(e.target.value)}
                  className="input text-sm" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Research Objectives</label>
                <textarea 
                  rows={3}
                  placeholder="Describe key research hypotheses, state geographies, and methodologies…" 
                  value={newWsDesc}
                  onChange={(e) => setNewWsDesc(e.target.value)}
                  className="input text-sm resize-none" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gov-text mb-1 block">Invite Collaborator Email</label>
                <input 
                  type="email"
                  placeholder="researcher@iitd.ac.in" 
                  value={newWsInvite}
                  onChange={(e) => setNewWsInvite(e.target.value)}
                  className="input text-sm" 
                />
              </div>
              <div className="flex gap-2 pt-2 border-t border-gov-border">
                <button
                  type="submit"
                  className="btn-primary flex-1 text-sm justify-center py-2"
                >
                  Create &amp; Initialize
                </button>
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)} 
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
