import React, { useState } from 'react';
import { X, Sparkles, Wand2, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { emailTemplateService } from '../../services/emailTemplate.service';
import { toast } from 'react-hot-toast';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: { subject: string; body: string }) => void;
}

const AIGenerateModal: React.FC<AIGenerateModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await emailTemplateService.generateEmailTemplate({
        description,
        tone,
        length
      });
      setVariations(data);
      setStep('results');
    } catch (error) {
      console.error('Error generating template:', error);
      toast.error('Failed to generate template variations');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">AI Template Generator</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {step === 'input' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What kind of template do you need?
                </label>
                <textarea
                  className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-sm placeholder:text-gray-400"
                  placeholder="e.g. A follow-up email for leads who attended our webinar but haven't booked a demo yet..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Formal</option>
                    <option>Urgent</option>
                    <option>Casual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Length</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  >
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!description || isGenerating}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating Variations...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate 3 Variations</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">AI Generated 3 variations based on your prompt:</span>
                <button 
                  onClick={() => setStep('input')}
                  className="text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
              </div>

              <div className="space-y-4 h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {variations.map((v, i) => (
                  <div 
                    key={i} 
                    className="group border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer relative"
                    onClick={() => onSelect(v)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Variation {i + 1}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                          Select <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">{v.subject}</h4>
                    <p className="text-sm text-gray-600 line-clamp-3 italic leading-relaxed">
                      {v.body.split('\n')[0]}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerateModal;
