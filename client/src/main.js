import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

const cats = [
  {
    id: 1,
    name: 'Backlog'
  },
  {
    id: 2,
    name: 'Develompent'
  },
  {
    id: 3,
    name: 'Completed'
  },
]
const tasks = [
  {
      "id": 2,
      "name": "Development",
      "Tasks": [
          {
              "id": 1,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 2,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:05:31.609Z",
              "updatedAt": "2020-04-07T16:05:31.609Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          },
          {
              "id": 2,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 2,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:05:33.149Z",
              "updatedAt": "2020-04-07T16:05:33.149Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          },
          {
              "id": 3,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 2,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:05:33.980Z",
              "updatedAt": "2020-04-07T16:05:33.980Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
  },
  {
      "id": 3,
      "name": "Product",
      "Tasks": [
          {
              "id": 5,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 3,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:38.161Z",
              "updatedAt": "2020-04-07T16:46:38.161Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
  },
  {
      "id": 1,
      "name": "Backlog",
      "Tasks": [
          {
              "id": 6,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 1,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:43.703Z",
              "updatedAt": "2020-04-07T16:46:43.703Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          },
          {
              "id": 7,
              "title": "judul task 2",
              "description": "ini deskripsi pake category",
              "status": false,
              "UserId": "ae0e5b5b-4dba-4a23-a5af-8a13a0cb5c9a",
              "CategoryId": 1,
              "organization": "Hacktiv8",
              "createdAt": "2020-04-07T16:46:46.565Z",
              "updatedAt": "2020-04-07T16:46:46.565Z",
              "User": {
                  "username": "jokocuy",
                  "organization": "Hacktiv8"
              }
          }
      ]
  }
]
new Vue({
  el: '#app',
  // define data - initial display text
  data: {
    cats: [],
    tasks: [],
    showForm: []
  },
  methods: {
    showAdd(i) {
      if (this.showForm[i] == undefined) {
        this.showForm[i] = false;
        this.showForm[i] = !this.showForm[i];
      } else {
        this.showForm[i] = !this.showForm[i];
      }
      if(this.showForm[i]) {
        this.$refs.cats[i].style.display = 'block';
      } else {
        this.$refs.cats[i].style.display = 'none';
      }
    }
  },
  created() {
    this.cats = tasks;
    this.cats.forEach(el => this.tasks.push(el));
    console.log(this.tasks)
  }
})

// new Vue({
//   render: h => h(App),
// }).$mount('#app')