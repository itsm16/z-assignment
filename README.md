### Usage
Built with `Express.JS` and `MongoDB` for storing data

`Zod` for validation/ checking payloads

###### Live on Render 
https://zylentrix-assignment.onrender.com/api/fetchUsers

#### Endpoints
`GET` /api/fetchUsers - fetches documents of all users in the collection.

`GET` /api/getUser - accepts `id` (mongo id) as param and returns document of single user.

`POST` /api/addUser - using `name`, `email`, `age` creates a new user document. 

`PUT` /api/updateUser/:id - accepts `id` in query params and `name` or `email` as body params, checks/finds the document using `id` and updates the field passed in the body.

`DELETE` /api/deleteUser/:id - accepts `id` in query params, checks/ finds the document and deletes it.


for example, `GET` /api/fetchUsers request would look like https://zylentrix-assignment.onrender.com/api/fetchUsers

or a request with `id` (mongo id) as param - zylentrix-assignment.onrender.com/api/deleteUser/67d1ee3a525de8b04288





