import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Clock, AlertCircle, Search, ArrowRight, RotateCcw } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'AI/ML' | 'Frontend' | 'Systems' | 'General';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
}

const DEFAULT_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Optimize LSTM gradient clipping to prevent exploding loss',
    category: 'AI/ML',
    priority: 'High',
    status: 'In Progress',
    createdAt: 'Today, 10:30 AM'
  },
  {
    id: 'task-2',
    title: 'Decode CAN frame ID 0x208 for vehicle indicator flash rate',
    category: 'Systems',
    priority: 'High',
    status: 'Completed',
    createdAt: 'Yesterday'
  },
  {
    id: 'task-3',
    title: 'Implement 60fps parallax scroll triggers with GSAP',
    category: 'Frontend',
    priority: 'Medium',
    status: 'Completed',
    createdAt: '2 days ago'
  },
  {
    id: 'task-4',
    title: 'Add PostgreSQL connection pool failover in Django backend',
    category: 'Systems',
    priority: 'Medium',
    status: 'Pending',
    createdAt: 'Today, 2:15 PM'
  },
  {
    id: 'task-5',
    title: 'Process MovieLens user-item matrix with normalized cosine',
    category: 'AI/ML',
    priority: 'Low',
    status: 'Pending',
    createdAt: 'Just now'
  }
];

export const TaskManagerDemo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('anthony_portfolio_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Task['category']>('AI/ML');
  const [newPriority, setNewPriority] = useState<Task['priority']>('High');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('anthony_portfolio_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Pending',
      createdAt: 'Just now'
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setIsAdding(false);
  };

  const updateStatus = (id: string, newStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const resetSampleTasks = () => {
    setTasks(DEFAULT_TASKS);
  };

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingTasks = filteredTasks.filter((t) => t.status === 'Pending');
  const inProgressTasks = filteredTasks.filter((t) => t.status === 'In Progress');
  const completedTasks = filteredTasks.filter((t) => t.status === 'Completed');

  const columns = [
    { title: 'Pending', count: pendingTasks.length, items: pendingTasks, color: 'text-amber-400', nextStatus: 'In Progress' as const },
    { title: 'In Progress', count: inProgressTasks.length, items: inProgressTasks, color: 'text-sky-400', nextStatus: 'Completed' as const },
    { title: 'Completed', count: completedTasks.length, items: completedTasks, color: 'text-emerald-400', nextStatus: 'Pending' as const }
  ];

  return (
    <div className="space-y-4 text-slate-200">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-sm bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search tasks by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isAdding ? 'Close Panel' : 'New Task'}</span>
          </button>

          <button
            onClick={resetSampleTasks}
            title="Reset to default tasks"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Add Task Form Collapse */}
      {isAdding && (
        <form onSubmit={addTask} className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="What needs to be done? (e.g. Build PyTorch training loop)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <div className="flex gap-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Task['category'])}
                className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
              >
                <option value="AI/ML">AI/ML</option>
                <option value="Frontend">Frontend</option>
                <option value="Systems">Systems</option>
                <option value="General">General</option>
              </select>

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
                className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Kanban Board 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.title} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className={col.color}>●</span> {col.title}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                {col.count}
              </span>
            </div>

            <div className="space-y-2.5 flex-1">
              {col.items.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-800/80 rounded-lg">
                  No tasks here
                </div>
              ) : (
                col.items.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all text-xs group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-medium text-white leading-snug">{task.title}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-0.5"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-indigo-400">{task.category}</span>
                        <span>·</span>
                        <span
                          className={`font-mono ${
                            task.priority === 'High'
                              ? 'text-rose-400'
                              : task.priority === 'Medium'
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Advance status action */}
                      <button
                        onClick={() => updateStatus(task.id, col.nextStatus)}
                        className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-indigo-400 transition-colors"
                        title={`Move to ${col.nextStatus}`}
                      >
                        <span>Move</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
