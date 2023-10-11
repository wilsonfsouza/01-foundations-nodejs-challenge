import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      )

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'The field title is required' }))
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: 'The field description is required' }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.findUnique('tasks', { id })

      if (!task) {
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ message: `task with id:'${id}' does not exist` }),
          )
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const [task] = database.findUnique('tasks', { id })

      if (!task) {
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ message: `task with id:'${id}' does not exist` }),
          )
      }

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Both title and description are required',
          }),
        )
      }

      const taskToBeUpdated = {
        title,
        description,
        updated_at: new Date(),
      }

      database.update('tasks', id, taskToBeUpdated)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const [task] = database.findUnique('tasks', { id })

      if (!task) {
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ message: `task with id:'${id}' does not exist` }),
          )
      }

      const isTaskAlreadyCompleted = !!task.completed_at

      const toggleTaskStatus = isTaskAlreadyCompleted ? null : new Date()

      const taskToBeUpdated = {
        completed_at: toggleTaskStatus,
      }

      database.update('tasks', id, taskToBeUpdated)

      return res.writeHead(204).end()
    },
  },
]
