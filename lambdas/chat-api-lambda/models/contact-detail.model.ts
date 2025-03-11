interface ContactMethod {
  [key: string]: string[]
}

interface ContactDetailCardProps {
  organization: string
  contactMethods: ContactMethod
}
