<template>
  <div>
    <li v-for="task in catTasks" :key="task.id" class="collection-item avatar" :id="task.id" ref="taskItem">
      <i class="material-icons circle">account_circle</i>
      <p class="title">{{task.title}}</p>
      <p>{{ task.description }} <br>
        created by {{ task.User.username }}
        {{task.CategoryId}}
      </p>
      <div class="secondary-content options-task">
        <div class="row"> 
          <ModalBtn :task="task" :catId="catId" :type="'edit'" @backToCard="getUpdate(task.id, $event)"><i class="large iconOption iconCollection material-icons">edit</i></ModalBtn>
        </div>
        <div class="row"> 
          <ModalBtn :task="task" :catId="catId" :type="'delete'" @backToCard="getRefresh(task.id)"><i class="large iconOption iconCollection material-icons">delete</i></ModalBtn>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import ModalBtn from '../modals/ModalBtn.vue'
export default {
  props: ['catTasks', 'catId'],
  components: {ModalBtn},
  methods: {
    getRefresh(id) {
      this.$emit('emitDelete', id);
    },
    getUpdate(id, datas) {
      let newData = {id: id, 
      title: datas.title, 
      CategoryId: datas.CategoryId};
      // newData.title = datas.title;
      // newData.CategoryId = datas.CategoryId;
      this.$emit('emitUpdate', newData);
      console.log(id, newData, 'DICARD');
    },
    editOne(id) {
    axios({
      methods: 'get',
      url: 'https://kanbaaam.herokuapp.com/categories'
    })
      .then(res => {
        this.cats = res.data;
        // console.log(res, 'Dari edit')
      })
      .catch(err => {
        // console.log(err.response)
        this.$toasted.error(err.response.data.message)});

    }
  }
}
</script>

<style scoped>
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

/* collection list task */ 
  .title:disabled{
    border: none;
    opacity: 1;
    color: white;
  }
  .title{
    font-size: 1.5rem !important;
  }
  .collection{
    border: 0;
    border-radius: 2rem;
    background-color: #ff8b94;
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

  i {
    color: #a8e6cf;
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