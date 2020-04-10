<template>
<div>
  <div class="row pisah">
    <ul class="collection with-header" >
      <li class="collection-header">
        <a href="#!" class="valign-wrapper" id="add-task"><i class="small iconOption iconCollection material-icons" ref="button" @click="showAdd" >add_circle_outline</i></a> 
        <h5>{{ cat.name }}</h5>
      </li>
      <li class="collection-item avatar input-task" :id="'input-' + cat.id" ref="cats">
        <div class="row">
          <form class="col s12" ref="submitTask" @submit.prevent="createTask" >
            <div class="row">
              <div class="input-field col s12">
                <label for="task" class="active">Add</label>
                <input :id="'task-' + cat.id" type="text" class="validate" placeholder="Task" ref="input-task" v-model="newTitle">
                <button type="submit" id="submit" class="waves-effect waves-teal btn-flat">
                  <i class="material-icons">add_circle_outline</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <!-- component card -->
      <Card :catTasks="cat.Tasks" :key="'card-' + cat.id" @emitUpdate="updateTask($event)" @emitDelete="deleteTask($event)" :catId="cat.id"/></Card>
    </ul>
  </div>
</div>
</template>

<script>
import Card from './Card.vue'
import axios from "axios";

let base_url = "http://localhost:3000/tasks";
let token = localStorage.getItem("access_token");


export default {
  name: 'Category',
  props: ['cat'],
  components: {Card},
  data() {
    return {
      newTitle: null,
      CategoryId: null
    }
  }, 
  methods: {
    showAdd() {
      if(this.$refs.cats.style.display == 'block') {
        this.$refs.cats.style.display = 'none'
      } else {
        this.$refs.cats.style.display = 'block'
      }
    },
    createTask() {
      console.log('masuk')
      let self = this;
      let formdata = {
        title: this.newTitle,
        CategoryId: this.cat.id
      }
      console.log('form')
      axios({
        method: "POST",
        url: base_url, 
        data: formdata, 
        headers: {access_token: token} 
      })
        .then((res) => {
        console.log('ax then')
          this.newTitle = '';
          this.$toasted.success(`Succesfully create ${res.data.task.title}`, {duration: 3000});
          self.$emit('emitCreate')
          if(this.$refs.cats.style.display == 'block') {
            this.$refs.cats.style.display = 'none'
          } else {
            this.$refs.cats.style.display = 'block'
          }
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {duration: 3000});
        });
    },
    deleteTask(id) {
      let self = this;
      axios({
        method: 'DELETE',
        url: base_url + '/' + id, 
        headers: {access_token: token}
      })
        .then((res) => {
          self.$emit('emitCreate')
          this.$toasted.success(`Succesfully delete ${res.data.title}`, {duration: 3000});
        })
        .catch(err => {
          self.$emit('emitCreate')
          this.$toasted.error(err.response.data.message, {duration: 3000});

        })
    },
    updateTask(datas) {
      const {id, title, CategoryId} = datas;
      // CategoryId = this.cat.id
      let self = this;

      console.log(datas, 'yang bakal dikirim ke server');
      console.log(id, title, CategoryId, 'yang bakal dikirim ke server');
      axios({
        method: 'PUT',
        url: base_url + '/' + id,
        data: {
          title, CategoryId
        },
        headers: {
          access_token: token
        }
      })
        .then((res) => {
          self.$emit('emitCreate')

          this.$toasted.success(`Succesfully update ${res.data[1][0].title}`, {duration: 3000});
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {duration: 3000});
          self.$emit('emitCreate')

        })
    },

  }

}
// console.log(this.cat, ' ini')


  

</script>

<style scoped>
/* Toast */
.pisah {
  width: 80%
}
.toast{
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 80%;
  border-radius: 2rem;
  animation: fade_in_show2 2s;
}

/* Input field task */
  .collection-item.avatar.input-task{
    height: 50px !important;
    padding: 0 2rem !important;
    width: 95%;
    display: none;
    animation: fade_in_show 1s;
  }
    /* display: add form */
    @keyframes fade_in_show {
      0% {
        opacity: 0;
        transform: scale(0)
      }
      100% {
        opacity: 1;
        transform: scale(1)
      }
  }

  input.validate{
    width: 100% !important;
    border-bottom: 1px solid #dcedc1;
  }

  button#submit{
    float: right;
    position: absolute;
    right: 2px;
  }

  /* add task*/
  #add-task{
    float: right;
    margin-top: 40px;
  }

/* collection list task */ 
  .collection.with-header .collection-header{
    background-color: #ffaaa5;
  }
  .title:disabled{
    border: none;
    opacity: 1;
    color: white;
  }
  .collection{
    border: 0;
    border-radius: 2rem;
    background-color:  #ffd3b6;
    margin: 1.25rem 0;
    height: auto !important;
  }
  .collection-item {
    background-color: #ffd3b6;
    margin: 1.25rem 0;
    padding: 1rem;
    height: 130px !important;
    overflow: hidden;
  }
  /* icons collection*/ 
  .iconOption {
    margin-top: -50px;
    margin-bottom: -50px;
  } 
  i {
    color: #a8e6cf;
  }
  .collection .collection-item.avatar .secondary-content {
    position: absolute;
    right: 30px;
  }

  .avatar .options-task{
    display: none;
    positions: relative !important;
  }
  .avatar:hover > .options-task{
    display: block;
  }
/*    */
</style>