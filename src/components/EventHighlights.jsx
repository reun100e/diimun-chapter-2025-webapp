import React from 'react'
import { motion } from 'framer-motion'
import { COMMITTEES, ASSETS } from '../utils/constants'
import { smoothScrollTo } from '../animations/parallax'
import { Award, Zap, FileText } from 'lucide-react'

const EventHighlights = () => {
  return (
    <section id="highlights" className="pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-36 bg-gradient-to-br from-gray-50 to-midnight-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Choose Your Committee
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Three prestigious committees await your participation. Each offers a unique perspective on homoeopathic discourse, global healthcare challenges, and media coverage.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-midnight-600 via-cognac-600 to-gold-500 mx-auto rounded-full shadow-glow"></div>
        </motion.div>

        {/* Committee Sections */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMMITTEES.map((committee, index) => (
              <motion.div
                key={committee.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                  {committee.title.includes('WHO') ? (
                    <img 
                      src={ASSETS.whoLogo} 
                      alt="WHO Background" 
                      className="w-full h-full object-cover filter"
                    />
                  ) : committee.title.includes('Great Homoeopathic Assembly') ? (
                    <img 
                      src={ASSETS.greatAssemblyImage} 
                      alt="Great Homoeopathic Assembly Background" 
                      className="w-full h-full object-cover filter"
                    />
                  ) : (
                    <img 
                      src={ASSETS.ipcImage} 
                      alt="IPC Background" 
                      className="w-full h-full object-cover filter"
                    />
                  )}
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity ${
                  committee.type === 'Exclusive Committee' 
                    ? 'from-cognac-900/80 via-cognac-800/70 to-cognac-900/80 group-hover:from-cognac-900/60 group-hover:via-cognac-800/50 group-hover:to-cognac-900/60' 
                    : committee.type === 'Media Committee'
                    ? 'from-purple-900/80 via-purple-800/70 to-purple-900/80 group-hover:from-purple-900/60 group-hover:via-purple-800/50 group-hover:to-purple-900/60'
                    : 'from-midnight-900/80 via-midnight-800/70 to-midnight-900/80 group-hover:from-midnight-900/60 group-hover:via-midnight-800/50 group-hover:to-midnight-900/60'
                } transition-all duration-500`}></div>

                {/* Content */}
                <div className="relative z-10 p-10 md:p-12 text-white min-h-[500px] flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    {/* Committee Type Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      committee.type === 'Exclusive Committee' 
                        ? 'bg-cognac-600/90 text-white backdrop-blur-sm' 
                        : committee.type === 'Media Committee'
                        ? 'bg-purple-600/90 text-white backdrop-blur-sm'
                        : 'bg-midnight-600/90 text-white backdrop-blur-sm'
                    }`}>
                      {committee.type === 'Exclusive Committee' ? <Award className="w-4 h-4" /> : committee.type === 'Media Committee' ? <FileText className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      {committee.type}
                    </div>


                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight group-hover:text-white transition-colors duration-300">
                      {committee.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg leading-relaxed mb-8 text-gray-200 group-hover:text-white transition-colors duration-300">
                      {committee.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/20 pt-6">
                    {committee.note && (
                      <p className="text-sm text-gray-300 font-medium italic mb-6">
                        Note: {committee.note}
                      </p>
                    )}
                    
                    {/* Committee-specific CTA */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => smoothScrollTo('#register', 100)}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                        committee.type === 'Exclusive Committee'
                          ? 'bg-gradient-to-r from-cognac-500 to-cognac-600 hover:from-cognac-400 hover:to-cognac-500 text-white shadow-lg hover:shadow-xl'
                          : committee.type === 'Media Committee'
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-midnight-500 to-midnight-600 hover:from-midnight-400 hover:to-midnight-500 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      Join The {committee.title.includes('WHO') ? 'WHO Committee' : committee.title.includes('Great Homoeopathic Assembly') ? 'Great Homoeopathic Assembly' : 'International Press Corps'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action for Why Join */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6">
            Ready to Experience the Benefits?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Now that you've chosen your committee, discover the unique advantages and experiences that await you in DIIMUN.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => smoothScrollTo('#why-join', 100)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-midnight-600 to-cognac-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-midnight-700 hover:to-cognac-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5" />
            <span>Discover Why Join</span>
          </motion.button>
        </motion.div>


      </div>
    </section>
  )
}

export default EventHighlights
