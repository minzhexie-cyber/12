import React, { useState, useEffect } from 'react';
import { Heart, Users, Clock, Trophy } from 'lucide-react';

export default function ClassHarmonyGame() {
  const [gameState, setGameState] = useState('start');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [harmony, setHarmony] = useState(50);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerCount, setPlayerCount] = useState(2);
  const [scores, setScores] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const scenarios = [
    {
      title: '座位風波',
      description: '小明和小美都想坐在靠窗的位置，兩人為此爭執不休。',
      options: [
        { text: '建議他們輪流坐靠窗位置', effect: 15, feedback: '很好的折衷方案！' },
        { text: '讓老師決定誰坐窗邊', effect: 5, feedback: '不太能幫助他們學會合作...' },
        { text: '邀請他們一起享受靠窗的美景', effect: 20, feedback: '太棒了！化解了衝突！' },
        { text: '建議都坐中間位置', effect: 8, feedback: '有點勉強...' }
      ]
    },
    {
      title: '小團體排擠',
      description: '小芳最近被朋友冷落，獨自坐在角落。',
      options: [
        { text: '直接告訴朋友要包容小芳', effect: 10, feedback: '命令不如主動接納...' },
        { text: '邀請小芳一起加入活動', effect: 18, feedback: '這是個溫暖的舉動！' },
        { text: '裝作沒看到', effect: -10, feedback: '這樣會讓情況更糟...' },
        { text: '和小芳聊天，了解發生了什麼', effect: 20, feedback: '同情心和傾聽最重要！' }
      ]
    },
    {
      title: '功課分配爭議',
      description: '小組功課中，有人認為分配不公平，拒絕做自己的部分。',
      options: [
        { text: '重新討論如何公平分配工作', effect: 18, feedback: '溝通是解決問題的關鍵！' },
        { text: '讓他們自己解決，別管', effect: -5, feedback: '需要一些引導呢...' },
        { text: '把所有工作分給積極的人', effect: 5, feedback: '這樣不公平...' },
        { text: '承認不公平，一起想辦法改進', effect: 22, feedback: '太成熟了！' }
      ]
    },
    {
      title: '課堂打擾',
      description: '小王經常說話打擾課堂，同學們很煩躁。',
      options: [
        { text: '大聲罵他', effect: -8, feedback: '這樣只會更激怒他...' },
        { text: '友善地提醒他，請他配合', effect: 16, feedback: '溫和有效！' },
        { text: '下課後私下談談為什麼他會說話', effect: 20, feedback: '了解原因才能幫助他！' },
        { text: '告訴老師讓老師處理', effect: 6, feedback: '這是逃避責任...' }
      ]
    },
    {
      title: '物品遺失事件',
      description: '班上有人弄丟了同學的文具盒，他很生氣。',
      options: [
        { text: '一起幫忙找，如果找不到就賠償', effect: 19, feedback: '負責任和同情心並存！' },
        { text: '算了，反正又不是我的', effect: -15, feedback: '缺乏責任感...' },
        { text: '先道歉，再想辦法解決', effect: 21, feedback: '這就是成熟的態度！' },
        { text: '指責對方為什麼要放在這裡', effect: 2, feedback: '轉移責任不是好方法...' }
      ]
    }
  ];

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('end');
    }
  }, [timeLeft, gameState]);

  const startGame = (count) => {
    setPlayerCount(count);
    setScores(Array(count).fill(0));
    setCurrentPlayer(0);
    setScenarioIndex(0);
    setGameState('playing');
    setHarmony(50);
    setTimeLeft(300);
  };

  const selectOption = (optionIndex) => {
    const option = scenarios[scenarioIndex].options[optionIndex];
    const newHarmony = Math.max(0, Math.min(100, harmony + option.effect));
    setHarmony(newHarmony);
    setFeedback(option.feedback);

    const newScores = [...scores];
    newScores[currentPlayer] += Math.abs(option.effect);
    setScores(newScores);

    setTimeout(() => {
      if (scenarioIndex < scenarios.length - 1) {
        setScenarioIndex(scenarioIndex + 1);
        setCurrentPlayer((currentPlayer + 1) % playerCount);
        setFeedback('');
      } else {
        setGameState('end');
      }
    }, 2000);
  };

  const getHarmonyColor = () => {
    if (harmony >= 75) return 'text-green-500';
    if (harmony >= 50) return 'text-yellow-500';
    if (harmony >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
              ✨ 班級和諧守護者 ✨
            </h1>
            <p className="text-gray-600 text-sm">幫助班級解決人際衝突的遊戲</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4">
              <p className="text-gray-700 text-sm">👥 選擇玩家人數</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => startGame(num)}
                className="bg-gradient-to-br from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition transform hover:scale-105"
              >
                {num} 人遊戲
              </button>
            ))}
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 text-sm text-center text-gray-700">
            <p>⏱️ 每局 5 分鐘 | 💭 5 個衝突情境</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const scenario = scenarios[scenarioIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">
        <div className="max-w-2xl mx-auto">
          {/* 頂部資訊欄 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-2xl p-3 text-center shadow-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-2xl font-bold text-gray-800">{formatTime(timeLeft)}</p>
            </div>
            <div className="bg-white rounded-2xl p-3 text-center shadow-lg">
              <Users className="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <p className="text-lg font-bold text-gray-800">玩家 {currentPlayer + 1}/{playerCount}</p>
            </div>
            <div className={`bg-white rounded-2xl p-3 text-center shadow-lg ${getHarmonyColor()}`}>
              <Heart className="w-5 h-5 mx-auto mb-1" />
              <p className="text-2xl font-bold">{harmony}%</p>
            </div>
          </div>

          {/* 團結質進度條 */}
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
            <p className="text-sm font-bold text-gray-600 mb-2">班級團結質</p>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  harmony >= 75
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : harmony >= 50
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                    : harmony >= 25
                    ? 'bg-gradient-to-r from-orange-400 to-red-400'
                    : 'bg-gradient-to-r from-red-400 to-pink-500'
                }`}
                style={{ width: `${harmony}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {harmony >= 75 && '✨ 班級超級和諧！'}
              {harmony >= 50 && harmony < 75 && '😊 班級氣氛不錯'}
              {harmony >= 25 && harmony < 50 && '😐 需要更多努力'}
              {harmony < 25 && '😞 班級需要幫助'}
            </p>
          </div>

          {/* 情境卡 */}
          <div className="bg-white rounded-3xl p-6 mb-4 shadow-xl">
            <p className="text-sm font-bold text-purple-500 mb-2">情境 {scenarioIndex + 1}/5</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{scenario.title}</h2>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">{scenario.description}</p>

            {feedback && (
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-purple-300 rounded-xl p-3 mb-4 text-center">
                <p className="font-bold text-gray-800">{feedback}</p>
              </div>
            )}
          </div>

          {/* 選項按鈕 */}
          {!feedback && (
            <div className="grid grid-cols-1 gap-3">
              {scenario.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className="bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-gray-800 font-bold py-4 px-4 rounded-2xl transition transform hover:scale-105 shadow-lg text-left"
                >
                  {String.fromCharCode(65 + idx)}. {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    const maxScore = Math.max(...scores);
    const winners = scores
      .map((score, idx) => ({ player: idx + 1, score }))
      .filter((s) => s.score === maxScore);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
            遊戲結束！
          </h1>
          <p className="text-gray-600 mb-6">最終班級團結質：</p>

          <div className={`text-5xl font-bold mb-6 ${getHarmonyColor()}`}>
            {harmony}%
          </div>

          <div className="mb-6 text-left bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4">
            <p className="font-bold text-gray-800 mb-3">🏆 玩家成績：</p>
            {scores.map((score, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700">玩家 {idx + 1}</span>
                <span className={`font-bold text-lg ${scores[idx] === maxScore ? 'text-yellow-500' : 'text-gray-600'}`}>
                  {score} 分 {scores[idx] === maxScore && '👑'}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 mb-6 text-sm text-gray-700">
            {harmony >= 75 && '✨ 太棒了！你們是班級和諧的守護者！'}
            {harmony >= 50 && harmony < 75 && '😊 表現不錯！繼續加油！'}
            {harmony >= 25 && harmony < 50 && '💪 還有進步的空間，下次會更好！'}
            {harmony < 25 && '🆘 記得多傾聽、多包容、多溝通！'}
          </div>

          <button
            onClick={() => setGameState('start')}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition transform hover:scale-105"
          >
            再玩一次
          </button>
        </div>
      </div>
    );
  }
}
