<template>
  <div class="container">
    <div v-if="error">
      <span class="toast" id="toast">
        {{error}}
        <a href="" @click.prevent="closeToast" style="color: red; position: absolute; top: -50%; right: -20%;"><i class="material-icons" id="toast-close">close</i>close</a>
      </span>
    </div>
    <div class="row" v-for="(catRow, idx) in listEachRow" :key="idx">
      <div class="col s12 m6 l4" v-for="(cat, i) in catRow" :key="cat.id">
        <ul class="collection with-header" >
          <li class="collection-header">
            <a href="#!" class="valign-wrapper" id="add-task"><i class="small iconOption iconCollection material-icons" ref="button" @click="showAdd(idx, i)">add_circle_outline</i></a> 
            <h4>{{ cat.name }}</h4>
          </li>
          <li class="collection-item avatar input-task" :id="'input-' + i" ref="cats">
            <div class="row">
              <form class="col s12" ref="submitTask" ction enctype="multipart/form-data" @submit.prevent="createTask(idx, i)">
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
          <!-- -->
          <Card :catTasks="cat.Tasks" @emitUpdate="updateTask($event)" @emitDelete="deleteTask($event)"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from './card/Card.vue'

let base_url = "http://localhost:3000/tasks";
// let token = localStorage.getItem("access_token");
// console.log(token, 'YOu token')

export default {
  name: 'CardComponent',
  components: {
    Card
  },
  data() {
    return{
      cats: [],
      tasks: [],
      listEachRow: [],
      showForm: [],
      newTitle: '',
      error: null,
      token: localStorage.getItem('access_token')
    }
  },

  methods: {
    showAdd(idx, i) {
      let index;
      if (idx > 0) {
        index = idx * 3
      } else {
        index = i
      }
      if (this.showForm[index] == undefined) {
        this.showForm[index] = false;
        this.showForm[index] = !this.showForm[index];
      } else {
        this.showForm[index] = !this.showForm[index];
      }
      if(this.showForm[index]) {
        console.log(this.$refs.cats, 'cats')
        this.$refs.cats.forEach((el, idx) => {
          if(idx != index) {
            el.style.display = 'none';
            this.showForm[idx] = false;
          } else {
            el.style.display = 'block';
            this.showForm[idx] = true;
          }
        });
      } else {
        this.$refs.cats[i].style.display = 'none';
      }
    },
    showEditForm(i) {
      this.isDisabled[i] = !this.isDisabled[i];
      this.terms = !this.terms;
      this.editAble
    },
    // function to comunicate with db
    getAll() {
      axios({
        method: 'GET',
        url: base_url,
        headers: {
          access_token: this.token
        }
      })
      .then(result => {
          this.cats = result.data.cats;
          this.listEachRow = this.chunkArray(this.cats, 3)
          this.tasks = result.data.tasks;
          this.tasks.forEach((el, i)=> {
          this.showForm[i] = false;
        })
      })
      .catch((err) => {
        this.error = `${err.response.data.message}`;
      })
    },
    createTask(idx, id) {
      let formdata = {
        title: this.newTitle,
        CategoryId: id+1
      }
      if(idx > 0) {
        formdata.CategoryId = (id+1) + 3
      }
      axios({
        method: "POST",
        url: base_url, 
        data: formdata, 
        headers: {access_token: this.token} 
      })
        .then(() => {
          this.getAll();
          this.newTitle = '';
          this.error = null;
        })
        .catch(err => {
          this.error = `${err.response.data.message}`
        });
    },
    updateTask(datas) {
      const {id, data} = datas;
      axios({
        method: 'PUT',
        url: base_url + '/' + id,
        data,
        headers: {
          access_token: this.token
        }
      })
        .then(() => {
          this.getAll();
          this.error = null;
        })
        .catch(err => {
          this.error = `${err.response.data.message}`
          this.getAll();
        })
    },
    deleteTask(id) {
      axios({
        method: 'DELETE',
        url: base_url + '/' + id, 
        headers: {access_token: this.token}
      })
        .then(() => {
          this.getAll(); 
          this.error = null;
        })
        .catch(err => {
          this.error = `${err.response.data.message}`;
          this.getAll();
        })
    },
    // error basic handler
    closeToast(){
      this.error = null;
    },
    // function to split category
    chunkArray(myArray, chunk_size){
      var results = [];
      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }
      return results;
    }
  },
  // lifecycle
  mounted() {
    if(this.token) {
      this.getAll()
    }
  }
}
// color pallete
// #a8e6cf • #dcedc1 • #ffd3b6 • #ffaaa5 • #ff8b94
</script>

<style scoped>
/* Toast */
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