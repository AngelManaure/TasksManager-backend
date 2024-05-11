import { prisma } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const allTasks = await prisma.tasks.findMany();
    if (!allTasks) {
      return res.status(200).json({ message: "No se encontraron tareas" });
    } else {
      res.status(200).json(allTasks);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getTask = async (req, res) => {
  try {
    const oneTask = await prisma.tasks.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!oneTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } else {
      res.status(200).json(oneTask);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const createTask = async (req, res) => {
  try {
    const taskCreated = await prisma.tasks.create({
      data: req.body,
    });
    if (!taskCreated) {
      return res.status(404).json({ error: "Error creando tarea" });
    } else {
      res.status(200).json(taskCreated);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskDeleted = await prisma.tasks.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!taskDeleted) {
      return res.status(404).json({ error: "Tarea a eliminar no encontrada" });
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskUpdated = await prisma.tasks.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    if (!taskUpdated) {
      return res.status(404).json({ error: "Tarea a actualizar no encontrada" });
    } else {
      res.status(200).json(taskUpdated);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
