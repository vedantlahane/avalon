import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Briefcase, AlertCircle, Bell, Repeat } from 'lucide-react';
import { Task, TaskPriority, TaskStatus, Contact, Deal } from '../../types';
import { taskService } from '../../services/task.service';
import { contactService } from '../../services/contact.service';
import { dealService } from '../../services/deal.service';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  taskId?: number;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSuccess, taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [contactId, setContactId] = useState<number | undefined>();
  const [dealId, setDealId] = useState<number | undefined>();
  const [assignee, setAssignee] = useState('Me');
  const [reminder, setReminder] = useState('None');
  const [recurring, setRecurring] = useState('None');
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (isOpen) {
        contactService.getContacts().then(setContacts);
        dealService.getDeals().then(setDeals);
        
        if (taskId) {
          try {
            const data = await taskService.getTaskById(taskId);
            setTask(data);
            setTitle(data.title);
            setDescription(data.description || '');
            if (data.dueDate) {
              const date = new Date(data.dueDate);
              setDueDate(format(date, 'yyyy-MM-dd'));
              setDueTime(format(date, 'HH:mm'));
            }
            setPriority(data.priority);
            setStatus(data.status);
            setContactId(data.contactId);
            setDealId(data.dealId);
          } catch (error) {
            console.error('Error loading task:', error);
          }
        } else {
          setTask(null);
          resetForm();
        }
      }
    };
    loadData();
  }, [isOpen, taskId]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
    setDueTime('');
    setPriority('Medium');
    setStatus('To Do');
    setContactId(undefined);
    setDealId(undefined);
    setAssignee('Me');
    setReminder('None');
    setRecurring('None');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let fullDueDate = undefined;
      if (dueDate) {
        fullDueDate = dueTime ? `${dueDate}T${dueTime}:00` : `${dueDate}T23:59:59`;
      }

      const taskData: Partial<Task> = {
        title,
        description,
        dueDate: fullDueDate,
        priority,
        status,
        contactId,
        dealId,
        aiGenerated: task?.aiGenerated || false,
      };

      if (task) {
        await taskService.updateTask(task.id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
            animate={window.innerWidth < 768 ? { y: 0 } : { x: 0 }}
            exit={window.innerWidth < 768 ? { y: '100%' } : { x: '100%' }}
            drag={window.innerWidth < 768 ? "y" : false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 200) onClose();
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bg-white shadow-2xl z-[101] flex flex-col",
              window.innerWidth < 768 
                ? "inset-0 h-full w-full rounded-t-3xl pt-2" 
                : "top-0 right-0 h-full w-full max-w-[500px]"
            )}
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden flex justify-center pb-2 shrink-0">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">{task ? 'Edit Task' : 'Add New Task'}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-base md:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details..."
                    rows={3}
                    className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Due Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Time (Optional)</label>
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TaskPriority)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as TaskStatus)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-2">
                      <User size={14} className="text-gray-400" /> Link to Contact
                    </label>
                    <select
                      value={contactId || ''}
                      onChange={(e) => setContactId(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="">None</option>
                      {contacts.map(c => (
                        <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-2">
                      <Briefcase size={14} className="text-gray-400" /> Link to Deal
                    </label>
                    <select
                      value={dealId || ''}
                      onChange={(e) => setDealId(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="">None</option>
                      {deals.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Assign To</label>
                    <select
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="Me">Me</option>
                      <option value="Alex Johnson">Alex Johnson</option>
                      <option value="Maria Garcia">Maria Garcia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-2">
                      <Bell size={14} className="text-gray-400" /> Reminder
                    </label>
                    <select
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="None">None</option>
                      <option value="15min">15 min before</option>
                      <option value="30min">30 min before</option>
                      <option value="1hr">1 hour before</option>
                      <option value="1day">1 day before</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-2">
                      <Repeat size={14} className="text-gray-400" /> Recurring
                    </label>
                    <select
                      value={recurring}
                      onChange={(e) => setRecurring(e.target.value)}
                      className="w-full px-4 py-3 md:py-2 border border-gray-100 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base md:text-sm"
                    >
                      <option value="None">None</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

            <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-end gap-3 shrink-0 sticky bottom-0 z-10">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !title}
                className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isSubmitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
