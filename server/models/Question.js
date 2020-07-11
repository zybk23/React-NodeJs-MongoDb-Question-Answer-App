const mongoose=require("mongoose");
const slugify=require("slugify");


const Schema=mongoose.Schema;

const QuestionSchema=new Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        minlength:[10,"Please provide a title a least 10 characters"],
        unique:true
    },
    content:{
        type:String,
        required: [true,"Please provide a title at least 20 characters"],
        minlength:[20,"Please provide a title at least 20 characters"]
    },
    slug:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            res:"User"
        }
    ],
    answers:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Answer"
        }
    ]
});

QuestionSchema.pre("save",function (next) {
    if(!this.isModified("title")){
        next();
    }
    this.slug=this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug=function(){
    return slugify(this.title,{
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        //strict: false,     // strip special characters except replacement, defaults to `false`
    })
};


module.exports=mongoose.model("Question",QuestionSchema);
