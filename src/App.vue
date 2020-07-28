<template>
  <div>
    <Header title="QUIZ CHALLENGE !" :getNumTotal="0" />

    <div v-if="question_wrapper && !endGame" class="question_wrapper">
      <div>
        <center>
          <h3>
            <span>Score :</span>
            {{numCorrect}} / {{getNumTotal}}
          </h3>
        </center>
      </div>
      <h1 v-html="question"></h1>

      <ul class="options">
        <li
          v-for="(answer, i) in answers"
          :key="i"
          :class="myAnswer == answer ? 'choosen': ''"
          @click="chooseQuestion"
          v-html="answer"
        ></li>
      </ul>

      <button @click="goNext" :disabled="myAnswer == ''">NEXT</button>
    </div>

    <div v-else-if="endGame" class="end">
      <div>
        <h2>GAME END</h2>
        <span>Score :</span>
        <b>{{numCorrect}} / {{getNumTotal}}</b>

        <br />
        <br />
        <br />

        <a href="#" @click.stop="startGame">restart</a>
      </div>
    </div>

    <div v-else>
      <center>
        <h4>Loading...!</h4>
      </center>
    </div>
  </div>
</template>


<script>
import Header from "./components/Header";

import getQuestions from "./services/getQuestions";
import makeQuestion from "./entities/makeQuesion";

export default {
  name: "app",
  components: {
    Header
  },
  data() {
    return {
      questions: [],
      question_wrapper: null,
      question: "",
      myAnswer: "",
      answers: [],
      index: 0,
      numCorrect: 0,
      endGame: false
    };
  },
  computed: {
    getNumTotal: function() {
      return this.index + 1;
    }
  },
  watch: {
    question_wrapper: function() {
      this.question = this.question_wrapper.getQuestion();
      this.answers = this.question_wrapper.getOptions();
      this.index = this.question_wrapper.getIndex();
    }
  },
  methods: {
    chooseQuestion: function(e) {
      this.myAnswer = e.target.textContent;
    },
    goNext: function() {
      /* update score */
      if (this.question_wrapper.validate(this.myAnswer)) {
        this.numCorrect += 1;
      }

      /* when we go through all question end game */
      if (this.getNumTotal == this.questions.length) {
        this.finished();
        return false;
      }

      /* make new question */
      this.question_wrapper = makeQuestion({
        questions: this.questions,
        index: this.index + 1
      });

      /* reset my answer */
      this.myAnswer = "";
    },
    finished: function() {
      this.endGame = true;
    },
    startGame: async function() {
      this.questions = [];
      this.myAnswer = "";
      this.index = 0;
      this.numCorrect = 0;
      this.endGame = false;

      const { results } = await getQuestions();
      this.questions = results;
      this.question_wrapper = makeQuestion({ questions: results, index: 0 });
    }
  },
  mounted: async function() {
    const { results } = await getQuestions();
    this.questions = results;
    this.question_wrapper = makeQuestion({ questions: results, index: 0 });
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: "Roboto", sans-serif;
}
a {
  text-decoration: none;
  color: white;
}
.question_wrapper {
  width: 80%;
  margin: 0 auto 2rem;
  padding: 1rem;
}
.question_wrapper h1 {
  text-align: center;
  margin: 1rem 0;
}
h2 {
  font-family: "QUARTZO Demo", sans-serif;
}

.options {
  list-style: none;
  display: block;
}
.options li,
button {
  display: block;
  width: 80%;
  margin: 1rem auto;
  padding: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: all 150ms ease-in;
}
.options li:hover {
  color: whitesmoke;
  background-color: #ff3562;
}
.options li.choosen {
  color: whitesmoke;
  background-color: cornflowerblue;
}

button {
  border: none;
  background-color: #ff3562;
  color: white;
  font-weight: bold;
}
button[disabled] {
  background-color: #888;
  color: #000;
  opacity: 0.5;
  cursor: not-allowed;
}

.end {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 2rem auto;
  border-radius: 50%;
  background-color: #693668;
  color: rgba(255, 255, 255, 0.8);
}
</style>
