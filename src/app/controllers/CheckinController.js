import { format, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Checkin from '../schemas/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Aluno informado não existe!' });
    }

    const today = Date.now();
    const subDate = subDays(today, 7);

    const listCheckins = await Checkin.find({
      student_id: id,
      createdAt: {
        $gte: subDate,
        $lt: today,
      },
    });

    if (listCheckins.length > 4) {
      return res
        .status(400)
        .json({ error: 'Aluno já realizou quantidade máxima de checkins!' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.status(201).json(checkin);
  }

  async index(req, res) {
    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Aluno informado não existe!' });
    }

    const listCheckins = await Checkin.find({ student_id: id });

    return res.status(200).json(listCheckins);
  }
}

export default new CheckinController();
