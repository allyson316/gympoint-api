import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class GymHelpOrderController {
  async index(req, res) {
    const listHelpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
    });

    return res.status(200).json(listHelpOrders);
  }

  async update(req, res) {
    const { answer } = req.body;
    const { id } = req.params;

    const helpOrderExists = await HelpOrder.findOne({
      where: {
        id,
        answer_at: null,
      },
    });

    if (!helpOrderExists) {
      return res.status(400).json({
        error: 'Pedido de Auxílio informado não existe ou já foi respondido',
      });
    }

    const helpOrderUpddated = await helpOrderExists.update({
      answer,
      answer_at: new Date(),
    });

    const student = await Student.findByPk(helpOrderExists.student_id);

    const answerMail = {
      name: student.name,
      email: student.email,
      question: helpOrderUpddated.question,
      answer: helpOrderUpddated.answer,
      answer_at: helpOrderUpddated.answer_at,
    };

    await Queue.add(HelpOrderAnswerMail.key, {
      answerMail,
    });

    return res.status(200).json(helpOrderUpddated);
  }
}

export default new GymHelpOrderController();
