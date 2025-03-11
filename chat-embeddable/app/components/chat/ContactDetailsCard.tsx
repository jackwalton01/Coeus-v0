import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Phone, Mail, Globe } from "lucide-react"

export function ContactDetailCard({ organization, contactMethods }: ContactDetailCardProps) {
  const getIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "phone":
        return <Phone className="h-3 w-3" />
      case "email":
        return <Mail className="h-3 w-3" />
      case "website":
        return <Globe className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="p-3">
        <CardTitle className="text-sm">{organization}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {Object.entries(contactMethods).map(([method, addresses]) => (
          <div key={method} className="mb-1">
            <h3 className="text-xs font-semibold flex items-center gap-1">
              {getIcon(method)}
              {method}
            </h3>
            <ul className="list-none pl-4">
              {addresses.map((address, index) => (
                <li key={index} className="text-xs">
                  {method.toLowerCase() === "website" ? (
                    <a
                      href={address}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                      style={{ maxWidth: '100%' }}
                    >
                      {address}
                    </a>
                  ) : (
                    <p className="break-all">{address}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

