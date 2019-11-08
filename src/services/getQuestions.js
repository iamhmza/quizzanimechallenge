const getQuestions = async () => {
  let data

  try {
    let res = await fetch(
      'https://opentdb.com/api.php?amount=10&category=31&type=multiple'
    )
    data = await res.json()
  } catch (err) {
    data = []
  }

  return data
}

/*
get question
get options
get correct answer

set choosing answer
set validate
go to next question



{
  question: null,
  answers: [],
  correctAnswer: null,
  index: 0,
  myAnswer:null,


}

*/

export default getQuestions
