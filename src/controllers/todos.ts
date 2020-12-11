import { RequestHandler } from 'express'

import { TodoModel as Todo} from '../models/todo'


export const createTodo: RequestHandler = async (req, res, next) => {
    const newTodo = new Todo({ ...req.body })

    try {

        await newTodo.save()
        res.status(201).send(newTodo)
    } catch (e) {
        res.status(400).send(e)
    }

}

export const getTodos: RequestHandler = async (req, res, next) => {

    try {
        const todos = await Todo.find({})

        res.send(todos)
    } catch(e){

        res.status(500).send()
    }
}

export const updateTodo: RequestHandler = async (req, res, next) => {

    const updates = Object.keys(req.body)

    const allowedUpdates = ['description']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })

    }


    try {
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id },req.body)

        if (!todo) {
            return res.status(404).send()
        }

        res.send(todo)

    } catch (e) {

        res.status(400).send(e)

    }
}

export const deleteTodo: RequestHandler = async (req, res, next) => {

    try {

        const todo = await Todo.findOneAndDelete({ _id: req.params.id})
        if (!todo) {
            return res.status(404).send()
        }

        res.send(todo)

    } catch (e) {
        res.status(500).send()
    }
}