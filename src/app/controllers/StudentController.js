import Student from '../models/Student';

class StudentController {
  // TODO criar validações dos campos para store
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Aluno já cadastrado!' });
    }

    const student = await Student.create(req.body);

    return res.status(201).json(student);
  }

  // TODO criar validações dos campos para update
  async update(req, res) {
    const { id } = req.params;
    console.log(id);
    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Aluno não cadastrado!' });
    }

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Email de aluno já cadastrado!' });
      }
    }

    const resultStudent = await student.update(req.body);

    return res.status(200).json(resultStudent);
  }
}

export default new StudentController();
