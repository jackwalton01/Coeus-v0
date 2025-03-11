import { ContactDetailCard } from "./ContactDetailsCard"

interface ContactDetails {
  [organization: string]: {
    [method: string]: string[]
  }
}

interface ContactCardHolderProps {
  contactDetails: ContactDetails
}

export function ContactCardHolder({ contactDetails }: ContactCardHolderProps) {
  return contactDetails && (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Services</h2>
      <div className="overflow-y-auto max-h-[400px] pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(contactDetails).map(([organization, contactMethods]) => (
            <ContactDetailCard key={organization} organization={organization} contactMethods={contactMethods} />
          ))}
        </div>
      </div>
    </div>
  )
}

