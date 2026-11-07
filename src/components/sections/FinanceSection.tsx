import React, { useState } from 'react';
import { 
  DollarSign, Search, ExternalLink, Bookmark, Layers, 
  Tag, Award, HelpCircle, ShieldCheck, PieChart, 
  ArrowUpRight, Calculator, CheckCircle2
} from 'lucide-react';
import { SCHOLARSHIPS_DATA, STUDENT_DISCOUNTS_DATA } from '../../data/resourcesData';
import { AudienceTarget } from '../../types';

interface FinanceSectionProps {
  audience: AudienceTarget;
  onOpenWireframe: () => void;
  onToggleBookmark: (id: string, title: string, category: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const FinanceSection: React.FC<FinanceSectionProps> = ({
  onOpenWireframe,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'budget-calc' | 'scholarships' | 'discounts' | 'loans'>('budget-calc');

  // --- Student Monthly Budget Calculator State ---
  const [incomePartTime, setIncomePartTime] = useState(650);
  const [incomeFinancialAid, setIncomeFinancialAid] = useState(400);
  const [incomeFamily, setIncomeFamily] = useState(150);

  const [expenseHousing, setExpenseHousing] = useState(550);
  const [expenseFood, setExpenseFood] = useState(250);
  const [expenseBooksTech, setExpenseBooksTech] = useState(80);
  const [expenseTransport, setExpenseTransport] = useState(60);
  const [expensePersonal, setExpensePersonal] = useState(120);

  const totalMonthlyIncome = incomePartTime + incomeFinancialAid + incomeFamily;
  const totalMonthlyExpenses = expenseHousing + expenseFood + expenseBooksTech + expenseTransport + expensePersonal;
  const netMonthlyCashflow = totalMonthlyIncome - totalMonthlyExpenses;

  // Needs vs Wants vs Savings
  const needsTotal = expenseHousing + expenseFood + expenseTransport;
  const wantsTotal = expensePersonal + expenseBooksTech;
  const needsRatio = totalMonthlyIncome > 0 ? Math.round((needsTotal / totalMonthlyIncome) * 100) : 0;
  const wantsRatio = totalMonthlyIncome > 0 ? Math.round((wantsTotal / totalMonthlyIncome) * 100) : 0;

  // --- Scholarship Finder Filters ---
  const [scholarshipSearch, setScholarshipSearch] = useState('');
  const [scholarshipCategory, setScholarshipCategory] = useState<string>('all');
  const [scholarshipLevel, setScholarshipLevel] = useState<string>('all');

  const filteredScholarships = SCHOLARSHIPS_DATA.filter((sch) => {
    const matchesSearch = sch.name.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
      sch.description.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
      sch.provider.toLowerCase().includes(scholarshipSearch.toLowerCase());
    const matchesCategory = scholarshipCategory === 'all' || sch.category === scholarshipCategory;
    const matchesLevel = scholarshipLevel === 'all' || sch.targetLevel === scholarshipLevel || sch.targetLevel === 'All';
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // --- Discounts Category Filter ---
  const [discountCategory, setDiscountCategory] = useState<string>('all');
  const filteredDiscounts = STUDENT_DISCOUNTS_DATA.filter((disc) => {
    if (discountCategory === 'all') return true;
    return disc.category === discountCategory;
  });

  return (
    <section id="finance" className="py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Section 04</span>
              <span aria-hidden="true">·</span>
              <span>Financial Literacy, Grants &amp; Debt Mitigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Financial Literacy &amp; Scholarships
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Monthly student cash flow calculators, zero-fee vetted scholarship databases, verified student software discounts, and federal loan roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark('finance-suite', 'Financial Literacy & Scholarship Suite', 'Finance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isBookmarked('finance-suite')
                  ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('finance-suite') ? 'fill-amber-600 dark:fill-amber-400' : ''}`} />
              <span>{isBookmarked('finance-suite') ? 'Saved in Toolkit' : 'Save Section'}</span>
            </button>

            <button
              onClick={onOpenWireframe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Section Blueprint &amp; UX Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 overflow-x-auto border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('budget-calc')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'budget-calc'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Interactive Student Budget Calculator
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'scholarships'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Vetted Scholarships Directory
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'discounts'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Student Discounts Vault ($1,200+ Value)
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'loans'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Student Loan &amp; FAFSA Guide
          </button>
        </div>

        {/* Tab 1: Interactive Student Budget Calculator */}
        {activeTab === 'budget-calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Columns */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Monthly Student Cash Flow Simulator
                </h3>
                <span className="text-xs text-slate-500">Estimates per calendar month</span>
              </div>

              {/* Monthly Inflows */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                  Monthly Income &amp; Inflows ($)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Part-Time / Work-Study</label>
                    <input
                      type="number"
                      value={incomePartTime}
                      onChange={(e) => setIncomePartTime(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Aid / Stipend Refund</label>
                    <input
                      type="number"
                      value={incomeFinancialAid}
                      onChange={(e) => setIncomeFinancialAid(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Family / Other Support</label>
                    <input
                      type="number"
                      value={incomeFamily}
                      onChange={(e) => setIncomeFamily(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Outflows */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
                  Monthly Expenses &amp; Outflows ($)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Rent / Dorm Share</label>
                    <input
                      type="number"
                      value={expenseHousing}
                      onChange={(e) => setExpenseHousing(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Groceries &amp; Meal Plan</label>
                    <input
                      type="number"
                      value={expenseFood}
                      onChange={(e) => setExpenseFood(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Books &amp; Software</label>
                    <input
                      type="number"
                      value={expenseBooksTech}
                      onChange={(e) => setExpenseBooksTech(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Transport / Transit Pass</label>
                    <input
                      type="number"
                      value={expenseTransport}
                      onChange={(e) => setExpenseTransport(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 dark:text-slate-400 mb-1">Social / Personal / Subscriptions</label>
                    <input
                      type="number"
                      value={expensePersonal}
                      onChange={(e) => setExpensePersonal(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Cash Flow Health & 50/30/20 Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  Monthly Balance Summary
                </span>

                <div className="my-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Net Monthly Cash Flow</div>
                    <div className={`text-2xl font-bold font-mono tabular-nums ${netMonthlyCashflow >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {netMonthlyCashflow >= 0 ? `+$${netMonthlyCashflow}` : `-$${Math.abs(netMonthlyCashflow)}`}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-slate-500">Total Income: <span className="font-semibold text-slate-900 dark:text-white font-mono">${totalMonthlyIncome}</span></div>
                    <div className="text-slate-500">Total Expenses: <span className="font-semibold text-slate-900 dark:text-white font-mono">${totalMonthlyExpenses}</span></div>
                  </div>
                </div>

                {/* 50/30/20 Gauge */}
                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Needs (Target ≤ 50%):</span>
                      <span className="font-mono tabular-nums font-semibold">{needsRatio}% (${needsTotal})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${needsRatio <= 55 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ width: `${Math.min(needsRatio, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Wants &amp; Discretionary (Target ≤ 30%):</span>
                      <span className="font-mono tabular-nums font-semibold">{wantsRatio}% (${wantsTotal})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${wantsRatio <= 30 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(wantsRatio, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 leading-normal">
                    {netMonthlyCashflow > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Positive surplus! Set up an automatic transfer of ${(netMonthlyCashflow * 0.7).toFixed(0)} to a High-Yield Savings Account (HYSA) for emergency cushioning.
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 font-medium">
                        ⚠ Deficit warning: Look into campus food pantry programs, library textbook reserves, and federal SNAP benefits for students.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vetted Scholarships Directory */}
        {activeTab === 'scholarships' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={scholarshipSearch}
                  onChange={(e) => setScholarshipSearch(e.target.value)}
                  placeholder="Search by name, criteria, or keyword..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={scholarshipCategory}
                  onChange={(e) => setScholarshipCategory(e.target.value)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                >
                  <option value="all">All Categories</option>
                  <option value="STEM">STEM</option>
                  <option value="Need-Based">Need-Based</option>
                  <option value="First-Gen">First-Generation</option>
                  <option value="Merit">Merit-Based</option>
                  <option value="Diversity">Diversity</option>
                </select>

                <select
                  value={scholarshipLevel}
                  onChange={(e) => setScholarshipLevel(e.target.value)}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                >
                  <option value="all">All Education Levels</option>
                  <option value="High School">High School Seniors</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {sch.category} · {sch.targetLevel}
                      </span>
                      <span className="font-mono text-slate-500">
                        Deadline: {sch.deadline}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {sch.name}
                    </h4>

                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                      Award: {sch.amount}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {sch.description}
                    </p>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                      <strong>Eligibility:</strong> {sch.eligibility}
                    </div>
                  </div>

                  <a
                    href={sch.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    <span>Official Application Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Student Discounts Vault */}
        {activeTab === 'discounts' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="text-xs text-slate-500">
                Verified student programs providing over $1,200/year in immediate savings with a valid school email.
              </span>

              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                {(['all', 'Software & Tech', 'Entertainment & Audio', 'Retail & Hardware', 'Transit & Travel'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDiscountCategory(cat)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      discountCategory === cat
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {cat === 'all' ? 'All Perks' : cat.split(' & ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDiscounts.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                      {item.category}
                    </span>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {item.service}
                    </h4>

                    <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-900/40 text-xs mb-3">
                      <div className="font-semibold text-amber-900 dark:text-amber-200">
                        {item.discountOffer}
                      </div>
                      <div className="text-[11px] text-slate-500 line-through">
                        Normal: {item.regularPrice}
                      </div>
                      <div className="text-xs font-bold text-emerald-600">
                        Student: {item.studentPrice}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {item.highlightNotes}
                    </p>

                    <div className="text-[11px] text-slate-400 mb-4">
                      <strong>Verification:</strong> {item.verificationMethod}
                    </div>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <span>Claim Perk</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Student Loan & FAFSA Guide */}
        {activeTab === 'loans' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Loan Hierarchy
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Subsidized vs. Unsubsidized
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                <strong>Direct Subsidized Loans:</strong> The U.S. government pays interest while you are enrolled at least half-time. Always accept these first.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Direct Unsubsidized Loans:</strong> Interest begins capitalizing immediately upon disbursement. Pay interest while in school if possible to avoid compounding debt.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Annual Timeline
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                The FAFSA &amp; CSS Profile
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li>• <strong>December / January:</strong> File FAFSA at studentaid.gov early; state aid is first-come, first-served.</li>
                <li>• <strong>February - April:</strong> Compare financial aid award letters. Calculate net cost (Tuition + Room - Free Aid).</li>
                <li>• <strong>May 1:</strong> National College Decision Day deposit.</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Repayment Strategies
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Income-Driven (IDR) &amp; PSLF
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                <strong>Income-Driven Repayment (IDR/SAVE):</strong> Caps monthly student loan payments at a percentage of your discretionary income; $0 payments if earning under threshold.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Public Service Loan Forgiveness (PSLF):</strong> Forgives remaining federal direct loan balance tax-free after 120 qualifying monthly payments while working for government or 501(c)(3) non-profits.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
