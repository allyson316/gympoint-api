import { format, parseISO } from 'date-fns';
import priceFormat from '../../util/priceFormat';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  // tarefa a ser executada pelo job
  async handle({ data }) {
    const { regMail } = data;

    await Mail.sendMail({
      to: `${regMail.name} <${regMail.email}>`,
      subject: 'Matrícula registrada.',
      template: 'registration',
      context: {
        student: regMail.name,
        plan: regMail.plan,
        date: format(
          parseISO(regMail.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: priceFormat(regMail.price),
      },
    });
  }
}
export default new RegistrationMail();
