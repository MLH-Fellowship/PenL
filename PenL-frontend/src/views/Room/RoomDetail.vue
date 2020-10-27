<template>
  <div>
    <div
      class="row  h-100 px-5  justify-content-center align-items-center mt-5"
    >
      <div class="col-12 col-md-8 text-center mb-5 mb-md-0 px-md-5 px-3 py-5">
        <h3
          class="mt-5 text-muted text-justify text-center animate color-green"
          v-if="!startGame"
        >
          Waiting for Other Players to Join
        </h3>

        <h3
          class="mt-5 text-muted text-justify text-center  color-green"
          id="welcome"
        ></h3>

        <button
          class="btn btn-lg mt-5 px-4 py-2 cta-btn"
          v-if="showStartGameButton"
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
    CloneIcon
  },

  data() {
    return {
      room_details: null,
      players: [],
      startGame: false,
      showStartGameButton: false,
      user: window.sessionStorage.getItem("username")
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

    welcomeUser(username) {
      let target = document.getElementById("welcome");
      target.innerHTML = `${username} just joined the room`;
    },

    deleteWelcomeText() {
      let target = document.getElementById("welcome");
      target.innerHTML = "";
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

      this.welcomeUser(data.username);
    });
  }
};
</script>

<style scoped>
.players {
  font-size: 1.2rem;
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
