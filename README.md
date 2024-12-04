
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
    - [IAM Role Creation](#IAM-Role-Creation)
    - [Setup Lambda Function](#Setup-Lambda-Function)
    - [S3 Trigger](#S3-Trigger)
    - [Lambda Function Code](#Lambda-Function-Code)
    - [SNS Creation](#SNS-Creation)
    - [Add SNS ARN to Lambda Function](#Add-SNS-ARN-to-Lambda-Function)
    - [Run Workflow](#Run-Workflow)
    - [The End](#The-End)
- [Continue Learning About AWS](#Continue-Learning-About-AWS)

# Hands-On AWS (2/2) Workshop 

**Date:** Wednesday, December 4th, 2024 <br>
**Description**: In this workshop students will learn how to implement AWS services like S3 Buckets, Lambda Functions, SNS, and possibly a PostgresQL database with Python, which is a high-level programming language (or React) This will be the second part of a 2 part series. <br>
**Workshop Youtube Video**: [click here - tbd]() <br>
**Workshop Google Slides**: [click here - tbd]() <br>
**AWS Part 1 Workshop Video/Slides**: [click here](https://www.youtube.com/watch?v=Wvz3KmUXlkY&t=338s&ab_channel=ComputerScienceSocietyatCUNYJohnJay) <br>

---

## Introduction
**Description**: We will be going over how to implement AWS S3, Lambda, and SNS in a real-world scenario. By real-world scenario, what we mean is connecting our AWS account and its services to our website, which we will be hosting locally. This will require us to create a AWS Account, and you to follow all steps detailed below. Our Workflow will consist of creating a web application, connecting it to a server, then connecting it to an AWS S3 Bucket and using the file upload to trigger a Lambda function that will activate a SNS notification that will send an email telling us that a file was uploaded into the S3 Bucket. 

---

## Pre Requisites
**Description**: There aren't really any pre-requisites as we'll be going over a basic workflow using the stated AWS services stated above. You will have the steps below to follow along or do on your own time, as well as a video recording of the session. However, if you are not familiar with Html/CSS/Javascript/Node JS/Express, the frontend/server part of the code will be a bit confusing so I would recommend you review those files. We will quickly skim over the coding files in the steps below.

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
3. You should now see a horizontal row with these options **Permissions | Groups | Tags | Security credentials | Access Advisor**. Click on **Security Credentials**. Scroll down until you see the **Access Keys** section, and click on **Create Access Key**. Select the **local code** option and then click **next**.
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

## IAM Role Creation
**Description**: In order to continue, we will have to create an IAM Role (not user) that will allow us to interact directly in AWS with other services like Lambda.

1. To start out, first go to the AWS Platform and in the search bar search for **IAM** and select the first option. Then, in the left table of options, click on **Roles**. Then click on the **Create Role** orange button.
2. Make sure the **AWS Service** option is selected under **Trusted Entity Type** and under **Use Case --> Service or use case** make sure you select **Lambda**. Then click the **Next** button.
3. For the **Policies Permission** make sure you select these three policies: **AmazonS3FullAccess, AmazonSNSFullAccess, and AWSLambda_FullAccess**. Then click the **Next** button.
4. Here, enter a **Role Name** of your choice and a **description** of your choice. Finally, click the **Create Role** button. You have now created a IAM Role that we will use in our Lambda function creation.

## Setup Lambda Function
**Description**: Now we will connect a Lambda function to our process that will trigger when a file is uploaded to our S3 Bucket and then send a SNS notification to your email that tells you that a file was just uploaded into your S3 Bucket. For this we will need to create a Lambda function with some code, and inside of the Lambda function we have to create an S3 Trigger event (when the file is uploaded into the S3 Bucket) that will activate our SNS notification system that will send a custom email about a file being uploaded to your desired email. But first, we have to create the Lambda function.

1. To create a Lambda function in AWS, first go to the AWS Platform and in the search bar search for **Lambda** and select the first option.
2. Click the **Create a Function** orange button. Make sure **Author From Scratch** is selected. Enter a **Function Name**. I will name mine **ProcessS3FileUpload**. Under **Runtime** select **Node.js 18.x** (but you can choose other languages, but for this demo we will write in Javascript). Then, click the **Change Default execution role** dropdown, and select the **Use an existing role** option. Under **Existing Role** select the Role you created in the previous step. Finally, click the **Create Function** button.
3. You have now created a Lambda function. You should see a **Code | Test | Monitor | Configuration | Aliases | Versions** horizontal line of options. Make sure you are in the **Code** Option. For now, we will leave our code blank.

## S3 Trigger
**Description**: Now we will create an S3 trigger within our Lamda function we have created in the previous step. This S3 Trigger will allow us to activate our Lambda function whenever a file is uploaded into our S3 Bucket. 

1. To start, inside of the Lambda function you have already created, locate and click the **+ Add Trigger** Button. Under **Trigger Configuration** search for **S3** and select the only option given. Under **Bucket**, select the bucket you have already created.
2. For **Event Types** make sure **All object create events** is selected. Finally, click the **Add** Button. In your Lambda function, you should now see a connection to your S3 Bucket. Basically, we have created a workflow that whenever a file is uploaded into our S3 Bucket, it will trigger whatever code our Lambda Function has. Our Function is currently empty.

## Lambda Function Code
**Description**: Now we will enter the Lambda function code that will allow us to activate our Lambda function (whenever a file is uploaded into our S3 Bucket).

1. To start out, go back to the Lambda Function we have already created and in the **code** section paste the code found in the file named, **index.js** in the **Lambda** Folder, to your **index.js** file in your Lambda function. Make sure your files name is **index.js**.
2. You'll notice in the code that we have two variables with empty strings (snsClient & snsTopicArn). This is because we haven't created our SNS Topic/Subscription yet, which will allow us to send a custom email once the Lambda function runs. We will include the last piece of code to our Lambda function in the **Add SNS ARN to Lambda Function** section.

## SNS Creation
**Description**: Now we will create an SNS topic name that will allow us to send a custom email that will let us know that a file was recently uploaded in our S3 bucket.

1. To start, first go to the AWS Platform and in the search bar search for **SNS** and select the first option. Then, under **Create Topic** enter a topic name and then click **Next step**.
2. Make sure the **Standard** option is selected. Give a name to your topic if you haven't already. Then click **Create topic**.
3. Then, click on **Create subscription**, and for **Protocol** make sure you select **Email. For **Endpoint** enter the desired email you want to receive a notification for. Also, make sure you keep track of your **Topic ARN** as we will be using it in our Lambda Function code. Then, click **Create subscription**. We are basically subscribing to the SNS Topic we've just created.
4. Lastly, once you've created a subscription for your SNS Topic, you will receive an email on the email you selected in the subscription, asking yout to confirm the subscription. Make sure you confirm.

## Add SNS ARN to Lambda Function
**Description**: We will now add the SNS ARN information we were missing before to our Lambda function to complete our workflow.

1. Go back to your Lambda Function you have created in the AWS Platform. In your **index.js** code file, located the **snsClient** variable. In the empty string enter the **region** of your SNS. Then, locate the **snsTopicArn** variable and in the empty string enter your **SNS ARN** from the SNS we created.
2. This last step completed our workflow. Let's make sure our workflow works in the next/last section.

## Run Workflow
**Description**: Let's now test our current workflow where we upload a file to our website --> that file is uploaded into our S3 Bucket --> at the same time the file is uploaded, an S3 Trigger in our Lambda Function is activated --> which sends an SNS notification via email telling us that a new file was uploaded into the S3 bucket.

1. Go back to your webpage for your **index.html** file (from your code stack) where we upload an image. Select an image and click the **upload** button.
2. Then, go to your S3 Bucket and check if that file you uploaded is in your S3 bucket now.
3. If it is, go to your email application and check if you received an email notification saying that a file was uploaded into your S3 Bucket. Double check if the **Bucket Name and File Name** are the same.
4. If everything is connected perfectly, you have successfully created a simple Node JS/AWS real-life scenario workflow.

> **Note**: Personally, I will be deleting all the Lambda/SNS/S3 Buckets I've created as I will no longer be using them. I recommend you do the same in case any charges are incurred to your card because one of these services was accidentally left on, etc. - Leandro G.
    
## The End
**Summary**: Congratulations on learning how to connect a **Node JS** project to a AWS S3 Bucket, with AWS Lambda & SNS, in one workflow. Read below for more AWS Resources.

---

# Continue Learning About AWS
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS SNS](https://aws.amazon.com/sns/)
- [More AWS](https://aws.amazon.com/about-aws/)

> For visual learners, we'd recommend Youtube videos.
