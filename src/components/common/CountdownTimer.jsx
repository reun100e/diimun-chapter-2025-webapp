import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, AlertTriangle } from 'lucide-react'

const CountdownTimer = ({ 
  targetDate = "2025-10-25T23:59:59", 
  title = "Registration Deadline",
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  size = "large" // "small", "medium", "large"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0
  })

  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          total: difference
        })
        setIsExpired(false)
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0
        })
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'p-4',
          title: 'text-sm font-semibold',
          timeUnit: 'text-lg font-bold',
          timeLabel: 'text-xs',
          card: 'w-16 h-16'
        }
      case 'medium':
        return {
          container: 'p-6',
          title: 'text-lg font-semibold',
          timeUnit: 'text-2xl font-bold',
          timeLabel: 'text-sm',
          card: 'w-20 h-20'
        }
      case 'large':
      default:
        return {
          container: 'p-8',
          title: 'text-xl font-semibold',
          timeUnit: 'text-3xl font-bold',
          timeLabel: 'text-base',
          card: 'w-24 h-24'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  const TimeUnit = ({ value, label, show = true }) => {
    if (!show) return null

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className={`${sizeClasses.card} bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-2`}>
          <span className={sizeClasses.timeUnit}>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <span className={`${sizeClasses.timeLabel} text-gray-600 font-medium`}>
          {label}
        </span>
      </motion.div>
    )
  }

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`${sizeClasses.container} bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl text-center`}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h3 className={`${sizeClasses.title} text-red-800`}>
            Registration Closed
          </h3>
        </div>
        <p className="text-red-600 text-sm">
          The registration deadline has passed. Contact us for any inquiries.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${sizeClasses.container} bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl`}
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Clock className="w-6 h-6 text-red-600" />
          <h3 className={`${sizeClasses.title} text-red-800`}>
            {title}
          </h3>
        </div>
        <p className="text-red-600 text-sm">
          Don't miss out! Register before the deadline.
        </p>
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        <TimeUnit 
          value={timeLeft.days} 
          label="Days" 
          show={showDays} 
        />
        <TimeUnit 
          value={timeLeft.hours} 
          label="Hours" 
          show={showHours} 
        />
        <TimeUnit 
          value={timeLeft.minutes} 
          label="Minutes" 
          show={showMinutes} 
        />
        <TimeUnit 
          value={timeLeft.seconds} 
          label="Seconds" 
          show={showSeconds} 
        />
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-red-600 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Deadline: October 25th, 2025</span>
        </div>
      </div>
    </motion.div>
  )
}

export default CountdownTimer
