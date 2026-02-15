import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Bot, Check, X } from "lucide-react";

const rotatingWords = ["Is Not Dumb", "Knows You", "Is Unique to you"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 sm:pt-28 md:pt-32 pb-16 md:pb-20 px-4 md:px-6">


        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 md:space-y-12">

          {/* Headline & Rotating Words */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 md:space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1]">
              An AI That
            </h1>
            <div className="h-[1.2em] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block text-blue-700 glow-text"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/waitlist"
              className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#solution"
              className="px-8 py-4 rounded-full glass border-primary/20 text-foreground font-display font-medium text-base hover:border-primary/40 transition-all duration-300"
            >
              See How It Works
            </a>
          </motion.div>

          {/* Descriptive Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto px-2"
          >
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-body">
              "When you ask a friend for help, you don't start with <span className="italic">'So I'm enrolled in Operating Systems, here's the course code, we're using this textbook...'</span> You just say <span className="font-semibold text-foreground">'Yo, deadlock prevention—how does it work?'</span> <br className="hidden sm:block" /><br className="hidden sm:block" />
              That's how <span className="font-bold text-primary">FIWB AI</span> works. It already knows your courses. Just ask your question."
            </p>
          </motion.div>

          {/* Chat Mockup Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="glass rounded-2xl p-4 md:p-6 glow-border shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <span className="ml-3 text-sm text-muted-foreground font-display">FIWB AI Chat</span>
              </div>

              {/* Messages */}
              <div className="space-y-4 text-left">
                {/* Message 1 */}
                <div className="flex justify-end">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Explain binary search trees from where we left off last lecture</p>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground mb-2">
                      Based on Prof. Sharma's Lecture 14 (DSA - CS201), you covered BST insertion and traversal.
                      Here's the next topic — <span className="text-primary font-medium">BST Deletion</span>...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">CS201</span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Lecture 14</span>
                    </div>
                  </div>
                </div>

                {/* Message 3 */}
                <div className="flex justify-end">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Any assignments due for this topic?</p>
                  </div>
                </div>

                {/* Message 4 */}
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground">
                      📌 Assignment 5 on BSTs is due <span className="text-primary font-medium">Feb 18</span> via Moodle.
                      It covers insertion, deletion & balancing — synced from your Classroom.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-6 flex items-center gap-2 glass rounded-xl p-3 bg-secondary/30">
                <div className="flex-1 text-sm text-muted-foreground text-left">Type your answer...</div>
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="relative py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">
              Why settle for <span className="text-muted-foreground line-through decoration-destructive/50">Generic</span>?
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              See the difference between a tool that learns <i>from</i> you versus one that learns <i>for</i> you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {/* Generic AI Card */}
            <div className="glass p-6 md:p-8 rounded-3xl border border-destructive/20 relative overflow-hidden group hover:bg-destructive/5 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-destructive/30" />
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">Generic AI</h3>
              </div>

              <ul className="space-y-4 md:space-y-6">
                <li className="flex gap-2 md:gap-3 text-muted-foreground text-sm md:text-base">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-destructive shrink-0 mt-0.5" />
                  <span>Needs context every single time</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-muted-foreground text-sm md:text-base">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-destructive shrink-0 mt-0.5" />
                  <span>"As an AI language model..." generic answers</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-muted-foreground text-sm md:text-base">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-destructive shrink-0 mt-0.5" />
                  <span>Doesn't know your syllabus or professor</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-muted-foreground text-sm md:text-base">
                  <X className="w-4 h-4 md:w-5 md:h-5 text-destructive shrink-0 mt-0.5" />
                  <span>Forgets your progress after the chat ends</span>
                </li>
              </ul>
            </div>

            {/* FIWB AI Card */}
            <div className="glass p-6 md:p-8 rounded-3xl border border-primary/30 relative overflow-hidden bg-primary/5 glow-border transition-all duration-500 hover:shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">FIWB AI</h3>
              </div>

              <ul className="space-y-4 md:space-y-6">
                <li className="flex gap-2 md:gap-3 text-foreground font-medium text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                  <span>Knows your exact course & professors</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-foreground font-medium text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                  <span>Answers tailored to your lecture slides</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-foreground font-medium text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                  <span>Tracks your assignments & deadlines</span>
                </li>
                <li className="flex gap-2 md:gap-3 text-foreground font-medium text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                  <span>Grows smarter with every interaction</span>
                </li>
              </ul>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-primary/10">
                <p className="text-xs md:text-sm text-primary font-semibold text-center uppercase tracking-wider">
                  The Superior Choice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default HeroSection;
