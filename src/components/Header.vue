<template>
  <header>
    <h1>QUIZ CHALLENGE</h1>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String,
    numCorrect: Number,
    getNumTotal: Number
  }
}
</script>

<style>
header {
  padding: 2rem;
  text-align: center;
  color: whitesmoke;
  background-color: #1b1b3a;
  font-family: 'QUARTZO Demo', sans-serif;
}
</style>