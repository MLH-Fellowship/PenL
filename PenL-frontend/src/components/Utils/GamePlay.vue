<template>
  <div class="card shadow my-5 px-5 light-green-bg text-left">
    <div class="card-body">
      <div v-if="timer > 0">
        <h2 class="playful card-subtitle mb-5">{{ questionNumer }}.</h2>

        <h2 class="playful card-subtitle">
          {{ question.body }}
        </h2>

        <div class="card-text mt-3 mb-5">
          <form>
            <div
              class="form-check my-2"
              v-for="choice in question.choices"
              :key="choice"
            >
              <input
                type="radio"
                class="form-check-input mt-1 radio-btn"
                name="optradio"
                :value="choice.body"
              />

              <label class="form-check-label ml-3">
                {{ choice.body }}
              </label>
            </div>
          </form>
        </div>
      </div>

      <div class="card-text mt-5" v-else>
        <h3 class="color-green">Answer: {{ question.answer }}</h3>
        <h4>{{ question.answer_explanation }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionsCard",

  props: {
    question: Object,
    players: Array,
    questionNumer: Number,
    timer: Number
  },

  data() {
    return {};
  },

  methods: {},

  mounted: function() {}
};
</script>

<style scoped></style>
