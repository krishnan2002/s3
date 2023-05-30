const { error } = require("console")
const express = require("express")
const multer = require("multer")
const uuid = require("uuid").v4
const app = express() 


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,"uploads/")
    },
    filename:(req, file, cb) =>{
        const { originalname } = file
        cb(null,`${originalname}`)
    }
})
const fileFilter = (req,file,cb) =>{
    if (file.mimetype.split("/")[0] === 'image'){
        cb(null,true)
    } else {
        cb(new Error("file is not of the correct type"), false)
    }
}
//single upload
// app.post("/upload",upload.single("file"),(req, res)=>{
//     res.json({status: "success"})
// })
//multiple files
const upload = multer({storage, fileFilter })
app.post("/upload",upload.array("file"),(req, res)=>{
    res.json({status: "success"})
})
//multiple fields

// const multiupload = upload.fields([
//     {name: "avatar", maxCount:1},
//     {name: "resume", maxCount:1}
// ])
// app.post("/upload",multiupload,(req, res)=>{
//     res.json({status: "success"})
// })


app.listen(4000,() => console.log("listening on port 4000"))