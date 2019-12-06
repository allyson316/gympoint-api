import Plan from '../models/Plan';

class PlanController {
  // TODO criar validações dos campos para store
  async store(req, res) {
    const { title } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(400).json({ error: 'Plano já cadastrado!' });
    }

    const plan = await Plan.create(req.body);

    return res.status(201).json(plan);
  }

  // TODO criar validações dos campos para index
  async index(req, res) {
    const { id } = req.params;
    if (id) {
      const planExists = await Plan.findByPk(id);

      if (!planExists) {
        return res.status(400).json({ error: 'Plano informado não existe' });
      }

      return res.status(200).json(planExists);
    }
    const plansExists = await Plan.findAll();

    if (!plansExists) {
      return res.status(400).json({ error: 'Nenhum plano cadastrado!' });
    }
    return res.status(200).json(plansExists);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    if (id) {
      const planExists = await Plan.findByPk(id);

      if (!planExists) {
        return res.status(400).json({ error: 'Plano não cadastrado!' });
      }

      if (title !== planExists.title) {
        const plan = await Plan.findOne({ where: { title } });

        if (plan) {
          return res.status(400).json({ error: 'Plano já cadastrado!' });
        }
      }

      const resultPlan = await planExists.update(req.body);

      return res.status(200).json(resultPlan);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    if (id) {
      const planExists = await Plan.findByPk(id);

      if (!planExists) {
        return res.status(400).json({ error: 'Plano não cadastrado!' });
      }

      await planExists.destroy();

      return res.status(200).json({ sucesso: 'Plano deletado com sucesso!' });
    }
  }
}

export default new PlanController();
