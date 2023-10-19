import PrimitivePaper from '../../components/PrimitivePaper/PrimitivePaper'
import PrimitiveButton from '../../components/PrimitiveButton/PrimitiveButton'
import './StartScreen.scss'

function StartScreen() {
  return (
    <PrimitivePaper class="start-screen">
      <p>
        Выбейте все фишки соперника с поля!
        <br />
        <br />
        В свой ход:
        <br />
        1. Выберите фишку
        <br />
        2. Кликните на поле, чтобы появилась стрелка. Направление стрелки
        указывает направление броска; длина — силу
        <br />
        3. Нажмите “Enter” чтобы осуществить бросок
        <br />
        <br />
        Игра продолжается, пока у обоих игроков есть фишки на поле. Побеждает
        тот игрок, который сделает последний ход
      </p>
      <br />
      <div className="start-screen__start-buttons">
        <PrimitiveButton>Играть с ботом!</PrimitiveButton>
        <PrimitiveButton>Играть вдвоем!</PrimitiveButton>
      </div>
    </PrimitivePaper>
  )
}

export default StartScreen
