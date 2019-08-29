<template>
  <div>
    <div class="container">
      <div v-if="!join" id="join" class="text-center">
        <form @submit.prevent="joinChat(name)">
          <div class="form-group">
            <input type="text" max="12" class="form-control input-lg text-center" v-model="name" placeholder="Name">
          </div>
          <button class="btn btn-primary btn-lg" type="submit">Join Chat</button>
        </form>

      </div>

      <div v-if="join" id="group">
        <div class="users">
          <h4>Users</h4>
          <ul class="list-unstyled">
            <li v-for="(user, i) in users" :key="i">{{user}}</li>
          </ul>
        </div>
        <div class="chat">

          <div class="messages">
            <ul class="list-unstyled" id="box_chat_message">
              <li v-for="(m, index) in messages" :class="{me: (m.name === name), clearfix: true}" :key="index">
                <div class="name">{{m.name}}</div>
                <span>{{m.message}}</span>
              </li>
            </ul>
          </div>


          <div class="input">
            <form @submit.prevent="send(message)">
              <div class="input-group">
                <input type="text" class="form-control" v-model="message" placeholder="Enter message here...">
                <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Send</button>
                          </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "HandlerSocket",
    data() {
      return {
        join: false,
        name: null,
        users: [],
        message: null,
        messages: []

      }
    },
    methods: {
      joinChat: function (name) {
        if (name) {
          this.$socket.emit('join', name);
        }
      },
      send: function (message) {
        if (message) {
          this.$socket.emit('send', message);
          // this.$set('message', null);
          this.message = null;
        }
      }
    },
    watch: {
      messages: function () {
        console.log('chatted...');
      }
    },
    sockets: {
      users: function (users) {
        // this.$set('users', users);
        console.log('users', users);
        this.users = users;
      },
      joined: function () {
        this.join = true;
        // this.$set('join', true)
      },
      messages: function (data) {
        // this.$set('messages', data);
        this.messages = data;
      },
      onmessage: function (data) {
        console.log('chat message', data);
        this.messages.push(data);
      },
      adduser: function (user) {
        console.log('add users', user);
        this.users.push(user);
      }
    }
  }
</script>

<style scoped lang="scss">

  .container {
    max-width: 700px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .05);
    background-color: #fff;
    border: 1px solid #eee;
    padding: 15px;
  }

  .users {
    border-right: 1px solid #eee;
    float: left;
    width: 140px;
  }

  .users ul {
    height: 250px;
    overflow-y: scroll;
    margin: 0;
  }

  .users h4 {
    margin: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 3px;
    margin-bottom: 5px;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #666;
  }

  .chat {
    width: 528px;
    float: left;
    padding-left: 15px;
    position: relative;
    height: 278px;
  }

  .chat .messages ul {
    height: 240px;
    margin: 0;
    overflow-y: scroll;
    padding-top: 5px;
  }

  .chat .messages ul li .name {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .chat .messages ul li {
    margin-bottom: 10px;
  }

  .chat .messages ul li span {
    border-radius: 5px !important;
    background: #E0EDFF;
    padding: 5px 12px;
    font-size: 15px;
  }

  .chat .messages ul li.me {
    text-align: right;
    margin-right: 10px;
  }

  .chat .input {
    position: absolute;
    bottom: 0;
  }


  @media screen and (max-width: 768px) {
    body, html{
      position: relative;
      width: 100%;
      height:100%;
    }

    #join .btn{
      display: block;
      width: 100%;
    }

    .container {
      position: absolute;
      width: 100%;
      height: 89%;
    }

    h1{
      margin: 4% 0;
    }

    .users{
      display: none;
    }

    .chat{
      float: none;
      padding: 0;
      height: 100%;
      width: 100%;
      position: absolute;
    }

    .chat .messages{
      height: 90%;
    }

    .chat .messages ul{
      height:100%;
    }

    #group{
      height: 100%;
      position: relative;
    }
  }
</style>
