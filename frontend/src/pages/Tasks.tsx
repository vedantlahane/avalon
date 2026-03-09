import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Clock, Plus, Filter, Search } from 'lucide-react';
import { Task } from '../types';
import { taskService } from '../services/task.service';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    taskService.getTasks().then(data => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-gray-500 mt-1">Stay on top of your follow-ups and action items.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900">
            <Filter size={14} />
            <span>Priority</span>
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {tasks.map(task => (
            <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors group">
              <button className="mt-0.5 text-gray-300 hover:text-indigo-600 transition-colors">
                {task.status === 'Completed' ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle size={20} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-sm font-bold text-gray-900 truncate",
                  task.status === 'Completed' && "line-through text-gray-400 font-medium"
                )}>
                  {task.title}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={10} />
                    <span>{task.dueDate ? format(new Date(task.dueDate), 'MMM d, h:mm a') : 'No due date'}</span>
                  </div>
                  <div className={cn(
                    "px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                    task.priority === 'High' || task.priority === 'Urgent' ? "bg-red-50 text-red-600" : 
                    task.priority === 'Medium' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                  )}>
                    {task.priority}
                  </div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
