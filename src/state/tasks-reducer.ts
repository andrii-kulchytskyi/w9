import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskListId)}
        case 'ADD-TASK':
            return {
                ...state, [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                }, ...state[action.todoListId]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskListId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskListId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskListId,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todoListId
    } as const
}
export const changeTaskStatusAC = (taskListId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE-STATUS',
        taskListId,
        isDone,
        todoListId
    } as const
}
