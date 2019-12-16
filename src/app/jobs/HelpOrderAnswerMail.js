import { format, parseISO } from 'date-fns';
import priceFormat from '../../util/priceFormat';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  // tarefa a ser executada pelo job
  async handle({ data }) {
    const { answerMail } = data;

    await Mail.sendMail({
      to: `${answerMail.name} <${answerMail.email}>`,
      subject: 'Pedido de auxílio respondido!',
      template: 'answerHelpOrder',
      context: {
        student: answerMail.name,
        question: answerMail.question,
        answer: answerMail.answer,
        answer_at: format(
          parseISO(answerMail.answer_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}
export default new HelpOrderAnswerMail();
