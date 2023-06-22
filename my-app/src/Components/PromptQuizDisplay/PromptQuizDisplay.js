import AnswerCheckbox from "../AnswerCheckbox/AnswerCheckbox";
import PromptQuestionTimer from "../PromptQuestionTimer/PromptQuestionTimer";
import PromptQuizCorrect from "../PromptQuizCorrect/PromptQuizCorrect";
import PromptQuizIncorrect from "../PromptQuizIncorrect/PromptQuizIncorrect";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function PromptQuizDisplay(props) {
	// Sets the new results, new question when Next is pressed
	function handleNextClick() {
		props.setResultsValue(0);
		props.setQuestionNumber(props.questionNumber + 1);
	}

	// if the questionObject is empty, display loading
	if (props.questionObject && Object.keys(props.questionObject).length === 0) {
		return <div>loading...</div>;
	}

	if (typeof props.questionObject === "object") {
		console.log("questionObject:", typeof props.questionObject);
		const questionObject = props.questionObject; // to pass down to AnswerCheckbox
		const question = questionObject.question; // to grab the question to display
		if (props.resultsValue === 0) {
			return (
				<div className="mainQuiz">
					<Card className="big-card">{question}</Card>
					{/*<p className="question"></p>*/}
					{props.promptQuestionTimer && <PromptQuestionTimer />}
					<AnswerCheckbox
						questionObject={questionObject}
						wrong_answers={questionObject.wrong_answers}
						id={questionObject.id}
						question={questionObject.question}
						correct_answer={questionObject.answer}
						questionNumber={props.questionNumber}
						setQuestionNumber={props.setQuestionNumber}
						// ^^send questionNumber props down to re-render after each answer
						resultsValue={props.resultsValue}
						setResultsValue={props.setResultsValue}
						incorrectAnswers={props.incorrectAnswers}
						setIncorrectAnswers={props.setIncorrectAnswers}
					/>
				</div>
			);
		} else if (props.resultsValue === 1) {
			return (
				<div className="MainQuiz">
					<PromptQuizCorrect handleNextClick={handleNextClick} />
				</div>
			);
		} else if (props.resultsValue === -1) {
			return (
				<div className="MainQuiz">
					<PromptQuizIncorrect
						questionObject={questionObject}
						handleNextClick={handleNextClick}
					/>
				</div>
			);
		} else {
			return (
				<div className="error">
					<p>ERROR didnt recieve a value of either 1,0 or -1</p>
				</div>
			);
		}
	}
	return (
		console.log("questionObject:", typeof questionObject),
		(
			<div className="MainQuiz">
				<p>xxxQuiz Complete!</p>
				<Button label="Home" />
			</div>
		)
	);
}
