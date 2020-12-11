import mongoose from 'mongoose'
import { prop, addModelToTypegoose, buildSchema } from '@typegoose/typegoose';

class Todo {
    @prop()
    public description!: string;
}

const todoSchema = buildSchema(Todo);
export const TodoModel = addModelToTypegoose(mongoose.model('todos', todoSchema), Todo);