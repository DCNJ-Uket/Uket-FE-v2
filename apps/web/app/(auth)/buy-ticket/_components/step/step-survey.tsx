import {
  Activity,
  ActivityContent,
  ActivityFooter,
} from "@ui/components/ui/activity";

import { useQuerySurveyList } from "@uket/api/queries/reservation";
import { useEffect, useState } from "react";
import {
  FormSchemaType,
  FormType,
} from "../../../../../hooks/use-buy-ticket-form";
import { useSurveyForm } from "../../../../../hooks/use-survey-form";
import { SelectHeader } from "../select-element";
import StepHeader from "../step-header";
import QuestionSection from "../survey/question-section";
import {
  StepControllerProps,
  StepNextController,
  StepPrevController,
} from "./step-controller";

interface StepSurveyProps extends StepControllerProps {
  form: FormType;
  onSubmit: (data: FormSchemaType) => Promise<number>;
  eventName: string;
  showDate: string;
  showTime: string;
  eventId: string;
}

export default function StepSurvey({
  form,
  onSubmit,
  eventName,
  showDate,
  showTime,
  eventId,
  onNext,
  onPrev,
}: StepSurveyProps) {
  const { data } = useQuerySurveyList(Number(eventId));
  const { surveyId, surveys } = data;

  const [performer, setPerformer] = useState("");

  const { surveyForm, onSurveySubmit } = useSurveyForm();
  surveyForm.setValue("surveyId", surveyId);
  useEffect(() => {
    if (performer) {
      surveyForm.setValue("responses", [
        { formId: surveys[0]!.formId, response: performer },
      ]);
    }
  }, [performer, surveys, surveyForm]);

  const handleNextStep = async () => {
    const ticketId = await onSubmit(form.getValues());
    onNext(ticketId.toString());
    onSurveySubmit(surveyForm.getValues());
    return true;
  };

  return (
    <Activity>
      <StepPrevController onPrev={onPrev} />
      <SelectHeader
        eventName={eventName}
        formatShowDate={showDate}
        formatSelectTime={showTime}
      />
      <ActivityContent className="bg-[#F2F2F2] py-6 justify-start">
        <StepHeader step={"03"} content={"아래 질문에 답변해주세요."} />
        {surveys[0] ? (
          <QuestionSection
            isNecessary={surveys[0].isNecessary}
            performer={performer}
            setPerformer={setPerformer}
            question={surveys[0].question}
            performerList={surveys[0].options}
          />
        ) : (
          <div className="flex justify-center">질의응답 내용이 없습니다😭</div>
        )}
      </ActivityContent>
      <ActivityFooter className="sticky bottom-0 z-50">
        <StepNextController
          onNext={() => handleNextStep()}
          disabled={surveys[0]!.isNecessary && performer === ""}
        />
      </ActivityFooter>
    </Activity>
  );
}
