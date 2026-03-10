import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Plus, Trash2, AlertCircle, Phone, Mail, Calendar, FileText } from 'lucide-react';
import { TaskPriority } from '../../types';
import { cn } from '../../lib/utils';
import { taskService } from '../../services/task.service';

interface SuggestedTask {
  id: string;
  title: string;
  reason: string;
  priority: TaskPriority;
  type: 'call' | 'email' | 'meeting' | 'task';
  icon?: React.ReactNode;
}

interface AISuggestTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTasks: (tasks: SuggestedTask[]) => void;
}

export const AISuggestTasksModal: React.FC<AISuggestTasksModalProps> = ({ isOpen, onClose, onAddTasks }) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedTasks, setSuggestedTasks] = useState<SuggestedTask[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsAnalyzing(true);
      taskService.getSuggestions().then(data => {
        setSuggestedTasks(data);
        setIsAnalyzing(false);
      });
    }
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={16} className="text-red-500" />;
      case 'email': return <Mail size={16} className="text-amber-500" />;
      case 'meeting': return <Calendar size={16} className="text-indigo-500" />;
      default: return <FileText size={16} className="text-blue-500" />;
    }
  };

  const toggleTask = (id: string) => {
    setSelectedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleAddSelected = () => {
    const tasksToAdd = suggestedTasks.filter(t => selectedTasks.includes(t.id));
    onAddTasks(tasksToAdd);
    onClose();
  };

  const handleAddAll = () => {
    onAddTasks(suggestedTasks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={20} />
            <h2 className="text-xl font-bold text-gray-900">AI Suggested Tasks</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
            <p className="text-sm text-indigo-900 leading-relaxed font-medium">
              Based on your pipeline and activity analysis, here are recommended tasks to help you stay ahead:
            </p>
          </div>

          <div className="space-y-4">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="text-sm font-medium text-gray-500 italic">🤖 Analyzing your data...</p>
              </div>
            ) : suggestedTasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "p-4 border rounded-xl transition-all cursor-pointer group",
                  selectedTasks.includes(task.id) 
                    ? "bg-indigo-50/30 border-indigo-200 ring-1 ring-indigo-200" 
                    : "bg-white border-gray-100 hover:border-indigo-100 hover:bg-gray-50/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                    selectedTasks.includes(task.id) 
                      ? "bg-indigo-600 border-indigo-600 text-white" 
                      : "border-gray-200 bg-white group-hover:border-indigo-300"
                  )}>
                    {selectedTasks.includes(task.id) && <Check size={12} strokeWidth={4} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getIcon(task.type)}
                        <span className="text-sm font-bold text-gray-900">{task.title}</span>
                      </div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                        task.priority === 'Urgent' ? "bg-red-100 text-red-700" :
                        task.priority === 'High' ? "bg-amber-100 text-amber-700" :
                        task.priority === 'Medium' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                      )}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      <span className="font-bold text-gray-700">Reason:</span> {task.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <button
            onClick={handleAddAll}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Add All Tasks
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={handleAddSelected}
              disabled={selectedTasks.length === 0}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Selected ({selectedTasks.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
