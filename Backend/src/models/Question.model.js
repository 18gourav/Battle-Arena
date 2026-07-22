import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    level:{
        type:String,
        enum:[
            'easy',
            'medium',
            'hard'
        ],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    testCases:[
        {
            input:String,
            output:String,
            Explanation:String
        }
    ],
    examples:[
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