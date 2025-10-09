import React from 'react'
import { TECHNOLOGY_POLICY, CONTACT_INFO } from '../../utils/content'

const TechnologyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
      {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Technology Policy
            </h1>
          <p className="text-xl text-gray-700 mb-2">
            DIIMUN 2025
          </p>
          <p className="text-base text-gray-600">
            Guidelines for Device Usage, Recording Policies, and Technology Restrictions
          </p>
        </div>

        {/* Introduction */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Introduction
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-3">
            This Technology Policy outlines the guidelines and restrictions for the use of electronic devices and recording equipment during the Doctors Integrated International Model United Nations (DIIMUN) 2025 event.
          </p>
          <p className="text-base text-gray-800 leading-relaxed">
            All participants must comply with this policy to ensure a productive and professional environment. Violations will result in immediate disciplinary action.
          </p>
      </div>

        {/* Allowed Devices */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. Permitted Devices
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            The following electronic devices are permitted during DIIMUN 2025, subject to the restrictions outlined in this policy:
          </p>
          <ul className="space-y-3 ml-6">
            {TECHNOLOGY_POLICY.allowed.map((device, index) => (
              <li key={index} className="text-base text-gray-800 leading-relaxed list-disc">
                {device}
              </li>
            ))}
          </ul>
          <p className="text-base text-gray-800 leading-relaxed mt-4">
            All permitted devices must be used in accordance with the restrictions and guidelines specified in this policy.
          </p>
          </div>

        {/* Usage Restrictions */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Usage Restrictions
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            All participants must adhere to the following restrictions when using electronic devices during the event:
          </p>
          <div className="space-y-4">
            {TECHNOLOGY_POLICY.restrictions.map((restriction, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  3.{index + 1} {restriction.split(':')[0] || `Restriction ${index + 1}`}
                </h3>
                <p className="text-base text-gray-800 leading-relaxed">
                  {restriction}
                </p>
              </div>
              ))}
            </div>
          </div>

        {/* Recording Policy */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Recording Policy
          </h2>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            4.1 Prohibited Recording Activities
          </h3>
          <p className="text-base text-gray-800 leading-relaxed mb-3">
            The following recording activities are strictly prohibited without explicit Executive Board approval:
          </p>
          <ul className="space-y-2 ml-6 mb-6">
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Recording (audio or video) of committee proceedings by delegates without Executive Board approval
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Unauthorized photography during sensitive discussions or committee sessions
                </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Sharing or distributing recordings on social media or other public platforms
                </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Any form of recording that disrupts committee proceedings or violates participant privacy
                </li>
              </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            4.2 Authorized Recording Activities
          </h3>
          <p className="text-base text-gray-800 leading-relaxed mb-3">
            The following recording activities are permitted:
          </p>
          <ul className="space-y-2 ml-6 mb-6">
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Official recording by the organizing committee for archival and promotional purposes
                </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Recording by participants who have received explicit written approval from the Executive Board
                </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Photography by International Press Corps (IPC) members for event coverage purposes, conducted in accordance with IPC guidelines
                </li>
              </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            4.3 Official Recording
          </h3>
          <p className="text-base text-gray-800 leading-relaxed">
            {TECHNOLOGY_POLICY.official}
              </p>
            </div>

        {/* Executive Board Approval Process */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Executive Board Approval Process
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            Participants who wish to record any part of the event proceedings must follow this approval process:
          </p>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            5.1 Submission of Request
          </h3>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            Submit a formal written request to the Executive Board explaining the purpose and scope of the proposed recording. The request should include details about what will be recorded, when, and how the recordings will be used.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            5.2 Review Process
          </h3>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            The Executive Board will review your request and assess its impact on the event proceedings and other participants. The review process may take up to 48 hours, so requests should be submitted well in advance.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            5.3 Approval and Guidelines
          </h3>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            If your request is approved, you will receive written permission from the Executive Board. This permission will include specific guidelines, restrictions, and conditions that must be followed during recording activities.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            5.4 Compliance
          </h3>
          <p className="text-base text-gray-800 leading-relaxed">
            Approved participants must strictly comply with all guidelines and restrictions provided by the Executive Board. Any deviation from the approved terms will result in immediate revocation of permission and potential disciplinary action.
                </p>
              </div>

        {/* Consequences */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Consequences of Violation
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4 font-semibold">
            {TECHNOLOGY_POLICY.consequences}
          </p>
          <p className="text-base text-gray-800 leading-relaxed mb-3">
            Specific consequences for technology policy violations include:
          </p>
          <ul className="space-y-2 ml-6">
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Immediate confiscation of the device(s) used in violation
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Removal from the event without refund
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Ban from future DNA events
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Reporting to the participant's institution if applicable
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Legal action may be taken in cases of serious violations or misuse of recorded content
            </li>
          </ul>
              </div>

        {/* Best Practices */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            7. Best Practices
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            To ensure a productive and professional environment, participants are encouraged to follow these best practices:
          </p>
          <ul className="space-y-2 ml-6">
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Turn off all device notifications and ringtones before entering committee rooms
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Use devices only for research, documentation, and committee-related purposes
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Keep screen brightness at a moderate level to avoid disturbing others
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Respect the privacy and concentration of fellow participants
            </li>
            <li className="text-base text-gray-800 leading-relaxed list-disc">
              Seek clarification from the Executive Board if uncertain about any aspect of the technology policy
            </li>
          </ul>
          </div>

        {/* Contact Information */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            8. Contact Information
          </h2>
          <p className="text-base text-gray-800 leading-relaxed mb-4">
            For questions, clarifications, or approval requests regarding this Technology Policy, please contact:
          </p>
          <div className="space-y-2">
            <p className="text-base text-gray-800">
              <span className="font-semibold">Email:</span> {CONTACT_INFO.email}
            </p>
            <p className="text-base text-gray-800">
              <span className="font-semibold">Phone:</span> {CONTACT_INFO.phone}
            </p>
            <p className="text-base text-gray-800">
              <span className="font-semibold">Organization:</span> DNA (Doctors Nexus Amity)
            </p>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            9. Acknowledgment
          </h2>
          <p className="text-base text-gray-800 leading-relaxed">
            By registering for and participating in DIIMUN 2025, you acknowledge that you have read, understood, and agree to comply with this Technology Policy. You understand that violations of this policy will result in immediate disciplinary action as outlined above.
          </p>
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

export default TechnologyPolicy
