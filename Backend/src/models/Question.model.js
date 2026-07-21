import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
    title:{
        type:String,
        unique:true
    },
    level:{
        type:String,
        enum:[
            'Easy',
            'Medium',
            'Hard'
        ]
    },
    Description:{
        type:String,
        required:true
    },
    testCases:[
        {
            input:String,
            output:String,
            Explanation:String
        }
    ]
},
{timestamps:true}
)

export const Question = mongoose.model('Question',QuestionSchema)