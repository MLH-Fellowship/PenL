<template>
  <div>
    <div
      class="row  h-100 px-5  justify-content-center align-items-center mt-5"
    >
      <div class="col-12 col-md-8 text-center mb-5 mb-md-0 px-md-5 px-3 py-5">
        <h3 class="mt-5 text-muted text-justify">
          PenL allows you to learn core programming concepts along with friends
          in a fun way. All you have to do is create a room, invite your
          friends, and you know how this goes...
        </h3>

        <button class="btn btn-lg mt-5 px-4 py-2 cta-btn">
          Start Game
        </button>
      </div>

      <div class="col-12  col-md-4 mt-5 mt-md-0">
        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title playful">
              <span class="color-purple ">Leading Now</span> <span>✨</span>
            </h1>

            <h3 class="card-subtitle color-green">
              <span class="mr-4 animate">User-X </span>
              <span class="pts animate">50pts</span>
            </h3>
          </div>
        </div>

        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title playful">
              <span class="color-purple "
                >{{ room_details.room_name }} Invite Link</span
              >
            </h1>
            <CloneIcon :copy_text="room_details.invite_link" />
          </div>
        </div>

        <div class="card shadow my-5 px-2 light-green-bg">
          <div class="card-body text-center">
            <h1 class="sub-heading mt-3 card-title">
              <span class="color-purple playful mr-2">Players in Room:</span
              ><span class="color-green">{{ room_details.players_count }}</span>
            </h1>

            <small
              class="card-subtitle  text-muted mr-5"
              v-for="player in room_details.players"
              :key="player.id"
            >
              <span class="mr-1">{{ player.username }}:</span>
              <span class="pts">{{ player.points }} pts</span>
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

  components: {
    CloneIcon
  },

  data() {
    return {
      room_details: null
    };
  },

  methods: {
    getRoom() {
      let get_room_endpoint = `api/v1/room/${this.room_slug}`;

      apiService(get_room_endpoint, "GET").then(data => {
        this.room_details = data;
      });
    }
  },

  mounted: function() {
    document.title = "PenL | Room Detail";
  },

  created: function() {
    this.getRoom();
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
}

@keyframes animate-animation {
  from {
    font-size: 1.2rem;
  }
  to {
    font-size: 1.7rem;
  }
}
</style>
