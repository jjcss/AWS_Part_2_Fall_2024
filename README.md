
<!-- # Intro to React -->

<img src="https://i.imgur.com/JybZuXd.png" alt="drawing" width="100"/> <img src="https://i.imgur.com/Bzkqs5I.png" alt="drawing" width="100"/>

# Computer Science Society Club

## Table of Contents
- [Introduction](#Introduction)
- [Pre Requisites](#Pre-Requisites)
- [React Demo](#React-Demo)
    - [Pre-Demo](#Pre-Demo)
    - [Review Code Template](#Review-Code-Template)
    - [Creating our Backend Server](#Creating-our-Backend-Server)
    - [Installing MySQL + MySQL Workbench](#Installing-MySQL-+-MySQL-Workbench)
    - [Create MySQL Workbench Database](#Create-MySQL-Workbench-Database)
    - [Connect MySQL Database to your React Project](#Connect-MySQL-Database-to-your-React-Project)
    - [C - Create Data](#C---Create-Data)
    - [R - Read Data](#R---Read-Data)
    - [U - Update Data](#U---Update-Data)
    - [D - Delete Data](#D---Delete-Data)
    - [The End](#The-End)
- [Continue Learning About React](#Continue-Learning-About-React)

# Hands-On AWS (2/2) Workshop 

**Date:** Wednesday, December 4th, 2024 <br>
**Description**: In this workshop students will learn how to implement AWS services like S3 Buckets, SQS, Lambda Functions, SNS, and possibly a PostgresQL database with Python, which is a high-level programming language (or React) This will be the second part of a 2 part series. <br>
**Workshop Youtube Video**: [click here - tbd]() <br>
**Workshop Google Slides**: [click here - tbd]() <br>

---


## Introduction
**Description**: We will be going over how to implement AWS S3, Lambda, SQS, and SNS in a real-world scenario. By real-world scenario, what we mean is connecting our AWS account and its services to our website, which we will be hosting locally. This will require us to create a AWS Account, and you to follow all steps detailed below.

---

## Pre Requisites
            - Finally, to begin coding, you will need to open up your React project on a Coding Editor. We highly recommend you use and download [Visual Studio Code](https://code.visualstudio.com/download) as a coding editor. Once you selected a coding editor, go to where you downloaded/saved your React project and open it up on your editor. That's it. Happy coding!

> Note: Using Vite to install React will save you much more time, compared to create-react-app.
> **Resources**:
> Video on installing [React on Mac](https://www.youtube.com/watch?v=2oA9d93T9Aw)
> Install React [Article](https://www.knowledgehut.com/blog/web-development/install-react-on-mac)

---

# AWS Demo

## Pre-Demo
**Description**: Before we begin the demo, you will need an AWS account. To create a AWS Account [click here](https://aws.amazon.com/free/?gclid=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE&trk=78b916d7-7c94-4cab-98d9-0ce5e648dd5f&sc_channel=ps&ef_id=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE:G:s&s_kwcid=AL!4422!3!432339156165!e!!g!!aws%20free%20tier!9572385111!102212379047&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all). **Make sure you create a Free Tier Account**. After you've successfully created an account, pleas follow the steps after this section. Make sure you've saved your login credentials.

> **Note**: In order to create an AWS account, you will be required to enter your Credit/Debit card information as not all services of AWS are free. If you [click this](https://aws.amazon.com/free/?gclid=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE&trk=78b916d7-7c94-4cab-98d9-0ce5e648dd5f&sc_channel=ps&ef_id=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE:G:s&s_kwcid=AL!4422!3!432339156165!e!!g!!aws%20free%20tier!9572385111!102212379047&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) you'll be able to see what services are free (up to a certain point, **not forever**). <br/>
> I repeat, please look into this carefully, because if you select a service that isn't free (up until a certain point) your card will be charged depending on how many times you use it, etc. <br/>
> There have been many nightmare stories of people who forgot to turn a service off and have been charged thousands of dollars. **Thus, we ask that you continue with this in mind and at your own discretion**.

## Required Coding Files
**Description**: Below you will find all the files we will be using for this demo. These files contain the frontend (HTML), backend (Javascript), and our server 

## Create IAM User
**Description**: We will now be creating an AWS IAM User, which is an identity in an AWS account that has the permission to interact with AWS resources. In other words, in order for a user to interact with AWS services (S3, SQS, SNS, Lambda, etc.), on the AWS platform or via your local code, you need an IAM role.

1. Go to the IAM Dashboard (after you've created an AWS account) by [clicking here](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home) or by going to the search bar at the top of your AWS screen, and typing in **IAM User**.
2. On the left side of your screen you should see a table of options, click on the **Users** option.
3. At the top left corner you should see a **Create User** button, click it.
4. **Enter your username**, and make sure you select the **Provide user access to the AWS Management Console - optional** option, as this will allow us to give ourselves a role. Then, make sure you have the **I want to create an IAM user** option selected. Keep everything else on this page by default. Finally, click the **next** button.
5. Select the **Attach policies directly** option. In order for us to have permission to access specific AWS services, in this section we define the "policies" that this role that we are creating will have. Below are the four policies that this role should have (make sure you select these and you can search these by names). After you're done, click the **next** button:
    -  S3: AmazonS3FullAccess
    -  Lambda: AWSLambda_FullAccess
    -  SQS: AmazonSQSFullAccess
    -  SNS: AmazonSNSFullAccess
6. On this page you'll be able to review your settings you've just set for this user. After you're done reviewing your changes, click the **create user** button. You've now created an IAM User.

## Create IAM User Access Key
**Description**: After having created an IAM User, you will now use that user and give it an **Access Key**, which will allow us to use this user and connect to AWS via our **code**.

1. Go back to the AWS IAM Panel and on the left side table options, click on the **Users** option.
2. Click on the **name of the user** you have just created.
3. You should now see a horizontal row with these options **Permissions | Groups | Tags | Security credentials | Access Advisor**. Click on **Security Credentials**. Scroll down until you see the **Access Keys** section, and click on **Create Access Key**. Select the **local code** option and then click **next.
4. Finally, leave everything else as it is and click on **create access key**
5. Make sure you jot down what your **Access Key** and **Secret Access Key**. We have now created an Access Key for the IAM User we've created. We will use this in our code files to connect our code with AWS.

> Note: Make sure you keep your **Access Key** and **Secret Access Key** private. Do not share it with **anyone**.
    
## S3 (AWS) Bucket Creation
**Description**: Now we will create an S3 bucket, which we will use to store any files we upload directly from our website. Although, you'll also be able to upload files directly via the AWS S3 platform. AWS S3 accepts many different file types.

1. To create an S3 Bucket


## Creating our Backend Server
**Description**: In this section, we will be creating our **backend server** through the installation of various packages and a few other things.

1. Creating client folder
    - After reviewing our code, in VS Code let's create a `client` folder that we will use to store all our **front-end code**. 
        <details>
        <summary>Client folder</summary>
        <img src="https://i.imgur.com/CrvY5eO.gif" alt="drawing" width="500" height="300"/>
        </details>
    - Next, let's drag in all our files in our "Initial_Code" folder and insert them into the `client` folder. Make sure all files are now in the `client` folder.
        <details>
        <summary>Add files to Client folder</summary>
        <img src="https://i.imgur.com/Ts5xmQy.gif" alt="drawing" width="500" height="300"/>
        </details>
    - If you haven't noticed, go back to your browser tab that shows our applications website. Reload the page. You should see the "This localhost page can’t be found" message on your browser. This is because we created a new folder and we aren't directly inside of it from our terminal. To fix this, go to your terminal and exit out of your environment with the command `control c`. Now, enter the command `cd client` into your terminal. Now, enter the command `npm run dev` to start your environment again. Reload your browser. 
        <details>
        <summary>Re-run environment</summary>
        <img src="https://i.imgur.com/CsIZUAz.gif" alt="drawing" width="500" height="300"/>
        </details>
2. Creating server folder
    - Let's go back to VS Code, and outside of the `client` folder, let's create a `server` folder. We will include all our logic relating to our backend inside of this folder.
        <details>
        <summary>Server folder</summary>
        <img src="https://i.imgur.com/ETLXG4E.gif" alt="drawing" width="500" height="300"/>
        </details>
    - Next, let's open up a new terminal tab, but make sure you are inside of the "Initial_Code" directory. We should be familiar with these steps. In the new terminal let's enter the command `cd server`. Similar to running the front-end environment, we will have to run a backend environment that will be running in the back. We still have a few more steps to have our backend invironment running.
        <details>
        <summary>cd server</summary>
        <img src="https://i.imgur.com/p33Gfzf.gif" alt="drawing" width="500" height="300"/>
        </details>
3. Running Server Node Packages
    - Now, still in our server terminal, let's enter in the command `npm init`. Press ente/yesr to anything your terminal asks you. This command will create a "package.json" file in your VS Code that will contain all our server packages.
        <details>
        <summary>npm init</summary>
        <img src="https://i.imgur.com/oXBu9DE.gif" alt="drawing" width="500" height="300"/>
        </details>
        <details>
        <summary>package.json file</summary>
        <img src="https://i.imgur.com/g6vhuIZ.png" alt="drawing" width="500" height="300"/>
        </details>
    - Next, we are going to install a few more packages that will allow us to run our server successfully. Go back to your server terminal and enter the command `npm install express body-parser mysql nodemon cors`. After they're done installing, you should see the new additions in your "package.json" file.
        - express: our actual express server
        - body-parser: parses our request and converts it into a format from which you can easily extract relevant information
        - mysql: database we will be using for our application
        - nodemon: will automatically refresh our backend when we add new code
        - cors: will allow our backend to communicate with the frontend
        <details>
        <summary>install more packages</summary>
        <img src="https://i.imgur.com/iqgqQub.gif" alt="drawing" width="500" height="300"/>
        </details>
    - Lastly, since we've installed the **nodemon** package, let's go to our `package.json` file in our VS Code. Your file probably looks like this:
        - ```
          {
              "name": "server",
              "version": "1.0.0",
              "description": "",
              "main": "index.js",
              "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
              },
              "author": "",
              "license": "ISC",
              "dependencies": {
                "body-parser": "^1.20.2",
                "cors": "^2.8.5",
                "express": "^4.18.2",
                "mysql": "^2.18.1",
                "nodemon": "^2.0.21"
              }
            }
          ```
        - Let's update this file to include these two nodemon lines, inside of "scripts". The lines below will allow our server backend to refresh continuously without us having to restart it everytime we make a new change:
            - ```
              "start": "node index.js",
              "devStart": "nodemon index.js",
              ```
        - Your `package.json` file should now have this code:
            - ```
              {
                  "name": "server",
                  "version": "1.0.0",
                  "description": "",
                  "main": "index.js",
                  "scripts": {
                    "start": "node index.js",
                    "devStart": "nodemon index.js",
                    "test": "echo \"Error: no test specified\" && exit 1"
                  },
                  "author": "",
                  "license": "ISC",
                  "dependencies": {
                    "body-parser": "^1.20.2",
                    "cors": "^2.8.5",
                    "express": "^4.18.2",
                    "mysql": "^2.18.1",
                    "nodemon": "^2.0.21"
                  }
                }
              ```

4. Creating Server File (index.js)
    - Now, let's go back to VS Code, and inside of our `server` folder, let's create a `index.js` file. In this file, we'll include logic for our backend.
        <details>
        <summary>create index.js file</summary>
        <img src="https://i.imgur.com/kqpCvX0.gif" alt="drawing" width="500" height="300"/>
        </details>
    - In your new `index.js` file, enter the following code. The important lines of code you should know is "app.listen()" & creating your express server in the first two lines of code:
        ```
        // code that will make our backend server run
        const express = require("express"); 
        const app = express(); // setting up our express server
        const bodyParser = require("body-parser");
        const cors = require("cors");


        // code that will save ud errors in the future
        app.use(cors());
        app.use(express.json());
        app.use(bodyParser.urlencoded({extended:true}));
        //

        // let's us run our backend server. Message will output in our server terminal
        app.listen(3001, () => {
            console.log("running on port 3001");
        })
        ```

5. Running your backend server
    - Now that you've installed all necessary packages and included the boiler plate code, let's run our backend server. Enter the command `npm run devStart` in your backend terminal. If you've done everything correctly up until this point, you should see the following messages on your terminal.
        <details>
        <summary>run backend server</summary>
        <img src="https://i.imgur.com/14JQ2Mj.gif" alt="drawing" width="500" height="300"/>
        </details>

## Installing MySQL + MySQL Workbench
> Note: Please install MySQL Workbench. Installation shouldn't take more than 5 minutes. <br>
-> [MySQL WorkBench Installation](https://dev.mysql.com/downloads/workbench/)<br>
-> [MYSQL WorkBench Installation Youtube video](https://www.youtube.com/watch?v=sY_QPWiIeDQ&ab_channel=CodeJava) <br>
**Description**: MySQL Workbench will allow us to visualize that data that we will be adding to our database. If you've already installed MySQL Workbench, you can move on to the next step.
    
## The End
**Summary**: Congratulations on learning how to connect a **React** project to a backend, and learning how to use the **CRUD** method. We hope you left this meeting with a better understanding of React and how to use **MySQL** as a backend, along with **MySQL Workbench**. Feel free to look at the resources we've compiled below, which includes

---

# Continue Learning About React
- [11-Hour React Free Course](https://scrimba.com/learn/learnreact)
- [React Website: Learn more](https://reactjs.org/community/courses.html)
- [React Youtube Course](https://www.youtube.com/watch?v=bMknfKXIFA8&t=2154s)
- [CRUD Method](https://www.freecodecamp.org/news/crud-operations-explained/)
- [Vite](https://vitejs.dev/guide/)
- [MySQL Workbench Installation](https://dev.mysql.com/downloads/workbench/)



> For visual learners, we'd recommend Youtube videos.
