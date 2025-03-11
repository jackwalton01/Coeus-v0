"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SubjectAreaSelection } from "./SubjectAreaSelection"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Feedback } from "../../../models/feedback.model";

export function FeedbackForm({
  returnToChat,
  onFeedbackSubmitted,
}: {
  returnToChat: () => void
  onFeedbackSubmitted: (feedback: Feedback) => void
}) {
  const [helpfulRating, setHelpfulRating] = useState<string>('');
  const [feedback, setFeedback] = useState<string>();
  const [subjectArea, setSubjectArea] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFeedbackSubmitted({ helpfulRating, feedback, subjectArea });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="tw:w-full tw:max-w-2xl tw:mx-auto tw:my-auto tw:border-none tw:bg-white">
        <CardContent className="tw:pt-6">
          <div className="tw:space-y-6 tw:flex tw:flex-col tw:items-center">
            <p className="tw:text-center tw:text-green-600 tw:text-lg tw:font-medium">Thank you for your feedback!</p>
            <Button onClick={returnToChat}>Return to chat</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="tw:w-full tw:max-w-2xl tw:mx-auto tw:border-none tw:overflow-auto tw:bg-white">
      <CardHeader className="tw:sm:p-6 tw:p-4">
        <CardTitle className="tw:text-xl tw:sm:text-2xl">Feedback Form</CardTitle>
        <CardDescription>We value your input to improve our service</CardDescription>
      </CardHeader>
      <CardContent className="tw:sm:p-6 tw:p-4">
        <form onSubmit={handleSubmit} className="tw:space-y-6">
          <div className="tw:space-y-4">
            <Label className="tw:text-base tw:font-semibold">
              Did MIC help you find the information you were looking for?
            </Label>
            <RadioGroup
              value={helpfulRating || ""}
              onValueChange={setHelpfulRating}
              className="tw:grid tw:sm:grid-cols-3 tw:grid-cols-1 tw:gap-2"
              required
            >
              {["Yes", "No", "Somewhat"].map((option) => (
                <Label
                  key={option}
                  htmlFor={option.toLowerCase()}
                  className="tw:flex! tw:items-center! tw:space-x-2 tw:bg-gray-50 tw:p-2 tw:rounded-md tw:cursor-pointer tw:hover:bg-gray-100 tw:transition-colors"
                >
                  <RadioGroupItem value={option} id={option.toLowerCase()} className="tw:sr-only" />
                  <div className="tw:w-4 tw:h-4 tw:border tw:border-gray-300 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                    <div className={`tw:w-2 tw:h-2 tw:rounded-full ${helpfulRating === option ? "tw:bg-black" : ""}`} />
                  </div>
                  <span className="tw:text-sm">{option}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="tw:space-y-2">
            <Label htmlFor="feedback" className="tw:text-base tw:font-semibold">
              Please provide any feedback on how this service could be improved. (optional)
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
              className="tw:min-h-[80px]"
            />
          </div>
          <SubjectAreaSelection selectedSubject={subjectArea} onSubjectChange={setSubjectArea} required/>
        </form>
      </CardContent>
      <CardFooter className="tw:sm:p-6 tw:p-4">
        <Button onClick={handleSubmit} disabled={!helpfulRating || !subjectArea} className="tw:w-full">
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  )
}

