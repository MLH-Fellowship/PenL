<template>
  <div class="card shadow my-5 px-5 light-green-bg text-center">
    <div class="card-body">
      <div>
        <h1 class="playful  sub-heading color-purple mb-5">
          Game Over
        </h1>

        <h1 class="playful card-subtitle">
          and the winner is...
        </h1>

        <h1 class="playful sub-heading color-purple mb-5">
          Unknown
        </h1>
      </div>

      <div class="mt-3 mb-3" v-if="user === host">
        <button
          class="btn btn-lg  px-4 py-2 mr-3 cta-btn"
          v-on:click="reStartGame"
        >
          Restart Game
        </button>

        <button
          class="btn btn-lg  px-4 py-2 ml-3 cta-btn-purple"
          v-on:click="deleteRoom"
        >
          End Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";

export default {
  name: "GameOver",

  props: {
    room_slug: String,
    user: String,
    host: String
  },

  data() {
    return {
      host_id: parseInt(window.sessionStorage.getItem("user_id"))
    };
  },

  methods: {
    deleteRoom() {
      let delete_room_endpoint = `api/v1/host/${this.host_id}/room/${this.room_slug}`;

      apiService(delete_room_endpoint, "DELETE").then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },

    reStartGame() {
      this.$emit("restart");
    }
  },

  mounted: function() {}
};
</script>

<style scoped></style>
