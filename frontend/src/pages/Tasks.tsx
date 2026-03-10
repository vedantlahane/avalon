import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
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
  MoreHorizontal,
  User,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus, Contact, Deal } from '../types';
import { taskService } from '../services/task.service';
import { cn } from '../lib/utils';
import { format, isToday, isPast, isFuture, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { TaskModal } from '../components/tasks/TaskModal';
import { AISuggestTasksModal } from '../components/tasks/AISuggestTasksModal';

type ViewMode = 'List' | 'Board' | 'Calendar';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('List');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAISuggestModalOpen, setIsAISuggestModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'All'>('All');
  
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    overdue: false,
    today: false,
    upcoming: false,
    completed: true
  });

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    setSelectedTask(undefined);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
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
          "mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
          task.status === 'Completed' ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-200 hover:border-indigo-400"
        )}
      >
        {task.status === 'Completed' && <CheckCircle2 size={14} />}
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
          <div className={cn(
            "w-2 h-2 rounded-full",
            task.priority === 'Urgent' ? "bg-red-500" :
            task.priority === 'High' ? "bg-amber-500" :
            task.priority === 'Medium' ? "bg-blue-500" : "bg-gray-300"
          )} />
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-gray-500 font-medium">
          {task.dueDate && (
            <div className={cn(
              "flex items-center gap-1",
              isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'Completed' ? "text-red-500" : 
              isToday(new Date(task.dueDate)) && task.status !== 'Completed' ? "text-amber-600" : ""
            )}>
              <Clock size={12} />
              <span>{format(new Date(task.dueDate), 'MMM d, h:mm a')}</span>
              {isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'Completed' && (
                <span>(Overdue)</span>
              )}
            </div>
          )}
          
          {task.contact && (
            <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
              <User size={12} />
              <span>{task.contact.firstName} {task.contact.lastName}</span>
            </div>
          )}
          
          {task.deal && (
            <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
              <Briefcase size={12} />
              <span>{task.deal.name}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => handleEditTask(task)}
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-6">
      {/* Overdue */}
      {overdueTasks.length > 0 && (
        <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleSection('overdue')}
            className="w-full px-6 py-3 bg-red-50/50 flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" size={18} />
              <h3 className="text-sm font-black text-red-900 uppercase tracking-widest">Overdue ({overdueTasks.length})</h3>
            </div>
            {collapsedSections.overdue ? <ChevronDown size={18} className="text-red-400" /> : <ChevronUp size={18} className="text-red-400" />}
          </button>
          {!collapsedSections.overdue && (
            <div className="divide-y divide-gray-50">
              {overdueTasks.map(renderTaskItem)}
            </div>
          )}
        </div>
      )}

      {/* Due Today */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <button 
          onClick={() => toggleSection('today')}
          className="w-full px-6 py-3 bg-gray-50/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Clock className="text-amber-500" size={18} />
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Due Today ({todayTasks.length})</h3>
          </div>
          {collapsedSections.today ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
        </button>
        {!collapsedSections.today && (
          <div className="divide-y divide-gray-50">
            {todayTasks.length > 0 ? todayTasks.map(renderTaskItem) : (
              <div className="p-8 text-center text-gray-400 italic text-sm">No tasks due today. Relax! 🌴</div>
            )}
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <button 
          onClick={() => toggleSection('upcoming')}
          className="w-full px-6 py-3 bg-gray-50/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <ArrowRight className="text-indigo-500" size={18} />
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Upcoming ({upcomingTasks.length})</h3>
          </div>
          {collapsedSections.upcoming ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
        </button>
        {!collapsedSections.upcoming && (
          <div className="divide-y divide-gray-50">
            {upcomingTasks.map(renderTaskItem)}
          </div>
        )}
      </div>

      {/* Completed */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <button 
          onClick={() => toggleSection('completed')}
          className="w-full px-6 py-3 bg-gray-50/50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={18} />
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Completed ({completedTasks.length})</h3>
          </div>
          {collapsedSections.completed ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
        </button>
        {!collapsedSections.completed && (
          <div className="divide-y divide-gray-50">
            {completedTasks.slice(0, 5).map(renderTaskItem)}
            {completedTasks.length > 5 && (
              <button className="w-full p-3 text-center text-xs font-bold text-indigo-600 hover:bg-gray-50">
                Show all {completedTasks.length} completed tasks
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderBoardView = () => {
    const statuses: TaskStatus[] = ['To Do', 'In Progress', 'Completed'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {statuses.map(status => {
          const statusTasks = filteredTasks.filter(t => t.status === status);
          return (
            <div key={status} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">{status}</h3>
                  <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-bold">{statusTasks.length}</span>
                </div>
                <button className="text-gray-400 hover:text-indigo-600 p-1">
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-100/50 rounded-2xl border border-dashed border-gray-200">
                {statusTasks.map(task => (
                  <div 
                    key={task.id} 
                    onClick={() => handleEditTask(task)}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className={cn(
                        "text-sm font-bold",
                        task.status === 'Completed' ? "text-gray-400 line-through" : "text-gray-900"
                      )}>
                        {task.title}
                      </div>
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1 shrink-0",
                        task.priority === 'Urgent' ? "bg-red-500" :
                        task.priority === 'High' ? "bg-amber-500" :
                        task.priority === 'Medium' ? "bg-blue-500" : "bg-gray-300"
                      )} />
                    </div>
                    
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                        <Clock size={12} />
                        <span>{task.dueDate ? format(new Date(task.dueDate), 'MMM d') : 'No date'}</span>
                      </div>
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[8px] font-bold text-indigo-600">
                          ME
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCalendarView = () => {
    const today = new Date();
    const start = startOfMonth(today);
    const end = endOfMonth(today);
    const days = eachDayOfInterval({ start: startOfWeek(start), end: endOfWeek(end) });

    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">{format(today, 'MMMM yyyy')}</h3>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500">
              <ChevronDown className="rotate-90" size={18} />
            </button>
            <button className="px-3 py-1 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Today</button>
            <button className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500">
              <ChevronDown className="-rotate-90" size={18} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-[10px] font-black uppercase tracking-widest text-gray-400 border-r border-gray-50 last:border-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 grid-rows-5 h-[calc(100vh-350px)] min-h-[500px]">
          {days.map((day, idx) => {
            const dayTasks = filteredTasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));
            const isCurrentMonth = isSameMonth(day, today);
            const isTodayDay = isToday(day);
            
            return (
              <div 
                key={idx} 
                className={cn(
                  "p-2 border-r border-b border-gray-50 last:border-r-0 flex flex-col gap-1 transition-colors",
                  !isCurrentMonth ? "bg-gray-50/50" : "bg-white",
                  isTodayDay && "ring-2 ring-inset ring-indigo-500/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full",
                    isTodayDay ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : 
                    !isCurrentMonth ? "text-gray-300" : "text-gray-500"
                  )}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id}
                      onClick={() => handleEditTask(task)}
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[9px] font-bold truncate cursor-pointer transition-transform hover:scale-[1.02]",
                        task.priority === 'Urgent' ? "bg-red-50 text-red-700 border-l-2 border-red-500" :
                        task.priority === 'High' ? "bg-amber-50 text-amber-700 border-l-2 border-amber-500" :
                        task.priority === 'Medium' ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500" :
                        "bg-gray-50 text-gray-700 border-l-2 border-gray-400"
                      )}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Tasks
            <span className="text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{tasks.length}</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium italic text-sm">Stay focused, crush your goals. 🚀</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAISuggestModalOpen(true)}
            className="flex items-center gap-2 bg-white border border-indigo-100 text-indigo-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all shadow-sm"
          >
            <Sparkles size={18} />
            <span>🤖 AI Suggest Tasks</span>
          </button>
          <button 
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 border border-gray-200 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks, descriptions, contacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setViewMode('List')}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              viewMode === 'List' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutList size={14} />
            <span>List</span>
          </button>
          <button 
            onClick={() => setViewMode('Board')}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              viewMode === 'Board' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutDashboard size={14} />
            <span>Board</span>
          </button>
          <button 
            onClick={() => setViewMode('Calendar')}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
              viewMode === 'Calendar' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <CalendarIcon size={14} />
            <span>Calendar</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="flex-1 md:flex-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          >
            <option value="All">Priority: All</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="flex-1 md:flex-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          >
            <option value="All">Status: All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        {viewMode === 'List' && renderListView()}
        {viewMode === 'Board' && renderBoardView()}
        {viewMode === 'Calendar' && renderCalendarView()}
      </div>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onSuccess={fetchTasks}
        task={selectedTask}
      />
      
      <AISuggestTasksModal
        isOpen={isAISuggestModalOpen}
        onClose={() => setIsAISuggestModalOpen(false)}
        onAddTasks={handleAddAISuggestedTasks}
      />
    </div>
  );
};
