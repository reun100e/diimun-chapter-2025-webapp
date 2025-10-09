import React from 'react'

const Terms = () => {
  const termsSections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: [
        'These Terms and Conditions ("Terms") govern your registration and participation in the Doctors Integrated International Model United Nations (DIIMUN) 2025 event organized by DNA (Doctors Nexus Amity).',
        'By completing your registration and payment, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not proceed with registration.'
      ]
    },
    {
      id: 'registration',
      title: '2. Registration',
      subsections: [
        {
          subtitle: '2.1 Registration Deadline',
          content: 'All registrations must be completed by October 25th, 2025. No late registrations will be accepted under any circumstances.'
        },
        {
          subtitle: '2.2 Individual Registration',
          content: 'Each team member must register separately through the official registration portal. Team details will be collected at a later stage.'
        },
        {
          subtitle: '2.3 Team Changes',
          content: 'No changes in committee assignments or team composition will be permitted after October 29th, 2025.'
        },
        {
          subtitle: '2.4 Registration Confirmation',
          content: 'Registration is considered complete only upon receipt of payment and email confirmation from the organizers.'
        }
      ]
    },
    {
      id: 'payment',
      title: '3. Payment Terms',
      subsections: [
        {
          subtitle: '3.1 Registration Fee',
          content: 'The registration fee is ₹499 per participant. Participants who attended Esperanza 4.0 are eligible for a discounted fee of ₹347.'
        },
        {
          subtitle: '3.2 Payment Method',
          content: 'Payment must be made via UPI to the following address: aghoshbprasad100@okaxis. No other payment methods will be accepted.'
        },
        {
          subtitle: '3.3 Payment Verification',
          content: 'All payments will be verified within 24-48 hours. You will receive a confirmation email upon successful verification.'
        },
        {
          subtitle: '3.4 Fee Inclusions',
          content: 'The registration fee includes event participation, food, and refreshments during the event day. It does not include travel or accommodation expenses.'
        },
        {
          subtitle: '3.5 Refund Policy',
          content: 'No refunds will be provided after October 25th, 2025. Refund requests submitted before the deadline are subject to processing fees and must be submitted in writing to the organizers.'
        }
      ]
    },
    {
      id: 'participation',
      title: '4. Event Participation',
      subsections: [
        {
          subtitle: '4.1 Attendance',
          content: 'All registered participants are required to attend the event. Failure to attend without prior notice may result in blacklisting from future DNA events.'
        },
        {
          subtitle: '4.2 Dress Code',
          content: 'Formal Western Business Attire is mandatory for all participants throughout the event. Casual wear will not be permitted.'
        },
        {
          subtitle: '4.3 Code of Conduct',
          content: 'Participants must maintain professional behavior at all times. Use of unparliamentary language, disruptive behavior, or violation of event rules will result in immediate expulsion from the event without refund.'
        },
        {
          subtitle: '4.4 Technology Usage',
          content: 'All electronic devices must be kept on silent mode during committee sessions. Use of devices for personal entertainment during sessions is strictly prohibited.'
        },
        {
          subtitle: '4.5 Recording Policy',
          content: 'Unauthorized audio or video recording of event proceedings is strictly prohibited. Violations will result in immediate device confiscation and removal from the event.'
        },
        {
          subtitle: '4.6 Disciplinary Action',
          content: 'The organizing committee reserves the right to expel any participant who violates these Terms or event rules. No refunds will be provided in case of expulsion.'
        }
      ]
    },
    {
      id: 'communication',
      title: '5. Communication and Consent',
      subsections: [
        {
          subtitle: '5.1 Event Communication',
          content: 'By registering, you consent to receive communications from DNA via email, WhatsApp, and phone calls regarding event updates, schedules, and related information.'
        },
        {
          subtitle: '5.2 Future Events',
          content: 'You consent to be informed about future DNA events and activities. You may opt out of such communications at any time by contacting the organizers.'
        },
        {
          subtitle: '5.3 Voluntary Participation',
          content: 'You confirm that your participation in DIIMUN 2025 is entirely voluntary and has not been coerced by any person or institutional body.'
        },
        {
          subtitle: '5.4 Rule Compliance',
          content: 'You agree to comply with all rules, decisions, and directives issued by the executive board and organizing committee before, during, and after the event.'
        }
      ]
    },
    {
      id: 'liability',
      title: '6. Liability and Responsibility',
      subsections: [
        {
          subtitle: '6.1 Personal Safety',
          content: 'Participants are solely responsible for their own safety and well-being during the event. The organizers shall not be held liable for any personal injury or loss.'
        },
        {
          subtitle: '6.2 Property Damage',
          content: 'Participants shall be held liable for any damage to property or facilities caused by their actions. The cost of repairs or replacement will be borne by the responsible participant.'
        },
        {
          subtitle: '6.3 Medical Emergencies',
          content: 'The organizers are not responsible for any medical emergencies that may occur during the event. Participants are advised to maintain appropriate health insurance coverage.'
        },
        {
          subtitle: '6.4 Travel and Accommodation',
          content: 'Participants are responsible for arranging and bearing the costs of their own travel and accommodation. The organizers accept no liability for any travel-related issues.'
        },
        {
          subtitle: '6.5 Personal Belongings',
          content: 'Participants are responsible for the safekeeping of their personal belongings. The organizers shall not be liable for any loss or theft of personal property.'
        }
      ]
    },
    {
      id: 'intellectual',
      title: '7. Intellectual Property',
      subsections: [
        {
          subtitle: '7.1 Event Content',
          content: 'The organizers reserve the right to use photographs, videos, and other media captured during the event for promotional purposes without seeking additional consent or providing compensation.'
        },
        {
          subtitle: '7.2 Participant Content',
          content: 'While participants retain ownership of their own intellectual content, they grant DNA the right to use such content for promotional and archival purposes.'
        },
        {
          subtitle: '7.3 Committee Materials',
          content: 'All committee materials, background guides, and resources provided by DNA are proprietary and confidential. These materials shall not be shared, distributed, or published externally without prior written permission.'
        }
      ]
    },
    {
      id: 'force-majeure',
      title: '8. Force Majeure',
      subsections: [
        {
          subtitle: '8.1 Event Cancellation',
          content: 'The organizers reserve the right to cancel or postpone the event due to circumstances beyond their control, including but not limited to natural disasters, pandemics, government restrictions, or other force majeure events.'
        },
        {
          subtitle: '8.2 Refunds in Case of Cancellation',
          content: 'In the event of cancellation by the organizers, refunds will be processed as per the applicable refund policy. Processing time may vary depending on circumstances.'
        },
        {
          subtitle: '8.3 Event Rescheduling',
          content: 'If the event is rescheduled, participants will be notified of the new dates. Registration will remain valid for the rescheduled event unless otherwise specified.'
        }
      ]
    },
    {
      id: 'governing',
      title: '9. Governing Law and Jurisdiction',
      subsections: [
        {
          subtitle: '9.1 Applicable Law',
          content: 'These Terms shall be governed by and construed in accordance with the laws of India.'
        },
        {
          subtitle: '9.2 Jurisdiction',
          content: 'All disputes arising from or in connection with these Terms or the event shall be subject to the exclusive jurisdiction of the courts in Trivandrum, Kerala, India.'
        },
        {
          subtitle: '9.3 Dispute Resolution',
          content: 'In the event of any dispute, the parties agree to first attempt resolution through good faith negotiations. If unsuccessful, disputes shall be resolved through arbitration in accordance with Indian law.'
        }
      ]
    },
    {
      id: 'amendments',
      title: '10. Amendments',
      content: [
        'The organizers reserve the right to modify these Terms at any time. Any changes will be communicated to registered participants via email.',
        'Continued participation following notification of changes constitutes acceptance of the modified Terms.'
      ]
    },
    {
      id: 'contact',
      title: '11. Contact Information',
      content: [
        'For any questions regarding these Terms and Conditions, please contact:',
        'Email: dna@aghosh.in',
        'Phone: +91 94423 08824',
        'Organization: DNA (Doctors Nexus Amity)',
        'Event: DIIMUN 2025'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            DIIMUN 2025
          </p>
          <p className="text-base text-gray-600">
            Doctors Integrated International Model United Nations
          </p>
        </div>

        {/* Important Notice */}
        {/* <div className="border-2 border-gray-900 p-6 mb-10">
          <p className="text-base text-gray-900 font-semibold mb-3">
            IMPORTANT NOTICE
          </p>
          <p className="text-base text-gray-800 leading-relaxed">
            These terms and conditions are legally binding. By completing your registration, 
            you acknowledge that you have read, understood, and agree to be bound by all terms 
            and conditions outlined below. If you do not agree with any part of these terms, 
            please do not proceed with registration.
          </p>
        </div> */}

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsSections.map((section) => (
            <div key={section.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              
              {section.content && (
                <div className="space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-base text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.subsections && (
                <div className="space-y-4">
                  {section.subsections.map((subsection, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {subsection.subtitle}
                      </h3>
                      <p className="text-base text-gray-800 leading-relaxed">
                        {subsection.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terms
