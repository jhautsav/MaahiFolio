const express=require('express');
const app=express();
const port=process.env.PORT || 2000;
const path=require('path');
const hbs=require('hbs');
const nodemailer = require('nodemailer');
//for creating static path
const staticPath=path.join(__dirname,'../public');
const template=path.join(__dirname,'../template/views');
let paritalPath=path.join(__dirname,'../template/partial');
app.use(express.json());

/* for reading front end data */
app.use(express.urlencoded({ extended: false }));

//set for static path
app.use(express.static(staticPath));
app.set('view engine','hbs');
app.set('views',template);
hbs.registerPartials(paritalPath);

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('*',(req,res)=>{
    res.render('404');
})
app.post('/email', async (req, res) => {
    try {
        const usrname = req.body.name;
        const email = req.body.email;
        const subject = req.body.subject;
        const text = req.body.text;
    console.log(usrname);
    console.log(email);
    console.log(subject);
    console.log(text);


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'utsavmaithili@gmail.com',
                pass: 'Utsav@1998'
            }
        });
        const mailOptions = {
            from: 'utsavmaithili@gmail.com',
            to: 'pathakmahima96@gmail.com',
            subject: subject,

            html: `<p>hiii i am ${usrname}</p>
          <p>contact : ${email}</p>
          <p>messege:${text}</p>`
        };

        const sendMail = await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                
                   res.render('index' );

               

            }
        })
     
         
    }
    catch (e) {
        res.status(401).send(e);
    }
})
 
app.listen(port,()=>{
    console.log(`i am listing at port ${port}`);
})