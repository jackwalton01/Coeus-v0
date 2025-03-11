import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const subjectAreas = [
  "Debt",
  "Benefits/Universal Credit",
  "Energy/Fuel Bill",
  "Water Bill",
  "Savings",
  "Food aid",
  "Rent",
  "Gambling harms",
  "A different money related issue",
  "None of the above",
];

interface SubjectAreaSelectionProps {
  selectedSubject: string | null,
  onSubjectChange: (subject: string) => void,
  required?: boolean,
}

export function SubjectAreaSelection({ selectedSubject, onSubjectChange, required }: SubjectAreaSelectionProps) {
  return (
    <div className="tw:space-y-4">
      <Label className="tw:text-base tw:font-semibold">Which subject area did you ask MIC for assistance with?</Label>
      <RadioGroup
        value={selectedSubject || ""}
        onValueChange={onSubjectChange}
        className="tw:grid tw:sm:grid-cols-2 tw:grid-cols-1 tw:gap-2"
        required={required}
      >
        {subjectAreas.map((subject) => (
          <Label
            key={subject}
            htmlFor={subject.toLowerCase().replace(/\s+/g, "-")}
            className="tw:flex! tw:items-center! tw:space-x-2 tw:bg-gray-50 tw:p-2 tw:rounded-md tw:cursor-pointer tw:hover:bg-gray-100 tw:transition-colors"
          >
            <RadioGroupItem value={subject} id={subject.toLowerCase().replace(/\s+/g, "-")} className="tw:sr-only" />
            <div className="tw:w-4 tw:h-4 tw:border tw:border-gray-300 tw:rounded-full tw:flex tw:items-center tw:justify-center">
              <div className={`tw:w-2 tw:h-2 tw:rounded-full ${selectedSubject === subject ? "tw:bg-black" : ""}`} />
            </div>
            <span className="tw:text-sm">{subject}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}

