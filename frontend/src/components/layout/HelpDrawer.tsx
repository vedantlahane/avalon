import React, { useState } from 'react';
import { X, Search, ChevronLeft, MessageSquare, Mail, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useHelpStore } from '@/lib/help-store';
import { HELP_CATEGORIES, HELP_ARTICLES } from '@/data/helpData';
import { cn } from '@/lib/utils';

export const HelpDrawer: React.FC = () => {
  const { isHelpOpen, closeHelp, selectedArticleId, setSelectedArticle } = useHelpStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isHelpOpen) return null;

  const selectedArticle = selectedArticleId ? HELP_ARTICLES[selectedArticleId] : null;

  const filteredCategories = HELP_CATEGORIES.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity" 
        onClick={closeHelp}
      />
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isHelpOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xl">❓</span>
            <h2 className="text-lg font-semibold">Help & Documentation</h2>
          </div>
          <button onClick={closeHelp} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedArticle ? (
          /* Article View */
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-4"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Help
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📖</span>
                <h1 className="text-xl font-bold">{selectedArticle.title}</h1>
              </div>
            </div>
            
            <div className="p-6 prose prose-indigo max-w-none">
              <div className="whitespace-pre-line text-gray-600 leading-relaxed">
                {selectedArticle.content}
              </div>

              <div className="mt-8 pt-8 border-t">
                <p className="text-sm font-medium text-gray-900 mb-4">Was this helpful?</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span>Not helpful</span>
                  </button>
                </div>
              </div>

              {selectedArticle.relatedArticles && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Articles:</h3>
                  <ul className="space-y-2">
                    {selectedArticle.relatedArticles.map(article => (
                      <li key={article.id}>
                        <button 
                          onClick={() => setSelectedArticle(article.id)}
                          className="text-indigo-600 hover:underline text-sm"
                        >
                          • {article.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Categories View */
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-8">
                {filteredCategories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-xs font-bold text-gray-500 tracking-wider mb-3 px-2">
                      {category.title}
                    </h3>
                    <div className="space-y-1">
                      {category.articles.map(article => (
                        <button
                          key={article.id}
                          onClick={() => setSelectedArticle(article.id)}
                          className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-all flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                          {article.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!selectedArticle && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm font-medium text-gray-900 mb-3">💬 Still need help?</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Ask AI
              </button>
              <button className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                Support
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
