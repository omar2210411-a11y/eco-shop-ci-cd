import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const SustainabilityBadge = ({ score }) => {
  const getScoreInfo = (score) => {
    if (score >= 80) return { text: 'Eco-Friendly', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good Choice', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };
  
  const scoreInfo = getScoreInfo(score);
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${scoreInfo.color}`}>
      <FaLeaf className="mr-2 text-sm" />
      <span className="text-sm font-semibold">{scoreInfo.text}</span>
      <span className="ml-2 text-xs font-bold">{score}/100</span>
    </div>
  );
};

export default SustainabilityBadge;