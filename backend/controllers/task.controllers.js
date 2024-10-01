import Task from '../models/task.js';


export const addTask = async(req,res) =>{
    try{
        // console.log("trying to add");
    let {title,description} = req.body;
    const userId = req.user.id; 
    const newtask = new Task({
        user: userId,
        title:title,
        description:description,
    })

    await newtask.save();

    res.status(200).json({
        newtask,
        message:"Task added successfully",
    });
}catch(err){
    res.status(500).json({message:err.message})
}
}


export const showTask = async(req,res)=>{
    try{
        const{id} = req.params;
        const task = await Task.find({user:id});
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:"internal error not fetching data"});
    }
}

export const showone = async (req, res) => {
    try {
        // console.log(req.body.user);
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


export const editTask = async (req, res) => {
    try {
        let { id } = req.params;
        let { title, description } = req.body;
        const editTask = await Task.findByIdAndUpdate(id, {
            title: title,
            description: description,
        });
        res.status(200).json({
            editTask,
            message: 'Task updated successfully',
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const deleteTask = async(req,res)=>{
    try{
       let {id} = req.params;
       await Task.findByIdAndDelete(id);
       res.status(200).json({message:"deleted"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}