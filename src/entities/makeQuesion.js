const makeQusetion = ({ questions, index }) => {
  if (!questions && !questions.length >= 1) {
    return {
      message: 'no questions'
    }
  }

  const { question, correct_answer, incorrect_answers } = questions[index]

  const options = incorrect_answers.concat(correct_answer)

  return Object.freeze({
    getQuestion: () => question,
    getOptions: () => options,
    getIndex: () => index,
    validate: myAnwser => myAnwser == correct_answer
  })
}

export default makeQusetion

/*
specs : make question

  [] get question
  [] get options
  [] choose answer
  [] validate answer
  [] go to next question


*/
