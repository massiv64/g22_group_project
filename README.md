# g22 Project - Collaborators: Chris Chang, Kyle Peacock, Nic Higuera, Sara Jay.

# This repository will serve as the official repository for our project.

Please fork this repository and then clone it into your local computer.
Once you are ready to push onto github, push your commit onto your own git repository and submit a pull request.

When your code is accepted, the moderator will merge your code into the master branch.
The moderator will make sure the code won't break the project.

### Testing / setup Instructions:
+ git clone and npm install
+ `createdb stack_app`
+ `createdb stack_app-test`
+ `knex migrate:latest`
+ `knex migrate:latest`
+ `knex migrate:latest --env test`
+  Test command: mocha

### Kyle's Git Workflow

If you want have made changes:
+ `git add .`
+ `git commit -m ""`
+ `git pull upstream master`

Handle any merge conflicts on your own side computer

+ `git push origin master`

Finally, initiate a pull request on GitHub
