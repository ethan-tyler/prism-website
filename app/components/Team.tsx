import { motion, useInView } from "framer-motion";
import { Users, ChevronLeft, ChevronRight, MapPin, Star, Award, Globe, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const teamMembers = [
  {
    name: "Luis Mejia",
    title: "Senior Director",
    role: "POP Product Lead",
    avatar: "LM",
    department: "POP Analytics Product",
    location: "Indianapolis, IN",
    focus: "Leadership",
  },
  {
    name: "Ethan Urbanski",
    title: "Associate Director",
    role: "PRISM Platform Strategy",
    avatar: "EU",
    department: "POP Analytics Product",
    location: "Indianapolis, IN",
    focus: "Platform Vision",
  },
  {
    name: "Sambed Adhikari",
    title: "Associate Diector",
    role: "POP Product Owner",
    avatar: "SA",
    department: "POP Analytics Product",
    location: "Indianapolis, IN",
    focus: "TBD",
  },
  {
    name: "George Kaiser",
    title: "Director",
    role: "POP Product Owner",
    avatar: "GK",
    department: "POP Analytics Product",
    location: "Indianapolis, IN",
    focus: "Dynamic Targeting",
  },
  {
    name: "Raghu Julukunta",
    title: "Senior Manager",
    role: "LCCI POP Product Lead",
    avatar: "RJ",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "LCCI Leadership",
  },
  {
    name: "Aryaman",
    title: "Associate",
    role: "LCCI POP Product Analytics",
    avatar: "A",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
  {
    name: "Abhishek Malavalli",
    title: "Associate",
    role: "LCCI POP Product Analytics",
    avatar: "AM",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
  {
    name: "Varun Theegala",
    title: "Associate Consultant",
    role: "LCCI POP Product Analytics",
    avatar: "VT",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
  {
    name: "Praneet Kollu",
    title: "Sr. Associate Consultant",
    role: "LCCI POP Product Analytics",
    avatar: "PK",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
  {
    name: "Soumya Kar",
    title: "Associate Consultant",
    role: "LCCI POP Product Analytics",
    avatar: "SK",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
  {
    name: "Vaishnavi Salunke",
    title: "Associate Consultant",
    role: "LCCI POP Product Analytics",
    avatar: "VS",
    department: "POP Analytics Product",
    location: "Bengaluru, India",
    focus: "TBD",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export function Team() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="team" 
      className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-blue-700 font-semibold text-sm mb-8 shadow-lg shadow-blue-500/10"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            Platform Capabilities
          </motion.div>
          
          <motion.h2
            className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2">Our Analytics</span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Dream Team
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built on <span className="font-semibold text-gray-900">Databricks</span> with enterprise governance,{" "}
            <span className="font-semibold text-gray-900">global expertise</span>, and{" "}
            <span className="font-semibold text-gray-900">dedicated professionals</span>.
            <br />
            Integrated components create compound analytical value.
          </motion.p>
          
          {/* Team Stats Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Users, label: `${teamMembers.length} Members`, color: "purple" },
              { icon: Globe, label: "2 Continents", color: "blue" },
              { icon: Award, label: "Enterprise Focus", color: "green" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 bg-${item.color}-50 border border-${item.color}-200 rounded-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                <span className={`text-sm font-medium text-${item.color}-800`}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Navigation Controls */}
        <motion.div
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600">
              Scroll to explore our global team →
            </span>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={scrollLeft}
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal Scrollable Team Cards */}
        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className={`relative group bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center min-w-[320px] transition-all duration-500 cursor-pointer flex-shrink-0 border border-gray-200/50 ${
                  hoveredMember === member.name ? 'shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500 ring-offset-2' : 'shadow-lg hover:shadow-xl'
                }`}
                variants={slideIn}
                onHoverStart={() => setHoveredMember(member.name)}
                onHoverEnd={() => setHoveredMember(null)}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Enhanced Avatar */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: -8,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-xl">
                    {member.avatar}
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 border-3 border-white rounded-full flex items-center justify-center"
                    animate={{
                      scale: hoveredMember === member.name ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>

                {/* Enhanced Info */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-1">
                    {member.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.role}</p>

                  {/* Enhanced Department Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl text-purple-700 text-xs font-bold mb-6 shadow-sm">
                    <Award className="w-3 h-3" />
                    {member.department}
                  </div>

                  {/* Enhanced Details */}
                  <div className="space-y-3 pt-6 border-t border-gray-200/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>Location:</span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {member.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Star className="w-3 h-3" />
                        <span>Focus:</span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {member.focus}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Hover Sparkle Effect */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    rotate: hoveredMember === member.name ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredMember === member.name ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays for Visual Scrolling Indication */}
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-bg-secondary to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-bg-secondary to-transparent pointer-events-none" />
        </div>

        {/* Enhanced Team Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: teamMembers.length, label: "Team Members", icon: Users, gradient: "from-purple-500 to-pink-500" },
            { value: "2", label: "Global Locations", icon: Globe, gradient: "from-blue-500 to-cyan-500" },
            { value: "8+", label: "Specializations", icon: Star, gradient: "from-green-500 to-emerald-500" },
            { value: "100%", label: "PRISM Focused", icon: Award, gradient: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -webkit-scrollbar: {
            display: none;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
