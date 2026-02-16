import { motion } from "framer-motion";
import { Rocket, Lightbulb, ShieldCheck, Box, Layers, CheckCircle2, Clock } from "lucide-react";

const progressSteps = [
  {
    title: "Ideation Stage",
    status: "completed",
    desc: "Foundational concept and goal alignment.",
    icon: Lightbulb
  },
  {
    title: "Proof of Concept",
    status: "completed",
    desc: "Core logic verification & feasibility.",
    icon: ShieldCheck
  },
  {
    title: "MVP Development",
    status: "completed",
    desc: "Building the engine & core flows.",
    icon: Box
  },
  {
    title: "Beta Launch",
    status: "current",
    desc: "Onboarding first 100 users for testing.",
    icon: Rocket
  },
  {
    title: "Prototype Stage",
    status: "upcoming",
    desc: "Refining for full production.",
    icon: Layers
  },
];

const ProgressSection = () => {
  return (
    <section id="progress" className="section-padding relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-semibold mx-auto">
            <Rocket className="w-4 h-4" />
            <span>Project Evolution</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight text-foreground">
            Our Path to <span className="text-gradient">Impact</span>
          </h2>
        </motion.div>

        {/* Horizontal Timeline Container */}
        <div className="relative max-w-sm sm:max-w-md md:max-w-full mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 lg:auto-rows-fr gap-4 sm:gap-6 lg:gap-3 relative z-10">
            {progressSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center group w-full"
                >
                  {/* Step Card - Compact on Mobile, Square on Desktop */}
                  <div className={`w-full p-3 sm:p-4 md:p-6 lg:p-4 xl:p-6 rounded-2xl md:rounded-3xl transition-all duration-500 text-center flex flex-col items-center justify-center gap-2 md:gap-3 h-auto lg:aspect-square backdrop-blur-xl border border-white/20 ${step.status === 'current'
                      ? 'bg-white/60 ring-2 ring-primary/40 shadow-2xl shadow-primary/10'
                      : 'bg-white/40 hover:bg-white/50'
                    }`}>

                    {/* Icon Wrapper */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-10 xl:w-12 rounded-xl md:rounded-2xl flex items-center justify-center relative shrink-0 ${step.status === 'current' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                      }`}>
                      <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-5 xl:w-6 ${step.status === 'current' ? 'animate-pulse' : ''}`} />

                      {step.status === 'completed' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-2 h-2 md:w-3 md:h-3 text-white" />
                        </div>
                      )}

                      {step.status === 'current' && (
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-primary animate-ping opacity-20" />
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-0.5 md:space-y-1">
                      <h3 className={`text-sm sm:text-base md:text-base lg:text-sm xl:text-base font-bold font-display leading-tight ${step.status === 'current' ? 'text-primary' : 'text-black'
                        }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-[11px] sm:text-xs md:text-[10px] xl:text-[11px] font-medium leading-tight line-clamp-3">
                        {step.desc}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-1 md:mt-2">
                      {step.status === 'current' && (
                        <span className="inline-block text-[9px] sm:text-[10px] md:text-[8px] xl:text-[9px] uppercase tracking-widest bg-primary/10 text-primary px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold">
                          Current
                        </span>
                      )}
                      {step.status === 'upcoming' && (
                        <div className="flex items-center gap-1 md:gap-1.5 text-[9px] sm:text-[10px] md:text-[8px] xl:text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                          <Clock className="w-3 h-3 md:w-3 md:h-3" />
                          Next
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Indicator (Mobile) */}
                {index < progressSteps.length - 1 && (
                  <div className="h-4 w-px bg-primary/20 lg:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
