
<!-- # Intro to React -->

<img src="https://i.imgur.com/JybZuXd.png" alt="drawing" width="100"/> <img src="https://i.imgur.com/Bzkqs5I.png" alt="drawing" width="100"/>

# Computer Science Society Club

## Table of Contents
- [Introduction](#Introduction)
- [Pre Requisites](#Pre-Requisites)
- [AWS Demo](#AWS-Demo)
    - [Pre-Demo](#Pre-Demo)
    - [Required Coding Files](#Required-Coding-Files)
    - [Create IAM User](#Create-IAM-User)
    - [Create IAM User Access Key](#Create-IAM-User-Access-Key)
    - [S3 Bucket Creation](#S3-Bucket-Creation)
    - [AWS Info Input Into Our Code](#AWS-Info-Input-Into-Our-Code)
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
**Description**: ...

---

# AWS Demo

## Pre-Demo
**Description**: Before we begin the demo, you will need an AWS account. To create a AWS Account [click here](https://aws.amazon.com/free/?gclid=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE&trk=78b916d7-7c94-4cab-98d9-0ce5e648dd5f&sc_channel=ps&ef_id=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE:G:s&s_kwcid=AL!4422!3!432339156165!e!!g!!aws%20free%20tier!9572385111!102212379047&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all). **Make sure you create a Free Tier Account**. After you've successfully created an account, pleas follow the steps after this section. Make sure you've saved your login credentials.

> **Note**: In order to create an AWS account, you will be required to enter your Credit/Debit card information as not all services of AWS are free. If you [click this](https://aws.amazon.com/free/?gclid=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE&trk=78b916d7-7c94-4cab-98d9-0ce5e648dd5f&sc_channel=ps&ef_id=EAIaIQobChMI_ruElqCKigMVyExHAR1p6QhsEAAYASAAEgIx6_D_BwE:G:s&s_kwcid=AL!4422!3!432339156165!e!!g!!aws%20free%20tier!9572385111!102212379047&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) you'll be able to see what services are free (up to a certain point, **not forever**). <br/>
> I repeat, please look into this carefully, because if you select a service that isn't free (up until a certain point) your card will be charged depending on how many times you use it, etc. <br/>
> There have been many nightmare stories of people who forgot to turn a service off and have been charged thousands of dollars. **Thus, we ask that you continue with this in mind and at your own discretion**.

## Required Coding Files
**Description**: Below you will find all the files we will be using for this demo. These files contain the frontend (HTML), backend (Javascript), and our server (server.js) code. For our demo, we will only be connecting to a AWS S3 Bucket we create. For the other services we use (SQS, SNS, and Lambda), we will be manually creating a workflow directly from the AWS platform. Let's break down what are files are doing below.

**Folder Structure** <br/>
- Front <br/>
    - index.html (Upload File UI) <br/>
    - style.css (basic CSS Styling) <br/>
    - script.js (upload button functionality - send form data (image) to our server) <br/>
- Back <br/>
    - uploads (temporary folder that will store images before they are sent to your AWS S3 Bucket)
    - server.js (sets up an Express server that handles file uploads from a client, temporarily stores the files on the server using Multer, and then uploads them to an AWS S3 bucket)
 
**Required Steps** </br>
**Description**: Follow the steps below to **set up your frontend/backend/server** to begin working with **AWS**.
1. Download the **AWS Code** Folder from this Repository, and open it up in your preferred **Code Editor**. Personally, I would recommend **Visual Studio Code** [here](https://code.visualstudio.com/download).
2. After you have the **AWS Code** in your Code Editor, review the files code. Then, **open your systems terminal**. Go to the directory of where you saved the **AWS Code** folder, so when you enter the command **ls**, you see all the folders and files from the **Folder Structure** section.
3. Next, now we will create a Node package file that will allow us to create our server and install and packages we will need. Thus, in your command line enter the command **cd back** (which will change the directory to inside the back folder). Note: You will need to have installed **Node/NPM** in you system already for the commands in this step to work. To install node, [click this link](https://www.youtube.com/results?search_query=install+node+js) or look at the Node.JS official website documentation. Once inside the **back** folder, enter the following command: **npm init -y**. This will create a **package.json** file with default settings. In this file we will install the required libraries. Next, enter the following command to install the required libraries: **npm install @aws-sdk/client-s3 body-parser cors express multer**. For more info on these packages, use the official NPM website [here](https://www.npmjs.com/). You should now see a **package-lock.json** file and a **node_modules** folder inside of the **back** folder.
4. After installing the required libraries, we will not be able to start our Node/Express server until the **AWS Info Input Into Our Code** Section, as we still have to put our AWS info information into our code which we will do in that section.

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
    
## S3 Bucket Creation
**Description**: Now we will create an S3 bucket, which we will use to store any files we upload directly from our website. Although, you'll also be able to upload files directly via the AWS S3 platform. AWS S3 accepts many different file types.

1. To create an S3 Bucket, first go to the AWS Platform and in the search bar search up **S3** and click the first option that shows up.
2. Next, click on the orange **Create Bucket** button. On the next screen, keep the default options you are given and just enter a Bucket name under the **Bucket Name** label.
3. Finally, click the **Create Bucket** orange button. You have now created a S3 bucket. Feel free to explore your bucket.

## AWS Info Input Into Our Code
**Description**: Now that we have started out Node/Express server, created an IAM User role, and created an S3 Bucket, we will input our AWS Information into our code to connect the AWS platform to our backend server.

1. Go back to your **code editor** and locate your **server.js** file. Then, locate the **accessKey, secretAccessKey, bucketRegion, and bucketName** variables in the file. The variables will be right after each other. Right now the variables are set to empty strings. Thus, enter your relevant information into each string as it is in the AWS Platform. This is the only additional code we will add.
2. Next, we will be able to start our Node/Express server. To start our server, go back to your terminal (that is currently inside the **back** folder directory) and type the command **node server.js**. If you followed all the previous steps correctly, when you run the command you should see the following output in your terminal, **Server running on http://localhost:3000**. You have now completed most of the required coding part for this demo. 
3. Now, let's test if we have completely connected AWS to our server. Make sure your server is running (node server.js). Go to your **index.html** file and **live preview** your frontend code (second click and select the **Open with Live Server** option. You may need to download the **Live Server** extension in Visual Studio Code if you haven't already. Then, you'll be redirected to a webpage with **AWS Demo: File Upload** as the title.
4. Next, click the **Choose File** button and select a file you want to upload into your S3 Bucket. After you have selected a file, click the **Upload** button. Then, head over to your S3 Bucket that you've created and check if the file you have uploaded is there. If you've connected everything correctly, you should have a new file there.
5. You have now successfully connected AWS with your S3 bucket and have made sure it works with your Codestack. You have created a simple workflow of adding files from your website and storing them into S3. Congrats!

## ...
**Description**: Now

    
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
