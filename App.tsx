
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { HeroScene, ChristmasHatScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, Gift, Snowflake, Bell, TreePine, Volume2, VolumeX, Music, Heart, Mail, Star, Palette } from 'lucide-react';
import { playClick, playMagicChime } from './utils/audio';

// Theme Definitions
const THEMES = {
  classic: {
    name: '經典紅綠',
    colors: {
      red: '#C41E3A',
      green: '#165B33',
      gold: '#D4AF37',
      cream: '#F8F5E6',
      dark: '#0F2F24',
    }
  },
  winter: {
    name: '冰雪奇緣',
    colors: {
      red: '#0077BE',    // Ice Blue (Primary Accent)
      green: '#5F9EA0',  // Cadet Blue (Secondary Accent)
      gold: '#C0C0C0',   // Silver
      cream: '#F0F8FF',  // Alice Blue (Background)
      dark: '#0B1026',   // Midnight Blue (Text)
    }
  }
};

type ThemeKey = keyof typeof THEMES;

// Snowfall Component
const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {snowflakes.map((_, i) => {
        const left = Math.random() * 100 + 'vw';
        const animationDuration = Math.random() * 3 + 5 + 's';
        const animationDelay = Math.random() * 5 + 's';
        const opacity = Math.random();
        return (
          <div
            key={i}
            className="snowflake"
            style={{ left, animationDuration, animationDelay, opacity }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
};

// Music Player Component
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    playClick(); // Sound effect
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Automatic playback started!
            })
            .catch((error) => {
              console.error("Auto-play was prevented or failed:", error);
              setPlaying(false);
            });
        }
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
       {/* Audio Element with multiple sources for compatibility */}
      <audio ref={audioRef} loop>
        <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e7/Jingle_Bells_-_Kevin_MacLeod.ogg/Jingle_Bells_-_Kevin_MacLeod.ogg.mp3" type="audio/mpeg" />
        <source src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Jingle_Bells_-_Kevin_MacLeod.ogg" type="audio/ogg" />
      </audio>
      
      {/* Music Note Animation (only when playing) */}
      {playing && (
        <div className="flex gap-2 mb-2 mr-4">
             <div className="animate-[bounce_1s_infinite] text-christmas-red"><Music size={16}/></div>
             <div className="animate-[bounce_1.5s_infinite] text-christmas-green"><Music size={12}/></div>
             <div className="animate-[bounce_1.2s_infinite] text-christmas-gold"><Music size={14}/></div>
        </div>
      )}

      <button
        onClick={togglePlay}
        className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-xl transition-all duration-300 border-2 ${
            playing 
            ? 'bg-christmas-red text-white border-christmas-gold scale-105' 
            : 'bg-white text-christmas-dark border-stone-200 hover:border-christmas-green'
        }`}
      >
        {playing ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
        <span className="font-serif font-bold text-sm tracking-wide">
          {playing ? "聖誕音樂: 開" : "聖誕音樂: 關"}
        </span>
      </button>
    </div>
  );
};

// Christmas Letter Component
const ChristmasLetter = () => {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
      playMagicChime(); // Magical sound effect
      setSent(true);
  };

  if (sent) {
    return (
       <div className="bg-white p-12 rounded-xl shadow-xl text-center border-4 border-christmas-gold max-w-lg mx-auto transform transition-all animate-fade-in-up bg-[url('https://www.transparenttextures.com/patterns/snow.png')]">
          <div className="w-20 h-20 bg-christmas-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift size={40} className="text-christmas-red" />
          </div>
          <h3 className="text-3xl font-serif text-christmas-green font-bold mb-4">已發送至北極！</h3>
          <p className="text-stone-600 font-serif text-lg leading-relaxed mb-6">
             聖誕老人的馴鹿已經帶著你的心願起飛了。<br/>願你的聖誕充滿愛與奇蹟！
          </p>
          <div className="flex justify-center gap-2 text-christmas-gold mb-6">
              <Star className="fill-current" />
              <Star className="fill-current" />
              <Star className="fill-current" />
          </div>
          <button onClick={() => {playClick(); setSent(false); setMessage('')}} className="text-sm font-bold text-christmas-red hover:text-christmas-green underline tracking-widest uppercase">
             再寫一封信
          </button>
       </div>
    );
  }

  return (
    <div className="bg-[#fffdf7] p-8 md:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto border border-stone-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-3 candy-stripe"></div>
       <div className="border-b-2 border-dashed border-stone-200 pb-6 mb-8 flex justify-between items-center">
          <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] text-christmas-red uppercase mb-2">來自世界各地的聲音</span>
              <h3 className="font-serif text-3xl text-christmas-dark">致聖誕老人的信</h3>
          </div>
          <div className="bg-christmas-green/10 p-3 rounded-full">
              <TreePine className="text-christmas-green" size={32} />
          </div>
       </div>
       
       <div className="mb-6">
           <label className="block text-sm font-bold text-stone-400 uppercase tracking-wider mb-2">親愛的聖誕老人：</label>
           <textarea
              className="w-full bg-stone-50 border-2 border-stone-100 rounded-lg p-6 resize-none focus:ring-2 focus:ring-christmas-gold focus:border-christmas-gold focus:outline-none text-xl font-serif leading-relaxed text-stone-700 min-h-[240px] placeholder:text-stone-300 placeholder:italic transition-all"
              placeholder="今年我想要許下一個願望..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
           />
       </div>

       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-400 italic">
              * 你的信件將由魔法雪橇直接送達。
          </p>
          <button
             onClick={handleSend}
             disabled={!message.trim()}
             className="bg-christmas-red text-white px-10 py-4 rounded-full font-bold hover:bg-christmas-green hover:shadow-lg hover:-translate-y-1 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
          >
             <Mail size={20} /> 蓋上郵戳並發送
          </button>
       </div>
    </div>
  );
}

const ElfCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border-2 border-transparent hover:border-christmas-green/30 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-xs relative overflow-hidden" style={{ animationDelay: delay }}>
      <div className="w-16 h-16 rounded-full bg-christmas-cream mb-4 flex items-center justify-center border-2 border-christmas-gold shadow-inner group-hover:scale-110 transition-transform">
        <Gift size={24} className="text-christmas-red" />
      </div>
      <h3 className="font-serif text-xl text-christmas-dark text-center mb-1 font-bold">{name}</h3>
      <div className="h-0.5 w-10 bg-christmas-gold mb-3"></div>
      <p className="text-sm text-stone-500 font-medium uppercase tracking-wider text-center">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('classic');

  // Apply Theme CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = THEMES[currentTheme].colors;
    
    root.style.setProperty('--color-christmas-red', colors.red);
    root.style.setProperty('--color-christmas-green', colors.green);
    root.style.setProperty('--color-christmas-gold', colors.gold);
    root.style.setProperty('--color-christmas-cream', colors.cream);
    root.style.setProperty('--color-christmas-dark', colors.dark);
    
    // Also set a data attribute for any specific css selectors if needed
    root.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleTheme = () => {
      playClick();
      setCurrentTheme(prev => prev === 'classic' ? 'winter' : 'classic');
  }

  return (
    <div className="min-h-screen bg-christmas-cream text-christmas-dark selection:bg-christmas-red selection:text-white font-serif transition-colors duration-500">
      <Snowfall />
      <MusicPlayer />

      {/* Theme Switcher Button */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
          <button 
             onClick={toggleTheme}
             className="flex items-center gap-3 px-5 py-3 rounded-full shadow-xl transition-all duration-300 border-2 bg-white text-christmas-dark border-stone-200 hover:border-christmas-green hover:text-christmas-green"
          >
             <Palette size={20} />
             <span className="font-serif font-bold text-sm tracking-wide">
                 {THEMES[currentTheme].name}
             </span>
          </button>
      </div>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-christmas-cream/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-christmas-red rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg border-2 border-christmas-gold pb-1 relative transition-colors duration-500">
                <Star size={20} className="fill-white" />
            </div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity text-christmas-green ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              SANTA'S <span className="font-normal text-christmas-red">WORKSHOP</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-christmas-dark">
            <a href="#story" onClick={scrollToSection('story')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase font-bold flex items-center gap-1"><Bell size={14}/> 聖誕故事</a>
            <a href="#magic" onClick={scrollToSection('magic')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase font-bold flex items-center gap-1"><Gift size={14}/> 魔法秘密</a>
            <a href="#wish" onClick={scrollToSection('wish')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase font-bold flex items-center gap-1"><Mail size={14}/> 許願信箱</a>
            <a href="#elves" onClick={scrollToSection('elves')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase font-bold">精靈團隊</a>
          </div>

          <button className="md:hidden text-christmas-red p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-christmas-cream flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in bg-[url('https://www.transparenttextures.com/patterns/snow.png')]">
            <a href="#story" onClick={scrollToSection('story')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase">聖誕故事</a>
            <a href="#magic" onClick={scrollToSection('magic')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase">魔法秘密</a>
            <a href="#wish" onClick={scrollToSection('wish')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase">許願信箱</a>
            <a href="#elves" onClick={scrollToSection('elves')} className="hover:text-christmas-red transition-colors cursor-pointer uppercase">精靈團隊</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-christmas-dark transition-colors duration-500">
        <HeroScene colors={THEMES[currentTheme].colors} />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(248,245,230,0.1)_0%,rgba(22,91,51,0.5)_50%,rgba(15,47,36,0.9)_100%)]" style={{ opacity: currentTheme === 'winter' ? 0.3 : 1 }} />
        {currentTheme === 'winter' && <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,rgba(0,119,190,0.3)_50%,rgba(11,16,38,0.9)_100%)]" />}

        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="inline-block mb-4 px-4 py-1 border border-christmas-gold text-christmas-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-md bg-christmas-dark/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            North Pole • Christmas Eve
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-white drop-shadow-lg">
            Believe in <br/><span className="italic font-normal text-christmas-gold text-3xl md:text-6xl block mt-4 font-serif">The Miracle of Delivery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-christmas-cream/90 font-light leading-relaxed mb-12 font-sans">
             在這個星光閃爍的夜晚，我們使用古老的魔法與最新的科技，確保每一個孩子的願望都能穿越風雪，準時送達。
          </p>
          
          <div className="flex justify-center">
             <a href="#story" onClick={scrollToSection('story')} className="group flex flex-col items-center gap-2 text-sm font-medium text-christmas-gold hover:text-white transition-colors cursor-pointer">
                <span>開啟故事</span>
                <span className="p-2 border border-christmas-gold/50 rounded-full group-hover:border-white transition-colors bg-white/10 backdrop-blur-sm">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>
      
      {/* Candy Cane Divider */}
      <div className="h-4 w-full candy-stripe"></div>

      <main>
        {/* Story Introduction */}
        <section id="story" className="py-24 bg-white relative transition-colors duration-500">
           <div className="absolute inset-0 snow-bg pointer-events-none"></div>
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-christmas-red uppercase flex items-center gap-2 transition-colors duration-500">
                <Bell size={14} /> 平安夜的挑戰
              </div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-christmas-green transition-colors duration-500">暴風雪中的承諾</h2>
              <div className="w-16 h-1 bg-christmas-red mb-6 rounded-full transition-colors duration-500"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6 font-sans">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-christmas-red transition-colors duration-500">當</span>北極的暴風雪呼嘯而過時，許多願望信件可能會迷失方向。在過去，這意味著有些禮物可能會送錯，或者有些乖孩子會被遺漏。
              </p>
              <p>
                但今年不同了。聖誕老人引入了全新的「魔法解讀系統」。這不只是一個發送禮物的雪橇，而是一個充滿愛與關懷的承諾。無論外面的天氣多麼惡劣，我們都能聽見每個孩子的心聲，確保每一份禮物都充滿了正確的祝福與快樂。
              </p>
            </div>
          </div>
        </section>

        <div className="h-4 w-full candy-stripe-green"></div>

        {/* The Magic: Elf Inspection */}
        <section id="magic" className="py-24 bg-christmas-cream border-t border-christmas-green/10 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-christmas-green text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-christmas-green/20 shadow-sm transition-colors duration-500">
                            <Gift size={14}/> 步驟一
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-christmas-dark transition-colors duration-500">精靈包裝站</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed font-sans">
                           在禮物被放上雪橇之前，它們必須經過最嚴格的檢查。我們安排了許多「精靈檢查員」穿插在禮物堆中。
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed font-sans">
                            一旦發現某個禮物包裝鬆了，或者蝴蝶結歪了，周圍的精靈樹就會亮起燈光發出信號。這樣我們就能在出發前修好每一個小細節，保證禮物完美無瑕。
                        </p>
                    </div>
                    <div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* The Magic: Wish Decoder */}
        <section className="py-24 bg-christmas-green text-christmas-cream overflow-hidden relative transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-christmas-red blur-[100px] absolute top-[-100px] left-[-100px] transition-colors duration-500"></div>
                <div className="w-96 h-96 rounded-full bg-christmas-gold blur-[100px] absolute bottom-[-100px] right-[-100px] transition-colors duration-500"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-christmas-dark text-christmas-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-christmas-gold/30 transition-colors duration-500">
                            <Star size={14} /> 步驟二
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">心願解讀魔法</h2>
                        <p className="text-lg text-christmas-cream/80 mb-6 leading-relaxed font-sans">
                            有些孩子因為太興奮，寫信時手會發抖；有些信件在路上被雪花弄濕了。傳統的方法可能看不懂這些信。
                        </p>
                        <p className="text-lg text-christmas-cream/80 leading-relaxed font-sans">
                            但我們的「魔法解讀機」擁有特殊的同理心。它不只是看字面意思，而是回顧孩子一整年的表現，用心去感受他們真正想要的禮物。就像聖誕老人親自閱讀一樣，充滿了溫暖與智慧。
                        </p>
                     </div>
                </div>
            </div>
        </section>

        <div className="h-4 w-full candy-stripe"></div>

        {/* The Magic: Joy Meter */}
        <section className="py-24 bg-[#FFFBF0]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-christmas-dark transition-colors duration-500">傳遞快樂的效率</h2>
                    <p className="text-lg text-stone-600 leading-relaxed font-sans">
                        多虧了這些新魔法，今年的聖誕老人比以往任何時候都更可靠。即使在最大的暴風雪中，快樂傳遞的成功率也接近完美！
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        <div className="h-4 w-full candy-stripe-green"></div>

        {/* Wish Letter Section */}
        <section id="wish" className="py-24 bg-white border-t border-christmas-green/10 relative transition-colors duration-500">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/snow.png')] opacity-50 pointer-events-none"></div>
             <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-christmas-red uppercase transition-colors duration-500">現在輪到你了</div>
                    <h2 className="font-serif text-4xl md:text-5xl text-christmas-dark transition-colors duration-500">寫下你的聖誕願望</h2>
                </div>
                <ChristmasLetter />
             </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 bg-christmas-cream border-t border-christmas-green/10 transition-colors duration-500">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-christmas-dark rounded-xl overflow-hidden relative border-4 border-christmas-gold shadow-2xl transition-colors duration-500">
                        <ChristmasHatScene colors={THEMES[currentTheme].colors} />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-christmas-gold font-serif italic z-10">聖誕魔法帽</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-christmas-green uppercase transition-colors duration-500">節日的意義</div>
                    <h2 className="font-serif text-4xl mb-6 text-christmas-dark transition-colors duration-500">愛是唯一的魔法</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed font-sans">
                        我們所做的一切技術改進，從精靈檢查到心願解讀，最終目的只有一個：保護那份純真的快樂。
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed font-sans">
                        當你在平安夜醒來，看到襪子裡的禮物時，請記住，那是無數精靈在風雪中努力的成果。這就是聖誕節的奇蹟。
                    </p>
                    
                    <div className="p-6 bg-white border border-christmas-gold/30 rounded-lg border-l-4 border-l-christmas-red shadow-sm transition-colors duration-500">
                        <p className="font-serif italic text-xl text-christmas-dark mb-4 transition-colors duration-500">
                            「聖誕節不只是一個日子，它是一種精神。只要我們心中有愛，奇蹟就會發生。」
                        </p>
                        <span className="text-sm font-bold text-christmas-red tracking-wider uppercase transition-colors duration-500">— 首席精靈長老</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Elves Team */}
        <section id="elves" className="py-24 bg-christmas-green/5 border-t border-christmas-green/10 relative transition-colors duration-500">
             <div className="absolute inset-0 snow-bg pointer-events-none opacity-50"></div>
           <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-christmas-green uppercase transition-colors duration-500">幕後功臣</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-christmas-dark transition-colors duration-500">聖誕工作坊的精靈們</h2>
                    <p className="text-stone-600 max-w-2xl mx-auto font-sans">感謝這些日夜辛勤工作的夥伴，讓世界充滿歡笑。</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <ElfCard 
                        name="Johannes" 
                        role="首席馴鹿指揮" 
                        delay="0s" 
                    />
                    <ElfCard 
                        name="Andrew" 
                        role="資深包裝大師" 
                        delay="0.1s" 
                    />
                    <ElfCard 
                        name="Francisco" 
                        role="雪橇導航員" 
                        delay="0.2s" 
                    />
                    <ElfCard 
                        name="Thomas" 
                        role="煙囪探測專家" 
                        delay="0.3s" 
                    />
                    <ElfCard 
                        name="Alex" 
                        role="歡樂分發主管" 
                        delay="0.4s" 
                    />
                    <ElfCard 
                        name="Michael" 
                        role="北極光維護員" 
                        delay="0.5s" 
                    />
                </div>
                <div className="text-center mt-12">
                    <p className="text-christmas-green italic font-serif text-xl transition-colors duration-500">祝全世界聖誕快樂，新年充滿希望！</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-christmas-dark text-christmas-cream/60 py-16 border-t-4 border-christmas-gold transition-colors duration-500">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Snowflake className="text-christmas-gold" /> Santa's Workshop
                </div>
                <p className="text-sm font-sans">傳遞愛與和平，一次一份禮物。</p>
            </div>
            <div className="flex gap-4">
                 <Gift className="text-christmas-red hover:text-white transition-colors cursor-pointer" />
                 <Heart className="text-christmas-gold hover:text-white transition-colors cursor-pointer" />
                 <Snowflake className="text-christmas-green hover:text-white transition-colors cursor-pointer" />
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-christmas-cream/40 font-sans">
            Made with holiday magic. © 2024 North Pole Inc.
        </div>
      </footer>
    </div>
  );
};

export default App;
