import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async store(req, res) {
    const { question } = req.body;
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Aluno informado não existe' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.status(201).json(helpOrder);
  }

  async index(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Aluno informado não existe' });
    }

    const listHelpOrders = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
    });

    return res.status(200).json(listHelpOrders);
  }
}

export default new StudentHelpOrderController();
