import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter, 
  Search, 
  LayoutList, 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Sparkles, 
  MoreVertical,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  User,
  Briefcase,
  ArrowRight,
  Bot
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../types';
import { taskService } from '../services/task.service';
import { cn } from '../lib/utils';
import { format, isToday, isPast, isFuture, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { TaskModal } from '../components/tasks/TaskModal';
import { AISuggestTasksModal } from '../components/tasks/AISuggestTasksModal';
import { EmptyState } from '../components/common/EmptyState';
import { ListSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';
import { useModalStore } from '../lib/modal-store';

type ViewMode = 'List' | 'Board' | 'Calendar';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('List');
  const { taskModal } = useModalStore();
  const [isAISuggestModalOpen, setIsAISuggestModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    overdue: false,
    today: false,
    upcoming: false,
    completed: true
  });

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Listen for modal success to refresh data
  useEffect(() => {
    if (!taskModal.isOpen) {
      fetchTasks();
    }
  }, [taskModal.isOpen]);

  const handleToggleTask = async (task: Task) => {
    try {
      const newStatus: TaskStatus = task.status === 'Completed' ? 'To Do' : 'Completed';
      await taskService.updateTask(task.id, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAddTask = () => {
    taskModal.open();
  };

  const handleEditTask = (task: Task) => {
    taskModal.open(task.id);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const overdueTasks = filteredTasks.filter(t => t.status !== 'Completed' && t.dueDate && isPast(new Date(t.dueDate)) && !isToday(new Date(t.dueDate)));
  const todayTasks = filteredTasks.filter(t => t.status !== 'Completed' && t.dueDate && isToday(new Date(t.dueDate)));
  const upcomingTasks = filteredTasks.filter(t => t.status !== 'Completed' && (!t.dueDate || (isFuture(new Date(t.dueDate)) && !isToday(new Date(t.dueDate)))));
  const completedTasks = filteredTasks.filter(t => t.status === 'Completed');

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderTaskItem = (task: Task) => (
    <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-all group border-b border-gray-100 last:border-0">
      <button 
        onClick={() => handleToggleTask(task)}
        className={cn(
          "mt-1 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ripple",
          task.status === 'Completed' ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200 hover:border-indigo-400"
        )}
      >
        {task.status === 'Completed' && (
           <svg className="w-3.5 h-3.5 checkbox-draw" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
           </svg>
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-bold truncate",
            task.status === 'Completed' ? "text-gray-400 line-through" : "text-gray-900"
          )}>
            {task.title}
          </span>
          {task.aiGenerated && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase tracking-wider">
              <Sparkles size={10} />
              <span>AI</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-[11px] text-gray-500 font-bold uppercase">
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1",
              isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'Completed' ? "text-rose-500" : 
              isToday(new Date(task.dueDate)) && task.status !== 'Completed' ? "text-amber-500" : ""
            )}>
              <Clock size={12} />
              <span>{format(new Date(task.dueDate), 'MMM d, h:mm a')}</span>
            </div>
          )}
          
          {task.contact && (
            <div className="flex items-center gap-1">
              <User size={12} className="text-gray-400" />
              <span>{task.contact.firstName} {task.contact.lastName}</span>
            </div>
          )}
          
          {task.deal && (
            <div className="flex items-center gap-1 text-indigo-600">
              <Briefcase size={12} />
              <span>{task.deal.name}</span>
            </div>
          )}
        </div>
      </div>
      
      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-gray-600">
        <MoreVertical size={16} />
      </button>
    </div>
  );

  const handleAddAISuggestedTasks = async (suggestedTasks: any[]) => {
    try {
      for (const st of suggestedTasks) {
        await taskService.createTask({
          title: st.title,
          description: st.reason,
          priority: st.priority,
          status: 'To Do',
          aiGenerated: true,
          dueDate: new Date().toISOString()
        });
      }
      fetchTasks();
    } catch (error) {
      console.error('Error adding AI suggested tasks:', error);
    }
  };

  if (isLoading) return <ListSkeleton />;
  if (error) return <ErrorState onRetry={fetchTasks} />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24 md:pb-12 page-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">{tasks.filter(t => t.status !== 'Completed').length} active tasks remaining</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setIsAISuggestModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-100 border border-indigo-100 transition-all ripple shadow-sm"
          >
            <Bot size={18} />
            <span>AI Suggestions</span>
          </button>
          <button 
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md btn-hover ripple"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-3 border border-gray-100 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl w-full md:w-auto">
          {(['List', 'Board', 'Calendar'] as ViewMode[]).map((mode) => (
            <button 
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === mode ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {mode === 'List' && <LayoutList size={14} />}
              {mode === 'Board' && <LayoutDashboard size={14} />}
              {mode === 'Calendar' && <CalendarIcon size={14} />}
              <span>{mode}</span>
            </button>
          ))}
        </div>
        
        <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:text-indigo-600 ripple transition-colors">
          <Filter size={18} />
        </button>
      </div>

      <div className="space-y-6">
        {tasks.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No tasks yet"
            description="Stay organized by adding tasks or let AI suggest them!"
            actions={[{ label: 'Add Task', onClick: handleAddTask, icon: Plus }]}
          />
        ) : viewMode === 'List' ? (
          <div className="space-y-8">
            {overdueTasks.length > 0 && (
              <div className="bg-white border border-rose-100 rounded-2xl shadow-sm overflow-hidden">
                <button onClick={() => toggleSection('overdue')} className="w-full px-6 py-4 bg-rose-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-rose-500" size={18} />
                    <h3 className="text-xs font-black text-rose-900 uppercase tracking-widest">Overdue ({overdueTasks.length})</h3>
                  </div>
                  {collapsedSections.overdue ? <ChevronDown size={18} className="text-rose-400" /> : <ChevronUp size={18} className="text-rose-400" />}
                </button>
                {!collapsedSections.overdue && <div className="divide-y divide-gray-100">{overdueTasks.map(renderTaskItem)}</div>}
              </div>
            )}
            
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <button onClick={() => toggleSection('today')} className="w-full px-6 py-4 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="text-amber-500" size={18} />
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Due Today ({todayTasks.length})</h3>
                </div>
                {collapsedSections.today ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
              </button>
              {!collapsedSections.today && (
                <div className="divide-y divide-gray-100">
                  {todayTasks.length > 0 ? todayTasks.map(renderTaskItem) : (
                    <div className="p-12 text-center text-gray-400 font-medium text-sm">No tasks due today. 🌴</div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <button onClick={() => toggleSection('upcoming')} className="w-full px-6 py-4 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="text-indigo-500" size={18} />
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Upcoming ({upcomingTasks.length})</h3>
                </div>
                {collapsedSections.upcoming ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
              </button>
              {!collapsedSections.upcoming && <div className="divide-y divide-gray-100">{upcomingTasks.map(renderTaskItem)}</div>}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <button onClick={() => toggleSection('completed')} className="w-full px-6 py-4 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-emerald-500" size={18} />
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Completed ({completedTasks.length})</h3>
                </div>
                {collapsedSections.completed ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
              </button>
              {!collapsedSections.completed && (
                <div className="divide-y divide-gray-100">
                  {completedTasks.slice(0, 5).map(renderTaskItem)}
                  {completedTasks.length > 5 && (
                    <button className="w-full py-3 text-xs font-bold text-indigo-600 hover:bg-gray-50">Show All {completedTasks.length} Completed</button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-gray-100 text-center">
            <p className="text-gray-400 font-bold italic">Board and Calendar views coming soon in the polish update!</p>
          </div>
        )}
      </div>

      <AISuggestTasksModal isOpen={isAISuggestModalOpen} onClose={() => setIsAISuggestModalOpen(false)} onAddTasks={handleAddAISuggestedTasks} />
    </div>
  );
};