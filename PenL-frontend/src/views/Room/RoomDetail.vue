<template>
  <div>
    <div class="row  px-5  justify-content-center align-items-center mt-5">
      <div class="col-12 col-md-8 text-center mb-5 mb-md-0 px-md-5 px-3 py-5">
        <h3
          class="mt-5 text-muted text-justify text-center animate color-green"
          v-if="!startGame"
        >
          Waiting for Other Players to Join
        </h3>

        <h3
          class="mt-5 mb-5 text-muted text-justify timer text-center color-green"
          v-if="playGame && timer > 0"
        >
          Time Left: {{ timer }} secs
        </h3>

        <GameOver
          v-if="!playGame && gameOver"
          :room_slug="room_slug"
          :user="user"
          :host="room_details.host"
          v-on:restart="getQuestions"
        />

        <GamePlay
          v-if="playGame && !gameOver"
          :players="players"
          :question="questions[currentQuestionIndex]"
          :questionNumer="currentQuestionIndex + 1"
          :timer="timer"
        />

        <button
          class="btn btn-lg mt-5 px-4 py-2 cta-btn"
          v-if="showStartGameButton"
          v-on:click="getQuestions"
        >
          Start Game
        </button>
      </div>

      <div class="col-12  col-md-4 mt-5 mt-md-0">
        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title playful">
              <span>Leading Now</span> <span>✨</span>
            </h1>

            <h3 class="card-subtitle color-purple">
              <span class="mr-4 ">User-X </span>
              <span class="pts">50pts</span>
            </h3>
          </div>
        </div>

        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title playful">
              <span>{{ room_details.room_name }} Invite Link</span>
            </h1>
            <CloneIcon :copy_text="room_details.invite_link" />
          </div>
        </div>

        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title">
              <i class="fa fa-users  mr-1" aria-hidden="true"></i>
              <span class=" playful mr-2">Players </span
              ><span class="">{{ players.length }}</span>
            </h1>

            <small
              class="card-subtitle text-muted"
              v-for="player in players"
              :key="player.id"
            >
              <i class="fa fa-user m-2" aria-hidden="true">
                <span class="m-1"> {{ player.username }}</span>
              </i>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
import CloneIcon from "@/components/Utils/CloneIcon.vue";
import GamePlay from "@/components/Utils/GamePlay.vue";
import GameOver from "@/components/Utils/GameOver.vue";

export default {
  name: "RoomDetail",

  props: {
    room_slug: {
      type: String,
      required: true
    }
  },

  sockets: {
    connect: function() {
      console.log("socket connected to server");
    }
  },

  components: {
    CloneIcon,
    GamePlay,
    GameOver
  },

  data() {
    return {
      room_details: null,
      players: [],
      questions: [],
      startGame: false,
      showStartGameButton: false,
      playGame: false,
      user: window.sessionStorage.getItem("username"),
      currentQuestionIndex: 0,
      timer: 5,
      gameOver: false
    };
  },

  methods: {
    getRoom() {
      let get_room_endpoint = `api/v1/room/${this.room_slug}`;

      apiService(get_room_endpoint, "GET").then(data => {
        this.room_details = data;
        this.players = [...this.room_details.players];
      });
    },

    decrementTimer() {
      this.timer -= 1;

      if (this.timer <= -5) {
        let index = this.currentQuestionIndex + 1;
        if (index >= this.questions.length) {
          this.gameOver = true;
          this.playGame = false;
        } else {
          this.currentQuestionIndex += 1;
          this.timer = 5;
        }
      }
    },

    startTimer() {
      setInterval(this.decrementTimer, 1000);
    },

    getQuestions() {
      let get_questions_endpoint = `api/v1/questions`;

      apiService(get_questions_endpoint, "GET").then(data => {
        this.questions = [...data];
        this.showStartGameButton = false;
        this.playGame = true;
        this.startGame = true;
        this.gameOver = false;
        this.startTimer();
      });
    }
  },

  mounted: function() {
    document.title = "PenL | Room Detail";
  },

  created: function() {
    this.getRoom();

    this.sockets.subscribe("new_room_user", data => {
      this.startGame = true;

      if (this.startGame && this.user === this.room_details.host) {
        this.showStartGameButton = true;
      }

      this.players = [...this.room_details.players];
      this.players.push(data);
      this.players = [...new Set(this.players)];
    });
  }
};
</script>

<style scoped>
.players {
  font-size: 1.2rem;
}

.timer {
  font-size: 3rem;
}
.animate {
  animation-name: animate-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  font-weight: bold;
}

@keyframes animate-animation {
  from {
    font-size: 1rem;
  }
  to {
    font-size: 3rem;
  }
}
</style>
