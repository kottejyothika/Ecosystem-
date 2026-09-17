import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ArrowLeft,
  Sparkles,
  Trophy,
  Gift,
  CheckCircle2,
  BookOpen,
  Medal,
  Users,
  Copy,
  Check,
  Lightbulb,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const RewardsAwarenessSection: React.FC = () => {
  const {
    rewards,
    claimReward,
    leaders,
    departments,
    tips,
    stats,
    setCurrentSection,
  } = useCampaign();

  const [activeTab, setActiveTab] = useState<'rewards' | 'leaderboard' | 'awareness'>('rewards');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedTip, setExpandedTip] = useState<string | null>(tips[0]?.id || null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Badges collection
  const badges = [
    {
      id: 'b-1',
      title: 'First Drop',
      desc: 'Logged first plastic deposit at a campus hub',
      unlocked: true,
      icon: '🌱',
    },
    {
      id: 'b-2',
      title: 'Zero Waste Warrior',
      desc: 'Adopted 3+ reusable items in daily carry',
      unlocked: true,
      icon: '🛡️',
    },
    {
      id: 'b-3',
      title: 'Centurion Recycler',
      desc: 'Deposited over 20 kg of segregated plastics',
      unlocked: stats.totalPlasticCollectedKg >= 20,
      icon: '♻️',
    },
    {
      id: 'b-4',
      title: 'AITS Green Champion',
      desc: 'Earned 500+ EcoPoints on the campus portal',
      unlocked: stats.userPoints >= 500,
      icon: '👑',
    },
  ];

  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header and Back Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setCurrentSection('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mb-2"
              id="back-to-home-from-rewards"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home Dashboard
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Award className="w-6 h-6" />
              </span>
              Rewards, Leaderboards & Awareness
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Earn EcoPoints by participating in campus plastic segregation. Exchange points for cafeteria
              coupons and certificates, track campus leaderboards, and read sustainability guides.
            </p>
          </div>

          {/* User Wallet Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-100 uppercase tracking-wider font-semibold block">
                Your EcoPoints Balance
              </span>
              <div className="text-2xl font-black flex items-baseline gap-1.5">
                <span>{stats.userPoints}</span>
                <span className="text-xs font-medium text-emerald-200 uppercase">Points</span>
              </div>
              <span className="text-[10px] text-emerald-200 block">Tier: Green Crusader</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'rewards'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Redeem Rewards ({rewards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'leaderboard'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Campus Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('awareness')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'awareness'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Awareness & Tips</span>
          </button>
        </div>

        {/* Tab 1: Redeem Rewards & Badges */}
        {activeTab === 'rewards' && (
          <div className="space-y-8">
            {/* Badges strip */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Medal className="w-4 h-4 text-amber-500" />
                <span>Your Achievements & Badges</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between transition ${
                      badge.unlocked
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <h4 className="font-bold text-xs text-slate-900">{badge.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{badge.desc}</p>
                    </div>
                    <span
                      className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block self-start ${
                        badge.unlocked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {badge.unlocked ? 'Unlocked' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Catalog */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Available Campus Rewards</h3>
                <span className="text-xs text-slate-500">
                  Spend points to claim digital coupons & credentials
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const canAfford = stats.userPoints >= reward.pointsCost;

                  return (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {reward.category}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            {reward.pointsCost} Pts
                          </span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900 leading-snug">
                          {reward.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {reward.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                          <span>Stock: {reward.stock} available</span>
                          <span>Verified by AITS CSD</span>
                        </div>

                        {/* Redeemed Voucher display if claimed */}
                        {reward.claimed && reward.code && (
                          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                            <span className="text-[10px] font-semibold text-emerald-800 uppercase block mb-1">
                              Your Voucher Code:
                            </span>
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-sm text-emerald-950">
                                {reward.code}
                              </span>
                              <button
                                onClick={() => handleCopyCode(reward.code!)}
                                className="px-2 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-md text-xs border border-emerald-200 flex items-center gap-1 transition"
                              >
                                {copiedCode === reward.code ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>{copiedCode === reward.code ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                            <span className="text-[10px] text-emerald-700 block mt-1">
                              Show code at AITS canteen or CSD desk to redeem.
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => claimReward(reward.id)}
                          disabled={!canAfford || reward.stock <= 0}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 ${
                            canAfford && reward.stock > 0
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          }`}
                          id={`claim-reward-${reward.id}`}
                        >
                          <Gift className="w-4 h-4" />
                          <span>
                            {reward.stock <= 0
                              ? 'Out of Stock'
                              : canAfford
                              ? `Redeem for ${reward.pointsCost} Pts`
                              : `Need ${reward.pointsCost - stats.userPoints} More Pts`}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Campus Leaderboards */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-8">
            {/* Top 3 Podium */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-2xl p-6 border border-emerald-200/80 shadow-xs">
              <h3 className="text-center font-extrabold text-lg text-slate-900 mb-6 flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Top Campus Eco-Champions (Semester Cycle)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto items-end">
                {/* 2nd Place */}
                {leaders[1] && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center order-2 md:order-1 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 font-bold mx-auto flex items-center justify-center text-lg mb-2">
                      2
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{leaders[1].name}</h4>
                    <p className="text-xs text-slate-500">{leaders[1].department}</p>
                    <div className="mt-3 p-2 bg-teal-50 rounded-xl text-xs">
                      <span className="font-extrabold text-teal-900 text-base">
                        {leaders[1].points} Pts
                      </span>
                      <span className="block text-[10px] text-teal-700">
                        {leaders[1].plasticKg} kg diverted
                      </span>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {leaders[0] && (
                  <div className="bg-white rounded-2xl p-6 border-2 border-amber-400 text-center order-1 md:order-2 shadow-md relative -translate-y-2">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      👑 1st Rank
                    </div>
                    <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-900 font-bold mx-auto flex items-center justify-center text-xl mb-2 mt-1">
                      1
                    </div>
                    <h4 className="font-bold text-base text-slate-900">{leaders[0].name}</h4>
                    <p className="text-xs text-slate-500">{leaders[0].department}</p>
                    <div className="mt-3 p-2.5 bg-amber-50 rounded-xl text-xs border border-amber-200">
                      <span className="font-extrabold text-amber-950 text-lg">
                        {leaders[0].points} Pts
                      </span>
                      <span className="block text-[11px] text-amber-800 font-medium">
                        {leaders[0].plasticKg} kg diverted
                      </span>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {leaders[2] && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center order-3 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-800 font-bold mx-auto flex items-center justify-center text-lg mb-2">
                      3
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{leaders[2].name}</h4>
                    <p className="text-xs text-slate-500">{leaders[2].department}</p>
                    <div className="mt-3 p-2 bg-cyan-50 rounded-xl text-xs">
                      <span className="font-extrabold text-cyan-900 text-base">
                        {leaders[2].points} Pts
                      </span>
                      <span className="block text-[10px] text-cyan-700">
                        {leaders[2].plasticKg} kg diverted
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Department Standings Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Departmental Green Standings</span>
                </h4>

                <div className="space-y-3">
                  {departments.map((dept, i) => (
                    <div
                      key={dept.department}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <span className="font-semibold text-xs text-slate-900 block">
                            {dept.department}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {dept.participants} active student recyclers
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-700 block">
                          {dept.totalKg} kg
                        </span>
                        <span className="text-[10px] text-slate-500">Score: {dept.ecoScore}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Standings Table */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 mb-4 flex items-center gap-2">
                  <Medal className="w-4 h-4 text-amber-500" />
                  <span>Full Student Leaderboard</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 font-medium">
                        <th className="py-2 px-2">Rank</th>
                        <th className="py-2 px-2">Student</th>
                        <th className="py-2 px-2">Class</th>
                        <th className="py-2 px-2 text-right">Diverted</th>
                        <th className="py-2 px-2 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leaders.map((s) => (
                        <tr key={s.rollNumber} className="hover:bg-slate-50">
                          <td className="py-2.5 px-2 font-bold text-slate-700">#{s.rank}</td>
                          <td className="py-2.5 px-2">
                            <span className="font-medium text-slate-900 block">{s.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {s.rollNumber}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-slate-600">{s.department}</td>
                          <td className="py-2.5 px-2 text-right font-semibold text-slate-800">
                            {s.plasticKg} kg
                          </td>
                          <td className="py-2.5 px-2 text-right font-bold text-emerald-700">
                            {s.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Awareness Tips & Segregation Guidelines */}
        {activeTab === 'awareness' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Campus Plastic Segregation & Sustainability Guidelines</span>
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Simple habits adopted by 5,000 college students save over 18,000 kg of plastic annually.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip) => {
                  const isExpanded = expandedTip === tip.id;
                  return (
                    <div
                      key={tip.id}
                      onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        isExpanded
                          ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {tip.category}
                        </span>
                        <span className="text-xs text-emerald-700 font-semibold">
                          {isExpanded ? 'Collapse' : 'Read Guide →'}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">{tip.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tip.content}</p>

                      <div className="mt-3 p-2.5 bg-white rounded-lg border border-emerald-200/70 text-xs text-emerald-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[11px] block">AITS Campus Action:</span>
                          <span>{tip.actionableStep}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Myth Busters Card */}
            <div className="bg-gradient-to-r from-sky-50 to-teal-50 rounded-2xl p-6 border border-sky-200">
              <h4 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                <span>Myth vs. Reality: Single-Use Plastics in College</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-2xs">
                  <span className="text-rose-600 font-bold block mb-1">❌ Myth:</span>
                  <p className="text-slate-600 mb-2">"Paper coffee cups are 100% biodegradable and safe."</p>
                  <span className="text-emerald-700 font-bold block mb-1">✅ Reality:</span>
                  <p className="text-slate-700">
                    Almost all paper cups are lined with a hidden polyethylene plastic membrane that cannot decompose in normal compost.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-2xs">
                  <span className="text-rose-600 font-bold block mb-1">❌ Myth:</span>
                  <p className="text-slate-600 mb-2">"Throwing dirty food wrappers in recycling bins is fine."</p>
                  <span className="text-emerald-700 font-bold block mb-1">✅ Reality:</span>
                  <p className="text-slate-700">
                    Grease and food oils contaminate the recycling machines, often causing entire truckloads to be dumped in landfills.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-2xs">
                  <span className="text-rose-600 font-bold block mb-1">❌ Myth:</span>
                  <p className="text-slate-600 mb-2">"One student carrying a reusable bottle won't change anything."</p>
                  <span className="text-emerald-700 font-bold block mb-1">✅ Reality:</span>
                  <p className="text-slate-700">
                    One student eliminates 320 bottles/year. In an engineering batch of 500, that is 160,000 bottles diverted annually!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
