import asyncHandler from "express-async-handler"
import ticketModel from "../models/ticket.model.js"


export const createTicket = asyncHandler(async (req ,res) => {
    const {userId , agentId , title} = req.body

    const creTicket = await ticketModel.create({userId,agentId,title})
    const newTicket = await ticketModel.findById(creTicket._id).populate("userId","username role").populate("agentId","username role")
    res.status(201).json({message:"success",newTicket})
})



export const getTicketById = asyncHandler(async (req,res)=>{
    const {id}= req.params

    const foundedTicket = await ticketModel.findById(id).populate("userId","username role").populate("agentId","username role")

    res.status(200).json({message:"success",foundedTicket})

})



export const getAllTickets = asyncHandler(async (req,res)=>{
   
    const AllTickets = await ticketModel.find().populate("userId","username role -_id").populate("agentId","username role -_id")

    res.status(200).json({message:"success",AllTickets})

})