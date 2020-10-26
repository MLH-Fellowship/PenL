<template>
  <div>
    <small>
      <!-- <span class="mr-2 text-muted" id="copy-text">{{ copy_text }} </span>  -->
      <input type="text" :value="copy_text" id="copy-text" />
      <i
        class="btn fa fa-clone"
        aria-hidden="true"
        @click="copyInviteLink"
        data-toggle="tooltip"
        data-placement="top"
        :title="tooltip"
      >
      </i>
      <p class="mt-4 text-muted">
        Copy the link above and share with friends to invite them
      </p>
    </small>
  </div>
</template>

<script>
export default {
  name: "CloneIcon",

  props: {
    copy_text: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tooltip: "copy to clipboard"
    };
  },

  methods: {
    copyInviteLink() {
      let inviteLink = document.getElementById("copy-text");
      inviteLink.select();

      try {
        var successful = document.execCommand("copy");
        this.tooltip = successful ? "copied !" : "not copied !";
      } catch (err) {
        alert("Oops, unable to copy");
      }
    }
  }
};
</script>

<style scoped>
.fa-clone {
  font-size: 2rem;
}
</style>
