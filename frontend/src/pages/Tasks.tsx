import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Badge } from '../components/common/Badge';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  Search, 
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  Target
} from 'lucide-react';
import { Button } from '../components/common/FormControls';

const Tasks: React.FC = () => {
  const { tasks, setTasks } = useStore();
  const [filter, setFilter] = useState<'all' | 'todo' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'todo') return task.status === 'todo';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { 
      ...t, 
      status: t.status === 'completed' ? 'todo' : 'completed' 
    } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tasks</h1>
          <p className="text-[var(--text-muted)] text-sm">Stay on top of your follow-ups and AI-suggested actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm">
            <Plus size={14} className="mr-2" /> Add Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-[var(--border-color)]">
        <button 
          onClick={() => setFilter('all')}
          className={`pb-3 text-sm font-medium transition-colors relative ${filter === 'all' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          All Tasks
          {filter === 'all' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)]" />}
        </button>
        <button 
          onClick={() => setFilter('todo')}
          className={`pb-3 text-sm font-medium transition-colors relative ${filter === 'todo' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          To Do
          {filter === 'todo' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)]" />}
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`pb-3 text-sm font-medium transition-colors relative ${filter === 'completed' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          Completed
          {filter === 'completed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--accent)]" />}
        </button>
      </div>

      <div className="space-y-2">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            className={`flex items-center gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] group hover:border-[var(--accent)] transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}
          >
            <button 
              onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.status === 'completed' ? 'bg-nexus-success border-nexus-success text-white' : 'border-[var(--border-color)] hover:border-[var(--accent)]'}`}
            >
              {task.status === 'completed' && <CheckCircle2 size={14} />}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`text-sm font-medium truncate ${task.status === 'completed' ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                  {task.title}
                </h4>
                {task.isAiSuggested && (
                  <Badge variant="accent" className="text-[9px] px-1.5 py-0">AI Suggested</Badge>
                )}
                {task.priority === 'urgent' && (
                  <Badge variant="danger" className="text-[9px] px-1.5 py-0">Urgent</Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                  <Calendar size={12} />
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
                {task.dealTitle && (
                  <span className="flex items-center gap-1 text-[10px] text-[var(--accent)] font-medium">
                    <Target size={12} />
                    {task.dealTitle}
                  </span>
                )}
                {task.contactName && (
                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)]">
                    <Clock size={12} />
                    {task.contactName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreVertical size={14} />
              </Button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 border border-dashed border-[var(--border-color)]">
            <p className="text-[var(--text-muted)] text-sm">No tasks found in this view.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
