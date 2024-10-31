# 3D Metri

## 3D Printing Instant Quote

[3D Metri Demo](http://3dmetri.com)

* * *

*   created: 11/16/2022
*   latest update: 13/02/2023
*   by: Nuri Erginer
*   email: [nerginer@gmail.com](mailto:nerginer@gmail.com)

Thank you for purchasing 3D Metri Code. If you have any questions that are beyond the scope of this help file, please feel free to email me. Thanks so much!

<br><br><br><br><br><br><br><br><br><br><br><br><br>

# Overview

* * *

Additive manufacturing—commonly called 3D Printing—is an ideal solution for creating concept models, manufacturing tooling, functional prototypes, and even end-use parts in many cases. Online 3D printing services are used by design firms and part manufacturers for making prototypes and molds. 3D printers are sophisticated machines that use advanced technology adhering to very high-quality standards. 

This high-quality standards needs to be reflected to your end customers from the start. The most important part of receiving a quote is let your customers to know below information when they first come to your web site.

*   What is the cost to print my STL File?
*   What are the printing technologies you are providing?
*   What are the material choices?
*   What are the provided resolutions and layer heights?
*   Do you provide finishing options for the end product?

With 3DMetri your customers will get their answers by themselves. You will only work for the Orders not for the deals.
<br><br><br>
# Prerequisites

* * *

The only Prerequisites for this code is a **Hosting Service**. It must be **Amazon Web Services**.. Also, you need to have a **Stripe** account and be ready to obtain Stripe Secret key. 


### What is Amazon Web Services (AWS) ?

AWS, Inc. is a subsidiary of Amazon that provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis. These cloud computing web services provide distributed computing processing capacity and software tools via AWS server farms.

Please open up an account at AWS. https://aws.amazon.com/

We will use below services for our Web App:

**\- Amazon Simple Storage Service (S3)**

 S3 is a service offered by Amazon Web Services that provides object storage through a web service interface. 

**\- Amazon Serverless Computing (LAMBDA)**

AWS Lambda is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code. 

**\- Amazon Simple Email Service (SES)**

Amazon SES is a cloud email service provider that can integrate into any application for bulk email sending. 

Please do not afraid. This will be a one click installation with AWS CloudFormation template. AWS CloudFormation is an infrastructure as code (IaC) service that allows you to easily model, provision, and manage AWS and third-party resources. You will receive a CloudFormation Template File with the source code and you will use it to provision all the necessary resources. Please go on the installation part of this document. 
<br><br><br>
# Installation

* * *

**Step-1** 

Create An AWS Account. If you have one you can use it.

**Step-2**

After Sign in to your account, go to CloudFormation Service. You can search for this service from the search bar at the top. Click Create Stack. Select Template is ready and Upload a template file radio buttons. Click Chose File and select cloudformation.yml file which is in the SourceFiles/3DMetri/src directory Click Next. 

[AWS Management Console](https://app.guidde.co/share/playbooks/6RudNVGJ2HDMyCWtMoF2di?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

[![](https://firebasestorage.googleapis.com/v0/b/guidde-production.appspot.com/o/gif%2F6RudNVGJ2HDMyCWtMoF2di.gif?alt=media&token=de81e1e5-5e16-4a76-9220-af2fe28cbb57)](https://app.guidde.co/share/playbooks/6RudNVGJ2HDMyCWtMoF2di?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

Enter a Stack Name. I choose MetriFrontEnd. Set the Parameters. BucketNamePrefix is the text that will be added to the front of your bucket names as prefix (you need to choose 4 digits only). The second parameter is important - enter your email address that you want to receive the Customer Orders. Next you need to enter Stripe API Secret Key (don’t close this window).

To get Stripe Secret Key please create an account on [https://srtipe.com](https://srtipe.com) 
After you confirmed your account and enter all the necessary information, you need to navigate to the Developer section and choose API Key or click on the link [here](https://dashboard.stripe.com/apikeys) 
Please copy your Secret Key and enter it in your CloudFormation in AWS (previous window with application)


We will soon define this email for the AWS Simple Mail Service. Do not worry I will guide you. Click Next. Scroll to end of page with default settings and Click Next. Again Scroll to end of page and check "I acknowledge that AWS CloudFormation might create IAM resources with custom names." Click Submit.

The CloudFormation will build and connect every resources we need. Please wait until you see the CREATE\_COMPLETE message for the all stack resources.

[CloudFormation - Stack](https://app.guidde.co/share/playbooks/pGB4gmnLA9MuJzAfP4As4F?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

[![](https://firebasestorage.googleapis.com/v0/b/guidde-production.appspot.com/o/gif%2FpGB4gmnLA9MuJzAfP4As4F.gif?alt=media&token=2af09393-6b17-4afe-b847-29bed255d4f6)](https://app.guidde.co/share/playbooks/pGB4gmnLA9MuJzAfP4As4F?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

**Step-3**

Go to Simple email service. You know how to do that just write to the top search bar as SES and click simple email service. Click Create identity. Chose email address and enter the same email address you write at Step2. Click Create identity.

[CloudFormation - Stack MetriFrontEnd](https://app.guidde.co/share/playbooks/6zVUNcTDCkVsDKXJXUXKhh?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

[![](https://firebasestorage.googleapis.com/v0/b/guidde-production.appspot.com/o/gif%2F6zVUNcTDCkVsDKXJXUXKhh.gif?alt=media&token=d24c7f53-475b-4225-a4f7-a075bce861b1)](https://app.guidde.co/share/playbooks/6zVUNcTDCkVsDKXJXUXKhh?origin=S2JUUYO7Y3gpMSTrmdI0J2tKwL32)

You will see that Verification is pending on the next screen. You will receive an email from amazon to verify the email address you entered. Open the email and click the link to verify your email address.


**Step-4**

We are almost done.  We will write down to function addresses on the index.html page.

These are AWS Lambda function addresses. Go to the search bar, write Lambda, and click on the Lambda Service. 

You will see three functions testGetSignedURL, testsendSESEmail and createStripePaymentLink. 

Test is the prefix it can be something else in your situation. Click on the GetSignedURL function. 

You will see the Function URL on the right-hand side. It is a link address. 

Copy it and open index.html in the SourceFiles/3DMetri/dist
you will see three config options VUE_APP_BASE_SES_LAMBDA_URL, VUE_APP_BASE_GET_SIGNED_URL and VUE_APP_BASE_CREATE_STRIPE_PAYMENT_LINK_URL under window.Metri_Config option.

Set these parameters with the appropriate function url address. They may look like this:

      VUE_APP_BASE_SES_LAMBDA_URL:'https://fpzm4mm4h5ztklv4sozdesk2vbm0nbswd.lambda-url.us-east-1.on.aws/',

      VUE_APP_BASE_GET_SIGNED_URL:'https://l3oa4mtr6eerb2f7sdvkflwzfl40kdlho.lambda-url.us-east-1.on.aws/',

VUE_APP_BASE_CREATE_STRIPE_PAYMENT_LINK_URL:'https://l3oa4mtrpzm4mm4h5ztflwzfl40kdlho.lambda-url.us-east-1.on.aws/'

Set VUE_APP_BASE_SES_LAMBDA_URL to testsendSESEmail function url address, 

Set VUE_APP_BASE_GET_SIGNED_URL to testGetSignedURL function url address and 

VUE_APP_BASE_SES_LAMBDA_URL to createStripePaymentLink function url address.

With this, the front-end will know the address of the functions that it needs. Save the index.hml file.

**Step-5**

In this final step go to S3 Service by writing S3 to the search bar and click it. 

You will see your buckets. Click test-3dmetri bucket. 

If you write an other prefix your bucket name will look like prefix-3dmetri Click and enter inside the bucket.

 Upload all the files in the SourceFiles/3DMetri/dist directory to this bucket. 

 Select all the files in the directory and drug and drop to on the browser. 

 Or you can click the upload button and then select all the files. 

 This bucket will be your web site address. To find out the web address for this setup click the properties tab of this bucket and scroll down to the page. You will find a web link at the end in the Static website hosting section. 

 You can assign a custom domain to this link.
<br><br><br>
# Customization

* * *

We set up our Web Site, and It is time to customize the app in order to reflect our services.

You can do this by editing the mydata.json file. This file is in your public directory. In this file are your printers or printing technologies, your materials, and other information that you will serve to your customers. 

The file structure is as below.

    Printers

        materials

        colors

        infills

        layer\_heights

        finishings

        setup\_costs

You will edit this file according with your 3D printing capability, Materials and Finishing options.

Do not break the json file. Editing this file with an online JSON editor and validator is recommended. 

Please check the JSON file validity before uploading it to the system.

<br><br><br>

# Example of an Order Email
<br>
Please find an example email that you will receive every time a customer upload files to get service. You will find the stl file in your s3 bucket. After your examination and 3d printing compliance check you can send the below payment link to your customer. Stripe site will handle the secure payment transactions and Tax issues. Stripe also get your customers shipping address. After you receive your money you can Print the object and send to your customers address.


        customerName:   Jhon Doe
        customerEmail:  jhon@gmail.com
        customerPhone:  2343423445
        cartTotal:      281.70
        paymentLink:    https://buy.stripe.com/test_cN2g2oegk78OcxOeV1

        File Name	Handle.stl
        Price	    281.70
        Quantity	1
        Printer	    HP Jet Fusion 3D 4210 Printer
        Material	HP 3D High Reusability PA 12
        Color	    Dyed Black
        Infill	    Ultra Light
        LayerHeight	Normal
        Finishing	Polishing
        unit	    mm

<br><br><br>
# FAQ

* * *

### Who is this HTML Web APP for?
<br>
This HTML Web APP is for On-Demand Manufacturing platforms like 3D Printing service providers. If you are a 3D Printing service provider and want to response your customers with an instance quoting engine, You are in the correct place.
<br><br>
### Why it is important have an instance quoting engine?
<br>
Quoting potential new clients can be a pain. Depending on the services you offer, your sales team may be spending too much time on customized quotes, only to lose the deal when all is said and done.

There are lots of customers who is getting the quote but not order at the end.

Quoting software handles the process of calculating, creating, and managing all the quotes for your professional service business. Rather than listing these out on an Excel spreadsheet, with quoting software tools, you can easily input your data and generate accurate quotes quickly.

Quick and efficient is the name of the game when delivering a quote to potential new businesses. Closing a deal and winning a project is often a matter of precious time. Sometimes the firm to submit its quote the fastest will win the job, regardless of whether or not a competitor is a better choice. 

Time is money, and delivering quotes quickly and professionally is a good look for any professional service business.