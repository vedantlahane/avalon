import React, { createContext, useContext, useState } from 'react';
import { Contact, Company, Deal, Activity, Task, Email, Notification } from './models';
import { 
  MOCK_CONTACTS, 
  MOCK_COMPANIES, 
  MOCK_DEALS, 
  MOCK_TASKS, 
  MOCK_EMAILS, 
  MOCK_NOTIFICATIONS 
} from './mockData';

interface DataStore {
  contacts: Contact[];
  companies: Company[];
  deals: Deal[];
  activities: Activity[];
  tasks: Task[];
  emails: Email[];
  notifications: Notification[];
}

interface DataContextType extends DataStore {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS as Contact[]);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES as Company[]);
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS as Deal[]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS as Task[]);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS as Email[]);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS as Notification[]);

  return (
    <DataContext.Provider value={{ 
      contacts, setContacts,
      companies, setCompanies,
      deals, setDeals,
      activities,
      tasks, setTasks,
      emails, setEmails,
      notifications, setNotifications
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a DataProvider');
  }
  return context;
};