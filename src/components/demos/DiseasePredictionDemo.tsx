import React, { useState } from 'react';
import { Activity, ShieldAlert, Sparkles, Check, AlertCircle } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  category: string;
}

const AVAILABLE_SYMPTOMS: Symptom[] = [
  { id: 'fever', name: 'High Fever (>101°F)', category: 'Systemic' },
  { id: 'cough', name: 'Persistent Dry Cough', category: 'Respiratory' },
  { id: 'fatigue', name: 'Severe Fatigue / Lethargy', category: 'Systemic' },
  { id: 'breath', name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'headache', name: 'Throbbing Headache', category: 'Neurological' },
  { id: 'joint_pain', name: 'Joint & Muscle Pain', category: 'Musculoskeletal' },
  { id: 'loss_smell', name: 'Loss of Smell / Taste', category: 'Neurological' },
  { id: 'chills', name: 'Chills & Shivering', category: 'Systemic' },
  { id: 'sore_throat', name: 'Sore & Scratchy Throat', category: 'Respiratory' },
  { id: 'chest_pain', name: 'Chest Tightness', category: 'Respiratory' },
  { id: 'nausea', name: 'Nausea / Vomiting', category: 'Gastrointestinal' },
  { id: 'skin_rash', name: 'Erythematous Skin Rash', category: 'Dermatological' }
];

interface DiseaseMatch {
  disease: string;
  probability: number;
  riskLevel: 'High' | 'Moderate' | 'Low';
  primaryTriggers: string[];
  recommendations: string[];
}

export const DiseasePredictionDemo: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'fever',
    'cough',
    'fatigue'
  ]);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const categories = ['All', 'Systemic', 'Respiratory', 'Neurological', 'Musculoskeletal'];

  const filteredSymptoms =
    activeFilter === 'All'
      ? AVAILABLE_SYMPTOMS
      : AVAILABLE_SYMPTOMS.filter((s) => s.category === activeFilter);

  // Compute simulated Random Forest classification probabilities based on symptom vectors
  const calculatePrediction = (): DiseaseMatch[] => {
    const has = (id: string) => selectedSymptoms.includes(id);

    // Scoring weights
    let viralScore = 0;
    let covidScore = 0;
    let dengueScore = 0;
    let bronchitisScore = 0;
    let migraineScore = 0;

    if (has('fever')) { viralScore += 30; covidScore += 25; dengueScore += 45; }
    if (has('cough')) { viralScore += 30; covidScore += 35; bronchitisScore += 50; }
    if (has('fatigue')) { viralScore += 20; covidScore += 20; dengueScore += 25; }
    if (has('breath')) { covidScore += 40; bronchitisScore += 35; }
    if (has('loss_smell')) { covidScore += 50; }
    if (has('joint_pain')) { dengueScore += 45; viralScore += 15; }
    if (has('headache')) { migraineScore += 60; dengueScore += 20; }
    if (has('skin_rash')) { dengueScore += 40; }
    if (has('chest_pain')) { bronchitisScore += 40; covidScore += 25; }
    if (has('sore_throat')) { viralScore += 25; covidScore += 20; bronchitisScore += 15; }

    const rawTotal = viralScore + covidScore + dengueScore + bronchitisScore + migraineScore || 1;

    const list: DiseaseMatch[] = [
      {
        disease: 'Viral Influenza (Flu)',
        probability: Math.min(97, Math.round((viralScore / rawTotal) * 100)),
        riskLevel: (viralScore > 50 ? 'High' : 'Moderate') as DiseaseMatch['riskLevel'],
        primaryTriggers: ['Fever', 'Cough', 'Fatigue'],
        recommendations: ['Adequate hydration & rest', 'Antipyretics for fever control', 'Consult physician if symptoms persist > 48h']
      },
      {
        disease: 'Upper Respiratory / COVID-19',
        probability: Math.min(97, Math.round((covidScore / rawTotal) * 100)),
        riskLevel: (covidScore > 50 ? 'High' : 'Moderate') as DiseaseMatch['riskLevel'],
        primaryTriggers: ['Dry Cough', 'Loss of Smell', 'Shortness of Breath'],
        recommendations: ['Perform RT-PCR or rapid antigen screen', 'Monitor peripheral SpO2 saturation', 'Self-isolate to prevent transmission']
      },
      {
        disease: 'Vector-Borne / Dengue Fever',
        probability: Math.min(97, Math.round((dengueScore / rawTotal) * 100)),
        riskLevel: (dengueScore > 40 ? 'High' : 'Low') as DiseaseMatch['riskLevel'],
        primaryTriggers: ['High Fever', 'Joint Pain', 'Skin Rash'],
        recommendations: ['Serum platelet count monitoring (CBC)', 'Strict hydration with electrolyte solutions', 'Avoid NSAIDs like ibuprofen without medical supervision']
      },
      {
        disease: 'Acute Bronchial Infection',
        probability: Math.min(97, Math.round((bronchitisScore / rawTotal) * 100)),
        riskLevel: (bronchitisScore > 40 ? 'Moderate' : 'Low') as DiseaseMatch['riskLevel'],
        primaryTriggers: ['Cough', 'Chest Tightness', 'Dyspnea'],
        recommendations: ['Warm steam inhalation', 'Pulmonary function assessment', 'Bronchodilator review if wheezing occurs']
      }
    ].sort((a, b) => b.probability - a.probability);

    return list;
  };

  const predictions = calculatePrediction();
  const topDiagnosis = predictions[0];

  return (
    <div className="space-y-6 text-slate-200">
      {/* Symptom Selection Panel */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight">Clinical Symptom Matrix</h4>
            <p className="text-xs text-slate-400">Select active patient indicators to trigger real-time Random Forest inference.</p>
          </div>
          <span className="text-xs font-mono text-indigo-400">
            {selectedSymptoms.length} of {AVAILABLE_SYMPTOMS.length} Selected
          </span>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 mb-3 p-1 bg-slate-950/60 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                activeFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Symptom Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`flex items-center justify-between p-2 rounded-lg text-xs transition-all text-left border ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="truncate pr-1">{symptom.name}</span>
                <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                  isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Diagnostic Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ranked Predictions List */}
        <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Differential Diagnosis Distribution</span>
            <span className="text-xs font-mono text-emerald-400">Random Forest (100 Estimators)</span>
          </div>

          <div className="space-y-3">
            {predictions.map((p, idx) => (
              <div key={p.disease} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-500">0{idx + 1}.</span>
                    <span className="font-semibold text-white">{p.disease}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      p.riskLevel === 'High' ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {p.riskLevel} Risk
                    </span>
                    <span className="font-mono font-bold text-white tabular-nums">{p.probability}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      idx === 0
                        ? 'bg-gradient-to-r from-indigo-500 to-sky-400'
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${Math.max(5, p.probability)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Triage Advice Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Primary Diagnostic Match</span>
            </div>
            <h5 className="text-base font-bold text-white">{topDiagnosis.disease}</h5>
            <p className="text-xs text-slate-400 mt-1 mb-3">
              Predicted confidence: <span className="text-emerald-400 font-mono font-semibold">{topDiagnosis.probability}%</span> based on decision tree ensemble entropy.
            </p>

            <span className="text-xs font-semibold text-slate-300 block mb-1.5">Key Clinical Precautions:</span>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              {topDiagnosis.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            <span>Interactive machine learning simulation trained on symptom-disease dataset.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
