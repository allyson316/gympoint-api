import { addMonths, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const { studentId, planId, startDate } = req.body;

    const studentExixts = await Student.findByPk(studentId);

    if (!studentExixts) {
      res.status(400).json({ error: 'O aluno informado não existe!' });
    }

    const planExists = await Plan.findByPk(planId);

    if (!planExists) {
      res.status(400).json({ error: 'O plano informado não existe!' });
    }

    const registrationExists = await Registration.findOne({
      where: { student_id: studentId },
    });

    if (registrationExists) {
      res
        .status(400)
        .json({ error: 'Já existe uma matrícula para o aluno informado!' });
    }
    const endDate = addMonths(parseISO(startDate), planExists.duration);
    const pricePlan = planExists.price * planExists.duration;

    const registration = await Registration.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      price: pricePlan,
    });

    res.status(201).json(registration);
  }

  async index(req, res) {
    const { id } = req.params;
    if (id) {
      const registrationExists = await Registration.findByPk(id);

      if (!registrationExists) {
        return res
          .status(400)
          .json({ error: 'Matrícula informada não existe' });
      }

      return res.status(200).json(registrationExists);
    }
    const registrationsExists = await Registration.findAll();

    if (!registrationsExists) {
      return res.status(400).json({ error: 'Nenhuma matrícula cadastrada!' });
    }
    return res.status(200).json(registrationsExists);
  }

  async update(req, res) {
    const { planId, startDate } = req.body;
    const { id } = req.params;

    const registrationExists = await Registration.findByPk(id);

    if (!registrationExists) {
      res.status(400).json({ error: 'A matrícula informada não existe!' });
    }

    const planExists = await Plan.findByPk(planId);

    if (!planExists) {
      res.status(400).json({ error: 'O plano informado não existe!' });
    }

    const endDate = addMonths(parseISO(startDate), planExists.duration);
    const pricePlan = planExists.price * planExists.duration;

    const registrationUpdate = await registrationExists.update({
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      price: pricePlan,
    });

    return res.status(200).json(registrationUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (id) {
      const registrationExists = await Registration.findByPk(id);

      if (!registrationExists) {
        return res
          .status(400)
          .json({ error: 'Matrícula informada não existe!' });
      }

      await registrationExists.destroy();

      return res
        .status(200)
        .json({ sucesso: 'Matrícula deletada com sucesso!' });
    }
  }
}

export default new RegistrationController();
