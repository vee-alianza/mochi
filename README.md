<h1 align= "center" dir="auto">
  🍡 Mochi 🍡
</h1>
<h5 align= "center" dir="auto">
  Created by:
      <a href="https://github.com/vee-alianza">Vee Alianza</a>
      </br>
      </br>
      <a href="https://mochi-noms.herokuapp.com/">» Live Link «</a>
</h5>

<h4 align= "center" dir="auto">
  <a href="https://github.com/vee-alianza/mochi/wiki">» Explore the Wiki «</a>
</h4>
<h4 align= "center" dir="auto">
  <a href="https://github.com/vee-alianza/mochi#index">» Index «</a>
  <h4 align= "center" dir="auto">
      |
      <a href="https://github.com/vee-alianza/mochi#about">About</a>
      |
      <a href="https://github.com/vee-alianza/mochi#technologies-used">Technologies Used</a>
      |
      <a href="https://github.com/vee-alianza/mochi#getting-started">Getting Started</a>
      |
      <a href="https://github.com/vee-alianza/mochi#features">Features</a>
      |
  </h4>
</h4>

## About
Bringing people together through great food, culture and history! Food lovers, food enthusiasts, food connoisseurs alike can share and discover culinary experiences that awakens all senses with <span style= "color:#A020F0; font-weight:bold">*Mochi*</span>!

<!-- ### Welcome View:
### Home View: -->


<!-- ## Index -->
<!-- <h4 align= "center" dir="auto">
      |
      <a href="https://github.com/vee-alianza">Technologies Used</a>
      |
      <a href="">Getting Started</a>
      |
      <a href="">Features</a>
      |
</h4> -->

## Technologies Used

<h5 align= "left" dir="auto">
<img src="https://user-images.githubusercontent.com/92604480/165961417-c06bb493-af3d-48e7-99eb-27be08e2b2e1.png" alt="react" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165955681-9792572f-c7bd-4ffb-a97a-56e278c46c90.png" alt="redux" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165967312-f7b9d82b-535a-492a-a427-f87c8d5084aa.png" alt="postgres" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165962733-070a5108-5795-46dc-ad96-75614ea38ed7.png" alt="express" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165956086-498f1bc1-b0f3-43dc-8139-735c8c3a1c0d.png" alt="sequelize" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165955865-464b018f-0663-44eb-8ef5-43f61a1b1ce1.png" alt="nodejs" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165958091-6c9c8f94-f21f-4b77-95e2-bcf2d805ee98.png" alt="JS" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165958488-88707ac6-d80f-47a4-97f7-29725f6b12ab.png" alt="HTML" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165958448-6a0d3542-cf5f-44d6-b9c8-def152ae3f6c.png" alt="CSS" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165955147-b155e83b-ee1c-4f8b-94c1-f7472a6c09b0.png" alt="git" width="40"/>
<img src="https://user-images.githubusercontent.com/92604480/165955457-aeff7618-df2f-4003-991d-d53259df541a.png" alt="heroku" width="40"/>
</h5>

## Getting Started

1. Clone this repository
</br> ```git clone git@github.com:vee-alianza/mochi.git```

1. Install dependncies to your root directory.
</br> ```npm install```

3. Create a ```.env``` file based on the ```.env.example``` given below:
  ```
  PORT=«port number»
  DB_USERNAME=«database user name»
  DB_PASSWORD=«database user password»
  DB_DATABASE=«database name»
  DB_HOST=localhost
  JWT_SECRET=«generate strong secret here»
  JWT_EXPIRES_IN=«integer values in seconds»
  ```
4. Initialize Sequelize package to create the necessary dependencies.
</br> ```npx sequelize init```

5. Create a user in Postgres and give the user the necessary privileges.
</br> ``` CREATE USER «username» WITH PASSWORD «password» CREATEDB;```

6. Create Database, Migrate and Seed models.
</br> ```npx dotenv sequelize db:create```
</br> ```npx dotenv sequelize db:migrate```
</br> ```npx dotenv sequelize db:seed:all```

7. Start the app using:
</br> ```npm start```

8. Log in as a Demo user or create an account.

## Features
Logged in users are able to do the following:
* Create/Read/View/Delete Stories
* Create/Read/Delete Comments on stories
